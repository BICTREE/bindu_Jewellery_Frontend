"use client";
import React from "react";
import Image from "next/image";
import Banner from "@/components/common/Banner/Banner";
const SwarnaBinduPage = () => {
  return (
   
      <><Banner Title="Swarna Bindu" />
      
      <section className="py-16 px-4 md:px-16 bg-white text-gray-800">
          <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                  {/* Left Side - Contact Info + Image */}
                  <div className="lg:col-span-5 order-1 lg:order-1 flex flex-col justify-between">

                      {/* CSR Image */}
                      <div className="w-full h-56 sm:h-72 md:h-80 lg:h-auto relative shadow-md rounded-md overflow-hidden flex-1">
                          <Image
                              src="/assets/images/swarnabindhu01.png"
                              alt="Akshaya Nidhi"
                              fill
                              className="object-cover rounded-md" />
                      </div>
                  </div>

                  {/* Right Side - Text Content */}
                  <div className="lg:col-span-7 order-1 lg:order-1 flex">
                      <div className="flex flex-col justify-center p-4 lg:p-6 flex-1">
                          

                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-snug">
                     Swarna Bindu
                          </h2>

                          <p className="leading-relaxed mb-6 text-sm sm:text-base font-semibold text-gray-700">
      The Swarna Bindu Scheme offers yet another golden opportunity to invest wisely while celebrating life’s beauty. It allows you to make regular contributions and redeem them for gold, diamond, or silver ornaments at the end of your term. With attractive benefits and transparent policies, this scheme makes fine jewellery ownership accessible and rewarding for everyone.


                          </p>

                          <p className="font-normal mb-4 text-sm sm:text-base text-gray-500">
             At Bindu, our schemes are more than financial plans — they are trust plans. They represent our long-standing commitment to helping every customer secure not just their wealth, but also their happiness, one gram at a time.



                          </p>

                        

                          {/* <button className="mt-4 w-fit px-6 py-3 bg-[#d4b262] text-white font-semibold rounded-md shadow hover:bg-[#c2a251] transition-all">
      Learn More
    </button> */}
                      </div>
                  </div>
              </div>
          </div>
      </section></>
  );
};

export default SwarnaBinduPage;
