"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function HappyCustomers() {
  const customers = [
    {
      img: "/assets/images/no-pic01.jpg",
      name: "Anjali D.",
      text: "Beautiful jewelry and friendly staff! My experience with Bindu Jewellery was wonderful.",
    },
    {
      img: "/assets/images/no-pic01.jpg",
      name: "Rahul K.",
      text: "Excellent craftsmanship and unique designs. Totally satisfied with my purchase!",
    },
    {
      img: "/assets/images/no-pic01.jpg",
      name: "Priya S.",
      text: "Great customer service and elegant diamond collection. Highly recommend!",
    },
    {
      img: "/assets/images/no-pic01.jpg",
      name: "Vivek M.",
      text: "Superb quality and timely delivery. Bindu Jewellery never disappoints!",
    },
  ];

  return (
    <section className="bg-[#fff8f5] py-10 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#6a1a0b] mb-8">
        Our Happy Customers
      </h2>

      <div className="max-w-5xl mx-auto px-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="pb-8"
        >
          {customers.map((c, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 h-[240px]">
                {/* Customer Image */}
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-[#f4c7a5]"
                />

                {/* Name */}
                <h3 className="text-base font-semibold text-[#6a1a0b] mb-1">
                  {c.name}
                </h3>

                {/* Text */}
                <p className="text-gray-600 text-xs leading-relaxed">
                  “{c.text}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
