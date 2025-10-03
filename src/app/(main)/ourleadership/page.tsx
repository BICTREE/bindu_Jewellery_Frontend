"use client";

import React from "react";
import FreeshipingComp from "@/components/home/FreeshipingComp";
import SubscribeNewsletter from "@/components/home/SubscribeNewsletter";
import Banner from "@/components/common/Banner/Banner";

const teamMembers = [
  {
    name: "K V Kunhikannan",
    role: "Managing Director, Bindu Jewellery",
    title: "MD’s Message",
    image: "/assets/images/md-pic.png", // replace with actual path
    message: `Quality is what we are most concerned about here as there is no  compromise on quality. 
    Our mission is to offer unique blend of superior  quality products to our customers. 
    We do not carry anything that is not  well made. Our job is to ensure each client is getting the best quality  
    for the money they spent. We attribute our success to our dedication and uncompromised service to our customers. 
    We are committed to provide our customer with the best service possible. We consider each sale as an  
    everlasting relationship, and believe in keeping our customers always  satisfied by protecting their 
    rights and offering the finest products  through our quality conscious efforts. Our philosophy is to give 
    Quality sales and Customer service.
    
    Our future holds the promise of even  greater achievements, 
    provided we remain forward-looking,  performance-oriented and agile, capitalize on our strengths and  eliminate 
    our weaknesses. What we do have is the vision, the commitment  and the expertise to become a leader among the 
    jewellers, where  leadership is not just being the biggest, but the best — in terms of  
    people and their competitiveness, the Quality of our products, the Value we provide to our Customers, 
    and all our business processes. We  continue to develop our staff and try every means to improve our 
    service and product quality. Your needs and feedbacks are important to us;  please contact us for your comments. 
    Many thanks for your past support  and we look forward to serving you in near future.`,
  },
  {
    name: "Abhilash K V",
    role: "Managing Partner, Bindu Jewellery",
    image: "/assets/images/mp01-pic.png",
    message: `Quality is what we are most concerned about here as there is no  compromise on quality. 
    Our mission is to offer unique blend of superior  quality products to our customers. 
    We do not carry anything that is not  well made. Our job is to ensure each client is getting the best quality  
    for the money they spent. We attribute our success to our dedication and uncompromised service to our customers. 
    We are committed to provide our customer with the best service possible. We consider each sale as an  
    everlasting relationship, and believe in keeping our customers always  satisfied by protecting their 
    rights and offering the finest products  through our quality conscious efforts. Our philosophy is to give 
    Quality sales and Customer service.
    
    Our future holds the promise of even  greater achievements, 
    provided we remain forward-looking,  performance-oriented and agile, capitalize on our strengths and  eliminate 
    our weaknesses. What we do have is the vision, the commitment  and the expertise to become a leader among the 
    jewellers, where  leadership is not just being the biggest, but the best — in terms of  
    people and their competitiveness, the Quality of our products, the Value we provide to our Customers, 
    and all our business processes. We  continue to develop our staff and try every means to improve our 
    service and product quality. Your needs and feedbacks are important to us;  please contact us for your comments. 
    Many thanks for your past support  and we look forward to serving you in near future.`,
  },
  {
    name: "Ajithesh K V",
    role: "Managing Partner, Bindu Jewellery",
    image: "/assets/images/mp02-pic.png",
    message: `Quality is what we are most concerned about here as there is no  compromise on quality. 
    Our mission is to offer unique blend of superior  quality products to our customers. 
    We do not carry anything that is not  well made. Our job is to ensure each client is getting the best quality  
    for the money they spent. We attribute our success to our dedication and uncompromised service to our customers. 
    We are committed to provide our customer with the best service possible. We consider each sale as an  
    everlasting relationship, and believe in keeping our customers always  satisfied by protecting their 
    rights and offering the finest products  through our quality conscious efforts. Our philosophy is to give 
    Quality sales and Customer service.
    
    Our future holds the promise of even  greater achievements, 
    provided we remain forward-looking,  performance-oriented and agile, capitalize on our strengths and  eliminate 
    our weaknesses. What we do have is the vision, the commitment  and the expertise to become a leader among the 
    jewellers, where  leadership is not just being the biggest, but the best — in terms of  
    people and their competitiveness, the Quality of our products, the Value we provide to our Customers, 
    and all our business processes. We  continue to develop our staff and try every means to improve our 
    service and product quality. Your needs and feedbacks are important to us;  please contact us for your comments. 
    Many thanks for your past support  and we look forward to serving you in near future.`,
  },
];

export default function LeadershipSection() {
  return (
    <>
       <>
      <Banner Title="Our Leadership"/>


    </>
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

          {/* Team Members */}
          <div className="space-y-16">
              {teamMembers.map((member, index) => (
                  <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start"
                  >
                      {/* Image */}
                      <div
                          className={`flex justify-center ${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}
                      >
                          <img
                              src={member.image}
                              alt={member.name}
                              className=" w-full 
    max-w-[320px] sm:max-w-[360px] md:max-w-[400px] 
    h-[280px] sm:h-[360px] md:h-[500px] 
    object-cover rounded-lg shadow-md" />
                      </div>

                      {/* Text */}
                      <div
                          className={`md:col-span-2 ${index % 2 === 1 ? "md:order-1 md:text-right" : "md:order-2"}`}
                      >
                          {member.title && (
                              <h3 className="text-lg font-semibold text-[#d4b262] mb-1">
                                  {member.title}
                              </h3>
                          )}
                          <h4 className="text-xl font-bold">{member.name}</h4>
                          <p className="text-sm font-medium text-gray-700 mb-4">
                              {member.role}
                          </p>
                          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                              {member.message}
                          </p>
                      </div>
                  </div>
              ))}
          </div>
      </section>
      <SubscribeNewsletter />
      <FreeshipingComp />
      </>
     
  );
}
