"use client";
import React from "react";
import Image from "next/image";

import SwarnabinduBanner from "@/components/common/Banner/SwarnabinduBanner";
import GoldSchemeFAQ from "@/components/schemefaq/GoldSchemeFAQ";
import SchemeCalculator from "@/components/schemecalculator/SchemeCalculator";
import ProcessToLogin from "@/components/processtologin/ProcessToLogin";
import HappyCustomers from "@/components/happycustomers/HappyCustomers";
const SwarnaBinduPage = () => {
  return (
      <><SwarnabinduBanner />
      
      
     <section className="bg-white text-[#111] py-12 px-6 sm:px-10 md:px-20 lg:px-32">
      {/* Top Help Line */}
      <p className="text-center text-sm sm:text-base md:text-lg mb-10 font-medium">
        For Gold Investment Scheme help:{" "}
        <a
          href="tel:+919847020400"
          className="text-[#7c0f0f] hover:underline font-semibold"
        >
          +91 98470 20400
        </a>
      </p>

      {/* Content Layout */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Left Text Section */}
        <div className="md:w-2/3 space-y-5 text-justify">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold underline underline-offset-4 decoration-[#7c0f0f]">
            Swarna Bindu
          </h2>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            The Swarna Bindu Scheme offers yet another golden opportunity to
            invest wisely while celebrating life’s beauty. It allows you to make
            regular contributions and redeem them for gold, diamond, or silver
            ornaments at the end of your term. With attractive benefits and
            transparent policies, this scheme makes fine jewellery ownership
            accessible and rewarding for everyone.
          </p>
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
            At Bindu, our schemes are more than financial plans — they are trust
            plans. They represent our long-standing commitment to helping every
            customer secure not just their wealth, but also their happiness, one
            gram at a time.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/3 flex justify-center md:justify-end">
          <Image
            src="/assets/images/swarnabindhu01.png"
            alt="Swarna Bindu Logo"
            width={260}
            height={300}
            className="rounded-md shadow-md object-contain"
          />
        </div>
      </div>
    </section>
      <ProcessToLogin/>
      <GoldSchemeFAQ/>
       <SchemeCalculator />
       <HappyCustomers/>
      </>
  );
};

export default SwarnaBinduPage;
