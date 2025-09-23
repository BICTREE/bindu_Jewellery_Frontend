"use client";
import { useState } from "react";
import { Mail, Lock, User, Phone, Calendar, Key } from "lucide-react";

export default function Register() {
  const [step, setStep] = useState<"register" | "otp">("register");
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

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    // Here, trigger OTP send API
    setStep("otp"); // switch to OTP form
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Entered OTP:", otp);
    // Verify OTP API call here
    alert("OTP Verified! Registration complete.");
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
            {/* Title */}
            <h2 className="text-center text-2xl font-semibold text-white mb-6">
              Register Now
            </h2>

            {/* Registration Form */}
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
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
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
                className="w-full bg-[#d4b262] text-white py-3 rounded-md font-semibold tracking-wide hover:bg-[#bfa04f] transition"
              >
                Send OTP
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
            {/* OTP Form */}
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
                className="w-full bg-[#d4b262] text-white py-3 rounded-md font-semibold tracking-wide hover:bg-[#bfa04f] transition"
              >
                Verify OTP
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
