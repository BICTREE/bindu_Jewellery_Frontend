"use client";
import React from "react";

interface JewelleryCardProps {
  image: string;
  title: string;
}

const JewelleryCard: React.FC<JewelleryCardProps> = ({ image, title }) => {
  return (
    <div className="relative group w-full mb-10">
      {/* Product image */}
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-lg shadow-lg"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                      flex flex-col items-center justify-center 
                      transition-opacity duration-500 rounded-lg">
        <p className="text-white font-semibold mb-4 text-lg">{title}</p>
        <button className="px-5 py-2 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
          View More
        </button>
      </div>

      {/* Title (default) */}
      <p className="text-center absolute text-gray-800 font-semibold mt-3 
                   transition-opacity duration-300 group-hover:opacity-0 w-full">
        {title}
      </p>
    </div>
  );
};

export default JewelleryCard;
