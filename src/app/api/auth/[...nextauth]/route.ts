import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { BASE_URL, LoginApi } from "@/constants/apiEndpoint";

// Extend the Session and JWT types to include custom fields
declare module "next-auth" {
  interface Session {
    user: User & {
      firstName?: string;
      lastName?: string;
      accessToken?: string;
      refreshToken?: string;
    };
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: User & {
      firstName?: string;
      lastName?: string;
      accessToken?: string;
      refreshToken?: string;
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await fetch(`${BASE_URL}${LoginApi}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            console.error("API Error:", response.statusText);
            return null;
          }

          const data = await response.json();
          const { userInfo, accessToken, refreshToken } = data.data;

          if (!userInfo || !accessToken) return null;

          // Return full user object
          return {
            ...userInfo,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Store full user data on first login
      if (user) {
        token.user = { ...user };
      }
      return token;
    },

    async session({ session, token }) {
      // Ensure session.user matches the expected type
      session.user = {
        ...session.user,
        ...(typeof token.user === "object" && token.user !== null
          ? token.user
          : {}),
      };
      // Attach custom fields to session
      session.accessToken = token.user?.accessToken;
      session.refreshToken = token.user?.refreshToken;
      return session;
    },

    async signIn({ user }) {
      // Allow sign in only if user exists
      return !!user;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
