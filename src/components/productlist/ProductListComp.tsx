"use client";

import React from "react";
import ProductCard from "../common/productcard/ProductCard";

interface Product {
  id: string;
  image: string;
  hoverImg: string;
  name: string;
  offer?: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductListComp: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="container mx-auto">
   <h2 className="hidden sm:block px-4 text-2xl font-bold text-gray-800 pb-4 pt-2 md:py-4 lg:py-8">
  Our Collections
</h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListComp;
