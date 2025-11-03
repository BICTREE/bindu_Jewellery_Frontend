"use client";
import { useState } from "react";
import { Mail, Lock, User, Phone, Calendar, Key } from "lucide-react";
import toast from "react-hot-toast";
import {
  RegisterUser,
  SendOTP,
  VerifyOTP,
} from "@/services/AuthService/AuthService";

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

  // Send OTP
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

  // Verify OTP + Register
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await VerifyOTP({ email: formData.email, otp });
      const body = {
        ...formData,
        credType: "email",
        otp,
      };
      const res = await RegisterUser(body);
      toast.success(res?.message || "Registration successful!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error?.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side Image */}
      <div className="hidden md:flex md:w-1/2 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('/assets/images/login-bg.jpg')",
        }}>
     
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center py-12 px-6">
        <div className="relative w-full max-w-md bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-8 flex flex-col justify-center min-h-[50vh] ">
        

          {step === "register" ? (
            <>
              <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                Create Your Account
              </h2>
              <form className="space-y-5" onSubmit={handleSendOtp}>
                {/* First Name */}
                <div>
                  <label className="flex items-center gap-2 border border-[#cfcfcf] rounded-lg p-2">
                    <User size={18} />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none"
                      required
                    />
                  </label>
                </div>

                {/* Last Name */}
                <div>
                  <label className="flex items-center gap-2 border border-[#cfcfcf] rounded-lg p-2">
                    <User size={18} />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none"
                      required
                    />
                  </label>
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 border border-[#cfcfcf] rounded-lg p-2">
                    <Mail size={18} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none"
                      required
                    />
                  </label>
                </div>

                {/* Mobile */}
                <div>
                  <label className="flex items-center gap-2 border border-[#cfcfcf] rounded-lg p-2">
                    <Phone size={18} />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile No"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none"
                      required
                    />
                  </label>
                </div>

                {/* Password */}
                <div>
                  <label className="flex items-center gap-2 border border-[#cfcfcf] rounded-lg p-2">
                    <Lock size={18} />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none"
                      required
                    />
                  </label>
                </div>

                {/* Gender */}
                <div>
                  <label className="flex items-center gap-2 border border-[#cfcfcf] rounded-lg p-2">
                    <span>Gender</span>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none"
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
                  <label className="flex items-center gap-2 border border-[#cfcfcf] rounded-lg p-2">
                    <Calendar size={18} />
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none"
                      required
                    />
                  </label>
                </div>

                {/* Send OTP Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#05808f] hover:bg-[#016b78] text-white w-[150px] py-3 rounded-full font-semibold tracking-wide transition"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-700 mt-4">
                  Already have an account?{" "}
                  <a href="/login" className="text-[#d4b262] hover:underline">
                    Login
                  </a>
                </p>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                Verify OTP
              </h2>
              <form className="space-y-5" onSubmit={handleVerifyOtp}>
                <div>
                  <label className="flex items-center gap-2 border border-[#cfcfcf] rounded-lg p-2">
                    <Key size={18} />
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={handleOtpChange}
                      className="w-full bg-transparent focus:outline-none"
                      required
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#05808f] hover:bg-[#016b78] text-white w-[150px] py-3 rounded-full font-semibold tracking-wide transition"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
