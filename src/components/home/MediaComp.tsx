"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper"; // ✅ Import the Swiper type
import "swiper/css";
import "swiper/css/navigation";

import MediaCard from "../common/mediacard/MediaCard";
const products = [
  { id: 1,img: "/assets/images/media01.png" },
  { id: 2,  img: "/assets/images/media01.png" },
  { id: 3,  img: "/assets/images/media01.png" },
  { id: 4, img: "/assets/images/media01.png" },
  { id: 5, img: "/assets/images/media01.png" },
  { id: 6,  img: "/assets/images/media01.png" },
];

export default function MediaComp() {

 const [loading, setLoading] = useState(true);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

// ✅ Properly typed Swiper instance
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // ✅ Safe Swiper navigation setup
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      if (swiperInstance.params.navigation && typeof swiperInstance.params.navigation !== "boolean") {
        swiperInstance.params.navigation.prevEl = prevRef.current;
        swiperInstance.params.navigation.nextEl = nextRef.current;
      }
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <section className="container ">
<div className="mx-auto  py-15">

      <h2 className="font-prata text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">Media</h2>
    <p className="text-gray-500 text-center mb-4 sm:mb-6 md:mb-10">
  Prepare To Elevate Your Sense Of Style With Our Latest Collection!
</p>
 <div className="relative">

  {/* Left Arrow */}
            <button
              ref={prevRef}
 className="w-8 h-8 absolute top-1/2 -left-1 sm:-left-4 md:-left-6 lg:-left-8 -translate-y-1/2 flex items-center justify-center border border-gray-300 text-black rounded-full bg-white hover:bg-[#d4b262] hover:text-white transition-colors z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              ref={nextRef}
              className="w-8 h-8 absolute top-1/2 -right-1 sm:-right-4 md:-right-6 lg:-right-8 -translate-y-1/2 flex items-center justify-center border border-gray-300 text-black rounded-full bg-white hover:bg-[#d4b262] hover:text-white transition-colors z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

      <Swiper
       modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={3}
       
        breakpoints={{
          320: { slidesPerView: 1, centeredSlides: true },
          640: { slidesPerView: 2, centeredSlides: false },
          1024: { slidesPerView: 3 },
        }}
         onSwiper={(swiper) => setSwiperInstance(swiper)}
        className="px-4"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center">
            <MediaCard image={item.img} // only use existing props
   />
          </SwiperSlide>
        ))}
      </Swiper>
</div>
</div>
    </section>
  );
}
