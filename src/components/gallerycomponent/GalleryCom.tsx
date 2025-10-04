"use client";
import { useState } from "react";

type Media = {
  type: "image" | "video";
  src: string; // For videos, this is the YouTube Video ID
};

const mediaItems: Media[] = [
  { type: "image", src: "/assets/images/catmod-10.jpg" },
  { type: "image", src: "/assets/images/catmod-11.jpg" },
  { type: "video", src: "dQw4w9WgXcQ" }, // YouTube Video ID
  { type: "image", src: "/assets/images/catmod-11.jpg" },
  { type: "video", src: "3JZ_D3ELwOQ" }, // YouTube Video ID
  { type: "image", src: "/assets/images/catmod-11.jpg" },
  { type: "image", src: "/assets/images/catmod-11.jpg" },
  { type: "image", src: "/assets/images/catmod-11.jpg" },
];

export default function GalleryCom() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");

  const filteredItems =
    filter === "all" ? mediaItems : mediaItems.filter((item) => item.type === filter);

  const selected = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const prevItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const nextItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % filteredItems.length);
    }
  };

  return (
    <div className="py-10 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Our media Gallery
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {["all", "image", "video"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === type ? "bg-[#d4b262] text-white" : "bg-black text-white"
            }`}
            onClick={() => setFilter(type as "all" | "image" | "video")}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item, i) => (
          <div
            key={i}
            className="relative cursor-pointer group overflow-hidden rounded-2xl shadow-md"
            onClick={() => setSelectedIndex(i)}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
              />
            ) : (
              <div className="relative w-full h-48 overflow-hidden">
                {/* YouTube Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${item.src}/0.jpg`}
                  alt={`Video ${i + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white text-3xl pointer-events-none">
                  ▶
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center text-white font-semibold">
              View
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="relative w-full max-w-4xl">
            {/* Previous Button */}
            <button
              onClick={(e) => prevItem(e)}
              className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-800/50 text-white rounded-l-lg hover:bg-gray-800 z-10"
            >
              &#8592;
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => nextItem(e)}
              className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-800/50 text-white rounded-r-lg hover:bg-gray-800 z-10"
            >
              &#8594;
            </button>

            {selected.type === "image" ? (
              <img
                src={selected.src}
                alt="Selected"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            ) : (
              <div className="w-full max-w-full aspect-video mx-auto">
                <iframe
                  src={`https://www.youtube.com/embed/${selected.src}?autoplay=1`}
                  title="YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-xl shadow-lg"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
