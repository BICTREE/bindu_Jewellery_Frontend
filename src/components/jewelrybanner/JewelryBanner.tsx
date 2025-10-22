"use client";
import React from "react";

const JewelryBanner = () => {
  const banners = [
    {
      id: 1,
      title: "Our Story",
      subtitle: "KNOW MORE",
      img: "/assets/images/banner-left.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "All About Lab-grown Diamonds",
      subtitle: "KNOW MORE",
      img: "/assets/images/banner-right.jpg",
      link: "#",
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {banners.map((item) => (
          <a
            href={item.link}
            key={item.id}
            className="relative group overflow-hidden"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-500"></div>

            {/* Content */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white">
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium mb-3">
                {item.title}
              </h3>
              <button className="border border-white px-6 py-2 text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-300">
                {item.subtitle}
              </button>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default JewelryBanner;
