"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductCard from "../common/productcard/ProductCard";
import { VariantItem } from "@/app/(main)/product-list/page"; // ✅ import VariantItem type

// ✅ Define product type for dummy data
interface DummyProduct {
  id: string;
  name: string;
  offer?: string;
  price: string;
  img: string;
  img2: string;
  variantItems?: VariantItem[]; // ✅ optional
}

const products: DummyProduct[] = [
  {
    id: "1",
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    img: "/assets/images/card-img01.png",
    img2: "/assets/images/catmod-01.jpg",
  },
  {
    id: "2",
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    img: "/assets/images/card-img01.png",
    img2: "/assets/images/catmod-01.jpg",
  },
  {
    id: "3",
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    img: "/assets/images/card-img01.png",
    img2: "/assets/images/catmod-01.jpg",
  },
  {
    id: "4",
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    img: "/assets/images/card-img01.png",
    img2: "/assets/images/catmod-01.jpg",
  },
  {
    id: "5",
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    img: "/assets/images/card-img01.png",
    img2: "/assets/images/catmod-01.jpg",
  },
  {
    id: "6",
    name: "EARRINGS, TRENDY DESIGNS",
    offer: "30% OFF MAKING CHARGES",
    price: "₹35853.00",
    img: "/assets/images/card-img01.png",
    img2: "/assets/images/catmod-01.jpg",
  },
];

export default function NewArrivals() {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold text-center">New Arrivals</h2>
      <p className="text-gray-500 text-center mb-10">
        Prepare To Elevate Your Sense Of Style With Our Latest Collection!
      </p>

      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={4}
        breakpoints={{
          320: {
            slidesPerView: 1,
            centeredSlides: true, // ✅ center align on mobile
          },
          640: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          1024: { slidesPerView: 4 },
        }}
        className="px-4"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center">
            <ProductCard
              id={item.id}
              image={item.img}
              hoverImg={item.img2}
              name={item.name}
              offer={item.offer}
              price={item.price}
              // ✅ always pass an array so ProductCard never breaks
              variantItems={item.variantItems ?? []}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
