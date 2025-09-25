"use client";

import React, { useEffect, useState } from "react";
import JewelleryCard from "../common/collectioncard/JewelleryCard";
import { getAllCategory } from "@/services/categoryService/categorySerice";


interface Category {
  _id: string;
  name: string;
  description: string;
  image: {
    location: string;
  };
}

const CollectionJewellery = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory(1); // page 1 by default
        if (res?.success && res?.data?.result) {
          setCategories(res.data.result);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p className="text-center py-12">Loading categories...</p>;
  }

  return (
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Jewellery Collections
      </h2>

      {categories.length === 0 ? (
        <p className="text-center">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((item) => (
            <JewelleryCard
              key={item._id}
              image={item.image.location}
              title={item.name}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CollectionJewellery;
