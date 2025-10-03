"use client";

import Banner from "@/components/common/Banner/Banner";
import FreeshipingComp from "@/components/home/FreeshipingComp";
import SubscribeNewsletter from "@/components/home/SubscribeNewsletter";
import React from "react";

export default function MissionVision() {
  return (
    <>
        <>
      <Banner Title="Our Story"/>


    </>
   <section className="pt-16 px-4 md:px-16 bg-white text-gray-800">
  {/* Section Heading */}
  <div className="text-center mb-12">
    <p className="text-[#d4b262] uppercase tracking-wide font-medium">
      Our Mission And Vision
    </p>
    <h2 className="text-2xl md:text-3xl font-bold mt-2">
      Bindu Jewellery: A Legacy Of Trust And Craftsmanship
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
        At Bindu Jewellery, our mission is to craft and offer a wide range of exquisite
        gold, diamond, birthstone, and silver pieces that beautifully blend traditional
        artistry with modern design. We are dedicated to making every customer’s
        experience memorable through personalized service and meaningful creations for
        life’s special moments. Rooted in the legacy of trust since 1981, we continue
        to uphold the values of quality, integrity, and craftsmanship in everything we do.
      </p>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
        At Bindu Jewellery, our mission is to craft and offer a wide range of exquisite
        gold, diamond, birthstone, and silver pieces that beautifully blend traditional
        artistry with modern design. We are dedicated to making every customer’s
        experience memorable through personalized service and meaningful creations for
        life’s special moments. Rooted in the legacy of trust since 1981, we continue
        to uphold the values of quality, integrity, and craftsmanship in everything we do.
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
      At Bindu Jewellery, our vision is to craft and offer a wide range of exquisite
      gold, diamond, birthstone, and silver pieces that beautifully blend traditional
      artistry with modern design. We are dedicated to making every customer’s
      experience memorable through personalized service and meaningful creations for
      life’s special moments. Rooted in the legacy of trust since 1981, we continue
      to uphold the values of quality, integrity, and craftsmanship in everything we do.
    </p>
    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
      At Bindu Jewellery, our vision is to craft and offer a wide range of exquisite
      gold, diamond, birthstone, and silver pieces that beautifully blend traditional
      artistry with modern design. We are dedicated to making every customer’s
      experience memorable through personalized service and meaningful creations for
      life’s special moments. Rooted in the legacy of trust since 1981, we continue
      to uphold the values of quality, integrity, and craftsmanship in everything we do.
    </p>
  </div>
</div>

</section>

      <SubscribeNewsletter />
      <FreeshipingComp />
      </>
  );
}
