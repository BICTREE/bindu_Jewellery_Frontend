"use client";

import React, { useState, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-2 rounded-full shadow-lg transition-all duration-300 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} 
        bg-[#d4b262] text-white hover:bg-[#000]`}
      aria-label="Back to top"
    >
      <FiChevronUp className="text-2xl" />
    </button>
  );
};

export default BackToTop;
