"use client";
import { GetAllMedia } from "@/services/mediaService/mediaService";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type MediaFile = {
  name: string;
  key: string;
  location: string;
  _id: string;
};

type Media = {
  _id: string;
  filetype: "image" | "video" | "youtube";
  file?: MediaFile;
  youtubeLink?: string;
  title: string;
  description: string;
  tags: string[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function GalleryCom() {
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video" | "youtube">("all");

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const data = await GetAllMedia();
        setMediaItems(data || []);
      } catch (err) {
        setError("Failed to load media");
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const getYouTubeId = (url: string): string => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const getMediaSource = (item: Media): string => {
    if (item.filetype === "youtube" && item.youtubeLink) return getYouTubeId(item.youtubeLink);
    if (item.file?.location) return item.file.location;
    return "";
  };

  const getThumbnailSource = (item: Media): string => {
    if (item.filetype === "youtube" && item.youtubeLink)
      return `https://img.youtube.com/vi/${getYouTubeId(item.youtubeLink)}/0.jpg`;
    return item.file?.location || "";
  };

  const filteredItems =
    filter === "all" ? mediaItems : mediaItems.filter((item) => item.filetype === filter);
  const selected = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const prevItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null)
      setSelectedIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  const nextItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null)
      setSelectedIndex((prev) => (prev! + 1) % filteredItems.length);
  };


  const renderThumbnail = (item: Media, index: number) => {
    const thumbnailSrc = getThumbnailSource(item);

    return (
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50/20 to-rose-50/10 group cursor-pointer transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl border border-amber-200/30">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10" />

        {item.filetype === "image" && (
          <img
            src={thumbnailSrc}
            alt={item.title || `Jewelry ${index + 1}`}
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000 ease-out"
            onError={(e) => {
              e.currentTarget.src = "/assets/images/placeholder.jpg";
            }}
          />
        )}
             {item.filetype === "video" && (
          <>
            <video
              src={thumbnailSrc}
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000 ease-out"
              muted
              playsInline
              onError={(e) => {
                // Fallback if video fails to load
                const video = e.currentTarget;
                video.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'w-full h-full bg-gray-200 flex items-center justify-center';
                fallback.innerHTML = '<span class="text-gray-500">Video not available</span>';
                video.parentNode?.appendChild(fallback);
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400/90 to-rose-400/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1" />
              </div>
            </div>
          </>
        )}

        {( item.filetype === "youtube") && (
          <>
            <img
              src={thumbnailSrc}
              alt={item.title || `${item.filetype} ${index + 1}`}
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000 ease-out"
              onError={(e) => {
                e.currentTarget.src = "/assets/images/video-placeholder.jpg";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400/90 to-rose-400/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl">
                <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[10px] border-y-transparent ml-1" />
              </div>
            </div>
          </>
        )}

        {/* Gold overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-amber-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* Content overlay */}
        <div className="absolute bottom-1 left-0 right-0 p-6 z-20 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-white font-bold text-lg mb-2 font-playfair">
            {item.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-amber-200 text-sm bg-amber-900/40 backdrop-blur-sm px-3 py-1.5 rounded-full capitalize border border-amber-500/30">
              {item.filetype}
            </span>
            <div className="flex items-center space-x-1 text-amber-200">
              <span className="text-xs">View</span>
              <div className="w-2 h-2 border-r-2 border-t-2 border-amber-200 rotate-45 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    );
  };


  const renderLightboxContent = (item: Media) => {
    const src = getMediaSource(item);
    switch (item.filetype) {
      case "image":
        return <img src={src} alt={item.title} className="rounded-xl max-h-[50vh] mx-auto shadow-2xl" />;
      case "video":
        return (
          <video
            src={src}
            controls
            autoPlay
            className="w-full max-h-[80vh] rounded-xl shadow-2xl"
          ></video>
        );
      case "youtube":
        return (
          <iframe
            src={`https://www.youtube.com/embed/${src}?autoplay=1`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video rounded-xl shadow-2xl"
          ></iframe>
        );
    }
  };

  if (loading)
    return (
      <div className="py-20 text-center text-gray-500 text-lg animate-pulse">
        Loading exquisite pieces...
      </div>
    );

  if (error)
    return (
      <div className="py-20 text-center text-red-500 font-semibold">{error}</div>
    );

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b">
      {/* <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#2e2b1f] tracking-wide">
       Our <span className="text-[#d4b262]"> Media</span>
      </h2> */}

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {(["all", "image", "video", "youtube"] as const).map((type) => (
          <button
            key={type}
            onClick={() => {
              setFilter(type);
              setSelectedIndex(null);
            }}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${filter === type
                ? "bg-[#d4b262] text-white border-[#d4b262] shadow-md"
                : "border-[#d4b262] text-[#2e2b1f] hover:bg-[#d4b262] hover:text-white"
              }`}
          >
            {type === "youtube" ? "YouTube" : type[0].toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          No media found for this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item, i) => (
            <div key={item._id} onClick={() => setSelectedIndex(i)}>
              {renderThumbnail(item, i)}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full mt-10  bg-gradient-to-b from-[#fff9f2]/95 to-[#fff3e1]/95 rounded-3xl p-3 shadow-[0_8px_40px_rgba(0,0,0,0.3)] border border-[#d4b262]/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-1 right-1 bg-[#d4b262] hover:bg-[#c5a44e] text-white p-2 rounded-full transition"
            >
              <X size={20} />
            </button>

            {/* Navigation */}
            <button
              onClick={prevItem}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#d4b262]/90 hover:bg-[#c5a44e] text-white p-3 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextItem}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#d4b262]/90 hover:bg-[#c5a44e] text-white p-3 rounded-full"
            >
              <ChevronRight size={24} />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center space-y-2">
              {renderLightboxContent(selected)}
              {/* <div className="flex flex-col items-start ">
                <h3 className="text-xl font-bold text-[#2e2b1f]">
                  {selected.title}
                </h3>
                {selected.description && (
                  <p className="text-gray-600 mt-1">{selected.description}</p>
                )}
                {selected.tags?.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {selected.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs bg-[#d4b262]/20 text-[#2e2b1f] rounded-full border border-[#d4b262]/40"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div> */}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
