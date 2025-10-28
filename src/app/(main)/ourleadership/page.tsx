"use client";

import React from "react";
import FreeshipingComp from "@/components/home/FreeshipingComp";
import SubscribeNewsletter from "@/components/home/SubscribeNewsletter";

import LeadershipBanner from "@/components/common/Banner/LeadershipBanner";

export default function LeadershipSection() {
  return (
    <>
      <LeadershipBanner Title="Our Leadership" />

      <section className="py-16 px-4 md:px-16 bg-white text-gray-800">
  
        {/* Late K.V. Kunhikannan (Image Left) */}
        <div className="container mx-auto">
       
          <div className="md:col-span-2 md:order-2">
          
       
            <div className="text-gray-600 leading-relaxed text-sm md:text-base space-y-4 text-center">
              <p>
                The remarkable journey of Bindu Jewellery began with Late K.V. Kunhikannan, a visionary goldsmith from Pilicode near Nileshwaram, Kasaragod. Guided by honesty, dedication, and a deep love for his craft, he laid the foundation of Bindu Jewellery in 1981, starting with a modest 200 sq. ft. showroom on Court Road, Kasaragod.
              </p>
              <p>
                With his commitment to purity, fair pricing, and heartfelt service, Mr. Kunhikannan transformed Bindu Jewellery into a trusted name — not just a store, but a symbol of integrity and lasting relationships. His belief that “every ornament should carry the promise of trust” continues to inspire the brand even today.
              </p>
              <p>
                His legacy is carried forward by his sons, Mr. Abhilash K.V. and Dr. Ajithesh K.V., who have expanded his dream into new horizons, upholding his timeless vision of craftsmanship with conscience.
              </p>
            </div>
          </div>
        </div>


<div className="flex items-center justify-center my-10">
  {/* Left line */}
  <div className="flex-1 border-t border-[#7c5322] opacity-70"></div>

 <div className="mx-8 text-center">
    <h2 className="text-[#5e2d12] belgrano-regular text-2xl md:text-4xl font-semibold tracking-wider uppercase leading-tight">
      MANAGING PARTNER
    </h2>
    <h3 className="text-[#5e2d12] belgrano-regular text-2xl md:text-4xl font-semibold tracking-wider uppercase leading-tight">
      OF BINDU JEWELLERY
    </h3>
  </div>

  {/* Right line */}
  <div className="flex-1 border-t border-[#7c5322] opacity-70"></div>
</div>




        {/* Abhilash K V (Image Right) */}
<div className="relative max-w-5xl mx-auto mt-20 px-4">
  {/* Overlapping Circle Image */}
  <div className="absolute md:-top-10 md:-left-8 -top-14 left-1/2 -translate-x-1/2 md:translate-x-0 z-20">
    <img
      src="/assets/images/mp01-pic.png"
      alt="Abhilash K V"
      className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-[1px] border-[#350802] shadow-lg bg-white"
    />
  </div>

  {/* Main Box */}
  <div className="relative rounded-xl border-[1px] border-[#350802] bg-white shadow-md p-6 pt-20 md:pt-20 md:pl-56 mt-12 md:mt-0">
    {/* Text Content */}
    <p className="text-gray-700 leading-relaxed text-sm md:text-base text-center md:text-left">
      Quality is what we are most concerned about here as there is no compromise on quality.
      Our mission is to offer a unique blend of superior quality products to our customers.
      We do not carry anything that is not well made. Our job is to ensure each client is
      getting the best quality for the money they spent.
    </p>

    {/* Name + Title */}
    <div className="mt-6 text-center md:text-right">
      <h3 className="text-[#5e2d12] font-semibold text-lg md:text-2xl belgrano-regular">
        Abhilash K V
      </h3>
      <p className="text-gray-600 text-sm md:text-base">
        Managing Partner, Bindu Jewellery
      </p>
    </div>
  </div>
</div>


        {/* Ajithesh K V (Image Left) */}

<div className="relative max-w-5xl mx-auto mt-20 px-4">
  {/* Overlapping Circle Image */}
  <div className="absolute md:-top-10 md:-left-8 -top-14 left-1/2 -translate-x-1/2 md:translate-x-0 z-20">
    <img
      src="/assets/images/mp02-pic.png"
      alt="Dr. Ajithesh K V"
      className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-[1px] border-[#350802] shadow-lg bg-white"
    />
  </div>

  {/* Main Box */}
  <div className="relative rounded-xl border-[1px] border-[#350802] bg-white shadow-md p-6 pt-20 md:pt-20 md:pl-56 mt-12 md:mt-0">
    {/* Text Content */}
    <p className="text-gray-700 leading-relaxed text-sm md:text-base text-center md:text-left">
      Quality is what we are most concerned about here as there is no compromise on quality.
      Our mission is to offer a unique blend of superior quality products to our customers.
      We do not carry anything that is not well made. Our job is to ensure each client is
      getting the best quality for the money they spent.
    </p>

    {/* Name + Title */}
    <div className="mt-6 text-center md:text-right">
      <h3 className="text-[#5e2d12] font-semibold text-lg md:text-2xl belgrano-regular">
        Dr. Ajithesh K V
      </h3>
      <p className="text-gray-600 text-sm md:text-base">
        Partner, Bindu Jewellery
      </p>
    </div>
  </div>
</div>
  
      </section>

      {/* <SubscribeNewsletter />
      <FreeshipingComp /> */}
    </>
  );
}
