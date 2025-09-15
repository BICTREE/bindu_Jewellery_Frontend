"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import PoppularCard from "../common/poppularcategory/PoppularCard";

const products = [
  {
    id: 1,
    name: "EARRINGS",
    img: "/assets/images/card-img01.png",
    img2: "/assets/images/catmod-01.jpg",
  },
  {
    id: 2,
    name: "BANGLES",
    img: "/assets/images/card-img01.png",
    img2: "/assets/images/catmod-01.jpg",
  },
  {
    id: 3,
    name: "NECKLACE",
    img: "/assets/images/card-img01.png",
    img2: "/assets/images/catmod-01.jpg",
  },
  {
    id: 4,
    name: "RINGS",
    img: "/assets/images/card-img01.png",
    img2: "/assets/images/catmod-01.jpg",
  },
  {
    id: 5,
    name: "BRACELETS",
    img: "/assets/images/card-img01.png",
    img2: "/assets/images/catmod-01.jpg",
  },
  {
    id: 6,
    name: "PENDANTS",
    img: "/assets/images/card-img01.png",
    img2: "/assets/images/catmod-01.jpg",
  },
];

export default function NewArrivals() {
  return (
    <section className="container mx-auto">
      <div className="mx-auto py-5 sm:py-8 md:py-12">
      <h2 className="text-2xl font-bold text-center">Popular category</h2>
      <p className="text-gray-500 text-center mb-10">
        Prepare To Elevate Your Sense Of Style With Our Latest Collection!
      </p>

      <Swiper
        modules={[Navigation]}
        spaceBetween={1}
        slidesPerView={5}
        breakpoints={{
          320: { 
            slidesPerView: 1,
            centeredSlides: true,   // ✅ center align on mobile
          },
          640: { 
            slidesPerView: 2,
            centeredSlides: false,  
          },
          1024: { slidesPerView: 5 },
        }}
        className=""
      >
        {products.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center ">
            {/* ✅ Pass props to your card */}
            <PoppularCard
                    name={item.name}
                    image={item.img}
                    hoverImg={item.img2}
                  />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </section>
  );
}
