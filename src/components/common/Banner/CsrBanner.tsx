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
      img: "/assets/images/csr-banner01.jpg",       // Desktop / Tablet
      mobileImg: "/assets/images/csr-banner-mob.jpg", // Mobile Image
    },
    {
      img: "/assets/images/csr-banner02.jpg",
      mobileImg: "/assets/images/csr-banner02-mob.jpg",
    },
  ];

  return (
    <section className="w-full transition-opacity duration-500 
      h-[50vh] md:h-[40vh] lg:h-[50vh] relative">

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
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">

              {/* Desktop / Tablet Image */}
              <Image
                src={slide.img}
                alt="desktop-banner"
                fill
                className="object-cover hidden sm:block"
                priority
              />

              {/* Mobile Image */}
              <Image
                src={slide.mobileImg}
                alt="mobile-banner"
                fill
                className="object-cover block sm:hidden"
                priority
              />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
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
