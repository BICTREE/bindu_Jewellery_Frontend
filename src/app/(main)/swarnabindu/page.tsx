"use client";
import React from "react";
import Image from "next/image";

import SwarnabinduBanner from "@/components/common/Banner/SwarnabinduBanner";
import GoldSchemeFAQ from "@/components/schemefaq/GoldSchemeFAQ";
import SchemeCalculator from "@/components/schemecalculator/SchemeCalculator";
import ProcessToLogin from "@/components/processtologin/ProcessToLogin";
import HappyCustomers from "@/components/happycustomers/HappyCustomers";
import GoldPurchasePlan from "@/components/registerscheme/GoldPurchasePlan";

const swarnabindhuFaqs = [
  {
  question: "How long is the scheme duration?",
  answer: "The SwarnaBindhu Scheme is available in two durations — 11 months and 6 months. Customers can choose the plan that best suits their savings preference, depending on the options provided by the store." 
  },

  { 
  question: "What are the benefits of joining this scheme?",
  answer: "Customers enjoy bonus gold, discounts on making charges, and the ability to purchase gold at maturity without market fluctuations affecting their savings." 
  },
  
  {
  question: "Can I pay my monthly installment online?",
  answer: "Yes, monthly installments can be paid online, in-store, or through supported digital payment methods."
  },
  
  {
  question: "What happens if I miss a monthly payment?",
  answer: "If you miss an installment, you can make up the payment later. However, delays may affect scheme benefits, depending on the jeweller’s policy." 
  },

  {
  question: "How do I redeem the saved amount at maturity?",
  answer: "After completing all installments, you can redeem the total savings to purchase gold jewellery, based on the jeweller’s terms and conditions."
  },

];

const swarnabindhuTerms = [
  "Scheme available for 6 or 11 months only.",
  "Monthly installments must be paid on time.",
  "Payments can be made online or in-store.",
  "Amount can be redeemed only for gold jewellery.",
  "Making charge benefits apply only at maturity.",
  "Scheme is non-transferable.",
];

const swarnaCustomers = [
  {
    img: "/assets/images/no-pic01.jpg",
    name: "Anjali D.",
    text: "Loved the Swarnabindu scheme! Easy payments and great benefits.",
  },
  {
    img: "/assets/images/no-pic01.jpg",
    name: "Rahul",
    text: "Swarnabindu made gold planning simple and tension-free.",
  },
  
    {
    img: "/assets/images/no-pic01.jpg",
    name: "Rahul",
    text: "Swarnabindu made gold planning simple and tension-free.",
  },

    {
    img: "/assets/images/no-pic01.jpg",
    name: "Rahul",
    text: "Swarnabindu made gold planning simple and tension-free.",
  },

    {
    img: "/assets/images/no-pic01.jpg",
    name: "Rahul",
    text: "Swarnabindu made gold planning simple and tension-free.",
  },

    {
    img: "/assets/images/no-pic01.jpg",
    name: "Rahul",
    text: "Swarnabindu made gold planning simple and tension-free.",
  },

    {
    img: "/assets/images/no-pic01.jpg",
    name: "Rahul",
    text: "Swarnabindu made gold planning simple and tension-free.",
  },
];




export default function SwarnaBinduPage() {
  return (
    <>
      {/* Banner */}
      <SwarnabinduBanner />

      {/* Helpline + Description */}
      <section className="bg-white text-[#111] py-12 px-6 sm:px-10 md:px-20 lg:px-32">
        <p className="text-center text-sm sm:text-base md:text-lg mb-10 font-medium">
          For Gold Investment Scheme help:{" "}
          <a
            href="tel:+919847020400"
            className="text-[#7c0f0f] hover:underline font-semibold"
          >
            +91 98470 20400
          </a>
        </p>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Left */}
          <div className="md:w-2/3 space-y-5 text-justify">
            <h2 className="text-2xl sm:text-3xl font-serif text-left font-semibold ">
              Swarna Bindu
            </h2>

            <p className="font-normal  mb-4 text-sm sm:text-base text-gray-500 ">
              The Swarna Bindu Scheme offers yet another golden opportunity to
              invest wisely while celebrating life’s beauty...
            </p>

            <p className="font-normal  mb-4 text-sm sm:text-base text-gray-500 ">
              At Bindu, our schemes are more than financial plans — they are trust
              plans...
            </p>
          </div>

          {/* Right Image */}
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

      {/* App Download Section */}
      <ProcessToLogin
        downloadLink="https://play.google.com/store/apps/details?id=swarna.bindu.app"
        buttonText="Download Now"
      />

      {/* Registration Form */}
      <GoldPurchasePlan />

      {/* FAQ */}
      <GoldSchemeFAQ
        title="SwarnaBindhu Scheme FAQ"
        faqs={swarnabindhuFaqs}
        note="Benefits can be used to purchase gold, silver, diamond items."
        terms={swarnabindhuTerms}
      />

      {/* Calculator */}
      <SchemeCalculator />

      {/* Testimonials */}
      <HappyCustomers title="Happy  Customers" customers={swarnaCustomers}
      />
    </>
  );
}
