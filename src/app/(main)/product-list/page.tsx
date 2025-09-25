"use client";

import React, { useState } from "react";
import Banner from "@/components/common/Banner/Banner";
import ProductListComp from "@/components/productlist/ProductListComp";
import { ChevronDown, ChevronRight,Filter,Plus, Minus } from "lucide-react";

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

const productTypes = ["Earrings", "Rings", "Necklaces", "Bracelets"];
const goldPurityOptions = ["18 Carat", "20 Carat", "22 Carat", "24 Carat"];
const stoneTypes = ["Diamond", "Ruby", "Emerald", "Sapphire"];
const productWeights = ["<5g", "5-10g", "10-20g", "20g+"];

type Filters = {
  productType: string[];
  goldPurity: string[];
  stoneType: string[];
  productWeight: string[];
  minPrice: number;
  maxPrice: number;
};

const Collections = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    productType: [],
    goldPurity: [],
    stoneType: [],
    productWeight: [],
    minPrice: 0,
    maxPrice: 60000,
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [sectionOpen, setSectionOpen] = useState<Record<string, boolean>>({
    "Product Type": true,
    "Gold Purity": true,
    "Stone Type": true,
    "Product Weight": true,
  });

  const productsPerPage = 6;

  const handleCheckbox = (category: keyof Filters, value: string) => {
    const current = filters[category] as string[];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setFilters({ ...filters, [category]: updated });
    setCurrentPage(1);
  };

  const handlePriceChange = (type: "minPrice" | "maxPrice", value: number) => {
    setFilters({ ...filters, [type]: value });
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((p) => {
    const matchesType = filters.productType.length
      ? filters.productType.some((t) => p.name.includes(t))
      : true;
    const matchesPurity = filters.goldPurity.length ? filters.goldPurity.includes(p.purity) : true;
    const matchesStone = filters.stoneType.length ? filters.stoneType.includes(p.stone) : true;
    const matchesWeight = filters.productWeight.length ? filters.productWeight.includes(p.weight) : true;
    const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
    return matchesType && matchesPurity && matchesStone && matchesWeight && matchesPrice;
  });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <Banner Title="Collections" />

      <div className="container mx-auto flex flex-col md:flex-row gap-2 md:gap-6">
        <div className="flex items-center  md:hidden justify-between w-full ">
   
        {/* MOBILE FILTER TOGGLE */}
<h2 className="block md:hidden px-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 pt-0">
  Our Collections
</h2>
<button
  className="md:hidden flex items-center justify-between w-[100px]  px-4 py-2 mt-3 bg-[#d4b262] text-white rounded-full shadow-md hover:bg-amber-600 transition-all duration-200 mb-4"
  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
>
  <div className="flex items-center gap-2">
    <Filter className="w-4 h-4" />
    {mobileFilterOpen ? "Filters" : "Filters"}
  </div>

  <div className="flex items-center">
    {mobileFilterOpen ? (
      <Minus className="w-4 h-4 animate-pulse" />
    ) : (
      <Plus className="w-4 h-4 animate-pulse" />
    )}
  </div>
</button>
</div>
        {/* LEFT FILTER SIDEBAR */}
        <div className=" bg-white shadow-md">
        <aside
          className={`${
            mobileFilterOpen ? "block" : "hidden"
          } md:block md:w-64 w-full p-4 md:p-6 space-y-6 self-start sticky top-24`}
        >
          {["Product Type", "Gold Purity", "Stone Type", "Product Weight"].map(
            (section) => {
              const options =
                section === "Product Type"
                  ? productTypes
                  : section === "Gold Purity"
                  ? goldPurityOptions
                  : section === "Stone Type"
                  ? stoneTypes
                  : productWeights;

              const isOpen = sectionOpen[section];

              return (
                <div key={section} className="pb-0 m-0 ">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() =>
                      setSectionOpen({
                        ...sectionOpen,
                        [section]: !isOpen,
                      })
                    }
                  >
                    <h3 className="font-semibold  pt-4 pb-2 w-full">
                      {section}
                    </h3>
                    {isOpen ? (
                      <ChevronDown className="w-5 h-5 text-gray-500 -ml-6" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500 -ml-6" />
                    )}
                  </div>

                  {isOpen && (
                    <ul className="space-y-2 text-gray-700 text-sm ">
                      {options.map((opt) => (
                        <li className="pb-2" key={opt}>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={
                                section === "Product Type"
                                  ? filters.productType.includes(opt)
                                  : section === "Gold Purity"
                                  ? filters.goldPurity.includes(opt)
                                  : section === "Stone Type"
                                  ? filters.stoneType.includes(opt)
                                  : filters.productWeight.includes(opt)
                              }
                              onChange={() =>
                                section === "Product Type"
                                  ? handleCheckbox("productType", opt)
                                  : section === "Gold Purity"
                                  ? handleCheckbox("goldPurity", opt)
                                  : section === "Stone Type"
                                  ? handleCheckbox("stoneType", opt)
                                  : handleCheckbox("productWeight", opt)
                              }
                            />
                            {opt}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }
          )}

          {/* Price Range */}
          <div className="">
            <h3 className="font-semibold mb-3  pt-4 pb-2">Price Range</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm">Min: ₹{filters.minPrice}</label>
                <input
                  type="range"
                  min={0}
                  max={60000}
                  value={filters.minPrice}
                  onChange={(e) =>
                    handlePriceChange("minPrice", Number(e.target.value))
                  }
                  className="w-full accent-[#d4b262]"
                />
              </div>
              <div>
                <label className="block text-sm">Max: ₹{filters.maxPrice}</label>
                <input
                  type="range"
                  min={0}
                  max={60000}
                  value={filters.maxPrice}
                  onChange={(e) =>
                    handlePriceChange("maxPrice", Number(e.target.value))
                  }
                  className="w-full accent-[#d4b262]"
                />
              </div>
            </div>
          </div>
        </aside>
</div>
        {/* MAIN CONTENT */}
        <main className="flex-1">
          <ProductListComp
            products={currentProducts.map((p) => ({ ...p, price: p.price.toString() }))}
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
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
