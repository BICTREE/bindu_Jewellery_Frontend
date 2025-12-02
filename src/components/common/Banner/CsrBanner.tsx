"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HeroSlider() {
  const slides = [
    {
      img: "/assets/images/csr-banner01.jpg",
      mobileImg: "/assets/images/csr-banner-mob.jpg",
    },
    {
      img: "/assets/images/csr-banner02.jpg",
      mobileImg: "/assets/images/csr-banner02-mob.jpg",
    },
  ];

  return (
    <section className="w-full relative">

      <Swiper
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
          autoHeight={true} 
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* DIV height auto */}
            <div className="w-full">

              {/* Desktop / Tablet */}
              <Image
                src={slide.img}
                alt="desktop-banner"
                width={2000}
                height={900}
                className="hidden sm:block w-full h-auto"
                priority
              />

              {/* Mobile */}
              <Image
                src={slide.mobileImg}
                alt="mobile-banner"
                width={900}
                height={1200}
                className="block sm:hidden w-full h-auto"
                priority
              />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 
        bg-white/30 hover:bg-white text-black 
        p-3 rounded-full shadow-lg transition">
        ❮
      </button>

      <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 
        bg-white/30 hover:bg-white text-black 
        p-3 rounded-full shadow-lg transition">
        ❯
      </button>

    </section>
  );
}
