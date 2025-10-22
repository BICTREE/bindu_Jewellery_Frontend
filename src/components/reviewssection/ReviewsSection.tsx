"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Swiper as SwiperType } from "swiper"; // ✅ import the Swiper type

const ReviewsSection = () => {
  const [activeTab, setActiveTab] = useState<"clients" | "press">("clients");
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0); // absolute slide index
 const swiperRef = useRef<SwiperType | null>(null);

  // Set slidesPerView based on window width
  const getSlidesPerView = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width >= 1024) return 4; // desktop
    if (width >= 768) return 2;  // tablet
    return 1;                     // mobile
  };

  useEffect(() => {
    const handleResize = () => {
      const spv = getSlidesPerView();
      setSlidesPerView(spv);

      // Update activeSlide so pagination is correct
      if (swiperRef.current) {
        setActiveSlide(swiperRef.current.activeIndex);
      }
    };
    handleResize(); // initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clientReviews = [
    { name: "Lea L.", title: "Verified Reviewer", stars: 5, review: "The diamonds in this ring are absolutely stunning! They're beautiful and shine brilliantly.", product: "Alyssa Radiant Bouquet Ring", image: "/assets/images/re01.jpg" },
    { name: "Jay L.", title: "Verified Reviewer", stars: 5, review: "Beautiful! Even better than expected. An impressive diamond necklace for any occasion.", product: "Captivating Necklace", image: "/assets/images/re02.jpg" },
    { name: "Leya", title: "Verified Reviewer", stars: 5, review: "Exquisite. Absolutely beyond gorgeous in person. This is the perfect diamond bangle.", product: "Pyramid Luxe Geometric Bangle", image: "/assets/images/re03.jpg" },
    { name: "Leya", title: "Verified Reviewer", stars: 5, review: "Exquisite. Absolutely beyond gorgeous in person. This is the perfect diamond bangle.", product: "Pyramid Luxe Geometric Bangle", image: "/assets/images/re03.jpg" },
    { name: "Leya", title: "Verified Reviewer", stars: 5, review: "Exquisite. Absolutely beyond gorgeous in person. This is the perfect diamond bangle.", product: "Pyramid Luxe Geometric Bangle", image: "/assets/images/re03.jpg" },
    { name: "Leya", title: "Verified Reviewer", stars: 5, review: "Exquisite. Absolutely beyond gorgeous in person. This is the perfect diamond bangle.", product: "Pyramid Luxe Geometric Bangle", image: "/assets/images/re03.jpg" },
  ];

  const pressReviews = [
    { name: "Jewellery Weekly", title: "Press Review", stars: 5, review: "Bindu Jewellery continues to impress with their Blue Diamond range — timeless elegance meets modern artistry.", product: "Editorial Feature", image: "/assets/images/re01.jpg" },
    { name: "Luxury Times", title: "Press Review", stars: 5, review: "Their craftsmanship and attention to detail have raised the standard of fine diamond jewellery.", product: "Luxury Times Feature", image: "/assets/images/re01.jpg" },
  ];

  const reviews = activeTab === "clients" ? clientReviews : pressReviews;

  // Active pagination dot index
  const activePageIndex = Math.floor(activeSlide / slidesPerView);

  return (
    <section className="bg-[#f9f9fb] py-14">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-6">The Reviews</h2>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-10">
          <button onClick={() => setActiveTab("clients")} className={`uppercase tracking-wide text-sm sm:text-base border-b-2 pb-1 transition-colors ${activeTab === "clients" ? "border-gray-800 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            From Our Clients
          </button>
          <button onClick={() => setActiveTab("press")} className={`uppercase tracking-wide text-sm sm:text-base border-b-2 pb-1 transition-colors ${activeTab === "press" ? "border-gray-800 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            From The Press
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={slidesPerView}
       
           onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-[400px] transition hover:shadow-xl">
                <div className="flex flex-col flex-1 overflow-hidden">
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{review.title}</p>
                  <div className="flex justify-center mb-3">
                    {Array(review.stars).fill(0).map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base mb-4 line-clamp-3">{review.review}</p>
                  <button className="text-blue-600 text-sm font-medium hover:underline mt-auto">Read More...</button>
                </div>
                <div className="mt-4">
                  <div className="relative w-full h-24 mx-auto mb-2">
                    <Image src={review.image} alt={review.product} fill className="object-contain" />
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm">{review.product}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation & Pagination */}
        <div className="flex items-center justify-center gap-6 mt-6 w-full">
          {/* Prev Button */}
          <button onClick={() => swiperRef.current?.slidePrev()} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow hover:bg-[#d4b262] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Pagination */}
          <div className="flex gap-2 justify-center">
            {Array(Math.ceil(reviews.length / slidesPerView)).fill(0).map((_, idx) => (
              <span
                key={idx}
                onClick={() => swiperRef.current?.slideTo(idx * slidesPerView)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${activePageIndex === idx ? "bg-[#d4b262]" : "bg-gray-300"}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button onClick={() => swiperRef.current?.slideNext()} className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow hover:bg-[#d4b262] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
