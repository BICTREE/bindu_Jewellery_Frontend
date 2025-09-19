// Stats.jsx
import React from "react";

export default function Stats() {
  const stats = [
    { value: "50+", label: "Years Of Experience" },
    { value: "02", label: "Store Locations" },
    { value: "20M+", label: "Happy Customer" },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map((item, index) => (
          <div key={index}>
            <h3 className="text-4xl sm:text-5xl font-extrabold text-[#d4b262] mb-2">
              {item.value}
            </h3>
            <p className="text-lg font-semibold text-gray-900 leading-snug">
              {item.label.split(" ").slice(0, -1).join(" ")} <br />
              {item.label.split(" ").slice(-1)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
