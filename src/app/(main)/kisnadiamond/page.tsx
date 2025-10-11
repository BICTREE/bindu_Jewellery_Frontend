"use client";
import React from "react";
import Image from "next/image";
import Banner from "@/components/common/Banner/Banner";
const KisnaPage = () => {
 const sections = [
    {
      title: "Crafted with Precision. Designed for Timeless Elegance.",
      content: [
        "At Bindu Jewellery, we understand that diamonds are more than adornments — they are reflections of love, milestones, and personal triumphs. Through our exclusive association with KISNA Diamonds, we bring you a collection that blends the art of fine craftsmanship with the assurance of purity and brilliance. Every KISNA diamond is ethically sourced, expertly cut, and meticulously crafted, resulting in jewellery that shines with integrity as much as it does with light."
      ],
      image: "/assets/images/kisna012.png"
    },
    {
      title: "  KISNA Collection: Elegance, Tradition, and Modern Luxury",
      content: [
        "The KISNA Collection is a tribute to the modern woman who embraces tradition yet defines her own path. From minimal everyday pieces that add a graceful touch to daily life, to grand bridal creations that make unforgettable statements, KISNA designs embody versatility, elegance, and perfection. Each piece is crafted using advanced precision techniques to ensure symmetry, brilliance, and lasting beauty. What truly sets KISNA apart is its dedication to responsible luxury — every diamond is certified for authenticity, and every creation is designed to uphold the values of trust and transparency that Bindu Jewellery stands for."
      ],
        image: "/assets/images/kisna013.png"
    },
    {
      title: "A Story of Purity, Creativity, and Timeless Elegance",
      content: [
        
        "For over four decades, Bindu Jewellery has been synonymous with craftsmanship and care, and KISNA Diamonds beautifully extends this legacy. Whether it is an anniversary, a ",
"celebration, or a gift of love, KISNA Diamonds offer more than sparkle — they offer a story, a promise, and a lifetime of cherished memories. Because true beauty, much like true trust, never fades."

      ],
      image: "/assets/images/diamind-03.png"
    }
  ];

  return (
    <>
      <Banner Title="KISNA Diamonds" />

      <section className="py-16 px-4 md:px-16 bg-white text-gray-800">
        <div className="space-y-16">
          {sections.map((section, index) => (
          <div
  key={index}
  className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch"
>
  {/* Image */}
  <div
    className={`flex justify-center ${
      index % 2 === 1 ? "md:order-2" : "md:order-1"
    }`}
  >
     <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-[300px] shadow-md rounded-md overflow-hidden">
      <Image
        src={section.image}
        alt={section.title}
        fill
        className="object-cover rounded-md"
      />
    </div>
  </div>

  {/* Text */}
  <div
    className={`md:col-span-2 flex flex-col justify-center ${
      index % 2 === 1 ? "md:order-1 md:text-right" : "md:order-2"
    }`}
  >
    <div className="flex flex-col justify-center h-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        {section.title}
      </h2>
      <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
        {section.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  </div>
</div>

          ))}
        </div>
      </section>
    </>
  );
};
export default KisnaPage;
