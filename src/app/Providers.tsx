'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

// Loader component
const LoaderData = () => (
  <div className="flex flex-col items-center justify-center gap-4">
    <div className="w-12 h-12 border-4 border-t-[#d4b262] border-gray-300 rounded-full animate-spin"></div>
    <p className="text-white text-lg">Loading...</p>
  </div>
);

// Extend Session user type
interface CustomUser {
  name: string;
  email: string;
  _id?: string;
  accessToken?: string;
  userInfo?: {
    role?: string;
  };
}

interface ProviderProps {
  children: ReactNode;
}

// Wrap app in SessionProvider
export const AuthProvider = ({ children }: ProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

// Protect member-only pages
export const MemberProvider = ({ children }: ProviderProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Cast session.user to CustomUser
  const user = session?.user as CustomUser | undefined;
  console.log(user,"login user data ")

  useEffect(() => {
    if (status === 'loading') return;

    // Redirect if not authenticated or not a member
    if (!user || user.userInfo?.role !== 'user') {
      router.push('/login');
    }
  }, [user, status, router]);

  if (status === 'loading' || !user) {
    return (
      <div className="h-screen w-full grid place-items-center">
        <LoaderData />
      </div>
    );
  }

  return <>{children}</>;
};
