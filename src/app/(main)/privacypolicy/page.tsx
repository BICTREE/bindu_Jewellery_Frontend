"use client";
import Banner from "@/components/common/Banner/Banner";
import React from "react";

export default function PrivacyPolicy() {
  return (

        <>
        <Banner
          Title="Privacy Policy" />
          
          
          
          <div className="container mx-auto px-4 py-8">
              {/* Page Heading */}
              <h1 className=" text-gray-900  text-2xl md:text-3xl font-bold  mb-8">
                  Privacy Policy
              </h1>

              {/* Intro */}
              <ul className="list-none p-0 m-0">
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Customer privacy is a priority.
      </li>
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Personal details are used solely for service and communication.
      </li>
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        We never sell or misuse customer data.
      </li>
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Transactions are encrypted and confidential.
      </li>
    </ul>

          </div></>
  );
}
