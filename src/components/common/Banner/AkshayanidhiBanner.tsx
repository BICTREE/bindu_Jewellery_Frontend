"use client";
import Image from "next/image";
import React from "react";

const AkshayanidhiBanner = () => {
  return (
  <section
  className="relative w-full min-h-[30vh] bg-[#012b3b] flex flex-col-reverse md:flex-row items-center justify-center md:justify-between overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24 py-10"
  style={{
    backgroundImage: "url('/assets/images/akshayanidhi-banner.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30 z-0" />

  {/* LEFT — Form */}
  <div className="relative w-full md:w-1/2 z-10 flex justify-center md:justify-start mb-10 md:mb-0">
    <div className="rounded-lg max-w-xs sm:max-w-sm md:max-w-md w-full">

      {/* Form Box */}
      <div className="bg-[#f5f5f5] rounded-lg p-4 sm:p-6 shadow-lg">
        <input
          type="text"
          placeholder="Scheme Number"
          className="w-full mb-3 sm:mb-4 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b8292f] outline-none placeholder-gray-500 text-gray-800"
        />

        <p className="text-center text-gray-500 font-medium mb-3 sm:mb-4 text-sm sm:text-base">OR</p>

        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full mb-5 sm:mb-6 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-[#b8292f] outline-none placeholder-gray-500 text-gray-800"
        />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="bg-[#b8292f] hover:bg-[#991f25] text-white px-6 py-2 rounded-md font-semibold text-sm sm:text-base">
            Log In
          </button>

          <button
            onClick={() => {
              const section = document.getElementById("goldPurchasePlan");
              if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="bg-[#e53935] hover:bg-[#c62828] text-white px-6 py-2 rounded-md font-semibold text-sm sm:text-base"
          >
            Register Now
          </button>
        </div>
      </div>

    </div>
  </div>

  {/* RIGHT — Text */}
  <div className="relative w-full md:w-1/2 text-white text-center md:text-right z-10 space-y-6 sm:space-y-8">
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-snug sm:leading-tight">
      Akshaya Nidhi
      <br />
      <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold">
        Perpetual Fund, Lifetime Promise
      </span>
    </h1>
  </div>
</section>

  );
};

export default AkshayanidhiBanner;
