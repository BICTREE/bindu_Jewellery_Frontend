"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

type BannerProps = {
  Title?: string;
  Image?: string;
};

const Banner: React.FC<BannerProps> = ({
  Title = "Our Branches",
  Image = "/assets/images/ourbranch-banner.png",
}) => {
  return (
    <section className="relative w-full">
      {/* Banner Image */}
      <img
        src={Image}
        alt={Title}
        className="w-full h-full object-cover transition-opacity duration-500"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Breadcrumb (TOP + hidden on mobile) */}
      <div className="absolute top-4 left-4 sm:left-8 z-20 hidden sm:block text-white text-sm md:text-base">
        <Link
          href="/"
          className="hover:underline hover:text-yellow-400 transition-colors"
        >
          Home
        </Link>
        {" / "}
        <span className="text-gray-200 capitalize">{Title}</span>
      </div>

      {/* Title area (empty / reserved) */}
      <div className="absolute inset-0 flex items-center justify-center z-10"></div>
    </section>
  );
};

export default Banner;
