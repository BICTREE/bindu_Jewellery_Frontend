"use client";
import React from "react";
import { ChevronDown } from "lucide-react"; // npm i lucide-react

const FilterBar = () => {
  return (
    <div className="container">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-10 mb-6">
        {/* Left - Item count */}
        <p className="text-sm md:text-base font-medium text-gray-900 mb-3 md:mb-0">
          Showing (09) Items
        </p>

        {/* Right - Filters + Sort */}
        <div className="flex gap-8">
          {/* Filters */}
          <div className="relative w-40">
            <select
              className="appearance-none w-full border-b border-gray-400 text-gray-700 text-sm md:text-base bg-transparent focus:outline-none pr-6 py-1.5 cursor-pointer"
            >
              <option>Filters</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Sort By */}
          <div className="relative w-40">
            <select
              className="appearance-none w-full border-b border-gray-400 text-gray-700 text-sm md:text-base bg-transparent focus:outline-none pr-6 cursor-pointer py-1.5"
            >
              <option>Sort By</option>
              <option>Newest</option>
              <option>Popular</option>
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
