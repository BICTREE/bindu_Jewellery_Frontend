"use client"; // ✅ Needed for hooks in Next.js App Router

import React, { useState } from "react";
import Image from "next/image";
import Banner from "@/components/common/Banner/Banner";
import FreeshipingComp from "@/components/home/FreeshipingComp";
import SubscribeNewsletter from "@/components/home/SubscribeNewsletter";
import { SendEnquriy } from "@/services/enquriySerice/enquriySerice";


const Page = () => {
  // ✅ Form state
  const [formData, setFormData] = useState({
    type: "Contact", // default enquiry type
    name: "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error when typing
  };

  // ✅ Simple validation
  const validate = () => {
     const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
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
    if (!formData.subject.trim()) newErrors.subject = "Please select a subject";
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
      const res = await SendEnquriy(formData);
      setSuccessMsg("Your enquiry has been submitted successfully ✅");
      setFormData({
        type: "Contact",
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
    }  catch (err: unknown) {
    console.error("Enquiry submit error:", err);

    if (err instanceof Error) {
      setErrors({ api: err.message });
    } else if (typeof err === "object" && err !== null && "response" in err) {
      setErrors({
        api:
          (err as { response?: { data?: { message?: string } } }).response?.data
            ?.message || "Failed to send enquiry. Try again.",
      });
    } else {
      setErrors({ api: "Failed to send enquiry. Try again." });
    }
  }  finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Banner Title="Contact Us" />

    
  

      {/* Form + Contact Info + Images */}
   <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
  {/* Heading */}
  <div className="py-5">
    <h2 className="text-sm sm:text-base font-semibold text-[#d4b262] uppercase mb-3">
      Contact Us
    </h2>
    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
      Please do not hesitate to{" "}
      <a
        href="/contact"
        className="text-[#d4b262] underline hover:text-amber-700"
      >
        Reach Out To Us
      </a>{" "}
      for any queries or feedback. We are here to create effective solutions for your
      concerns. Kindly fill out the form below, and one of our representatives will get back
      to you.
    </p>
  </div>

  {/* Grid Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
    {/* Contact Form - smaller */}
    <div className="lg:col-span-5">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-500 py-2"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-500 py-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          placeholder="Mobile No:"
          onChange={handleChange}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-500 py-2"
        />
        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}

        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-500 py-2"
        >
          <option value="">Select Subject</option>
          <option value="order">Order Related</option>
          <option value="product">Product Related</option>
          <option value="service">Service Related</option>
          <option value="general">General Enquiry</option>
        </select>
        {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}

        <textarea
          name="message"
          value={formData.message}
          placeholder="Message"
          rows={5}
          onChange={handleChange}
          className="w-full border border-gray-300 focus:outline-none focus:border-yellow-500 p-2"
        ></textarea>
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

        {errors.api && <p className="text-red-500 text-sm">{errors.api}</p>}
        {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-800 text-white py-3 font-semibold tracking-wider hover:bg-gray-900 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "SUBMIT"}
        </button>
      </form>
    </div>

    {/* Address Section - bigger */}
    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12">
      {[
        {
          title: "Kasaragod",
          address: `Bindu Jewellery
NH-17, Ashwini Nagar,
Kasaragod, Kerala - 671121`,
          Mob: "Mob:+91 98 470 20 400",
          tel: "Tel:+91 499 4256 888",
        },
        {
          title: "CUSTOMER CARE",
          address: `Email: bindujewellery916@gmail.com`,
          tel: "Tel:+91 499 4256 888",
        },
        {
          title: "Sullia",
          address: `Bindu Jewellery,
Opposite Police Station, Sullia-574239`,
          tel: "Tel: +91 4994256888",
          Email: "Email:bindujewellerymangalore@gmail.com",
        },
        {
          title: "Mangaluru",
          address: `Bindu Jewellery,
Near SCS Hospital, Bendoor`,
          tel: "Tel: +91 499 4256 888",
          Email: "Email:bindujewellerymangalore@gmail.com",
        },
      ].map((item, i) => (
        <div key={i} className="pt-4">
          <h3 className="text-lg font-semibold text-[#d4b262] mb-2 uppercase">
            {item.title}
          </h3>
          <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
            {item.address}
          </p>
          {item.tel && (
            <p className="text-gray-700 text-sm leading-relaxed mt-1">{item.tel}</p>
          )}
          {item.Mob && (
            <p className="text-gray-700 text-sm leading-relaxed mt-1">{item.Mob}</p>
          )}
          {item.Email && (
            <p className="text-gray-700 text-sm leading-relaxed">{item.Email}</p>
          )}
        </div>
      ))}
    </div>
  </div>
</section>


      <SubscribeNewsletter />
      <FreeshipingComp />
    </>
  );
};

export default Page;