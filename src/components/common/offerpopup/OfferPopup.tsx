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
    }, 10000);

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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div
        ref={popupRef}
        className={`bg-white shadow-lg p-1 w-[90%] sm:w-[450px] md:w-[550px] rounded-t-lg relative mb-6 transition-transform duration-500 ${
          shake ? "animate-shake" : ""
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 text-xl bg-white p-1 rounded-full"
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
