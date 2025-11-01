"use client";
import React from "react";
import Image from "next/image";
import CsrBanner from "@/components/common/Banner/CsrBanner";
import StoriesOfChange from "@/components/storychange/StoryChange";
const CSRPage = () => {
  return (
   
      <><CsrBanner/>
      
    <section className="bg-white text-center pt-15 px-10">
      {/* 🖼️ Row 1: Banner Image */}
      <div className="w-full">
        <img
          src="/assets/images/csr-logo-new.jpg"
          alt="Swarna Bindu Banner"
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* ✨ Row 2: Description */}
      <div className="max-w-5xl mx-auto py-10 px-6">
        <p className="text-[#111111] text-base md:text-lg leading-relaxed font-serif">
          At the heart of Bindu Jewellery lies a strong belief that true
          prosperity is shared prosperity. As a brand that has grown from
          community roots, we remain deeply committed to giving back through
          meaningful social impact. Our flagship CSR initiative,{" "}
          <span className="font-semibold text-[#5b0000]">“Swarna Bindu,”</span>{" "}
          is dedicated to empowering women through skill development, education,
          and entrepreneurship — helping them transform their potential into
          power.
        </p>
      </div>
    </section>

  <section className=" bg-white text-center">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#143a76] mb-10">
        Our Programs
      </h2>

      {/* 3 Column Image Strip */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 px-0  rounded-lg shadow-md">
        {/* Card 1 */}
        <div className="relative group overflow-hidden">
          <img
            src="/assets/images/skill.jpg"
            alt="Skills & Employability"
            className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-white text-xl font-medium">
              Skills & Employability
            </h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative group overflow-hidden">
          <img
            src="/assets/images/education.jpg"
            alt="Education"
            className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-white text-xl font-medium">Education</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative group overflow-hidden">
          <img
            src="/assets/images/livelihood.jpg"
            alt="Livelihood"
            className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-white text-xl font-medium">Livelihood</h3>
          </div>
        </div>
      </div>
    </section>
        <section className="bg-white text-center">
    
      {/* ✨ Row 2: Description */}
      <div className="max-w-5xl mx-auto py-10">
        <p className="text-[#111111] text-base md:text-lg leading-relaxed font-serif">
          At the heart of Bindu Jewellery lies a strong belief that true
          prosperity is shared prosperity. As a brand that has grown from
          community roots, we remain deeply committed to giving back through
          meaningful social impact. Our flagship CSR initiative,{" "}
          <span className="font-semibold text-[#5b0000]">“Swarna Bindu,”</span>{" "}
          is dedicated to empowering women through skill development, education,
          and entrepreneurship — helping them transform their potential into
          power.
        </p>
      </div>
    </section>


      <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6">
        
        {/* Right Side (Now comes first on mobile) */}
        <div className="order-1 md:order-2 grid grid-cols-2 grid-rows-2">
          <div className="bg-[#6a9300] text-white flex flex-col items-center justify-center p-8">
            <h3 className="text-4xl font-bold">300+</h3>
            <p className="text-lg mt-1">Workshops</p>
          </div>

          <div className="bg-[#fff6d9] text-black flex flex-col items-center justify-center p-8">
            <h3 className="text-4xl font-extrabold">6000+</h3>
            <p className="text-lg mt-1 text-center">
              Educate <br /> women & children
            </p>
          </div>

          <div className="bg-[#fff6d9]"></div>

          <div className="bg-[#6a9300] text-white flex flex-col items-center justify-center p-8">
            <h3 className="text-4xl font-bold">100+</h3>
            <p className="text-lg mt-1 text-center">Mentorship Programmes</p>
          </div>
        </div>

        {/* Left Side (Now comes second on mobile) */}
        <div className="order-2 md:order-1 space-y-6 text-center md:text-left">
          <h2 className="text-[42px] md:text-[48px] font-serif font-semibold text-[#1a1a1a] leading-tight">
            Our Impact
          </h2>

          <p className="text-[20px] md:text-[22px] font-serif text-gray-800 leading-relaxed max-w-xl mx-auto md:mx-0">
            Discover the lasting change brings to{" "}
            <span className="font-semibold text-[#1a1a1a]">SWARNA BINDU CSR</span> initiatives.
          </p>

          <button className="inline-flex items-center gap-2 bg-[#6a9300] hover:bg-[#557800] text-white text-lg font-medium px-8 py-3 rounded-sm transition-all shadow-sm">
            View
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>

      </div>
    </section>
<StoriesOfChange/>
      </>
  );
};

export default CSRPage;
