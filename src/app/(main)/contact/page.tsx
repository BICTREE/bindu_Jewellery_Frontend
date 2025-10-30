"use client"; // ✅ Needed for hooks in Next.js App Router

import React, { useState } from "react";
import Banner from "@/components/common/Banner/ContactBanner";
import FreeshipingComp from "@/components/home/FreeshipingComp";
import SubscribeNewsletter from "@/components/home/SubscribeNewsletter";
import { SendEnquriy } from "@/services/enquriySerice/enquriySerice";

const Page = () => {
  // ✅ Form state
  const [formData, setFormData] = useState({
    type: "Contact",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ Simple validation
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    if (!validate()) return;

    try {
      setLoading(true);

      // Combine full name before sending
      const payload = {
        type: formData.type,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        mobile: formData.mobile,
        subject: formData.subject,
        message: formData.message,
      };

      await SendEnquriy(payload);

      setSuccessMsg("Your enquiry has been submitted successfully ✅");
      setFormData({
        type: "Contact",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
    } catch (err: any) {
      console.error("Enquiry submit error:", err);
      setErrors({
        api:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to send enquiry. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Banner Title="Contact Us" />

      {/* Form Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-20 py-16 text-center">
        <p className="text-gray-500 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Please do not hesitate to reach out to us for any queries or feedback. We are here to
          create effective solutions for any of your concerns. Kindly fill out the form below, and
          one of our representatives will get back to you.
        </p>

        <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#0f0f0f] mt-8 mb-12">
          CONTACT US
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Enter First Name"
              onChange={handleChange}
              className="w-full border border-[#f1c5a0] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#d4b262]"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Enter Last Name"
              onChange={handleChange}
              className="w-full border border-[#f1c5a0] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#d4b262]"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              placeholder="Enter Mobile Number"
              onChange={handleChange}
              className="w-full border border-[#f1c5a0] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#d4b262]"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Id</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter Email Id"
              onChange={handleChange}
              className="w-full border border-[#f1c5a0] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#d4b262]"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              placeholder="Enter Subject"
              onChange={handleChange}
              className="w-full border border-[#f1c5a0] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#d4b262]"
            />
            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
          </div>

          {/* Message */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              placeholder="Enter Message"
              rows={1}
              onChange={handleChange}
              className="w-full border border-[#f1c5a0] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#d4b262]"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* API or Success Message */}
          {errors.api && <p className="text-red-500 text-sm col-span-2">{errors.api}</p>}
          {successMsg && <p className="text-green-600 text-sm col-span-2">{successMsg}</p>}

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#b8292f] hover:bg-[#991f25] text-white font-semibold px-10 py-3 rounded-md tracking-wide transition-all disabled:opacity-60"
            >
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </section>
<section className="bg-white py-12 px-4 sm:px-6 md:px-12 lg:px-20 text-center">
  {/* Customer Care Section */}
  <div className="mb-12">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-[#0f0f0f] tracking-wide mb-4">
      CUSTOMER CARE
    </h2>

    <p className="text-base sm:text-lg md:text-2xl font-serif font-normal leading-relaxed">
      Email :{" "}
      <a
        href="mailto:bindujewellery916@gmail.com"
        className="text-[#000] hover:underline break-words"
      >
        bindujewellery916@gmail.com
      </a>
    </p>

    <p className="text-base sm:text-lg md:text-2xl font-serif font-normal leading-relaxed mt-1">
      Tel :{" "}
      <a href="tel:+914994256888" className="text-[#000] hover:underline">
        +91 4994256888
      </a>
    </p>
  </div>

  {/* Branches Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 text-left max-w-5xl mx-auto">
    {/* SULLIA */}
    <div className="space-y-2">
      <h3 className="text-[#d4b262] font-semibold text-lg sm:text-xl mb-2">
        SULLIA
      </h3>
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
        Opposite Police Station, Sullia-574239
      </p>
      <p className="text-gray-700 text-sm sm:text-base">
        Tel:{" "}
        <a href="tel:+914994256888" className="hover:underline">
          +91 4994256888
        </a>
      </p>
      <p className="text-gray-700 text-sm sm:text-base">
        Email:{" "}
        <a
          href="mailto:bindujewellerymangalore@gmail.com"
          className="hover:underline"
        >
          bindujewellerymangalore@gmail.com
        </a>
      </p>
    </div>

    {/* MANGALURU */}
    <div className="space-y-2">
      <h3 className="text-[#d4b262] font-semibold text-lg sm:text-xl mb-2">
        MANGALURU
      </h3>
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
        Near SCS Hospital, Bendore
      </p>
      <p className="text-gray-700 text-sm sm:text-base">
        Tel:{" "}
        <a href="tel:+914994256888" className="hover:underline">
          +91 499 4256 888
        </a>
      </p>
      <p className="text-gray-700 text-sm sm:text-base">
        Email:{" "}
        <a
          href="mailto:bindujewellerymangalore@gmail.com"
          className="hover:underline"
        >
          bindujewellerymangalore@gmail.com
        </a>
      </p>
    </div>

    {/* KASARAGOD */}
    <div className="space-y-2">
      <h3 className="text-[#d4b262] font-semibold text-lg sm:text-xl mb-2">
        KASARAGOD
      </h3>
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
        NH-17, Ashwini Nagar, Kasaragod 671121
      </p>
      <p className="text-gray-700 text-sm sm:text-base">
        Tel:{" "}
        <a href="tel:+914994256888" className="hover:underline">
          +91 499 4256 888
        </a>
      </p>
      <p className="text-gray-700 text-sm sm:text-base">
        Mob:{" "}
        <a href="tel:+919847020400" className="hover:underline">
          +91 98 470 20 400
        </a>
      </p>
    </div>
  </div>
</section>


      <SubscribeNewsletter />
      <FreeshipingComp />
    </>
  );
};

export default Page;
