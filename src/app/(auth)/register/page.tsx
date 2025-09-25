"use client";
import { useState } from "react";
import { Mail, Lock, User, Phone, Calendar, Key } from "lucide-react";
import toast from "react-hot-toast";
import { RegisterUser, SendOTP, VerifyOTP } from "@/services/AuthService/AuthService";


export default function Register() {
  const [step, setStep] = useState<"register" | "otp">("register");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    gender: "",
    birthday: "",
  });

  const [otp, setOtp] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  // 1️⃣ Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await SendOTP({ email: formData.email });
      toast.success(res?.message || "OTP sent successfully!");
      setStep("otp");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Verify OTP + Register User
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // First verify OTP
      await VerifyOTP({ email: formData.email, otp });

      // If OTP verified, register user
      const body = {
        ...formData,
        credType: "email",
        otp,
      };
      const res = await RegisterUser(body);

      toast.success(res?.message || "Registration successful!");
      // redirect to login after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || "Failed to verify OTP");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-repeat bg-center px-4"
      style={{ backgroundImage: "url('/assets/images/bg01.png')" }}
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

        {step === "register" ? (
          <>
            <h2 className="text-center text-2xl font-semibold text-white mb-6">
              Register Now
            </h2>
            <form className="space-y-5" onSubmit={handleSendOtp}>
              {/* First Name */}
              <div>
                <label className="flex items-center gap-2 border-b border-white pb-2 text-white">
                  <User size={18} />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-white placeholder-white"
                    required
                  />
                </label>
              </div>

              {/* Last Name */}
              <div>
                <label className="flex items-center gap-2 border-b border-white pb-2 text-white">
                  <User size={18} />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-white placeholder-white"
                    required
                  />
                </label>
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 border-b border-white pb-2 text-white">
                  <Mail size={18} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-white placeholder-white"
                    required
                  />
                </label>
              </div>

              {/* Mobile */}
              <div>
                <label className="flex items-center gap-2 border-b border-white pb-2 text-white">
                  <Phone size={18} />
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile No"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-white placeholder-white"
                    required
                  />
                </label>
              </div>

              {/* Password */}
              <div>
                <label className="flex items-center gap-2 border-b border-white pb-2 text-white">
                  <Lock size={18} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-white placeholder-white"
                    required
                  />
                </label>
              </div>

              {/* Gender */}
              <div>
                <label className="flex items-center gap-2 border-b border-white pb-2 text-white w-full">
                  <span className="text-white">Gender</span>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-transparent text-white focus:outline-none"
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>

              {/* Birthday */}
              <div>
                <label className="flex items-center gap-2 border-b border-white pb-2 text-white">
                  <Calendar size={18} />
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none text-white placeholder-white"
                    required
                  />
                </label>
              </div>

              {/* Send OTP Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4b262] text-white py-3 rounded-md font-semibold tracking-wide hover:bg-[#bfa04f] transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-white mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-[#d4b262] hover:underline">
                  Login
                </a>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-center text-2xl font-semibold text-white mb-6">
              Enter OTP
            </h2>
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              <div>
                <label className="flex items-center gap-2 border-b border-white pb-2 text-white">
                  <Key size={18} />
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    className="w-full bg-transparent focus:outline-none text-white placeholder-white"
                    required
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4b262] text-white py-3 rounded-md font-semibold tracking-wide hover:bg-[#bfa04f] transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
