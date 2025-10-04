
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
 
    <section className=" pt-16 px-4 md:px-16 bg-white text-gray-800 ">
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
         Bindu Jewellery: A Legacy of Trust and Craftsmanship
        </h2>

        <p className="leading-relaxed mb-6 text-sm sm:text-base font-semibold text-gray-700 ">
         Since 1981, Bindu Jewellery has been a name synonymous with purity,  quality, and trust. 
         Founded by Mr. K.V. Kunhikannan, born in Pilicode  village near Nileshwaram, Kasaragod, 
         the journey began with his passion  for goldsmithing and dedication to 
         offering customers only the finest.
        </p>

        <p className="font-normal  mb-4 text-sm sm:text-base text-gray-500 ">
          What started as a small retail showroom on Court Road, Kasaragod, soon
          grew into a trusted destination for jewellery lovers. By 1994, the
          original 200 sq. ft. showroom was expanded into a spacious 1000 sq. ft.
          store, a testament to the brand’s growing reputation.
        </p>

        <p className="font-normal mb-4 text-sm sm:text-base text-gray-500 ">
          Carrying forward their father’s vision, Mr. Abilash K.V. and Mr.
          Ajithesh K.V. joined the family business. In 2006, Bindu Jewellery
          marked a new milestone by opening a 5000 sq. ft. showroom at Ashwini
          Nagar, Kasaragod, further strengthening its legacy.
        </p>

        <p className="font-normal text-gray-500 mb-4 text-sm sm:text-base">
          With decades of dedication, superior craftsmanship, and a commitment to
          fair pricing, Bindu Jewellery has grown from humble beginnings into one
          of the foremost jewellery brands in Kasaragod.
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
