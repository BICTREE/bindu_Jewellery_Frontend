"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
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
  hoverImage?: string;
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory();
        const allCategories: CategoryApi[] = res || [];

        // ✅ Filter only child categories (those with parent._id)
        const childCategories = allCategories
          .filter((cat) => cat.parent && cat.parent._id)
          .slice(0, 10);

        const formatted: Category[] = childCategories.map((cat) => ({
          _id: cat._id,
          name: cat.name,
          image: cat.hoverImage || "/assets/images/card-img01.png",
          hoverImage: cat.hoverImage || "/assets/images/catmod-01.jpg",
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

  return (
    <section className="container mx-auto">
      <div className="mx-auto py-7 sm:py-8 md:py-13 lg:py-15">
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
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={5}
            breakpoints={{
              320: { slidesPerView: 1, centeredSlides: true },
              640: { slidesPerView: 2, centeredSlides: false },
              1024: { slidesPerView: 5 },
            }}
          >
            {categories.map((item) => (
              <SwiperSlide key={item._id} className="flex justify-center">
                <PoppularCard
                  id = {item._id}
                  name={item.name}
                  image={item.image}
                  hoverImg={item.hoverImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
