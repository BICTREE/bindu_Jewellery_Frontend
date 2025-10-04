"use client";

import React from "react";

const branches = [
  { name: "Kasaragod", img: "/assets/images/branch_pic.png" },
  { name: "Sullia", img: "/assets/images/branch_pic.png" },
  { name: "Mangalore", img: "/assets/images/branch_pic.png" },
];

export default function BranchesSection() {
  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-10">Our Branches</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-16">
        {branches.map((branch, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
            {/* Branch Image */}
            <img
              src={branch.img}
              alt={branch.name}
              className="w-full h-[400px] object-cover transform group-hover:scale-105 transition duration-500"
            />

            {/* Overlay Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 py-3 text-white font-semibold text-lg">
              {branch.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
