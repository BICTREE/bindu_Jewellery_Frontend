"use client";
import { useState } from "react";
import { Mail, Lock } from "lucide-react"; // icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-repeat bg-center px-4"
      style={{ backgroundImage: "url('/assets/images/bg01.png')" }} // use your uploaded path
    >
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/logo/brand-logo.png"
            alt="Bindu Jewellery"
            className="h-16"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-white mb-6">
          User Login
        </h2>

        {/* Form */}
        <form className="space-y-6">
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
              />
            </label>
          </div>

          {/* Password */}
          <div>
            <label className="flex items-center gap-2 border-b border-white pb-2 text-white">
              <Lock size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-white placeholder-white"
              />
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

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#d4b262] text-white py-3 rounded-md font-semibold tracking-wide hover:bg-[#bfa04f] transition"
          >
            LOGIN
          </button>

          {/* New Account Link */}
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
