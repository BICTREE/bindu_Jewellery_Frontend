"use client";
import Image from "next/image";

import MissionVishonBanner from "@/components/common/Banner/MissionVishonBanner";
import FreeshipingComp from "@/components/home/FreeshipingComp";
import SubscribeNewsletter from "@/components/home/SubscribeNewsletter";
import React from "react";

export default function MissionVision() {
  return (
  
        <>
      <MissionVishonBanner/>


  
<section className="w-full pt-15 bg-white">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">

    {/* LEFT SIDE – ONE FULL IMAGE */}
    <div className="flex justify-center md:justify-start">
      <Image
        src="/assets/images/mission-image.png" // <-- replace with your full left-side image
        alt="Mission Vision Banner"
        width={500}
        height={700}
        className="w-full h-auto object-contain"
      />
    </div>

    {/* RIGHT SIDE – MISSION + VISION TEXT */}
    <div>
      {/* Mission */}
      <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        At Bindu Jewellery, our mission is to create jewellery that goes beyond
        aesthetics — pieces that carry emotion, meaning, and memories. Each creation
        we design is a tribute to the artistry of our ancestors and the evolving
        tastes of today’s generation. We believe that jewellery should not only
        enhance one’s beauty but also tell a story — a story of family, tradition,
        and love. Through our collections in gold, diamonds, silver, and birthstones,
        we strive to bring together the authentic charm of heritage and the
        innovation of modern craftsmanship.
      </p>

      <p className="text-gray-700 leading-relaxed mb-10">
        We are dedicated to building an experience rooted in trust, transparency,
        and heartfelt connection. From the purity of every metal to the intricacy
        of every design, our mission is to uphold the highest standards of quality
        and ethics. Each Bindu customer is treated as family — valued, respected,
        and cared for with warmth. Because when you choose Bindu, you are not just
        purchasing jewellery; you are becoming part of a 40-year legacy of honesty
        and craftsmanship.
      </p>

      {/* Vision */}
      <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Bindu Jewellery envisions becoming Southern India’s most trusted family
        jeweller, known for both its traditional excellence and innovative spirit.
        We aspire to preserve our timeless artistry while expanding our reach —
        building meaningful relationships with customers, empowering local artisans,
        and continuously raising the bar in purity and design.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Our vision extends beyond commerce — we see jewellery as a bridge between
        generations, a keepsake that carries emotions and blessings. As we step
        into the future, we aim to blend classic craftsmanship with contemporary
        elegance, creating pieces that inspire pride and confidence. Bindu Jewellery
        will continue to shine as a beacon of trust, elegance, and Indian heritage —
        forever keeping alive the golden spirit that began in 1981.
      </p>
    </div>
  </div>
</section>


      <SubscribeNewsletter />
      <FreeshipingComp />
      </>
      
  );
}
