"use client";

import React from "react";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden">

      {/* Background Image */}
      <Image
        src="/assets/images/hero.jpg"
        alt="Hero Banner"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-wide">
          Discover Timeless Elegance
        </h1>

        <p className="text-white text-base sm:text-lg md:text-xl mt-3 max-w-xl">
          Experience craftsmanship and luxury that define every moment.
        </p>

        <button className="mt-6 px-6 py-3 bg-[#d4b262] text-black rounded-md text-sm sm:text-base font-semibold hover:bg-[#c3a050] transition-all">
          Explore Collection
        </button>
      </div>
    </section>
  );
}
