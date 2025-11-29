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
      title: "Timeless Craftsmanship",
      subtitle: "Discover beautiful jewellery crafted with perfection.",
    },
    {
      img: "/assets/images/csr-banner02.jpg",
      title: "Elegance Redefined",
      subtitle: "Celebrate your special moments with us.",
    },
  ];

  return (
    <section className="relative w-full h-[50vh] md:h-[40vh] lg:h-[45vh]">
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
            <div className="relative w-full h-full">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay */}
              <div className="absolute inset-0"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                {/* <h2 className="text-white text-xl sm:text-3xl md:text-4xl font-serif font-bold tracking-wide drop-shadow-lg">
                  {slide.title}
                </h2>

                <p className="text-white text-sm sm:text-lg md:text-xl mt-2 max-w-xl drop-shadow-md">
                  {slide.subtitle}
                </p> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
