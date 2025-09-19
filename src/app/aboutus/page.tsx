
import Banner from "@/components/common/Banner/Banner";
import ExperienceStats from "@/components/experiencestats/ExperienceStats";
import FreeshipingComp from "@/components/home/FreeshipingComp";
import SubscribeNewsletter from "@/components/home/SubscribeNewsletter";
import MissionVision from "@/components/missionandvision/MissionVision";
import Image from "next/image";
import React from "react";

export default function AboutUs() {
  return (

    <><>
      <Banner
      Title="About Us"
      />


    </>
    
    
    <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
    {/* Image first on mobile */}
    <div className="lg:col-span-5 order-1 lg:order-2 flex">
      <div className="w-full h-56 sm:h-72 md:h-80 lg:h-auto relative shadow-md rounded-md overflow-hidden flex-1">
        <Image
          src="/assets/images/about-img.png"
          alt="About us"
          fill
          className="object-cover rounded-md"
        />
      </div>
    </div>

    {/* Text second on mobile */}
    <div className="lg:col-span-7 order-2 lg:order-1 flex">
      <div className="flex flex-col justify-center p-4 lg:p-6 flex-1">
        <p className="text-xs sm:text-sm text-yellow-600 font-semibold uppercase mb-3">
          About Us
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-snug">
          Bindu Jewellery: A Legacy of Trust and Craftsmanship
        </h2>

        <p className="text-gray-500 leading-relaxed mb-6 text-sm sm:text-base">
          Since 1981, Bindu Jewellery has been a name synonymous with purity,
          quality, and trust. Founded by Mr. K.V. Kunhikannan, born in Pilicode
          village near Nileshwaram, Kasaragod, the journey began with his
          passion for goldsmithing and dedication to offering customers only the
          finest.
        </p>

        <p className="font-semibold text-gray-700 mb-4 text-sm sm:text-base">
          What started as a small retail showroom on Court Road, Kasaragod, soon
          grew into a trusted destination for jewellery lovers. By 1994, the
          original 200 sq. ft. showroom was expanded into a spacious 1000 sq. ft.
          store, a testament to the brand’s growing reputation.
        </p>

        <p className="font-semibold text-gray-700 mb-4 text-sm sm:text-base">
          Carrying forward their father’s vision, Mr. Abilash K.V. and Mr.
          Ajithesh K.V. joined the family business. In 2006, Bindu Jewellery
          marked a new milestone by opening a 5000 sq. ft. showroom at Ashwini
          Nagar, Kasaragod, further strengthening its legacy.
        </p>

        <p className="font-semibold text-gray-700 mb-4 text-sm sm:text-base">
          With decades of dedication, superior craftsmanship, and a commitment to
          fair pricing, Bindu Jewellery has grown from humble beginnings into one
          of the foremost jewellery brands in Kasaragod.
        </p>

        <p className="font-semibold text-gray-700 mb-4 text-sm sm:text-base">
          We believe jewellery is not just an ornament, but a timeless bond of
          trust and tradition.
        </p>

        <p className="font-semibold text-gray-700 text-sm sm:text-base">
          Visit our showrooms today and experience the Bindu Jewellery promise —
          quality you can trust, elegance you can cherish for a lifetime.
        </p>
      </div>
    </div>
  </div>
</section>

    <ExperienceStats/>
    <MissionVision/>
        <SubscribeNewsletter/>
        <FreeshipingComp/>
    </>
  );
}
