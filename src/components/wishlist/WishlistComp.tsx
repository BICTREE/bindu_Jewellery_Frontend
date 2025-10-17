"use client";

import React from "react";
import ProductCard from "../common/productcard/ProductCard";
import { VariantItem } from "@/app/(main)/product-list/page";

interface Product {
  _id: string;
  image: string;
  hoverImg: string;
  name: string;
  description?: string;
  price: number;
  // ✅ Make optional since wishlist API may not return it
  variantItems?: VariantItem[];
}

interface ProductListProps {
  products: Product[];
}

const WishlistComp: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="container mx-auto">
      <h2 className="hidden sm:block px-4 text-2xl font-bold text-gray-800 pb-4 pt-2 md:py-4 lg:py-8">
        Our Wishlist
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.image }
            hoverImg={product.hoverImg }
            name={product.name}
            description={product.description}
            price={product.price}
            // ✅ Provide empty array fallback
            variantItems={product.variantItems ?? []}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistComp;
