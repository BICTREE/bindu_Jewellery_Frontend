"use client";
import React from "react";
import Image from "next/image";
import Banner from "@/components/common/Banner/Banner";
const AkshayaNidhiPage = () => {
  return (
   
      <><Banner Title="Akshaya Nidhi" />
      
      <section className="py-16 px-4 md:px-16 bg-white text-gray-800">
          <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                  {/* Left Side - Contact Info + Image */}
                  <div className="lg:col-span-5 order-1 lg:order-1 flex flex-col justify-between">

                      {/* CSR Image */}
                      <div className="w-full h-56 sm:h-72 md:h-80 lg:h-auto relative shadow-md rounded-md overflow-hidden flex-1">
                          <Image
                              src="/assets/images/akshaya-nidhi.png"
                              alt="Akshaya Nidhi"
                              fill
                              className="object-cover rounded-md" />
                      </div>
                  </div>

                  {/* Right Side - Text Content */}
                  <div className="lg:col-span-7 order-1 lg:order-1 flex">
                      <div className="flex flex-col justify-center p-4 lg:p-6 flex-1">
                          
 <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-snug"> Akshaya Nidhi
                          </h2>

                          <p className="leading-relaxed mb-6 text-sm sm:text-base font-semibold text-gray-700">
         The Akshaya Nidhi Scheme is Bindu Jewellery’s way of helping you turn your savings into something precious and enduring. With flexible monthly payments starting from ₹500 or more, customers can steadily accumulate gold in their account, with each month’s value determined by that day’s gold rate. This transparent, fair, and smart approach ensures your investment grows with time.


                          </p>

                          <p className="font-normal mb-4 text-sm sm:text-base text-gray-500">
                  After one year, you are rewarded with a 6% bonus on your total savings — an added sparkle for your dedication. You can then redeem your accumulated gold for jewellery of your choice. This scheme combines the security of saving with the joy of owning fine jewellery, allowing families to plan for special occasions or future needs in a way that’s practical yet deeply rewarding.


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

export default AkshayaNidhiPage;
