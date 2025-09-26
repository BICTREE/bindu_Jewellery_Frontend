"use client";

import React, { useEffect, useState } from "react";
import Banner from "@/components/common/Banner/Banner";
import ProductListComp from "@/components/productlist/ProductListComp";
import { ChevronDown, ChevronRight, Filter, Minus, Plus } from "lucide-react";
import { GetAllProducts } from "@/services/productService/productService";

// Product type
type Product = {
  id: string;
  name: string;
  purity?: string;
  stone?: string;
  weight?: string;
  offer?: string;
  metalType?: string;
  grossWeight?: string;
  price: number;
  image: string;
  hoverImg: string;
};
type ApiProduct = {
  _id: string;
  name: string;
  metalType?: string;
  grossWeight?: string;
  price: number;
  thumbnail?: { location: string };
  images?: { location: string }[];
};

// Filter options (keeping for UI but not using for filtering)
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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
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
  const [loading, setLoading] = useState(false);

  const productsPerPage = 6;

  // ✅ Normalize API data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res: ApiProduct[] = await GetAllProducts(currentPage); // ✅ properly typed
        const apiProducts = res || [];
        console.log(res, "data");

        const normalized: Product[] = apiProducts.map((p) => {
          // purity normalization
          let purity: string | undefined;
          if (p.metalType?.includes("18")) purity = "18 Carat";
          else if (p.metalType?.includes("20")) purity = "20 Carat";
          else if (p.metalType?.includes("22")) purity = "22 Carat";
          else if (p.metalType?.includes("24")) purity = "24 Carat";

          // weight normalization
          let weight: string | undefined;
          const g = parseFloat(p.grossWeight ?? "");

          if (!isNaN(g)) {
            if (g < 5) weight = "<5g";
            else if (g <= 10) weight = "5-10g";
            else if (g <= 20) weight = "10-20g";
            else weight = "20g+";
          }

          // stone normalization
          let stone: string | undefined;
          if (p.name?.toLowerCase().includes("diamond")) stone = "Diamond";
          else if (p.name?.toLowerCase().includes("ruby")) stone = "Ruby";
          else if (p.name?.toLowerCase().includes("emerald")) stone = "Emerald";
          else if (p.name?.toLowerCase().includes("sapphire")) stone = "Sapphire";

          return {
            id: p._id,
            name: p.name,
            purity,
            stone,
            weight,
            offer: "",
            price: p.price,
            image: p.thumbnail?.location || "/assets/images/catmod-08.jpg",
            hoverImg: p.images?.[0]?.location || "/assets/images/catmod-08.jpg",
          };
        });

        setAllProducts(normalized);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  // ✅ REMOVED FILTERING LOGIC - Use all products directly
  const filteredProducts = allProducts; // Directly use all products without filtering

  // ✅ Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // ✅ Checkbox filter update (keeping but not using for filtering)
  const handleCheckbox = (category: keyof Filters, value: string) => {
    const current = filters[category] as string[];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setFilters({ ...filters, [category]: updated });
    setCurrentPage(1);
  };

  // ✅ Price range update (keeping but not using for filtering)
  const handlePriceChange = (type: "minPrice" | "maxPrice", value: number) => {
    setFilters({ ...filters, [type]: value });
    setCurrentPage(1);
  };

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
        <div className="bg-white shadow-md">
          <aside
            className={`${mobileFilterOpen ? "block" : "hidden"
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
                  <div key={section}>
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setSectionOpen({
                          ...sectionOpen,
                          [section]: !isOpen,
                        })
                      }
                    >
                      <h3 className="font-semibold pt-4 pb-2">{section}</h3>
                      {isOpen ? (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      )}
                    </div>

                    {isOpen && (
                      <ul className="space-y-2 text-gray-700 text-sm">
                        {options.map((opt) => (
                          <li key={opt}>
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
            <div>
              <h3 className="font-semibold mb-3 pt-4 pb-2">Price Range</h3>
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
          {loading ? (
            <p className="text-center py-10">Loading products...</p>
          ) : (
            <>
              {/* Show total products count
              <div className="mb-4 text-gray-600">
                Showing {currentProducts.length} of {allProducts.length} products
              </div> */}
              <ProductListComp products={currentProducts} />
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 mb-6 items-center gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-2 py-1 text-sm rounded-full ${currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-[#d4b262] hover:text-white"
                  }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-2 py-1 text-sm rounded-full border ${currentPage === i + 1
                      ? "bg-[#d4b262] text-white border-[#d4b262]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-[#d4b262] hover:text-white"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-2 py-1 text-sm rounded-full ${currentPage === totalPages
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