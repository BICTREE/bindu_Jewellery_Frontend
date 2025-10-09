"use client";
import { GetAllMedia } from "@/services/mediaService/mediaService";
import { useState, useEffect } from "react";


type MediaFile = {
  name: string;
  key: string;
  location: string;
  _id: string;
};

type Media = {
  _id: string;
  filetype: "image" | "video" | "youtube";
  file?: MediaFile; // For images and videos
  youtubeLink?: string; // For YouTube videos
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

  // Fetch media data
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const data = await GetAllMedia();
        setMediaItems(data || []);
      } catch (err) {
        setError("Failed to load media");
        console.error("Error fetching media:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  // Extract YouTube ID from URL
  const getYouTubeId = (url: string): string => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  // Get media source based on filetype
  const getMediaSource = (item: Media): string => {
    if (item.filetype === "youtube" && item.youtubeLink) {
      return getYouTubeId(item.youtubeLink);
    }
    if ((item.filetype === "image" || item.filetype === "video") && item.file) {
      return item.file.location;
    }
    return "";
  };

  // Get thumbnail source based on filetype
  const getThumbnailSource = (item: Media): string => {
    if (item.filetype === "youtube" && item.youtubeLink) {
      return `https://img.youtube.com/vi/${getYouTubeId(item.youtubeLink)}/0.jpg`;
    }
    if ((item.filetype === "image" || item.filetype === "video") && item.file) {
      return item.file.location;
    }
    return "";
  };

  const filteredItems =
    filter === "all" 
      ? mediaItems 
      : mediaItems.filter((item) => item.filetype === filter);

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

  // Render thumbnail based on filetype
  const renderThumbnail = (item: Media, index: number) => {
    const thumbnailSrc = getThumbnailSource(item);
    
    switch (item.filetype) {
      case "image":
        return (
          <img
            src={thumbnailSrc}
            alt={item.title || `Image ${index + 1}`}
            className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
            onError={(e) => {
              // Fallback for broken images
              e.currentTarget.src = "/assets/images/placeholder.jpg";
            }}
          />
        );
      
      case "video":
        return (
          <div className="relative w-full h-48 overflow-hidden bg-gray-900">
            {/* Video thumbnail with play icon */}
            <img
              src={thumbnailSrc}
              alt={item.title || `Video ${index + 1}`}
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              onError={(e) => {
                // Fallback for broken video thumbnails
                e.currentTarget.src = "/assets/images/video-placeholder.jpg";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white text-3xl pointer-events-none">
              ▶
            </div>
          </div>
        );
      
      case "youtube":
        return (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={thumbnailSrc}
              alt={item.title || `YouTube Video ${index + 1}`}
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
              onError={(e) => {
                // Fallback for broken YouTube thumbnails
                e.currentTarget.src = "/assets/images/video-placeholder.jpg";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white text-3xl pointer-events-none">
              ▶
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Unsupported media type</span>
          </div>
        );
    }
  };

  // Render lightbox content based on filetype
  const renderLightboxContent = (item: Media) => {
    const mediaSrc = getMediaSource(item);
    
    switch (item.filetype) {
      case "image":
        return (
          <img
            src={mediaSrc}
            alt={item.title}
            className="w-full h-auto max-h-[80vh] object-contain"
            onError={(e) => {
              e.currentTarget.src = "/assets/images/placeholder.jpg";
            }}
          />
        );
      
      case "video":
        return (
          <div className="w-full max-w-full aspect-video mx-auto">
            <video
              src={mediaSrc}
              controls
              autoPlay
              className="w-full h-full rounded-xl shadow-lg"
              onError={(e) => {
                console.error("Error loading video:", mediaSrc);
              }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      
      case "youtube":
        return (
          <div className="w-full max-w-full aspect-video mx-auto">
            <iframe
              src={`https://www.youtube.com/embed/${mediaSrc}?autoplay=1`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl shadow-lg"
            ></iframe>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl">
            <span className="text-gray-500">Unsupported media type</span>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="py-10 px-4 md:px-10 lg:px-20">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading gallery...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 px-4 md:px-10 lg:px-20">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Our Media Gallery
      </h2>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {["all", "image", "video", "youtube"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === type ? "bg-[#d4b262] text-white" : "bg-black text-white"
            }`}
            onClick={() => {
              setFilter(type as "all" | "image" | "video" | "youtube");
              setSelectedIndex(null); // Reset selection when filter changes
            }}
          >
            {type === "youtube" ? "YouTube" : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No media found for the selected filter.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, i) => (
            <div
              key={item._id}
              className="relative cursor-pointer group overflow-hidden rounded-2xl shadow-md"
              onClick={() => setSelectedIndex(i)}
            >
              {renderThumbnail(item, i)}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center text-white font-semibold">
                View
              </div>
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-white text-sm font-medium truncate">
                  {item.title}
                </p>
                <p className="text-white text-xs opacity-90 capitalize">
                  {item.filetype}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

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

            {/* Media Content */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {renderLightboxContent(selected)}
              
              {/* Media Info */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {selected.title}
                </h3>
                {selected.description && (
                  <p className="text-gray-600 mb-3">{selected.description}</p>
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500 capitalize">
                    Type: {selected.filetype}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(selected.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {selected.tags && selected.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}