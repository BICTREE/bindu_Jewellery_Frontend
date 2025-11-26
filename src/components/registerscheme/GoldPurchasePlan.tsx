"use client";
import React, { useState } from "react";

export default function GoldPurchasePlan() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState("");

  // HANDLE INPUT CHANGE
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // VALIDATE FORM
  const validateForm = () => {
    let newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim())
      newErrors.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.location.trim())
      newErrors.location = "Location is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT HANDLER
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccess("Form submitted successfully!");
      console.log("Form Data:", formData);

      // Reset
      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
      });

      setTimeout(() => setSuccess(""), 3000);
    }
  };

  return (
    <section className="w-full bg-[#f8f3ee] "  id="goldPurchasePlan">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT FORM SECTION */}
        <div className="p-10 md:p-20 flex flex-col ">
          <h2 className="text-2xl sm:text-3xl font-serif  font-semibold">
            Join the Gold Purchase Plan
          </h2>

          <div className="w-20 h-[2px] bg-black mt-3 mb-6"></div>

          <p className="text-gray-600 mb-10">
            Get a call back from our executive
          </p>

          {/* SUCCESS MESSAGE */}
          {success && (
            <p className="text-green-600 mb-4 font-medium">{success}</p>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-2">Your name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent border-b border-black pb-2 outline-none"
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">{errors.name}</span>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-2">Your phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-transparent border-b border-black pb-2 outline-none"
              />
              {errors.phone && (
                <span className="text-red-500 text-xs mt-1">{errors.phone}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-2">Your email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent border-b border-black pb-2 outline-none"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">{errors.email}</span>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-2">Your location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="bg-transparent border-b border-black pb-2 outline-none"
              />
              {errors.location && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.location}
                </span>
              )}
            </div>

            {/* BUTTON */}
            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="mt-10 bg-[#a30505] text-white px-10 py-3 tracking-widest"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="w-full h-full">
          <img
            src="/assets/images/regestration-img.png"
            className="w-full h-full object-cover"
            alt="Jewelry"
          />
        </div>
      </div>
    </section>
  );
}
