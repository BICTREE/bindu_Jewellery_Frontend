"use client";
import React from "react";

const products = [
  { id: 1, img: "gift01.png", name: "Elegant Gift 1" },
  { id: 2, img: "gift02.png", name: "Luxury Gift 2" },
  { id: 3, img: "gift03.png", name: "Premium Gift 3" },
  { id: 4, img: "gift04.png", name: "Exclusive Gift 4" },
  { id: 5, img: "gift05.png", name: "Special Gift 5" },
  { id: 6, img: "gift06.png", name: "Classic Gift 6" },
];

const GiftMore = () => {
  return (
    <section className="container">

    <div className="mx-auto py-5 sm:py-8 md:py-12">
      <h2 className="text-2xl font-bold text-center">Gift & More</h2>
      <p className="text-gray-500 text-center mb-10">Prepare To Elevate Your Sense Of Style With Our Latest Collection!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side grid (2x2 images) */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="relative group overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={`/assets/images/${product.img}`}
                alt={`Product - ${product.name}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 p-4">
                <h3 className="text-white text-lg font-semibold mb-3">
                  {product.name}
                </h3>
                <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-[#d4b262] hover:text-white transition">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right side grid (always 2 columns, even on mobile) */}
        <div className="grid grid-cols-2 gap-4">
          {products.slice(4, 6).map((product) => (
            <div
              key={product.id}
              className="relative group overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={`/assets/images/${product.img}`}
                alt={`Product - ${product.name}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 p-4">
                <h3 className="text-white text-lg font-semibold mb-3">
                  {product.name}
                </h3>
                <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-[#d4b262] hover:text-white transition">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default GiftMore;
