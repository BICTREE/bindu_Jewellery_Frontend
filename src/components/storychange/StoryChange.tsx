"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StoriesOfChange() {
  const stories = [
    {
      name: "SHYAMA, HARYANA",
      image: "/assets/images/rekha.jpg",
      description:
        "Covid brought many problems with it — both outside and within our home. My husband who used to work at a tailoring shop lost his job. It became very hard to make ends meet.",
    },
    {
      name: "REKHA, PUNE",
      image: "/assets/images/rekha.jpg",
      description:
        "With skill training support, I was able to start a small tailoring unit at home. It gave me the confidence to support my children’s education.",
    },
    {
      name: "PRIYA, MANGALURU",
      image: "/assets/images/rekha.jpg",
      description:
        "Through Swarna Bindu’s livelihood initiative, I started earning a steady income for my family and became more independent.",
    },
    {
      name: "MEENA, DELHI",
      image: "/assets/images/rekha.jpg",
      description:
        "The CSR programs helped me learn new skills and open my own small business with other women from my community.",
    },
    {
      name: "RADHA, KERALA",
      image: "/assets/images/rekha.jpg",
      description:
        "Support from Swarna Bindu gave me the courage to begin my own tailoring and handicraft unit with local women.",
    },
  ];

  return (
    <section className="py-12 bg-white text-center relative">
      <h2 className="font-prata text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#6a9300] mb-8">


        Stories of Change
      </h2>

      <div className="max-w-6xl mx-auto px-4  relative">
        {/* Custom navigation buttons (hidden on mobile) */}
        <div className="absolute top-1/2 -left-5 z-10 transform -translate-y-1/2 hidden md:block">
          <button
            className="custom-prev bg-[#6a9300] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-[#8aad2f] transition"
            aria-label="Previous"
          >
            ❮
          </button> 
        </div>

        <div className=" absolute top-1/2 -right-5 z-10 transform -translate-y-1/2 hidden md:block">
          <button
            className="custom-next bg-[#6a9300] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-[#8aad2f] transition"
            aria-label="Next"
          >
            ❯
          </button>
        </div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={14}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1.1, spaceBetween: 10 },
            640: { slidesPerView: 1.6, spaceBetween: 12 },
            768: { slidesPerView: 2.2, spaceBetween: 14 },
            1024: { slidesPerView: 3, spaceBetween: 16 },
          }}
          className="pb-10"
        >
          {stories.map((story, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div
                  className={`transition-all duration-500 transform ${
                    isActive ? "scale-105 shadow-xl" : "scale-90 opacity-70"
                  } bg-white border border-gray-100 rounded-lg w-full max-w-[300px] mx-auto mb-10`}
                >
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-[180px] object-cover"
                  />
                  <div className="p-4 text-left mt-5">
                    <h3 className="text-base font-semibold text-gray-900">
                      {story.name}
                    </h3>
                   <p className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-3">
  {story.description}
</p>
                    <button className="mt-3 bg-[#a4c639] text-white text-xs font-medium px-3 py-1.5 rounded-sm hover:bg-[#8aad2f] transition-all">
                      READ MORE
                    </button>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination */}
        <div className="custom-pagination mt-6 flex justify-center gap-2"></div>
      </div>

      {/* Custom pagination styles */}
      <style jsx>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: #d1d5db;
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background-color: #6a9300;
          width: 20px;
        }
      `}</style>
    </section>
  );
}
