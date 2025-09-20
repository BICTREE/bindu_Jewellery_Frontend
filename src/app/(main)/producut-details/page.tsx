"use client";

import React, { useState } from "react";

const ProductPage = () => {
  const images = [
    "/assets/images/catmod-12.jpg",
    "/assets/images/catmod-08.jpg",
    "/assets/images/catmod-10.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Side - Product Images */}
      <div>
        {/* Main Image */}
        <div className="border rounded-lg overflow-hidden">
          <img
            src={selectedImage}
            alt="Product"
            className="w-full object-contain"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 mt-4">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumbnail ${i}`}
              onClick={() => setSelectedImage(img)}
              className={`w-28 h-28 object-contain border rounded cursor-pointer ${
                selectedImage === img
                  ? "border-yellow-500"
                  : "border-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div>
        <h1 className="text-3xl font-bold mb-2">GOLD NECKLACE</h1>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 text-lg">
            {"★".repeat(4)}
            <span className="text-gray-300">★</span>
          </div>
          <span className="ml-2 text-gray-600 text-sm">(1 Review)</span>
        </div>

        {/* Product Info */}
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Product Code:</span> FRZNS45936
        </p>
        <p className="text-gray-600 mb-1">
          Free Shipping In India | Hallmarked Jewellery Available For Sale
        </p>
        <p className="text-green-600 font-semibold mb-4">Availability: In Stock</p>

        {/* Price */}
        <div className="text-3xl font-bold text-yellow-600 mb-6">
          ₹13,974{" "}
          <span className="text-base text-gray-600">
            (Inclusive Of All Taxes)
          </span>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-6">
          {/* Size */}
          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <select className="w-full border rounded px-3 py-2">
              <option>18 INCHES (45.72 Cm)</option>
            </select>
          </div>

          {/* Gold Color */}
          <div>
            <label className="block text-sm font-medium mb-1">Gold Color</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Yellow</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <div className="flex items-center border rounded w-32">
              <button
                className="px-3 py-1 text-lg font-semibold"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-x"
              />
              <button
                className="px-3 py-1 text-lg font-semibold"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mb-6">
          <button className="border rounded-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
            📷 Try It On
          </button>
          <button className="text-2xl">♡</button>
          <button className="text-2xl">🔗</button>
        </div>

        {/* Buy / Cart */}
        <div className="flex gap-4">
          <button className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600">
            Buy Now
          </button>
          <button className="border border-yellow-500 text-yellow-700 px-6 py-3 rounded hover:bg-yellow-50">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
