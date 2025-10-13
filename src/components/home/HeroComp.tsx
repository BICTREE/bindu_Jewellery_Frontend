"use client";
import React, { useState } from "react";

const Hero = () => {
  const slides = [
    {
      img: "/assets/images/hero2.jpg",
      mobileImg: "/assets/images/mob-hero01.png",
      title: "First slide label",
    },
    {
      img: "/assets/images/hero2.jpg",
      mobileImg: "/assets/images/mob-hero01.png",
      title: "Second slide label",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-[550px] md:h-[450px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Mobile Image */}
            <img
              src={slide.mobileImg}
              alt={slide.title}
              className="w-full h-full object-cover block md:hidden"
            />
            {/* Desktop / Tablet Image */}
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover hidden md:block"
            />

            {/* Optional text */}
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              {/* <h5 className="text-xl font-semibold">{slide.title}</h5> */}
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-[3px] w-[30px] bg-white transition-opacity duration-300 ${
              index === current ? "opacity-100" : "opacity-50"
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-[15%] text-white opacity-50 hover:opacity-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-[15%] text-white opacity-50 hover:opacity-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
