"use client";
import React from "react";

export default function ProcessToLogin({ downloadLink = "#", buttonText = "Download Now" }) {
  const steps = [
    { img: "/assets/images/app icon-01.png" },
    { img: "/assets/images/app icon-02.png" },
    { img: "/assets/images/app icon-03.png" },
    { img: "/assets/images/app icon-04.png" },
  ];

  return (
    <section className="bg-[#ffffff]  py-10 md:py-15 px-10 m-0  text-center">
      <h2 className=" text-[#6a1a0b] text-2xl sm:text-3xl font-serif text-center font-semibold mb-10">
        Process to Login
      </h2>

      {/* Outer rounded box */}
      <div className="bg-[#fff4ec] border border-[#e4bfa8] rounded-2xl max-w-6xl mx-auto p-6 md:p-10 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={step.img}
                alt={`Step ${index + 1}`}
                className="w-56 h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <a href={downloadLink} target="_blank" rel="noopener noreferrer">
        <button className="mt-10 bg-[#d2691e] hover:bg-[#b85d1a] text-white font-medium px-6 py-2 rounded-md transition-all">
          {buttonText}
        </button>
      </a>
    </section>
  );
}
