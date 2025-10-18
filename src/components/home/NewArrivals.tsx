"use client";

import { useEffect, useRef, useState  } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper"; // ✅ Import the Swiper type
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../common/productcard/ProductCard";
import ProductCardSkeleton from "../common/productcard/ProductCardSkeleton";
import { ApiProduct, VariantItem } from "@/app/(main)/product-list/page";
import { GetAllProducts } from "@/services/productService/productService";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: string | number;
  image: string;
  hoverImage: string;
  variantItems?: VariantItem[];
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
 const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // ✅ Properly typed Swiper instance
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);


  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await GetAllProducts({
          page: 1,
          entries: 10,
        });

        // ✅ FIX: Use res.result (actual product list)
        const productList = res?.result || [];

        // ✅ Sort by created date (if available)
        const sorted = [...productList].sort(
          (a: ApiProduct, b: ApiProduct) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        // ✅ Pick latest 10
        const latest10 = sorted.slice(0, 10);

        // ✅ Format data for UI
        const formatted = latest10.map((p: ApiProduct) => ({
          _id: p._id,
          name: p.name,
          description:  p.description || "",
          price: p.price ? `₹${p.price}` : "₹0",
          image:
          //  p.thumbnail?.location ||
            "/assets/images/card-img01.png",
          hoverImage:
          // p.images?.[0]?.location ||
          //   p.thumbnail?.location ||
             "/assets/images/catmod-01.jpg",
          variantItems: p.variantItems || [],
        }));

        setProducts(formatted);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  // ✅ Safe Swiper navigation setup
  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      if (swiperInstance.params.navigation && typeof swiperInstance.params.navigation !== "boolean") {
        swiperInstance.params.navigation.prevEl = prevRef.current;
        swiperInstance.params.navigation.nextEl = nextRef.current;
      }
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="container">

      <div className="mx-auto relative ">
      <h2 className="font-prata text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">New Arrivals</h2>
      <p className="text-gray-500 text-center mb-10 pt-2">
        Prepare To Elevate Your Sense Of Style With Our Latest Collection!
      </p>
   {/* Left Arrow */}
            <button
              ref={prevRef}
              className="w-8 h-8 absolute top-1/2 -left-1 sm:-left-4 md:-left-6 lg:-left-8 -translate-y-1/2  flex items-center justify-center border border-gray-300 text-black rounded-full bg-white hover:bg-[#d4b262] hover:text-white transition-colors z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              ref={nextRef}
              className="w-8 h-8 absolute top-1/2 -right-1 sm:-right-4 md:-right-6 lg:-right-8 -translate-y-1/2 flex items-center justify-center border border-gray-300 text-black rounded-full bg-white hover:bg-[#d4b262] hover:text-white transition-colors z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1, centeredSlides: true },
          640: { slidesPerView: 2, centeredSlides: false },
          1024: { slidesPerView: 4 },
        }}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
        className="px-4"
      >
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SwiperSlide key={i} className="flex justify-center">
                <ProductCardSkeleton />
              </SwiperSlide>
            ))
          : products.map((item) => (
              <SwiperSlide key={item._id} className="flex justify-center">
                <ProductCard
                  id={item._id}
                  image={item.image}
                  hoverImg={item.hoverImage}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  variantItems={item.variantItems ?? []}
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </div></div>
  );
}
