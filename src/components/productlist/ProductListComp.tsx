"use client";
import React from "react";
import ProductCard from "../common/productcard/ProductCard";


interface Product {
    id: number;
  image: string;
  hoverImg: string;
  name: string;
  offer?: string;
  price: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="container mx-auto  ">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">
        Our Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
