"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PoppularCard from "../common/poppularcategory/PoppularCard";
import { getAllCategory } from "@/services/categoryService/categorySerice";

interface CategoryApi {
  _id: string;
  name: string;
  description?: string;
  image?: {
    location?: string;
    name?: string;
  };
  hoverImage?: {
    location?: string;
    name?: string;
  };
  parent?: {
    _id: string | null;
    name?: string;
  } | null;
}

interface Category {
  _id: string;
  name: string;
  image: string;
  hoverImage: string;
}

export default function PopularCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory();
        const allCategories: CategoryApi[] = res || [];

        const childCategories = allCategories
          .filter((cat) => cat.parent && cat.parent._id)
          .slice(0, 10);

        const formatted: Category[] = childCategories.map((cat) => ({
          _id: cat._id,
          name: cat.name,
          image: cat.image?.location  || "/assets/images/No_image_available.svg.png",
          hoverImage: cat.hoverImage?.location ||  "/assets/images/No_image_available.svg.png",
        }));

        setCategories(formatted);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Attach refs to swiper navigation after mount
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <section className="container mx-auto relative">
      <div className="mx-auto">
        <h2 className="font-prata text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Popular Category
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Prepare To Elevate Your Sense Of Style With Our Latest Collection!
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories found.</p>
        ) : (
          <div className="relative">
            {/* Custom Arrows */}
          <button
  ref={prevRef}
  className="w-8 h-8 absolute top-1/2 -left-6 -translate-y-1/2 flex items-center justify-center border border-gray-300 text-black rounded-full bg-white hover:bg-[#d4b262] hover:text-white transition-colors z-10"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
</button>
 
 
 <button
  ref={nextRef}
  className="w-8 h-8 absolute top-1/2 -right-6 -translate-y-1/2 flex items-center justify-center border border-gray-300 text-black rounded-full bg-white hover:bg-[#d4b262] hover:text-white transition-colors z-10"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</button>


            {/* Swiper */}
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={5}
              breakpoints={{
                320: { slidesPerView: 1, centeredSlides: true },
                640: { slidesPerView: 2, centeredSlides: false },
                1024: { slidesPerView: 5 },
              }}
              onSwiper={(swiper) => setSwiperInstance(swiper)}
            >
              {categories.map((item) => (
                <SwiperSlide key={item._id} className="flex justify-center">
                  <PoppularCard
                    id={item._id}
                    name={item.name}
                    image={item.image}
                    hoverImg={item.hoverImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
