"use client";
import Banner from "@/components/common/Banner/Banner";
import React from "react";

export default function TermsAndConditions() {
  return (
           <>
           <Banner Title="Terms And Conditions" />
          
          <div className="container px-4 py-8">
              {/* Page Heading */}
              <h1 className=" text-gray-900  text-2xl md:text-3xl font-bold  mb-8">
                  Terms &amp; Conditions
              </h1>

           <ul className="list-none p-0 m-0">
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        All jewellery sold is BIS Hallmarked.
      </li>
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Prices include transparency in weight, making charges, and stone value.
      </li>
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Products are subject to availability and market rates.
      </li>
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Customized designs are final and non-refundable.
      </li>
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        By purchasing, you agree to our store policies.
      </li>
    </ul>
           
          </div></>
  );
}
