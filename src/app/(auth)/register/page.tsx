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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await SendOTP({ email: formData.email });
      toast.success(res?.message || "OTP sent successfully!");
      setStep("otp");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await VerifyOTP({ email: formData.email, otp });
      const res = await RegisterUser({ ...formData, credType: "email", otp });
      toast.success(res?.message || "Registration successful!");
      setTimeout(() => (window.location.href = "/login"), 1500);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      {/* Left side - Image only visible on desktop */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center "
        style={{
          backgroundImage: "url('/assets/images/login-bg.jpg')",
        }}
      ></div>

      {/* Right side - Form (white bg on desktop, background image on mobile) */}
   <div
  className="w-full md:w-1/2 flex items-center justify-center py-12 px-6 
bg-cover bg-center bg-no-repeat md:bg-white register-bg h-[100vh] md:h-auto"
>
        <div
          className="relative w-full max-w-md rounded-2xl shadow-lg p-8 flex flex-col justify-center
                     bg-white/20 md:bg-white backdrop-blur-md md:backdrop-blur-none"
        >
          {/* Mobile Logo */}
          <div className="md:hidden mb-6 text-center">
            <img
              src="/assets/images/footer-icon.png"
              alt="Logo"
              className="w-[70px] mx-auto"
            />
          </div>

          <h2 className="text-center text-2xl font-semibold text-white md:text-gray-800 mb-6">
            {step === "register" ? "Create Your Account" : "Verify OTP"}
          </h2>

          {step === "register" ? (
            <form className="space-y-5" onSubmit={handleSendOtp}>
              {[
                { name: "firstName", icon: User, placeholder: "First Name" },
                { name: "lastName", icon: User, placeholder: "Last Name" },
                { name: "email", icon: Mail, placeholder: "Email" },
                { name: "mobile", icon: Phone, placeholder: "Mobile No" },
                { name: "password", icon: Lock, placeholder: "Password", type: "password" },
              ].map(({ name, icon: Icon, placeholder, type = "text" }) => (
                <div key={name}>
                  <label className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
                    <Icon size={18} className="text-white md:text-gray-700" />
                    <input
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      value={(formData as any)[name]}
                      onChange={handleChange}
                      className="w-full bg-transparent focus:outline-none 
                                 placeholder-white md:placeholder-gray-500
                                 text-white md:text-gray-800"
                      required
                    />
                  </label>
                </div>
              ))}

              {/* Gender */}
              <div>
                <label className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 text-white md:text-gray-800">
                  <span>Gender</span>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none 
                               text-white md:text-gray-800"
                    required
                  >
                    <option value="" disabled className="text-gray-400">
                      Select Gender
                    </option>
                    <option value="Male" className="text-black">
                      Male
                    </option>
                    <option value="Female" className="text-black">
                      Female
                    </option>
                    <option value="Other" className="text-black">
                      Other
                    </option>
                  </select>
                </label>
              </div>

              {/* Birthday */}
              <div>
                <label className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
                  <Calendar size={18} className="text-white md:text-gray-700" />
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none 
                               text-white md:text-gray-800"
                    required
                  />
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#05808f] hover:bg-[#016b78] text-white 
                           w-[150px] py-3 rounded-full font-semibold tracking-wide transition"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>

              <p className="text-center text-sm text-gray-100 md:text-gray-700 mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-[#d4b262] hover:underline">
                  Login
                </a>
              </p>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              <div>
                <label className="flex items-center gap-2 border border-gray-300 rounded-lg p-2">
                  <Key size={18} className="text-white md:text-gray-700" />
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    className="w-full bg-transparent focus:outline-none 
                               placeholder-white md:placeholder-gray-500 
                               text-white md:text-gray-800"
                    required
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#05808f] hover:bg-[#016b78] text-white 
                           w-[150px] py-3 rounded-full font-semibold tracking-wide transition"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
