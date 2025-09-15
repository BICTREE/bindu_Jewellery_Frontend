"use client";
import React from "react";

type ProductCardProps = {
  image: string;
  hoverImg: string;
  name: string;
};


const PoppularCard:React.FC<ProductCardProps> = ({
  image,
  hoverImg,
  name,
}) => {
  return (
    <div className="group w-40 text-center justify-center mx-auto">
      {/* Image container */}
      <div className="relative w-40 h-40 mx-auto overflow-hidden rounded-full">
        {/* Default Image */}
        <img
          src={image} alt={name}
         
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        {/* Hover Image */}
        <img
         src={hoverImg} alt={name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {/* Add to Cart Button */}
        <button className="absolute inset-x-0 bottom-3 mx-auto px-3 py-1 text-sm bg-yellow-600 text-white rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Add to Cart
        </button>
      </div>

      {/* Title */}
      <p className="mt-2 font-semibold">{name}</p>
    </div>
  );
};

export default PoppularCard;
