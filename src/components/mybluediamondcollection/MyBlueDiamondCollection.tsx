"use client";

import React from "react";
import Image from "next/image";

const collections = [
  {
    name: "Zenyth",
    image: "/assets/images/dia-collection01.jpg",
  },
  {
    name: "Starlit",
    image: "/assets/images/dia-collection02.jpg",
  },
  {
    name: "Alyssa",
    image: "/assets/images/dia-collection03.jpg",
  },
  {
    name: "Toi Et Moi",
    image: "/assets/images/dia-collection04.jpg",
  },
];

const MyBlueDiamondCollection = () => {
  return (
    <section className="w-full py-12 bg-white">
      {/* Title */}
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-light tracking-wide mb-10 uppercase">
        My Blue Diamond Exclusive Collections
      </h2>

      {/* Grid layout */}
     <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
  {collections.map((item, index) => (
    <div key={index} className="flex flex-col items-center group">
      {/* Image Wrapper */}
      <div className="w-full aspect-[3/5] overflow-hidden relative ">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 
                 (max-width: 1200px) 50vw, 
                 25vw"
          priority={index === 0}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-4">
          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-2">
            {item.name}
          </h3>
          <p className="text-gray-200 text-sm sm:text-base max-w-[90%]">
            Discover the elegance of our {item.name} collection.
          </p>
        </div>
      </div>

      {/* Static Label (optional, can remove if redundant with overlay) */}
      <p className="mt-3 text-sm sm:text-base md:text-lg font-light text-gray-800">
        {item.name}
      </p>
    </div>
  ))}
</div>

    </section>
  );
};

export default MyBlueDiamondCollection;
