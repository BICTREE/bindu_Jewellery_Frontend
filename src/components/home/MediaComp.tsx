"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
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
  return (
    <section className="container ">
<div className="mx-auto   pt-7 sm:pt-8 md:pt-13 lg:pt-15">

      <h2 className="font-prata text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">Media</h2>
    <p className="text-gray-500 text-center mb-4 sm:mb-6 md:mb-10">
  Prepare To Elevate Your Sense Of Style With Our Latest Collection!
</p>

      <Swiper
      
        spaceBetween={15}
        slidesPerView={3}
        navigation
        breakpoints={{
          320: { slidesPerView: 1, centeredSlides: true },
          640: { slidesPerView: 2, centeredSlides: false },
          1024: { slidesPerView: 3 },
        }}
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
    </section>
  );
}
