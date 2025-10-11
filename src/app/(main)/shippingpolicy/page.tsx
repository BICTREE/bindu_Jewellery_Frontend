"use client";
import Banner from "@/components/common/Banner/Banner";
import React from "react";

export default function ShippingPolicy() {
 

          
  return (
     <>
     <Banner Title="ShippingPolicy" />
     <div className="container px-4 py-8">
          {/* Page Heading */}
          <h1 className=" text-gray-900  text-2xl md:text-3xl font-bold  mb-8">
              Shipping Policy
          </h1>

          {/* Section 1 */}
          <section className="mb-6">
        <ul className="list-none p-0 m-0">
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Secure delivery to all locations with tracking available.
      </li>
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Timelines vary based on location and product availability.
      </li>
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Special arrangements available for high-value or bulk orders.
      </li>
    </ul>
          </section>

     
      </div></>
  );
}
