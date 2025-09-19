"use client";
import React from "react";

const Banner = () => {
  return (
    <section className="relative w-full">
      {/* Background image */}
      <img
        src="/assets/images/collections-banner.png"
        alt="Gold Collections"
        className="w-full h-[180px] sm:h-[250px] md:h-[320px] lg:h-[420px] object-cover"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Content wrapper */}
      <div className="absolute inset-0 flex flex-col justify-between container mx-auto px-4 py-4 z-20">
        {/* Breadcrumb - top left */}
        <div className="text-white text-xs sm:text-sm md:text-base">
          <a
            href="#"
            className="hover:underline hover:text-yellow-400 transition-colors"
          >
            Home
          </a>{" "}
          /{" "}
          <a
            href="#"
            className="hover:underline hover:text-yellow-400 transition-colors"
          >
            Jewellery
          </a>{" "}
          /{" "}
          <span className="text-gray-200">Gold Collections</span>
        </div>

        {/* Title - middle left */}
        <div className="flex-1 flex items-center">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Gold Collections
          </h1>
        </div>

        {/* (Optional) Bottom placeholder */}
        <div className="text-white text-sm"> {/* you can remove this div if not needed */}
          {/* Example bottom text or button */}
        </div>
      </div>
    </section>
  );
};

export default Banner;
