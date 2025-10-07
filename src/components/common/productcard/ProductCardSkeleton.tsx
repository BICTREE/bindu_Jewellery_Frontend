"use client";
import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="w-full sm:w-60 mx-auto animate-pulse">
      <div className="relative w-full aspect-[13/18] bg-gray-200 rounded-lg"></div>

      <div className="mt-3 px-2 text-center">
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto mb-3"></div>
        <div className="h-8 bg-gray-300 rounded w-full mx-auto"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
