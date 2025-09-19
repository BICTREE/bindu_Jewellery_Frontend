// MissionVision.jsx
import React from "react";

export default function MissionVision() {
  const items = [
    {
      title: "Mission",
      heading: "Our Motto Is Simple",
      text: "At Bindu Jewellery, our mission is to craft and offer a wide range of exquisite gold, diamond, birthstone, and silver pieces that beautifully blend traditional artistry with modern design. We are dedicated to making every customer’s experience memorable through personalized service and meaningful creations for life’s special moments. Rooted in the legacy of trust since 1981, we continue to uphold the values of quality, integrity, and craftsmanship in everything we do.",
    },
    {
      title: "Vision",
      heading: "Our Motto Is Simple",
      text: "Bindu Jewellery envisions becoming the trusted family jeweller of Southern India by expanding its presence across the region, preserving traditional craftsmanship, and staying deeply connected to the community through meaningful celebrations and initiatives.",
    },
  ];

  return (
    <section className="relative">
      {/* Background image */}
      <div
        className=" lg:bg-fixed bg-cover bg-center h-64 sm:h-80 md:h-[150px] lg:h-[250px]"
        style={{ backgroundImage: "url('./assets/images/gift01.png')" }}
      ></div>

      {/* Overlapping boxes */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 relative z-10 ">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 -mt-6 sm:-mt-10 md:-mt-16 lg:-mt-20 xl:-mt-28"
          >
            <p className="text-yellow-600 font-semibold uppercase text-sm mb-2">
              {item.title}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {item.heading}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>


  );
}
