"use client";
import { getBanner } from "@/services/BannerService/bannerSerice";
import React, { useState, useEffect } from "react";

type Banner = {
  _id: string;
  title: string;
  subtitle: string;
  panel: string;
  index: number;
  screenType: "desktop" | "mobile";
  image: {
    name: string;
    key: string;
    location: string;
    _id: string;
  };
  buttonText?: string;
  buttonLink?: string;
  createdAt: string;
  updatedAt: string;
};

// Fallback images
const FALLBACK_IMAGES = {
  desktop: "/assets/images/hero2.jpg",
  mobile: "/assets/images/mob-hero01.png"
};

const Hero = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  // Fetch banners on component mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBanner();
        setBanners(data || []);
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("Failed to load banners. Showing default content.");
        setBanners([]); // Ensure banners is empty to trigger fallback
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Handle image loading errors
  const handleImageError = (imageUrl: string, screenType: "desktop" | "mobile") => {
    setImageErrors(prev => ({
      ...prev,
      [imageUrl]: true
    }));
    console.warn(`Failed to load ${screenType} image: ${imageUrl}`);
  };

  // Filter banners for home panel
  const homeBanners = banners.filter(banner => banner.panel === "home");

  // Get slides based on screen type - SEPARATE for desktop and mobile
  const getDesktopSlides = () => {
    const desktopBanners = homeBanners
      .filter(banner => banner.screenType === "desktop")
      .sort((a, b) => a.index - b.index);

    // If no desktop banners, return fallback
    if (desktopBanners.length === 0 || error) {
      return [
        {
          img: FALLBACK_IMAGES.desktop,
          title: "Welcome to Our Store",
          subtitle: "Discover our exclusive collection",
          buttonText: "Shop Now",
          buttonLink: "/products",
          originalImg: undefined
        }
      ];
    }

    return desktopBanners.map(banner => ({
      img: banner.image?.location || FALLBACK_IMAGES.desktop,
      title: banner.title || "Welcome to Our Store",
      subtitle: banner.subtitle || "Discover our exclusive collection",
      buttonText: banner.buttonText || "Shop Now",
      buttonLink: banner.buttonLink || "/products",
      originalImg: banner.image?.location
    }));
  };

  const getMobileSlides = () => {
    const mobileBanners = homeBanners
      .filter(banner => banner.screenType === "mobile")
      .sort((a, b) => a.index - b.index);

    // If no mobile banners, return fallback
    if (mobileBanners.length === 0 || error) {
      return [
        {
          img: FALLBACK_IMAGES.mobile,
          title: "Welcome to Our Store",
          subtitle: "Discover our exclusive collection",
          buttonText: "Shop Now",
          buttonLink: "/products",
          originalImg: undefined
        }
      ];
    }

    return mobileBanners.map(banner => ({
      img: banner.image?.location || FALLBACK_IMAGES.mobile,
      title: banner.title || "Welcome to Our Store",
      subtitle: banner.subtitle || "Discover our exclusive collection",
      buttonText: banner.buttonText || "Shop Now",
      buttonLink: banner.buttonLink || "/products",
      originalImg: banner.image?.location
    }));
  };

  // Get the appropriate slides based on device
  const desktopSlides = getDesktopSlides();
  const mobileSlides = getMobileSlides();

  // Use the appropriate slides based on device
  const slides = typeof window !== 'undefined' && window.innerWidth < 768 ? mobileSlides : desktopSlides;

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Get the actual image source considering errors
  const getImageSource = (slide: any) => {
    const fallbackUrl = typeof window !== 'undefined' && window.innerWidth < 768 
      ? FALLBACK_IMAGES.mobile 
      : FALLBACK_IMAGES.desktop;
    
    // If there was an error loading this specific image, use fallback
    if (slide.originalImg && imageErrors[slide.originalImg]) {
      return fallbackUrl;
    }
    
    // If no original URL (already using fallback), or if we have original URL but no error yet
    return slide.img;
  };

  // Show fallback images during loading
  if (loading) {
    return (
      <div className="relative w-full overflow-hidden">
        <div className="relative w-full h-[550px] md:h-[450px]">
          {/* Show fallback image during loading */}
          <img
            src={typeof window !== 'undefined' && window.innerWidth < 768 ? FALLBACK_IMAGES.mobile : FALLBACK_IMAGES.desktop}
            alt="Loading..."
            className="w-full h-full object-cover"
          />
          
          {/* Loading overlay with spinner */}
          {/* <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
              <div className="text-white text-lg font-semibold">Loading banners...</div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }

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
            {/* Single image that changes based on device */}
            <img
              src={getImageSource(slide)}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={() => {
                if (slide.originalImg) {
                  const screenType = typeof window !== 'undefined' && window.innerWidth < 768 ? "mobile" : "desktop";
                  handleImageError(slide.originalImg, screenType);
                }
              }}
            />
          </div>
        ))}
      </div>

      {/* Indicators - Only show if there are multiple slides */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-[3px] w-[30px] transition-all duration-300 ${
                index === current 
                  ? "bg-white opacity-100" 
                  : "bg-white opacity-50 hover:opacity-75"
              }`}
            />
          ))}
        </div>
      )}

      {/* Controls - Only show if there are multiple slides */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-[15%] text-white opacity-50 hover:opacity-90 transition-opacity duration-300"
            aria-label="Previous slide"
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
            className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-[15%] text-white opacity-50 hover:opacity-90 transition-opacity duration-300"
            aria-label="Next slide"
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
        </>
      )}

      {/* Error message banner */}
      {error && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default Hero;