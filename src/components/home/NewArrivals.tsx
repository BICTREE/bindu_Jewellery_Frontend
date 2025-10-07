"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
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

  return (
    <div className="container">

      <div className="mx-auto py-7 sm:py-8 md:py-13 lg:py-15">
      <h2 className="font-prata text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">New Arrivals</h2>
      <p className="text-gray-500 text-center mb-10">
        Prepare To Elevate Your Sense Of Style With Our Latest Collection!
      </p>

      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1, centeredSlides: true },
          640: { slidesPerView: 2, centeredSlides: false },
          1024: { slidesPerView: 4 },
        }}
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
