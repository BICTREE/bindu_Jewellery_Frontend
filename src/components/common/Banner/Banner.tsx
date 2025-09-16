"use client";
import React from "react";

const Banner = () => {
  return (
    <section className="relative w-full">
      {/* Background image */}
      <img
        src="/assets/images/collections-banner.png" // replace with your actual image path
        alt="Gold Collections"
        className="w-full h-[180px] sm:h-[250px] md:h-[320px] lg:h-[420px] object-cover"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Breadcrumb - top aligned */}
      <div className="absolute top-0 sm:top-4 left-1/2 -translate-x-1/2  text-white text-xs sm:text-sm md:text-base backdrop:bg-black z-50">
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

      {/* Title - centered */}
      <div className="absolute inset-0 flex items-center justify-center text-white px-4 z-20">
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          Gold Collections
        </h1>
      </div>
    </section>
  );
};

export default Banner;
