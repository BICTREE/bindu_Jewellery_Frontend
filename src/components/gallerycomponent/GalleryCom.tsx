"use client";
import { GetAllGroupMedia } from "@/services/mediaService/mediaService";
import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";

type MediaFile = {
  name: string;
  key: string;
  location: string;
  _id: string;
};

type MediaItem = {
  _id: string;
  filetype: "image" | "video" | "youtube";
  file?: MediaFile;
  youtubeLink?: string;
  title: string;
  description: string;
  tags: string[];
  order: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
};

type MediaGroup = {
  _id: string;
  name: string;
  description: string;
  media: MediaItem[];
  isArchived: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function GalleryCom() {
  const [mediaGroups, setMediaGroups] = useState<MediaGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<MediaGroup | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video" | "youtube">("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const data = await GetAllGroupMedia();
        setMediaGroups(data || []);
      } catch (err) {
        setError("Failed to load media");
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  // Auto-hide controls
  useEffect(() => {
    if (selectedMediaIndex !== null && showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [selectedMediaIndex, showControls]);

  const getYouTubeId = (url: string): string => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const getMediaSource = (item: MediaItem): string => {
    if (item.filetype === "youtube" && item.youtubeLink) return getYouTubeId(item.youtubeLink);
    if (item.file?.location) return item.file.location;
    return "";
  };

  const getThumbnailSource = (item: MediaItem): string => {
    if (item.filetype === "youtube" && item.youtubeLink)
      return `https://img.youtube.com/vi/${getYouTubeId(item.youtubeLink)}/0.jpg`;
    return item.file?.location || "";
  };

  const openGroupMedia = (group: MediaGroup, mediaIndex: number = 0) => {
    setSelectedGroup(group);
    setSelectedMediaIndex(mediaIndex);
    setIsPlaying(true);
    setShowControls(true);
  };

  const closeLightbox = () => {
    setSelectedGroup(null);
    setSelectedMediaIndex(null);
    setIsPlaying(false);
    setIsMuted(false);
  };

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedGroup && selectedMediaIndex !== null) {
      const newIndex = (selectedMediaIndex - 1 + selectedGroup.media.length) % selectedGroup.media.length;
      setSelectedMediaIndex(newIndex);
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  const handleNextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedGroup && selectedMediaIndex !== null) {
      const newIndex = (selectedMediaIndex + 1) % selectedGroup.media.length;
      setSelectedMediaIndex(newIndex);
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
    setShowControls(true);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
    setShowControls(true);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (selectedGroup && selectedMediaIndex !== null && selectedMediaIndex < selectedGroup.media.length - 1) {
      setTimeout(() => {
        handleNextMedia({ stopPropagation: () => { } } as React.MouseEvent);
      }, 1000);
    }
  };

  const showControlsTemporary = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const renderGroupThumbnail = (group: MediaGroup) => {
    const firstMedia = group.media[0];
    if (!firstMedia) return null;

    const thumbnailSrc = getThumbnailSource(firstMedia);
    const mediaCount = group.media.length;

    return (
      <div
        className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50/20 to-rose-50/10 group cursor-pointer transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl border border-amber-200/30"
        onClick={() => openGroupMedia(group)}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10" />

        {firstMedia.filetype === "image" && (
          <img
            src={thumbnailSrc}
            alt={group.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000 ease-out"
            onError={(e) => {
              e.currentTarget.src = "/assets/images/placeholder.jpg";
            }}
          />
        )}

        {firstMedia.filetype === "video" && (
          <>
            <video
              src={thumbnailSrc}
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000 ease-out"
              muted
              playsInline
              onError={(e) => {
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

        {firstMedia.filetype === "youtube" && (
          <>
            <img
              src={thumbnailSrc}
              alt={group.name}
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
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-white font-bold text-lg mb-2 font-playfair">
            {group.name}
          </h3>
          <p className="text-amber-100 text-sm mb-3 line-clamp-2">
            {group.description}
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-amber-200 text-xs bg-amber-900/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-amber-500/30">
              {mediaCount} {mediaCount === 1 ? 'item' : 'items'}
            </span>
            <div className="flex items-center space-x-1 text-amber-200">
              <span className="text-xs">View Collection</span>
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

  const renderLightboxContent = () => {
    if (!selectedGroup || selectedMediaIndex === null) return null;

    const currentMedia = selectedGroup.media[selectedMediaIndex];
    const src = getMediaSource(currentMedia);

    switch (currentMedia.filetype) {
      case "image":
        return (
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={src}
              alt={currentMedia.title}
              className="max-w-[95vw] max-h-[70vh] w-auto h-auto object-contain"
              onClick={showControlsTemporary}
            />
          </div>
        );
      case "video":
        return (
          <div className="w-full h-full flex items-center justify-center p-4">
            <video
              ref={videoRef}
              src={src}
              controls={false}
              autoPlay={isPlaying}
              muted={isMuted}
              onEnded={handleVideoEnded}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="max-w-[95vw] max-h-[70vh] w-auto h-auto object-contain"
              onClick={togglePlayPause}
            />
          </div>
        );
      case "youtube":
        return (
          <div className="w-full h-full flex items-center justify-center p-4 mt-10">
            <div className="w-full max-w-[100vw] h-auto  aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${src}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0`}
                title={currentMedia.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
                onClick={showControlsTemporary}
              />
            </div>
          </div>
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
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-[#fff9f2] via-[#fff6ec] to-[#fff1e1]">
      {/* <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#2e2b1f] tracking-wide">
       Our <span className="text-[#d4b262]"> Media</span>
      </h2> */}

      {/* Filter Buttons */}
      {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
        {(["all", "image", "video", "youtube"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${filter === type
              ? "bg-[#d4b262] text-white border-[#d4b262] shadow-md"
              : "border-[#d4b262] text-[#2e2b1f] hover:bg-[#d4b262] hover:text-white"
              }`}
          >
            {type === "youtube" ? "YouTube" : type[0].toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div> */}

      {/* Collections Grid */}
      {mediaGroups.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          No collections found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mediaGroups.map((group) => (
            <div key={group._id}>
              {renderGroupThumbnail(group)}
            </div>
          ))}
        </div>
      )}

      {/* Full Screen Lightbox */}
      {selectedGroup && selectedMediaIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col overflow-hidden"
          onClick={showControlsTemporary}
        >
          {/* Top Bar */}
          <div className={`flex-shrink-0 p-4 lg:mt-10 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
              <div className="text-white max-w-2xl">
                <h2 className="text-xl font-bold font-playfair truncate">{selectedGroup.name}</h2>
                <p className="text-gray-300 text-sm truncate">{selectedGroup.description}</p>
              </div>
              <button
                onClick={closeLightbox}
                className="flex-shrink-0 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Media Container with Perfect Centering */}
          <div className="flex-1 min-h-0 flex items-center justify-center relative">
            {/* Left Navigation Arrow */}
            <button
              onClick={handlePrevMedia}
              className="absolute left-2 md:left-4 lg:left-8 z-20 bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300 flex-shrink-0"
            >
              <ChevronLeft size={24} className="md:w-7 md:h-7" />
            </button>

            {/* Media Content - Always Centered */}
            <div className="w-full h-full flex items-center justify-center absolute top-20 ">
              {renderLightboxContent()}
            </div>

            {/* Right Navigation Arrow */}
            <button
              onClick={handleNextMedia}
              className="absolute right-2 md:right-4 lg:right-8 z-20 bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300 flex-shrink-0"
            >
              <ChevronRight size={24} className="md:w-7 md:h-7" />
            </button>
          </div>

          {/* Bottom Controls */}
          <div className={`flex-shrink-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>

            {/* Media Info */}
            <div className="text-center mb-4 max-w-4xl mx-auto">
              <h3 className="text-white text-lg font-semibold mb-1 truncate px-4">
                {selectedGroup.media[selectedMediaIndex].title}
              </h3>
              <p className="text-gray-300 text-sm mb-2 line-clamp-2 px-4">
                {selectedGroup.media[selectedMediaIndex].description}
              </p>
              <div className="flex justify-center items-center space-x-3 text-xs text-gray-400">
                <span>
                  {selectedMediaIndex + 1} of {selectedGroup.media.length}
                </span>
                <span>•</span>
                <span className="capitalize">
                  {selectedGroup.media[selectedMediaIndex].filetype}
                </span>
              </div>
            </div>

            {/* Tags */}
            {selectedGroup.media[selectedMediaIndex].tags?.length > 0 && (
              <div className="flex justify-center mb-4">
                <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                  {selectedGroup.media[selectedMediaIndex].tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-[#d4b262]/80 text-white rounded-full border border-[#d4b262] backdrop-blur-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Video Controls */}
            {selectedGroup.media[selectedMediaIndex].filetype === 'video' && (
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={togglePlayPause}
                  className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 flex-shrink-0"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={toggleMute}
                  className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 flex-shrink-0"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            )}

            {/* Thumbnail Navigation */}
            {/* Thumbnail Navigation */}
            {selectedGroup.media.length > 1 && (
              <div className="flex justify-center">
                <div className="flex gap-2 overflow-x-auto max-w-full px-4 py-2">
                  {selectedGroup.media.map((media, index) => (
                    <button
                      key={media._id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMediaIndex(index);
                        setShowControls(true);
                      }}
                      className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border-2 transition-all relative ${index === selectedMediaIndex
                          ? "border-[#d4b262] scale-110"
                          : "border-white/30 opacity-70 hover:opacity-100"
                        }`}
                    >
                      {/* For images and YouTube - show thumbnail */}
                      {(media.filetype === "image" || media.filetype === "youtube") && (
                        <img
                          src={getThumbnailSource(media)}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/assets/images/placeholder.jpg";
                            e.currentTarget.alt = "Thumbnail not available";
                          }}
                        />
                      )}

                      {/* For videos - show video icon with placeholder */}
                      {media.filetype === "video" && (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[5px] border-y-transparent ml-0.5" />
                          </div>
                          {/* Optional: Show first frame if video supports poster */}
                          <img
                            src="/assets/images/video-placeholder.jpg"
                            alt="Video thumbnail"
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Play icon overlay for all media types */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                        <div className="w-4 h-4 bg-white/80 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[6px] border-l-gray-800 border-y-[4px] border-y-transparent ml-0.5" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}