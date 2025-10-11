"use client";

import React from "react";
import FreeshipingComp from "@/components/home/FreeshipingComp";
import SubscribeNewsletter from "@/components/home/SubscribeNewsletter";
import Banner from "@/components/common/Banner/Banner";

export default function LeadershipSection() {
  return (
    <>
      <Banner Title="Our Leadership" />

      <section className="py-16 px-4 md:px-16 bg-white text-gray-800">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#d4b262] uppercase tracking-wide font-medium">
            Our Leadership
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mt-2">
            A Legacy Of Trust And Craftsmanship
          </h2>
        </div>

        {/* Late K.V. Kunhikannan (Image Left) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mb-16">
          <div className="flex justify-center md:order-1">
            <img
              src="/assets/images/md-pic.png"
              alt="Late K.V. Kunhikannan"
              className="w-full max-w-[400px] h-[500px] object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="md:col-span-2 md:order-2">
            <h3 className="text-lg font-semibold text-[#d4b262] mb-1">
              The Man Who Crafted a Legacy of Trust
            </h3>
            <h4 className="text-xl font-bold">Late K.V. Kunhikannan</h4>
            <p className="text-sm font-medium text-gray-700 mb-4">Our Founder</p>
            <div className="text-gray-600 leading-relaxed text-sm md:text-base space-y-4">
              <p>
                The remarkable journey of Bindu Jewellery began with Late K.V. Kunhikannan, a visionary goldsmith from Pilicode near Nileshwaram, Kasaragod. Guided by honesty, dedication, and a deep love for his craft, he laid the foundation of Bindu Jewellery in 1981, starting with a modest 200 sq. ft. showroom on Court Road, Kasaragod.
              </p>
              <p>
                With his commitment to purity, fair pricing, and heartfelt service, Mr. Kunhikannan transformed Bindu Jewellery into a trusted name — not just a store, but a symbol of integrity and lasting relationships. His belief that “every ornament should carry the promise of trust” continues to inspire the brand even today.
              </p>
              <p>
                His legacy is carried forward by his sons, Mr. Abhilash K.V. and Dr. Ajithesh K.V., who have expanded his dream into new horizons, upholding his timeless vision of craftsmanship with conscience.
              </p>
            </div>
          </div>
        </div>

        {/* Abhilash K V (Image Right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start mb-16">
          <div className="flex justify-center md:order-2">
            <img
              src="/assets/images/mp01-pic.png"
              alt="Abhilash K V"
              className="w-full max-w-[400px] h-[500px] object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="md:col-span-2 md:order-1 md:text-right">
            <h4 className="text-xl font-bold">Abhilash K V</h4>
            <p className="text-sm font-medium text-gray-700 mb-4">
              Managing Partner, Bindu Jewellery
            </p>
            <div className="text-gray-600 leading-relaxed text-sm md:text-base space-y-4">
              <p>
                Quality is what we are most concerned about here as there is no compromise on quality. Our mission is to offer a unique blend of superior quality products to our customers. We do not carry anything that is not well made. Our job is to ensure each client is getting the best quality for the money they spent.
              </p>
              <p>
                We attribute our success to our dedication and uncompromised service to our customers. We are committed to provide our customer with the best service possible. We consider each sale as an everlasting relationship, and believe in keeping our customers always satisfied by protecting their rights and offering the finest products through our quality-conscious efforts. Our philosophy is to give Quality sales and Customer service.
              </p>
              <p>
                Our future holds the promise of even greater achievements, provided we remain forward-looking, performance-oriented and agile, capitalize on our strengths and eliminate our weaknesses. We have the vision, commitment, and expertise to become a leader among jewellers, where leadership is not just being the biggest, but the best — in terms of people, competitiveness, product quality, value to customers, and all business processes.
              </p>
            </div>
          </div>
        </div>

        {/* Ajithesh K V (Image Left) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div className="flex justify-center md:order-1">
            <img
              src="/assets/images/mp02-pic.png"
              alt="Ajithesh K V"
              className="w-full max-w-[400px] h-[500px] object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="md:col-span-2 md:order-2">
            <h4 className="text-xl font-bold">Ajithesh K V</h4>
            <p className="text-sm font-medium text-gray-700 mb-4">
              Managing Partner, Bindu Jewellery
            </p>
            <div className="text-gray-600 leading-relaxed text-sm md:text-base space-y-4">
              <p>
                Quality is what we are most concerned about here as there is no compromise on quality. Our mission is to offer a unique blend of superior quality products to our customers. We do not carry anything that is not well made. Our job is to ensure each client is getting the best quality for the money they spent.
              </p>
              <p>
                We attribute our success to our dedication and uncompromised service to our customers. We are committed to provide our customer with the best service possible. We consider each sale as an everlasting relationship, and believe in keeping our customers always satisfied by protecting their rights and offering the finest products through our quality-conscious efforts. Our philosophy is to give Quality sales and Customer service.
              </p>
              <p>
                Our future holds the promise of even greater achievements, provided we remain forward-looking, performance-oriented and agile, capitalize on our strengths and eliminate our weaknesses. We have the vision, commitment, and expertise to become a leader among jewellers, where leadership is not just being the biggest, but the best — in terms of people, competitiveness, product quality, value to customers, and all business processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SubscribeNewsletter />
      <FreeshipingComp />
    </>
  );
}
