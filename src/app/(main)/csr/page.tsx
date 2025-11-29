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
      img: "/assets/images/mission-banner.jpg",
      // title: "Timeless Craftsmanship",
      // subtitle: "Discover beautiful jewellery crafted with perfection.",
    },
    {
      img: "/assets/images/banner2.jpg",
      // title: "Elegance Redefined",
      // subtitle: "Celebrate your special moments with us.",
    },
 
  ];

  return (
    <section className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px]">

      <Swiper
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Background Image */}
            <div className="relative w-full h-full">
              <Image
                src={slide.img}
                alt={slide.img}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Text Content */}
              {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-wide drop-shadow-lg">
                  {slide.title}
                </h2>

                <p className="text-white text-sm sm:text-lg md:text-xl mt-3 max-w-2xl drop-shadow-md">
                  {slide.subtitle}
                </p>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}
