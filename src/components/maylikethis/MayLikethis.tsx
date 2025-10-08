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
  price: string;
  image: string;
  hoverImg: string;
  variantItems?: VariantItem[];
  
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await GetAllProducts({ page: 1, entries: 50 });
        console.log(allProducts, "darfa")
        const shuffled = allProducts.result.sort(() => 0.5 - Math.random());
        const randomTen = shuffled.slice(0, 10);
        const formatted = randomTen.map((p: ApiProduct) => ({
          _id: p._id,
          name: p.name,
          description: p.description || "",
          price: `₹${p.price}`,
          image:   p.images?.[0]?.location || "/assets/images/catmod-08.jpg",
          hoverImg: p.thumbnail?.location ,
          variantItems: p.variantItems || [],
        }));
        
        console.log(formatted,"data")
        setProducts(formatted);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold text-center">You May Like This</h2>
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
          ? Array.from({ length: 10 }).map((_, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              <ProductCardSkeleton />
            </SwiperSlide>
          ))
          : products.map((item) => (
            <SwiperSlide key={item._id} className="flex justify-center">
              <ProductCard
                id={item._id}
                image={item.image}
                hoverImg={item.hoverImg}
                name={item.name}
                description={item.description}
                price={item.price}
                variantItems={item.variantItems ?? []}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
