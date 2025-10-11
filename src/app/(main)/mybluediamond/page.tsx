"use client";
import React from "react";
import Image from "next/image";
import Banner from "@/components/common/Banner/Banner";

const MyBlueDiamondPage = () => {
  const sections = [
    {
      title: "Exclusivity Redefined. Where Rarity Meets Radiance.",
      content: [
        "My Blue Diamonds at Bindu Jewellery represents the ultimate expression of luxury, individuality, and modern artistry. This collection is not just about jewellery; it is about creating heirlooms that speak to one’s unique sense of style and sophistication. Every diamond in this collection is carefully chosen for its rare brilliance, purity, and unmatched fire — ensuring that each creation stands as a masterpiece in itself."
      ],
      image: "/assets/images/diamind-01.png"
    },
    {
      title: "Celebrating Exclusivity and Craftsmanship",
      content: [
        "My Blue Diamonds celebrates the spirit of those who appreciate exclusivity — people who seek distinction in every detail and elegance in every facet. The designs are inspired by international aesthetics yet remain rooted in the timeless artistry that defines Bindu Jewellery. From striking statement pieces to delicately crafted engagement rings, each jewel in this collection evokes confidence, poise, and enduring allure. With an emphasis on craftsmanship and innovation, every cut and setting in My Blue Diamonds reflects precision and passion, ensuring that your jewellery shines with unmatched brilliance and grace."
      ],
        image: "/assets/images/diamind-02.png"
    },
    {
      title: "A Story of Purity, Creativity, and Timeless Elegance",
      content: [
        "What makes My Blue Diamonds extraordinary is not just the sparkle, but the story behind it — a story of purity, creativity, and purpose. At Bindu Jewellery, we ensure that every My Blue Diamonds creation carries the brand’s unwavering commitment to quality and transparency. These pieces are designed for those who do not simply follow trends but define them, turning every glance into admiration and every occasion into a moment to remember.",
        "Each My Blue Diamonds jewel is more than an ornament — it is an investment in elegance, a celebration of individuality, and a promise of brilliance that lasts a lifetime."
      ],
      image: "/assets/images/diamind-03.png"
    }
  ];

  return (
    <>
      <Banner Title="My Blue Diamonds" />

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

export default MyBlueDiamondPage;
