"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const diamondShapes = [
  { name: "Round", img: "/assets/images/round.png" },
  { name: "Oval", img: "/assets/images/oval.png" },
  { name: "Cushion", img: "/assets/images/cushion.png" },
  { name: "Princess", img: "/assets/images/Princess.png" },
  { name: "Pear", img: "/assets/images/pear.png" },
  { name: "Emerald", img: "/assets/images/Emerald.png" },
  { name: "Marquise", img: "/assets/images/Marquise.png" },
  { name: "Heart", img: "/assets/images/heart.png" },
];

const DiamondShapesSlider = () => {
  return (
    <section className="bg-[#f7f8fc] py-12">
      <div className="text-center mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800">
          Love Shines in All Shapes. Shop Diamond Jewelry by Shapes
        </h2>
      </div>

      <div className="container mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
    320: { slidesPerView: 3, spaceBetween: 10 },  // small mobiles
    480: { slidesPerView: 4, spaceBetween: 15 },  // larger mobiles
    640: { slidesPerView:5, spaceBetween: 15 },  // small tablets
    768: { slidesPerView: 6, spaceBetween: 20 },  // tablets
    1024: { slidesPerView: 8, spaceBetween: 25 }, // desktop
  }}
          className="pb-10"
        >
          {diamondShapes.map((shape, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center text-center">
                <img
                  src={shape.img}
                  alt={shape.name}
                  className="w-20 h-20 object-contain mb-2 hover:scale-110 transition-transform duration-300"
                />
                <p className="text-sm font-medium text-gray-700">{shape.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DiamondShapesSlider;
