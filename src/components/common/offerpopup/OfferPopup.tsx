"use client";
import React, { useEffect, useState, useRef } from "react";

export default function OfferPopup() {
  const [showPopup, setShowPopup] = useState(false);
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

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        ref={popupRef}
        className="bg-white shadow-lg p-4 max-w-md w-full relative"
      >
        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl bg-white p-1"
        >
          ✕
        </button>

        {/* Banner Image */}
        <img
          src="/assets/images/popup-banner.jpg" // place your banner in /public folder in Next.js
          alt="Special Offer - Book Your Gold in Advance"
          className=" w-full h-auto"
        />
      </div>
    </div>
  );
}
