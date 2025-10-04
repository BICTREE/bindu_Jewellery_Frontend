"use client";

import React from "react";

export default function ExperienceSection() {
  return (
    <section className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Content - Centered Vertically */}
        <div className="flex items-center px-6 md:px-16 py-12 md:py-0">
          <div>
            <h2 className="text-4xl md:text-5xl font-normal leading-tight">
              Our Experience Allows <br /> To Bring Disruptive
            </h2>

            <p className="text-gray-300 mt-6 text-sm leading-relaxed">
              Carrying Forward Their Father’s Vision, Mr. Abilash K.V. And Mr.
              Ajithesh K.V. Joined The Family Business. In 2006, Bindu Jewellery
              Marked A New Milestone By Opening A 5000 Sq. Ft. Showroom At
              Ashwini Nagar, Kasaragod, Further Strengthening Its Legacy.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              <div className="flex items-center gap-3">
                <div className="bg-[#d4b262] px-6 py-4 rounded-lg">
                  <span className="text-2xl font-bold text-black">4k+</span>
                </div>
                <span className="font-medium">Happy Customer</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#d4b262] px-6 py-4 rounded-lg">
                  <span className="text-2xl font-bold text-black">4k+</span>
                </div>
                <span className="font-medium">Trending Collections</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image - FULL HEIGHT, NO GAP */}
        <div className="w-full h-full">
          <img
            src="/assets/images/ourex.png" // replace with your correct path
            alt="Gold Necklace"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
