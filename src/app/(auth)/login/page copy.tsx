"use client";
import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Extend the Session type to include role
// interface CustomUser {
//   id?: string;
//   name?: string;
//   email?: string;
//   image?: string;
//   role?: string;
//   _id?: string;
//   accessToken?: string;
// }

// interface CustomSession extends Session {
//   user?: CustomUser;
// }

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession()
  const router = useRouter();

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);

    if (status === "authenticated" && session?.user) {
      console.log("User is authenticated, redirecting to home page");
      // If user is authenticated, redirect to home page
      router.replace("/");
    }
  }, [status, session, router]);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If already authenticated, don't proceed with login
    if (status === "authenticated") {
      toast.error("You are already logged in");
      router.push("/");
      return;
    }

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        if (result.error.includes("CredentialsSignin")) {
          toast.error("Invalid email or password");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else if (result?.ok) {
        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error("Unexpected response. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication status
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-repeat bg-center px-4"
        style={{ backgroundImage: "url('/assets/images/bg01.png')" }}>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-t-[#d4b262] border-gray-300 rounded-full animate-spin"></div>
          {/* <p className="text-white text-lg">Checking authentication...</p> */}
        </div>
      </div>
    );
  }

  // If already authenticated, show redirect message
  if (status === "authenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-repeat bg-center px-4"
        style={{ backgroundImage: "url('/assets/images/bg01.png')" }}>
        <div className="text-center text-white">
          <p>You are already logged in. Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-repeat bg-center px-4"
      style={{ backgroundImage: "url('/assets/images/bg01.png')" }}
    >
     
      
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <img
            src="/assets/logo/brand-logo.png"
            alt="Bindu Jewellery"
            className="h-16"
          />
        </div>
        <h2 className="text-center text-2xl font-semibold text-white mb-6">
          User Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="flex items-center gap-2 border-b border-white pb-2 text-white">
              <Mail size={18} />
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-white placeholder-white"
                required
              />
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="flex items-center gap-2 border-b border-white pb-2 text-white">
              <Lock size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-white placeholder-white pr-10"
                required
              />
              <span
                className="absolute right-2 top-2 cursor-pointer text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </label>
          </div>

          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between text-sm text-white">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#d4b262]" />
              Remember me
            </label>
            <a href="#" className="hover:underline text-[#d4b262]">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading }
            className={`w-full py-3 rounded-md font-semibold tracking-wide transition ${
              loading 
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#d4b262] hover:bg-[#bfa04f] text-white"
            }`}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          {/* New Account */}
          <p className="text-center text-sm text-white mt-4">
            New here?{" "}
            <a href="/register" className="text-[#d4b262] hover:underline">
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}