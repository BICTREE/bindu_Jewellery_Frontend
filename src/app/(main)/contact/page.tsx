"use client"; // ✅ Needed for hooks in Next.js App Router

import React, { useState } from "react";
import Banner from "@/components/common/Banner/Banner";
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
      <Banner Title=" " />

      {/* Form Section */}
      <section className=" bg-white text-center pt-10 md:pt-15 px-10 m-0 py-0">
        <div className="container">
        <p className="font-normal mb-4 text-sm sm:text-base text-gray-500 text-justify sm:text-center">
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
        </div>
      </section>
 

<section className="bg-white  px-4 sm:px-6 md:px-12 lg:px-20 text-center  pt-10 md:pt-15">

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

  {/* Branches + Images Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto text-left">

    {/* SULLIA */}
    <div className="space-y-4">
    {/* Image */}
      <img
        src="/assets/images/showroom-sullia.jpg"
        alt="Sullia Showroom"
        className="w-full h-56 object-cover rounded-lg shadow-md"
      />
      {/* Address */}
      <div className="space-y-1">
        <h3 className="text-[#d4b262] font-semibold text-lg sm:text-xl">SULLIA</h3>
        <p className="text-gray-700 text-sm sm:text-base">Opposite Police Station, Sullia-574239</p>
        <p className="text-gray-700 text-sm sm:text-base">
          Tel: <a href="tel:+914994256888" className="hover:underline">+91 4994256888</a>
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          Email:{" "}
          <a href="mailto:bindujewellerymangalore@gmail.com" className="hover:underline">
            bindujewellerymangalore@gmail.com
          </a>
        </p>
        <p> 
         <a
      href="https://www.google.com/maps/place/Bindu+Jewellery/@12.5562227,75.3928205,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba4f333278f6ef3:0x2117b4bb08dc43e1!8m2!3d12.5562227!4d75.3928205!16s%2Fg%2F11vz00v1s8?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#d4b262] font-medium hover:underline"
    >
      View Map
    </a>  
</p>
      </div>

  
    </div>

    {/* MANGALURU */}
    <div className="space-y-4">

      <img
        src="/assets/images/showrooms-mangalore.jpg"
        alt="Mangaluru Showroom"
        className="w-full h-56 object-cover rounded-lg shadow-md"
      />
<div className="space-y-1">
        <h3 className="text-[#d4b262] font-semibold text-lg sm:text-xl">MANGALURU</h3>
        <p className="text-gray-700 text-sm sm:text-base">Near SCS Hospital, Bendore</p>
        <p className="text-gray-700 text-sm sm:text-base">
          Tel: <a href="tel:+914994256888" className="hover:underline">+91 499 4256 888</a>
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          Email:{" "}
          <a href="mailto:bindujewellerymangalore@gmail.com" className="hover:underline">
            bindujewellerymangalore@gmail.com
          </a>
        </p>
          <p> 
             <a
      href="https://www.google.com/maps/place/Bindu+Jewellery+Mangaluru/@12.8747612,74.8548526,3a,75y,263.36h,90t/data=!3m7!1e1!3m5!1sLP1kLAN6tdO9l3WLd6JzoQ!2e0!6shttps:%252F%252Fstreetviewpixels-pa.googleapis.com%252Fv1%252Fthumbnail%253Fcb_client%253Dmaps_sv.tactile%2526w%253D900%2526h%253D600%2526pitch%253D0%2526panoid%253DLP1kLAN6tdO9l3WLd6JzoQ%2526yaw%253D263.35613022300447!7i16384!8i8192!4m7!3m6!1s0x3ba35b4f3450977d:0x2363edbc45cc65f8!8m2!3d12.8743557!4d74.8552663!10e5!16s%252Fg%252F11xst4p8fr?entry=ttu"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#d4b262] font-medium hover:underline"
    >
      View Map
    </a>  
</p>

      </div>

    </div>

    {/* KASARAGOD */}
    <div className="space-y-4">


         <img
        src="/assets/images/showroom-kasaragod.jpg"
        alt="Kasaragod Showroom"
        className="w-full h-56 object-cover rounded-lg shadow-md"
      />
      <div className="space-y-1">
        <h3 className="text-[#d4b262] font-semibold text-lg sm:text-xl">KASARAGOD</h3>
        <p className="text-gray-700 text-sm sm:text-base">NH-17, Ashwini Nagar, Kasaragod 671121</p>
        <p className="text-gray-700 text-sm sm:text-base">
          Tel: <a href="tel:+914994256888" className="hover:underline">+91 499 4256 888</a>
        </p>
        <p className="text-gray-700 text-sm sm:text-base">
          Mob: <a href="tel:+919847020400" className="hover:underline">+91 98 470 20 400</a>
        </p>
               <p> 
         <a
      href="https://www.google.com/maps/place/Bindu+Jewellery+Kasaragod/@12.5074775,74.9872164,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba482679f7c5add:0x6b6cc6fbf2733c18!8m2!3d12.5074723!4d74.9897913!16s%2Fg%2F1tjt0c6v?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#d4b262] font-medium hover:underline"
    >
      View Map
    </a>  
</p>
      </div>

   
    </div>

  </div>
</section>



      <SubscribeNewsletter />
      <FreeshipingComp />
    </>
  );
};

export default Page;
