"use client";
import React from "react";
import JewelleryCard from "../common/collectioncard/JewelleryCard";

const CollectionJewellery = () => {
  const collections = [
    { image: "/assets/images/catmod-08.jpg", title: "STUDS AND DROPS" },
    { image: "/assets/images/catmod-08.jpg", title: "BANGLES" },
    { image: "/assets/images/catmod-08.jpg", title: "NECKLACES" },
    { image: "/assets/images/catmod-08.jpg", title: "RINGS" },
    { image: "/assets/images/catmod-08.jpg", title: "CHAINS" },
    { image: "/assets/images/catmod-08.jpg", title: "PENDANTS" },
  ];

  return (
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Jewellery Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((item, idx) => (
          <JewelleryCard key={idx} image={item.image} title={item.title} />
        ))}
      </div>
    </section>
  );
};

export default CollectionJewellery;
