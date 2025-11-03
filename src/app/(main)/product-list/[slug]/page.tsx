"use client";

import Banner from "@/components/common/Banner/Banner";
import JewelleryDetails from "@/components/jewellerydetails/JewelleryDetails";
import MayLikethis from "@/components/maylikethis/MayLikethis";
import React, { useState, useRef } from "react";



// 🔍 Zoom Lens Component
const ProductImageWithLens = ({ src }: { src: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lensSize, setLensSize] = useState(100); // default
  const [zoom, setZoom] = useState(2); // default

  const [lensStyle, setLensStyle] = useState({
    display: "none",
    top: 0,
    left: 0,
    backgroundPosition: "0px 0px",
  });

  // Update lens size & zoom based on container width (responsive)
  React.useEffect(() => {
    const updateLens = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.offsetWidth;

      if (width < 400) {
        setLensSize(60); // small screen
        setZoom(1.5);
      } else if (width < 768) {
        setLensSize(100); // medium screen
        setZoom(1.8);
      } else {
        setLensSize(100); // desktop
        setZoom(2);
      }
    };

    updateLens();
    window.addEventListener("resize", updateLens);
    return () => window.removeEventListener("resize", updateLens);
  }, []);

  const moveLens = (x: number, y: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const half = lensSize / 5;

    const lensX = Math.max(0, Math.min(x - half, rect.width - lensSize));
    const lensY = Math.max(0, Math.min(y - half, rect.height - lensSize));
    const bgX = -(x * zoom - half);
    const bgY = -(y * zoom - half);

    setLensStyle({
      display: "block",
      top: lensY,
      left: lensX,
      backgroundPosition: `${bgX}px ${bgY}px`,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current!.getBoundingClientRect();
    moveLens(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = containerRef.current!.getBoundingClientRect();
    moveLens(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const hideLens = () => setLensStyle(prev => ({ ...prev, display: "none" }));

  return (
    <div
      className="relative w-full border rounded overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={hideLens}
      onTouchMove={handleTouchMove}
      onTouchEnd={hideLens}
    >
      <img src={src} alt="Product" className="w-full h-auto object-contain" />

      <div
        className="absolute pointer-events-none border-2 border-[#d4b262] rounded-full shadow-lg"
        style={{
          width: lensSize,
          height: lensSize,
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${zoom * 550}%`,
          display: lensStyle.display,
          top: lensStyle.top,
          left: lensStyle.left,
          backgroundPosition: lensStyle.backgroundPosition,
        }}
      />
    </div>
  );
};


// 🔑 Main Product Page
const ProductPage = () => {
  const images = [
    "/assets/images/catmod-10.jpg",
    "/assets/images/catmod-11.jpg",
    "/assets/images/catmod-12.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);

  return (

    <><Banner
    Title="Title"
    />


    <div className="container">
  <div className="  px-4 sm:px-6 lg:px-8 mt-10 md:mt-16">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Left Column - Image Gallery */}
    <div>
      <ProductImageWithLens src={selectedImage} />

      {/* Thumbnails - scrollable on mobile */}
{/* Thumbnails - equal spacing */}

<div className="grid grid-cols-3 gap-4 mt-4 col-auto ">
  {images.map((img, i) => (
    <img
      key={i}
      src={img}
      alt={`Thumbnail ${i}`}
      className={`w-full aspect-square object-cover border rounded cursor-pointer ${
        selectedImage === img ?  "border-[#d4b262]" : "border-gray-300"
      }`}
      onClick={() => setSelectedImage(img)}
    />
  ))}
</div>



    </div>

    {/* Right Column - Product Details */}
    <div className="flex flex-col">
      <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2">
        GOLD NECKLACE
      </h1>

      {/* Rating */}
      <div className="flex items-center mb-4">
        <div className="flex text-[#d4b262] text-lg sm:text-xl">
          {"★".repeat(4)}
          <span className="text-gray-300">★</span>
        </div>
        <span className="ml-2 text-gray-600 text-sm">(1 Review)</span>
      </div>

      {/* Product Info */}
      <p className="text-gray-600 mb-1 text-sm sm:text-base">
        <span className="font-semibold">Product Code:</span> FRZNS45936
      </p>
      <p className="text-gray-600 mb-1 text-sm sm:text-base">
        Free Shipping In India | Hallmarked Jewellery Available For Sale
      </p>
      <p className="text-green-600 font-semibold mb-4 text-sm sm:text-base">
        Availability: In Stock
      </p>

      {/* Price */}
      <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-6">
        ₹13,974{" "}
        <span className="text-base text-gray-600">
          (Inclusive Of All Taxes)
        </span>
      </div>

      {/* Options - Responsive */}
    <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-6 p-5 bg-[#F3F3F3] rounded-lg">
  {/* Size */}
  <div className="flex-1">
    <label className="block text-sm font-medium mb-1">Size</label>
    <select className="w-full border border-gray-300 rounded px-3 py-2  bg-white">
      <option>18 INCHES (45.72 Cm)</option>
    </select>
  </div>

  {/* Gold Color */}
  <div className="flex-1">
    <label className="block text-sm font-medium mb-1">Gold Color</label>
    <select className="w-full border rounded px-3 py-2 border-gray-300  bg-white">
      <option>Yellow</option>
    </select>
  </div>

  {/* Quantity */}
  <div className="w-[120px]">
    <label className="block text-sm font-medium mb-1">Quantity</label>
    <div className="flex items-center border border-gray-300 rounded bg-white">
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
        className="w-12 text-center border-x border-gray-300"
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
     <button
  className="group border border-gray-300 rounded-full px-3 sm:px-4 py-2
             hover:bg-[#d4b262] flex items-center gap-2 text-sm sm:text-base 
             transition"
>
  <i
    className="fa fa-camera text-[#d4b262] group-hover:text-white transition"
  ></i>
  <span className="text-[#d4b262] group-hover:text-white transition">
    Try It On
  </span>
</button>

       <button
  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center 
             text-xl sm:text-2xl border border-gray-300 rounded-full">
 <i className="fa fa-heart text-[#d4b262] group-hover:text-white transition"></i>
</button>
     
           <button
  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center 
             text-xl sm:text-2xl border border-gray-300 rounded-full">
 <i className="fa fa-share-alt text-[#d4b262] group-hover:text-white transition"></i>
</button>
      </div>

      {/* Buy / Cart */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="w-full sm:w-auto bg-[#d4b262] text-white px-6 py-3 rounded hover:bg-yellow-600">
          Buy Now
        </button>
        <button className="w-full sm:w-auto border border-[#d4b262] text-yellow-700 px-6 py-3 rounded hover:bg-yellow-50">
          Add To Cart
        </button>
      </div>
    </div>
  </div>
</div>
</div>
    {/* <JewelleryDetails/> */}
    <MayLikethis/>
    </>



  );
};

export default ProductPage;
