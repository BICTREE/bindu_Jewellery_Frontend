"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

type Customer = {
  img: string;
  name: string;
  text: string;
};

type HappyCustomersProps = {
  title?: string;
  customers: Customer[];
};

export default function HappyCustomers(
  {
  title = "Our Happy Customers",
  customers = [],
}: HappyCustomersProps) 

{



  return (
    <section className="bg-[#fdf3ee] text-center  py-10 md:py-15 px-10 m-0">
      <h2 className="text-2xl sm:text-3xl font-serif text-center font-semibold mb-10 text-[#6a1a0b] ">
        {title}
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
          {customers.length > 0 ? (
            customers.map((c: Customer, index: number) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 h-[240px]">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-[#f4c7a5]"
                  />
                  <h3 className="text-base font-semibold text-[#6a1a0b] mb-1">
                    {c.name}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    “{c.text}”
                  </p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No customer reviews available.</p>
          )}
        </Swiper>
      </div>
    </section>
  );
}
