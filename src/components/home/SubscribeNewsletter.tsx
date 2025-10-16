"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="bg-[#fbfbfb] py-16 my-16 px-6 md:px-16  ">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-10">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className=" font-prata text-2xl sm:text-2xl md:text-3xl lg:text-4xl 
             font-bold text-[#000000] flex items-center justify-center 
             md:justify-start gap-3 leading-snug sm:leading-tight md:leading-[1.3]">
          <span>
            Stay Up-to-date with  <br className="hidden sm:block" />
             Bindu Jewellery
          </span>
          {/* <ArrowRight className="w-8 h-8 text-gray-800" /> */}
        </h2>
      </div>

  {/* Right Section */}
<div className="md:w-1/2 text-center md:text-right">
  <p className="text-gray-600 text-base mb-4 text-center md:text-right">
   Sign up for our newsletter to stay updated on our latest collections, gold saving schemes, and exclusive offers from Bindu Jewellery.
  </p>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      alert("Subscribed!");
    }}
    className="flex items-center border border-gray-300 rounded-full overflow-hidden w-full max-w-md ml-auto" // 👈 right aligned form
  >
    <input
      type="email"
      placeholder="Type your Email"
      className="flex-1 px-5 py-3 text-gray-700 focus:outline-none bg-transparent w-full"
      required
    />
    <button
      type="submit"
      className="px-6 py-3 bg-transparent border-l border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 transition-all"
    >
      Sign Up
    </button>
  </form>
</div>

</div>
      
    </section>
  );
};

export default NewsletterSection;
