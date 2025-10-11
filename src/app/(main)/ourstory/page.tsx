
import Banner from "@/components/common/Banner/Banner";

import FreeshipingComp from "@/components/home/FreeshipingComp";
import SubscribeNewsletter from "@/components/home/SubscribeNewsletter";
import OurBranch from "@/components/ourbranch/OurBranch";
import OurExperience from "@/components/ourexperience/OurExperience";

import Image from "next/image";
import React from "react";

export default function OurStory() {
  return (

    <>
    <>
      <Banner Title="Our Story"/>


    </>
 
    <section className=" py-16 px-4 md:px-16 bg-white text-gray-800 ">
      <div className="container mx-auto  ">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
    {/* Image first on mobile */}
    <div className="lg:col-span-5 order-1 lg:order-1 flex">
      <div className="w-full h-56 sm:h-72 md:h-80 lg:h-auto relative shadow-md rounded-md overflow-hidden flex-1">
        <Image src="/assets/images/about-img.png" alt="About us" fill className="object-cover rounded-md" />
      </div>
    </div>

    {/* Text second on mobile */}
    <div className="lg:col-span-7 order-1 lg:order-1 flex">
      <div className="flex flex-col justify-center p-4 lg:p-6 flex-1">
        <p className="text-xs sm:text-sm text-[#d4b262] font-semibold uppercase mb-3">
    Our Story
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-snug">
       Bindu Jewellery – A Promise of Lifetime
        </h2>
<h3 className="text-[22px] sm:text-sm md:text-base lg:text-lg text-[#d4b262] font-semibold">Celebrating 40 Years of Legacy, Trust, and Timeless Craftsmanship
</h3>
        <p className="leading-relaxed mb-6 text-sm sm:text-base font-semibold text-gray-700 ">
      For over four decades, <b>Bindu Jewellery</b> has been more than a brand — it has
       been an emotion, a symbol of purity, and a reflection of 
       lifelong relationships built on trust. Established in 1981, 
       Bindu has grown from a humble beginning into one of the most 
       admired and respected jewellery houses in Southern India. Every
        ornament crafted at Bindu carries not just beauty and brilliance, 
        but a soul — a promise of timeless elegance and unwavering integrity.

        </p>

        <p className="font-normal  mb-4 text-sm sm:text-base text-gray-500 ">
      Across generations, families have celebrated their most special 
      moments with Bindu Jewellery — weddings, anniversaries, festivals, 
      and milestones. What began as a small family venture has evolved into 
      a heritage brand known for <b>quality, transparency, 
      and craftsmanship.</b> Even today, every Bindu creation is
       made with the same passion and sincerity that marked 
       our very first piece of jewellery — because for us, every
       design is more than gold and stones; it’s a <b>promise of lifetime.</b>

        </p>

        <p className="font-normal mb-4 text-sm sm:text-base text-gray-500 ">
         Today, over 40 years later, Bindu Jewellery is a trusted family jeweller across Kerala and
Karnataka, renowned for exceptional craftsmanship, fair pricing, and a promise that lasts a
lifetime. Every piece tells a story—of tradition, artistry, and the bond between our family and
yours.
        </p>

     

 
      </div>
    </div>
  </div>
  </div>
</section>

<OurExperience/>
<OurBranch/>
<SubscribeNewsletter/>
<FreeshipingComp/>
    </>
  );
}
