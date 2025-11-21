"use client";
import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      router.replace("/");
    }
  }, [status, session, router]);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      if (result?.error) {
        toast.error(
          result.error.includes("CredentialsSignin")
            ? "Invalid email or password"
            : "Login failed. Please try again."
        );
      } else if (result?.ok) {
        toast.success("Login successful!");
        setTimeout(() => router.push("/"), 800);
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

  // Loading spinner
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b192f]">
        <div className="w-12 h-12 border-4 border-t-[#d4b262] border-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  // Already logged in
  if (status === "authenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b192f] text-white">
        <p>You are already logged in. Redirecting...</p>
      </div>
    );
  }

  return (
<div className="min-h-screen flex flex-col lg:flex-row">

  {/* LEFT SIDE: Background Image (Desktop Only) */}
  <div className="hidden lg:block lg:w-1/2 relative">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/login-bg.jpg')" }}
    ></div>
  </div>

  {/* RIGHT SIDE: Form Section */}
  <div className="relative flex items-center justify-center w-full lg:w-1/2 p-6 bg-white lg:bg-transparent min-h-screen">
    {/* ✅ Full background image for mobile only */}
    <div
      className="absolute inset-0 bg-cover bg-center lg:hidden"
      style={{
        backgroundImage: "url('/assets/images/login-bg.jpg')",
        height: "100vh", // ensures it fills screen height
      }}
    ></div>

    {/* Optional overlay for readability */}
    <div className="absolute inset-0 bg-black/40 lg:hidden"></div>

    {/* ✅ Form Card */}
    <div className="relative w-full max-w-md bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-8 flex flex-col justify-center min-h-[60vh]">
     
       {/* Mobile Logo */}
          <div className="md:hidden mb-6 text-center">
            <img
              src="/assets/images/footer-icon.png"
              alt="Logo"
              className="w-[50px] mx-auto"
            />
          </div>
     
      <h2 className="text-left text-2xl font-semibold text-[#010000]">
        User Login
      </h2>

      <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
        {/* Register link */}
        <p className="text-left text-sm text-black">
          New here?{" "}
          <a href="/register" className="text-[#027a88] hover:underline">
            Create an account
          </a>
        </p>

        {/* Email */}
        <div className="w-full">
          <label className="block mb-2 text-black font-medium">Email ID</label>
          <div className="flex items-center gap-2 border border-[#cfcfcf] rounded-lg p-2">
            <Mail size={18} className="text-gray-300" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full focus:outline-none text-black placeholder-gray-400"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="block mb-2 text-black font-medium">Password</label>
          <div className="relative flex items-center gap-2 border border-[#cfcfcf] rounded-lg p-2">
            <Lock size={18} className="text-gray-300" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-none text-black placeholder-gray-400"
              required
            />
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        {/* Remember Me + Forgot Password */}
        <div className="flex items-center justify-between text-sm text-black">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#d4b262]" />
            Remember me
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-[100px] py-3 rounded-full font-semibold tracking-wide transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-[#05808f] hover:bg-[#016b78] text-white"
          }`}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        <p className="text-left text-sm text-black">
          <a href="#" className="hover:underline text-[#05808f]">
            Forgot Password?
          </a>
        </p>
      </form>
    </div>
  </div>
</div>



  );
}
