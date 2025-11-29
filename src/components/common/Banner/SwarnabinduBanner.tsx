"use client";
import Image from "next/image";
import React from "react";

const SwarnaBanner = () => {
  return (
<section
  className="relative w-full min-h-[30vh] bg-[#012b3b] flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24 py-10"
  style={{
    backgroundImage: "url('/assets/images/swarna-bindu-banner.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30 z-0"></div>

  {/* FLEX WRAPPER */}
  <div className="relative z-10 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10">
    
    {/* LEFT COLUMN — FORM */}
    <div className="w-full md:w-1/3 flex justify-center md:justify-start">
      <div className="bg-[#f5f5f5] rounded-lg p-4 sm:p-6 max-w-sm w-full">
        <input
          type="text"
          placeholder="Scheme number"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-[#b8292f]"
        />

        <p className="text-center text-gray-500 font-medium mb-4">OR</p>

        <input
          type="text"
          placeholder="Mobile number"
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-2 focus:ring-[#b8292f]"
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#b8292f] hover:bg-[#991f25] text-white px-6 py-2 rounded-md font-semibold">
            Log In
          </button>

          <button
            onClick={() => {
              const section = document.getElementById("goldPurchasePlan");
              if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="bg-[#e53935] hover:bg-[#c62828] text-white px-6 py-2 rounded-md font-semibold"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>

    {/* RIGHT COLUMN — TEXT */}
    <div className="w-full md:w-1/2 text-white text-center md:text-right">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug">
        Legacy of Gold:
        <br />
        <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold">
          Investing for Generations to Come.
        </span>
      </h1>
    </div>

  </div>
</section>

  );
};

export default SwarnaBanner;
