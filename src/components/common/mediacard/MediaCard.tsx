"use client";
import React from "react";

type MediaCardProps = {
  image: string;
  link?: string; // optional prop for the anchor URL
};

const MediaCard: React.FC<MediaCardProps> = ({ image, link = "#" }) => {
  return (
    <section className=" container mx-auto px-4 flex justify-center py-15">
      <div className="relative group overflow-hidden rounded-lg shadow-md ">
        {/* Product Image */}
        <img
          src={image}
          className="w-full  object-cover transform group-hover:scale-105 transition duration-500"
        />

        {/* Hover Overlay with Anchor Tag */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
          <a
            href={link}
            className="bg-white p-3 w-8 h-8 rounded-full shadow-md transition hover:bg-[#d4b262] hover:text-white flex items-center justify-center"
          >
      <i className="fa fa-play text-lg"></i>
          </a>
        </div>

        {/* Product Name */}
       
      </div>
    </section>
  );
};

export default MediaCard;
