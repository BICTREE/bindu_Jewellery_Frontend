"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { X, ChevronLeft, ChevronRight, Play, Image as ImageIcon, Youtube } from "lucide-react";
import Link from "next/link";
import { GetAllMedia } from "@/services/mediaService/mediaService";

type MediaItem = {
  _id: string;
  filetype: "image" | "video" | "youtube";
  file?: {
    name: string;
    key: string;
    location: string;
    _id: string;
  };
  youtubeLink?: string;
  title: string;
  description: string;
  tags: string[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Loading Skeleton Component
const MediaSkeleton = () => {
  return (
    <section className="container mx-auto py-15">
      <div className="animate-pulse">
        {/* Title Skeleton */}
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>

        {/* Swiper Skeleton */}
        <div className="relative flex items-center justify-center w-full">
          {/* Left Nav Skeleton */}
          <div className="absolute left-0 md:-left-10 z-20 w-10 h-10 bg-gray-300 rounded-full"></div>

          {/* Swiper Slides Skeleton */}
          <div className="w-[98%] flex justify-center items-center">
            <div className="flex justify-center items-center gap-4 w-full">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex-1 max-w-md aspect-[16/9] overflow-hidden rounded-lg"
                >
                  <div className="w-full h-full bg-gray-300 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Nav Skeleton */}
          <div className="absolute right-0 md:-right-10 z-20 w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>

        {/* Button Skeleton */}
        <div className="text-center mt-6">
          <div className="inline-block h-10 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Loading Skeleton with Shimmer Effect
const MediaSkeletonWithShimmer = () => {
  return (
    <section className="container mx-auto py-10">
      {/* Title Skeleton */}
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-100 rounded w-64 mx-auto animate-pulse"></div>
      </div>

      {/* Swiper Container with Shimmer */}
      <div className="relative flex items-center justify-center w-full">
        {/* Left Nav Skeleton */}
        <div className="absolute left-0 md:-left-10 z-20 w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>

        {/* Swiper Slides Skeleton */}
        <div className="w-[98%] flex justify-center items-center">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            className="flex justify-center items-center"
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
          >
            {[...Array(6)].map((_, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center overflow-hidden rounded-lg"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200 rounded-lg animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Nav Skeleton */}
        <div className="absolute right-0 md:-right-10 z-20 w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Button Skeleton */}
      <div className="text-center mt-6">
        <div className="inline-block h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>

      {/* Add shimmer animation CSS */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default function MediaComp() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Fetch media data
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get latest 10 media items
        const data = await GetAllMedia({ 
          page: 1, 
          entries: 10 
        });
        
        if (data && Array.isArray(data)) {
          setMediaItems(data);
        } else {
          setMediaItems([]);
        }
      } catch (err) {
        console.error("Error fetching media:", err);
        setError("Failed to load media");
        setMediaItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  useEffect(() => {
    if (!swiperInstance || !prevRef.current || !nextRef.current) return;
    if (
      swiperInstance.params.navigation &&
      typeof swiperInstance.params.navigation !== "boolean"
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
    }
    swiperInstance.navigation.init();
    swiperInstance.navigation.update();
  }, [swiperInstance, mediaItems]);

  // Fixed YouTube thumbnail function
  const getYoutubeThumbnail = (link: string): string => {
    try {
      let videoId = '';
      
      // Handle different YouTube URL formats
      if (link.includes('youtube.com/watch?v=')) {
        videoId = link.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
      } else if (link.includes('youtu.be/')) {
        videoId = link.split('youtu.be/')[1];
        const questionMarkPosition = videoId.indexOf('?');
        if (questionMarkPosition !== -1) {
          videoId = videoId.substring(0, questionMarkPosition);
        }
      } else if (link.includes('youtube.com/embed/')) {
        videoId = link.split('embed/')[1];
        const slashPosition = videoId.indexOf('/');
        if (slashPosition !== -1) {
          videoId = videoId.substring(0, slashPosition);
        }
      }

      // Clean up any remaining parameters
      videoId = videoId.split('?')[0].split('&')[0];

      if (!videoId) {
        console.warn('Could not extract YouTube video ID from:', link);
        return '/assets/images/placeholder.jpg';
      }

      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } catch (error) {
      console.error('Error generating YouTube thumbnail:', error);
      return '/assets/images/placeholder.jpg';
    }
  };

  const renderLightboxContent = (item: MediaItem) => {
    if (item.filetype === "image" && item.file?.location) {
      return (
        <img
          src={item.file.location}
          alt={item.title}
          className="rounded-xl max-h-[80vh] mx-auto shadow-2xl"
        />
      );
    }
    if (item.filetype === "video" && item.file?.location) {
      return (
        <video
          src={item.file.location}
          controls
          autoPlay
          className="rounded-xl mx-auto  shadow-2xl aspect-[18/9]  overflow-hidden"
        />
      );
    }
    if (item.filetype === "youtube" && item.youtubeLink) {
      const embedUrl = item.youtubeLink
        .replace('watch?v=', 'embed/')
        .replace('youtu.be/', 'youtube.com/embed/')
        .split('&')[0]; // Remove any additional parameters

      return (
        <iframe
          src={item.youtubeLink.replace("watch?v=", "embed/")}
          className="w-full h-[60vh] rounded-xl shadow-2xl mx-auto"
          title="YouTube Video"
          allowFullScreen
        />
      );
    }
    return (
      <div className="rounded-xl max-h-[80vh] mx-auto shadow-2xl bg-gray-200 flex items-center justify-center w-96 h-64">
        <p className="text-gray-500">Media not available</p>
      </div>
    );
  };

  const renderMediaThumbnail = (item: MediaItem) => {
    if (item.filetype === "image" && item.file?.location) {
      return (
        <img
          src={item.file.location}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/images/placeholder.jpg';
          }}
        />
      );
    }
    if (item.filetype === "video" && item.file?.location) {
      return (
        <video
          src={item.file.location}
          className="w-full h-full object-cover"
          muted
          playsInline
        />
      );
    }
    if (item.filetype === "youtube" && item.youtubeLink) {
      const thumbnailUrl = getYoutubeThumbnail(item.youtubeLink);
      console.log('YouTube URL:', item.youtubeLink, 'Thumbnail:', thumbnailUrl); // Debug log
      
      return (
        <img
          src={thumbnailUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.log('YouTube thumbnail failed to load, using placeholder');
            (e.target as HTMLImageElement).src = '/assets/images/placeholder.jpg';
          }}
        />
      );
    }
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-sm">No preview</p>
      </div>
    );
  };

  // EXACT ORIGINAL LIGHTBOX UI
  const renderLightbox = () => {
    if (!lightboxOpen) return null;
    const selected = mediaItems[currentIndex];

    return (
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
        onClick={() => setLightboxOpen(false)}
      >
        <div
          className="relative max-w-5xl w-full mt-10 bg-gradient-to-b from-[#fff9f2]/95 to-[#fff3e1]/95 rounded-3xl p-3 shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-[#d4b262]/20"
          onClick={(e) => e.stopPropagation()} 
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-2 right-2 bg-[#d4b262] hover:bg-[#c5a44e] text-white p-2 rounded-full transition"
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) =>
                prev === 0 ? mediaItems.length - 1 : prev - 1
              );
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#d4b262]/90 hover:bg-[#c5a44e] text-white p-3 rounded-full"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) =>
                prev === mediaItems.length - 1 ? 0 : prev + 1
              );
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#d4b262]/90 hover:bg-[#c5a44e] text-white p-3 rounded-full"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex flex-col items-center space-y-2">
            {renderLightboxContent(selected)}
          </div>
        </div>
      </div>
    );
  };

  // Show loading skeleton while loading
  if (loading) {
    return <MediaSkeletonWithShimmer />;
  }

  if (error) {
    return (
      <section className="container mx-auto py-10">
        <h2 className="font-prata text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          Media
        </h2>
        <p className="text-gray-500 text-center mb-8 pt-2">
          Prepare To Elevate Your Sense Of Style With Our Latest Collection!
        </p>
        <div className="text-center py-10 text-red-500">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (mediaItems.length === 0) {
    return (
      <section className="container mx-auto py-10">
        <h2 className="font-prata text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          Media
        </h2>
        <p className="text-gray-500 text-center mb-8 pt-2">
          Prepare To Elevate Your Sense Of Style With Our Latest Collection!
        </p>
        <div className="text-center py-10 text-gray-500">
          <p>No media available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-10">
      <h2 className="font-prata text-2xl sm:text-3xl md:text-4xl font-bold text-center">
        Media
      </h2>
      <p className="text-gray-500 text-center mb-8 pt-2">
        Prepare To Elevate Your Sense Of Style With Our Latest Collection!
      </p>

      <div className="relative flex items-center justify-center w-full">
        {/* Left Nav */}
        <button
          ref={prevRef}
          className="absolute left-0 md:-left-10 z-20 flex items-center justify-center w-10 h-10 border border-gray-300 text-black rounded-full bg-white hover:bg-[#d4b262] hover:text-white transition"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Swiper */}
        <div className="w-[98%] flex justify-center items-center">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            // centeredSlides={true}
            onSwiper={setSwiperInstance}
            // loop={mediaItems.length > 1}
            className="flex justify-center items-center"
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
          >
            {mediaItems.map((item, index) => (
              <SwiperSlide
                key={item._id}
                className="flex justify-center items-center overflow-hidden rounded-lg"
              >
                <div
                  onClick={() => {
                    setCurrentIndex(index);
                    setLightboxOpen(true);
                  }}
                  className="relative w-full aspect-[16/9] overflow-hidden cursor-pointer group bg-black/5 rounded-lg 
                             transition-transform duration-500 hover:scale-[1.03]"
                >
                  {renderMediaThumbnail(item)}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-all duration-300">
                    {item.filetype === "video" ? (
                      <Play className="text-white w-8 h-8 drop-shadow-lg" />
                    ) : item.filetype === "youtube" ? (
                      <Youtube className="text-white w-8 h-8 drop-shadow-lg" />
                    ) : (
                      <ImageIcon className="text-white w-8 h-8 drop-shadow-lg" />
                    )}
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium truncate">
                      {item.title}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Nav */}
        <button
          ref={nextRef}
          className="absolute right-0 md:-right-10 z-20 flex items-center justify-center w-10 h-10 border border-gray-300 text-black rounded-full bg-white hover:bg-[#d4b262] hover:text-white transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Single View More Button */}
      <div className="text-center mt-6">
        <Link
          href="/gallery"
          className="inline-block px-6 py-2 border-1 border-[#d4b262] text-[#d4b262] font-semibold rounded transition-all duration-300 hover:bg-[#d4b262] hover:text-white"
        >
          View More
        </Link>
      </div>

      {renderLightbox()}
    </section>
  );
}