"use client";
import React, { useEffect, useState, useRef } from "react";

export default function OfferPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [shake, setShake] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Show popup after 1 second
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    // Auto-hide after 10 seconds
    const autoClose = setTimeout(() => {
      setShowPopup(false);
    }, 15000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoClose);
    };
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    }

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  // Shake popup on scroll
  useEffect(() => {
    function handleScroll() {
      if (!shake) {
        setShake(true);
        setTimeout(() => setShake(false), 1000);
      }
    }

    if (showPopup) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showPopup, shake]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-100 flex items-center justify-center pt-15">
      <div
        ref={popupRef}
        className={`bg-white shadow-lg p-1 w-[90%] sm:w-[450px] md:w-[550px] rounded-lg relative transition-transform duration-500 ${
          shake ? "animate-shake" : ""
        }`}
      >
        {/* Close Button */} 
<button
  onClick={() => setShowPopup(false)}
  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center 
             rounded-full bg-black/60 text-white hover:bg-black 
             transition shadow-md"
>
  ✕
</button>



        {/* Banner Image */}
        <img
          src="/assets/images/popup0125.jpg"
          alt="Special Offer - Book Your Gold in Advance"
          className="w-full h-auto rounded-md"
        />
      </div>
    </div>
  );
}
