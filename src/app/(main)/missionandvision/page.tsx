"use client";

import Banner from "@/components/common/Banner/Banner";
import FreeshipingComp from "@/components/home/FreeshipingComp";
import SubscribeNewsletter from "@/components/home/SubscribeNewsletter";
import React from "react";

export default function MissionVision() {
  return (
    <>
        <>
      <Banner Title="Mission And Vision"/>


    </>
   <section className="pt-16 px-4 md:px-16 bg-white text-gray-800">
  {/* Section Heading */}
  <div className="text-center mb-12">
    <p className="text-[#d4b262] uppercase tracking-wide font-medium">
      Our Mission And Vision
    </p>
    <h2 className="text-2xl md:text-3xl font-bold mt-2">
     Our Motto: “A Promise of a Lifetime.
    </h2>
  </div>

  {/* Mission */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
    {/* Image */}
    <div className="flex justify-center">
      <img
        src="/assets/images/mission.png"
        alt="Our Mission"
        className="w-full max-w-lg h-[220px] sm:h-[280px] md:h-[350px] lg:h-[410px] object-cover rounded-lg shadow-lg"
      />
    </div>
    {/* Text */}
    <div>
      <h3 className="text-lg md:text-xl font-semibold mb-4">Our Mission</h3>
      <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
     At Bindu Jewellery, our mission is to create jewellery 
     that goes beyond aesthetics — pieces that carry emotion, 
     meaning, and memories. Each creation we design is a tribute to 
     the artistry of our ancestors and the evolving tastes of today’s 
     generation. We believe that jewellery should not only enhance one’s 
     beauty but also tell a story — a story of family, tradition, and love. 
     Through our collections in gold, diamonds, silver, and birthstones, 
     we strive to bring together the authentic charm of heritage and the 
     innovation of modern craftsmanship.
</p>
<p>We are dedicated to building an experience rooted in trust, 
  transparency, and heartfelt connection. From the purity of every
   metal to the intricacy of every design, our mission is to uphold 
   the highest standards of quality and ethics. Each Bindu customer 
   is treated as family — valued, respected, and cared for with warmth. 
   Because when you choose Bindu, you are not just purchasing 
   jewellery; you are becoming part of a 40-year legacy of honesty and craftsmanship.
</p>

    </div>
  </div>

  {/* Vision */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
  {/* Image (mobile first, desktop second) */}
  <div className="flex justify-center order-1 md:order-2">
    <img
      src="/assets/images/vision.png"
      alt="Our Vision"
      className="w-full max-w-lg h-[220px] sm:h-[280px] md:h-[350px] lg:h-[410px] object-cover rounded-lg shadow-lg"
    />
  </div>

  {/* Text (mobile second, desktop first) */}
  <div className="order-2 md:order-1">
    <h3 className="text-lg md:text-xl font-semibold mb-4">Our Vision</h3>
    <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
   Bindu Jewellery envisions becoming Southern India’s most trusted 
   family jeweller, known for both its traditional excellence and 
   innovative spirit. We aspire to preserve our timeless artistry 
   while expanding our reach — building meaningful relationships 
   with customers, empowering local artisans, and continuously 
   raising the bar in purity and design.
    </p>

    <p>Our vision extends beyond commerce — we see jewellery as a bridge between 
      generations, a keepsake that carries emotions and blessings. 
      As we step into the future, we aim to blend classic craftsmanship with 
      contemporary elegance, creating pieces that inspire pride and confidence. 
      Bindu Jewellery will continue to shine as a beacon of trust, elegance, 
      and Indian heritage — forever keeping alive the golden spirit that began in 1981.</p>
   
  </div>
</div>

</section>

      <SubscribeNewsletter />
      <FreeshipingComp />
      </>
  );
}
