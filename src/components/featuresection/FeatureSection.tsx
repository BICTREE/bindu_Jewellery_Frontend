"use client";
import React from "react";

const features = [
  {
    id: 1,
    img: "/assets/images/Designer_Quality_300x.png",
    title: "Designer Quality",
    description:
      "Our seasoned artisans work their magic to turn the finest diamonds and gold into magnificently handcrafted fine jewelry, one that is made with a whole lot of passion, precision, and love.",
  },
  {
    id: 2,
    img: "/assets/images/Sustainability_300x.png",
    title: "Sustainability",
    description:
      "Each lab-grown diamond crafted by Verlas embodies sustainability in its truest form, while sharing the same dazzling chemistry and radiant dance with light as its natural counterpart.",
  },
  {
    id: 3,
   img: "/assets/images/Certified_Jewelry_300x.png",
    title: "Certified Jewelry",
    description:
      "We are proud to have earned the Butterfly Mark from Positive Luxury for our sustainable and ethical practices, as well as IGI certification for the authenticity of our diamonds.",
  },
  {
    id: 4,
  img: "/assets/images/Shipping_Returns_300x.png",
    title: "Easy Shipping & Returns",
    description:
      "Our Studios work tirelessly to ensure that your jewelry is nothing short of perfection. If you’re not happy with your jewelry, you can return or exchange it within 48 hours.",
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center p-4 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={feature.img}
              alt={feature.title}
              className="w-14 h-14 object-contain mb-4"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
