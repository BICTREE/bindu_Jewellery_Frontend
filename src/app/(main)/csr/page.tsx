"use client";
import React from "react";
import Image from "next/image";
import Banner from "@/components/common/Banner/Banner";
const CSRPage = () => {
  return (
   
      <><Banner Title="CSR" />
      
      <section className="py-16 px-4 md:px-16 bg-white text-gray-800">
          <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                  {/* Left Side - Contact Info + Image */}
                  <div className="lg:col-span-5 order-1 lg:order-1 flex flex-col justify-between">

                      {/* CSR Image */}
                      <div className="w-full h-56 sm:h-72 md:h-80 lg:h-auto relative shadow-md rounded-md overflow-hidden flex-1">
                          <Image
                              src="/assets/images/csr-img.png"
                              alt="CSR Initiatives"
                              fill
                              className="object-cover rounded-md" />
                      </div>
                  </div>

                  {/* Right Side - Text Content */}
                  <div className="lg:col-span-7 order-1 lg:order-1 flex">
                      <div className="flex flex-col justify-center p-4 lg:p-6 flex-1">
                          <p className="text-xs sm:text-sm text-[#d4b262] font-semibold uppercase mb-3">
                              Corporate Social Responsibility
                          </p>

                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-snug">
                         Swarna Bindu: Empowering Women, Enriching Futures
                          </h2>

                          <p className="leading-relaxed mb-6 text-sm sm:text-base font-semibold text-gray-700">
                             At the heart of Bindu Jewellery lies a strong belief that true prosperity is shared prosperity. As a brand that has grown from community roots, we remain deeply committed to giving back through meaningful social impact. Our flagship CSR initiative, “Swarna Bindu”, is dedicated to empowering women through skill development, education, and entrepreneurship — helping them transform their potential into power.

                          </p>

                          <p className="font-normal mb-4 text-sm sm:text-base text-gray-500">
                             Through Swarna Bindu, we create opportunities for women from all backgrounds to learn jewellery-making skills, engage in creative workshops, and build confidence in financial independence. We also extend mentorship programs that help aspiring entrepreneurs start small businesses, fostering a new generation of self-reliant women. Education sponsorships and awareness drives further strengthen our commitment to social upliftment.

                          </p>

                          <p className="font-normal mb-4 text-sm sm:text-base text-gray-500">
                             Bindu Jewellery believes that when women are empowered, families and communities thrive. Swarna Bindu is not just a CSR initiative — it is a heartfelt movement that celebrates resilience, self-worth, and ambition. Just like gold, every woman has an inner shine waiting to be polished; through Swarna Bindu, we promise to keep nurturing that light and creating a society where every woman can achieve her dreams and stand tall with pride.

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

export default CSRPage;
