"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface JewelleryCardProps {
  image: string;
  title: string;
}

const JewelleryCard: React.FC<JewelleryCardProps> = ({ image, title }) => {
  const [imgSrc, setImgSrc] = useState(image || "/assets/images/catmod-08.jpg");
  return (
    <div className="relative group w-full mb-10">
      {/* Product image */}
      <Image
        src={imgSrc}
        alt={title}
        width={100}
        height={200}
        className="w-full h-64 object-cover rounded-lg shadow-lg"
        onError={() => setImgSrc("/assets/images/catmod-08.jpg")}
      />
      {/* Hover overlay */}
      <div
        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                      flex flex-col items-center justify-center 
                      transition-opacity duration-500 rounded-lg"
      >
        <p className="text-white font-semibold mb-4 text-lg">{title}</p>
        <Link
          href="/product-list"
          className="px-5 py-2 bg-white text-black font-semibold rounded-full shadow-md hover:bg-gray-200 transition"
        >
          View More
        </Link>
      </div>

      {/* Title (default) */}
      <p
        className="text-center absolute text-gray-800 font-semibold mt-3 
                   transition-opacity duration-300 group-hover:opacity-0 w-full"
      >
        {title}
      </p>
    </div>
  );
};

export default JewelleryCard;
