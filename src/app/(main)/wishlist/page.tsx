"use client";

import React, { useState } from "react";
import Banner from "@/components/common/Banner/Banner";
import ProductListComp from "@/components/wishlist/WishlistComp";

type Product = {
  id: number;
  name: string;
  purity: string;
  stone: string;
  weight: string;
  offer: string;
  price: number;
  image: string;
  hoverImg: string;
};

const products: Product[] = [
  { id: 1, name: "EARRINGS, TRENDY DESIGNS", purity: "18 Carat", stone: "Diamond", weight: "<5g", offer: "30% OFF MAKING CHARGES", price: 35853, image: "/assets/images/card-img01.png", hoverImg: "/assets/images/catmod-01.jpg" },
  { id: 2, name: "RINGS, TRENDY DESIGNS", purity: "20 Carat", stone: "Ruby", weight: "5-10g", offer: "30% OFF MAKING CHARGES", price: 25000, image: "/assets/images/card-img01.png", hoverImg: "/assets/images/catmod-01.jpg" },
  { id: 3, name: "NECKLACES, TRENDY DESIGNS", purity: "22 Carat", stone: "Emerald", weight: "10-20g", offer: "30% OFF MAKING CHARGES", price: 15000, image: "/assets/images/card-img01.png", hoverImg: "/assets/images/catmod-01.jpg" },
  { id: 4, name: "BRACELETS, TRENDY DESIGNS", purity: "24 Carat", stone: "Sapphire", weight: "20g+", offer: "30% OFF MAKING CHARGES", price: 40000, image: "/assets/images/card-img01.png", hoverImg: "/assets/images/catmod-01.jpg" },
  { id: 5, name: "EARRINGS, TRENDY DESIGNS", purity: "22 Carat", stone: "Diamond", weight: "5-10g", offer: "30% OFF MAKING CHARGES", price: 40000, image: "/assets/images/card-img01.png", hoverImg: "/assets/images/catmod-01.jpg" },
  { id: 6, name: "RINGS, TRENDY DESIGNS", purity: "18 Carat", stone: "Emerald", weight: "<5g", offer: "30% OFF MAKING CHARGES", price: 40000, image: "/assets/images/card-img01.png", hoverImg: "/assets/images/catmod-01.jpg" },
  { id: 7, name: "NECKLACES, TRENDY DESIGNS", purity: "20 Carat", stone: "Ruby", weight: "10-20g", offer: "30% OFF MAKING CHARGES", price: 40000, image: "/assets/images/card-img01.png", hoverImg: "/assets/images/catmod-01.jpg" },
  { id: 8, name: "BRACELETS, TRENDY DESIGNS", purity: "24 Carat", stone: "Sapphire", weight: "20g+", offer: "30% OFF MAKING CHARGES", price: 40000, image: "/assets/images/card-img01.png", hoverImg: "/assets/images/catmod-01.jpg" },
  { id: 9, name: "EARRINGS, TRENDY DESIGNS", purity: "18 Carat", stone: "Diamond", weight: "<5g", offer: "30% OFF MAKING CHARGES", price: 40000, image: "/assets/images/card-img01.png", hoverImg: "/assets/images/catmod-01.jpg" },
  { id: 10, name: "RINGS, TRENDY DESIGNS", purity: "20 Carat", stone: "Ruby", weight: "5-10g", offer: "30% OFF MAKING CHARGES", price: 40000, image: "/assets/images/card-img01.png", hoverImg: "/assets/images/catmod-01.jpg" },
];

const Collections = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <Banner Title="Wishlist" />

      <div className="container mx-auto flex flex-col gap-6">
        {/* MAIN CONTENT */}
        <main className="flex-1">
          <ProductListComp
            products={currentProducts.map((p) => ({
              ...p,
              price: p.price.toString(),
            }))}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 mb-6 items-center gap-1">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-2 py-1 text-sm rounded-full shadow-sm transition-colors duration-200 ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-[#d4b262] hover:text-white"
                }`}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-2 py-1 text-sm rounded-full shadow-sm transition-colors duration-200 border ${
                    currentPage === i + 1
                      ? "bg-[#d4b262] text-white border-[#d4b262]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-[#d4b262] hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-2 py-1 text-sm rounded-full shadow-sm transition-colors duration-200 ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-[#d4b262] hover:text-white"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Collections;
