"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { X, ChevronLeft, ChevronRight, Play, Image as ImageIcon, Youtube } from "lucide-react";
import Link from "next/link";

type MediaItem = {
  id: number;
  type: "image" | "video" | "youtube";
  img?: string;
  video?: string;
  youtubeLink?: string;
};

const products: MediaItem[] = [
  { id: 1, type: "image", img: "/assets/images/media01.png" },
  { id: 2, type: "image", img: "/assets/images/mission.png" },
  { id: 3, type: "video", video: "/assets/videos/bindhu-ad.mp4" },
  { id: 4, type: "youtube", youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 5, type: "image", img: "/assets/images/media01.png" },
  { id: 6, type: "image", img: "/assets/images/media01.png" },
];

export default function MediaComp() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

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
  }, [swiperInstance]);

  const getYoutubeThumbnail = (link: string) => {
    const videoId = link.split("v=")[1];
    if (!videoId) return "";
    const ampersandPosition = videoId.indexOf("&");
    return `https://img.youtube.com/vi/${ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId}/hqdefault.jpg`;
  };

  const renderLightboxContent = (item: MediaItem) => {
    if (item.type === "image" && item.img) {
      return (
        <img
          src={item.img}
          alt={`Media ${item.id}`}
          className="rounded-xl max-h-[80vh] mx-auto shadow-2xl"
        />
      );
    }
    if (item.type === "video" && item.video) {
      return (
        <video
          src={item.video}
          controls
          autoPlay
          className="rounded-xl max-h-[80vh] mx-auto shadow-2xl"
        />
      );
    }
    if (item.type === "youtube" && item.youtubeLink) {
      return (
        <iframe
          src={item.youtubeLink.replace("watch?v=", "embed/")}
          className="w-full h-[60vh] rounded-xl shadow-2xl mx-auto"
          title="YouTube Video"
          allowFullScreen
        />
      );
    }
    return null;
  };

  const renderLightbox = () => {
    if (!lightboxOpen) return null;
    const selected = products[currentIndex];

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
                prev === 0 ? products.length - 1 : prev - 1
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
                prev === products.length - 1 ? 0 : prev + 1
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
            centeredSlides={true}
            onSwiper={setSwiperInstance}
            loop={true}
            className="flex justify-center items-center"
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
          >
            {products.map((item, index) => (
              <SwiperSlide
                key={item.id}
                className="flex justify-center items-center overflow-hidden rounded-lg"
              >
                <div
                  onClick={() => {
                    setCurrentIndex(index);
                    setLightboxOpen(true);
                  }}
                  className="relative w-full aspect-[16/9] overflow-hidden cursor-pointer group bg-black/5 rounded-lg 
                             transition-transform duration-500 hover:scale-[1.03] "
                >
                  {item.type === "video" && item.video ? (
                    <video
                      src={item.video}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  ) : item.type === "youtube" && item.youtubeLink ? (
                    <iframe
                      src={item.youtubeLink.replace("watch?v=", "embed/")}
                      className="w-full h-full object-cover"
                      title="YouTube Video"
                    />
                  ) : (
                    <img
                      src={item.img || "/placeholder.jpg"}
                      alt={`Media ${item.id}`}
                      className="w-full h-full object-cover "
                    />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-all duration-300">
                    {item.type === "video" ? (
                      <Play className="text-white w-8 h-8 drop-shadow-lg" />
                    ) : item.type === "youtube" ? (
                      <Youtube className="text-white w-8 h-8 drop-shadow-lg" />
                    ) : (
                      <ImageIcon className="text-white w-8 h-8 drop-shadow-lg" />
                    )}
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
