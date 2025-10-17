"use client";
import React from "react";

const ExperienceSection = () => {
  return (
      <section
      className="relative w-full overflow-hidden flex items-center md:items-start bg-[#f8f4ef] 
                 min-h-[600px] sm:min-h-[700px] md:min-h-[90vh]"
    >
      {/* ✅ Background Images */}

      {/* Mobile background (<640px) */}
      <div className="absolute inset-0 sm:hidden">
        <img
          src="/assets/images/ourstory-bgimage-mob.png"
          alt="Mobile Background"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Tablet background (640px–1023px) */}
      <div className="absolute inset-0 hidden sm:block lg:hidden">
        <img
          src="/assets/images/ourstory-bgimage-tab.png"
          alt="Tablet Background"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Desktop background (≥1024px) */}
      <div className="absolute inset-0 hidden lg:block">
        <img
          src="/assets/images/ourstory-bgimage.png"
          alt="Desktop Background"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* ✅ Optional soft overlay */}
      {/* <div className="absolute inset-0 bg-[#f8f4ef]/70 md:bg-transparent z-10"></div> */}

      {/* ✅ Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-8 lg:px-0 
                      py-10 md:py-10 flex flex-col md:flex-row items-center 
                      justify-between gap-10 md:gap-16">
        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2 max-w-2xl text-center md:text-left space-y-5 md:px-8 lg:px-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-[#3c1e1e] leading-snug">
            Our Experience Allows <br className="hidden sm:block" /> To Bring{" "}
            <span className="font-bold">Disruptive</span>
          </h2>

          <p className="text-[#4b2a2a] text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
            Carrying forward their father’s vision, Mr. Abilash K.V. and Mr.
            Ajithesh K.V. joined the family business. In 2006, Bindu Jewellery
            marked a new milestone by opening a 5000 sq. ft. showroom at
            Ashwini Nagar, Kasaragod, further strengthening its legacy.
          </p>

          {/* ✅ Stats */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 pt-4">
            <div className="flex flex-col items-center bg-[#d9d0bf] px-4 sm:px-6 py-3 rounded-md">
              <span className="text-xl sm:text-2xl font-bold text-[#3c1e1e]">
                4K+
              </span>
              <span className="text-xs sm:text-sm text-[#4b2a2a]">
                Happy Customers
              </span>
            </div>

            <div className="flex flex-col items-center bg-[#d9d0bf] px-4 sm:px-6 py-3 rounded-md">
              <span className="text-xl sm:text-2xl font-bold text-[#3c1e1e]">
                3K+
              </span>
              <span className="text-xs sm:text-sm text-[#4b2a2a]">
                Trending Collections
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
