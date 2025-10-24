"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

type BannerProps = {
  Title?: string;
  Image?: string; // optional custom image prop
};

const Banner: React.FC<BannerProps> = ({
  Title = "Page Title",
  Image = "/assets/images/mybluebanner.jpg", // default image
}) => {
  return (
    <section className="relative w-full">
      {/* ✅ Banner Image */}
      <img
        src={Image}
        alt={Title}
        className="w-full h-[70vh]  object-cover transition-opacity duration-500"
      />

      {/* ✅ Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>

      {/* ✅ Content */}
      <div className="absolute inset-0 flex flex-col justify-between container mx-auto px-4 py-4 z-20">
        {/* Breadcrumb */}
        <div className="text-white text-xs sm:text-sm md:text-base">
          <Link href="/" className="hover:underline hover:text-yellow-400 transition-colors">
            Home
          </Link>{" "}
          / <span className="text-gray-200 capitalize">{Title}</span>
        </div>

        {/* Title */}
        <div className="flex-1 flex items-center">
          {/* <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white capitalize">
            {Title}
          </h1> */}
        </div>
      </div>
    </section>
  );
};

export default Banner;
