"use client";
import React from "react";
import Link from "next/link";

type ProductCardProps = {
  image: string;
  hoverImg: string;
  name: string;
  offer?: string;
  price: number | string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  hoverImg,
  name,
  offer,
  price,
}) => {
  return (
    <Link href="/product-list/ring" className="w-full sm:w-60 mx-auto">
      <div className="group cursor-pointer">
        {/* Card Image */}
        <div className="relative w-full aspect-[13/18] overflow-hidden bg-white shadow-lg transition-all duration-500 rounded-lg group-hover:rounded-t-[120px]">
          <img
            src={image}
            alt={name}
            className="absolute w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={hoverImg}
            alt={name}
            className="absolute w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
          />

          {/* Action Buttons - Vertical Left Side */}
          <div className="absolute top-1/2 left-2 -translate-y-1/2 opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 flex flex-col space-y-2">
            <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-amber-500 transition">
              <img src="/assets/images/Heart.svg" alt="wishlist" />
            </button>
            <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-amber-500 transition">
              <img src="/assets/images/Eye.svg" alt="preview" />
            </button>
            <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-amber-500 transition">
              <img src="/assets/images/Forward_Arrow.svg" alt="share" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center mt-3 px-2">
          <h3 className="text-sm sm:text-base font-bold text-amber-700 uppercase">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {offer ?? "22K Hallmarked"}
          </p>
          <div className="mt-2 text-base font-bold text-gray-900 relative">
            <span className="group-hover:hidden">₹{price}</span>
            <button className="hidden group-hover:inline-block text-amber-700 font-semibold">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
