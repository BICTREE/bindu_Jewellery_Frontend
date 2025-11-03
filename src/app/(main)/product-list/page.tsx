"use client";

import React, { Suspense, useEffect, useState } from "react";
import Banner from "@/components/common/Banner/Banner";
import ProductListComp from "@/components/productlist/ProductListComp";
import { ChevronDown, ChevronRight, Filter, Minus, Plus } from "lucide-react";
import { GetAllProducts } from "@/services/productService/productService";
import { getAllCategory } from "@/services/categoryService/categorySerice";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/common/pagination/Pagination";
import Loader from "@/components/loader/Loader";


export interface BackendSpec {
  variationId: {
    _id: string;
    name?: string;
  };
  optionId: {
    _id: string;
    value?: string;
  };
}

export type VariantItem = {
  _id: string;
  sku: string;
  stock: number;
  extraPrice: number;
  specs: BackendSpec[];
};

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImg: string;
  specs: BackendSpec[];
  variantItems: VariantItem[]; // ✅ add variantItems
};


export type ApiProduct = {
  _id: string;
  name: string;
  description?: string;
  metalType?: string;
  purity?: string;
  grossWeight?: string;
  price: number;
  thumbnail?: { location: string };
  images?: { location: string }[];
  tags?: string[];
  stoneWeight?: string;
  stoneCount?: number;
  variantItems: VariantItem[];
  createdAt: Date
};

type Category = {
  _id: string;
  parent: {
    _id: string;
    parent: null | string;
    name: string;
    description: string;
    isArchived: boolean;
    image: {
      name: string;
      key: string;
      location: string;
      _id: string;
    };
    productIds: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  } | null;
  name: string;
  description: string;
  isArchived: boolean;
  image: {
    name: string;
    key: string;
    location: string;
    _id: string;
  };
  productIds: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const goldPurityOptions = ["18K", "20K", "22K", "24K"];
const stoneTypes = ["Diamond", "Ruby", "Emerald", "Sapphire"];
const productWeights = ["<5g", "5-10g", "10-20g", "20g+"];

type Filters = {
  category: string[];
  goldPurity: string[];
  stoneType: string[];
  productWeight: string[];
  minPrice: number;
  maxPrice: number;
};

type ProductQueryParams = {
  page?: number;
  entries?: number;
  category?: string;
  purity?: string;
  minPrice?: number;
  maxPrice?: number;
  weight?: string;
  tag?: string;
};

// Separate component that uses useSearchParams
function CollectionsContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters, setFilters] = useState<Filters>({
    category: [],
    goldPurity: [],
    stoneType: [],
    productWeight: [],
    minPrice: 0,
    maxPrice: 150000,
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sectionOpen, setSectionOpen] = useState<Record<string, boolean>>({
    Category: true,
    "Gold Purity": true,
    "Stone Type": true,
    "Product Weight": true,
  });
  const [categoryOpen, setCategoryOpen] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const searchParams = useSearchParams();

  const productsPerPage = 6;

  // Read query params on mount and set filters
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const purityParam = searchParams.get("purity");
    const stoneTypeParam = searchParams.get("stoneType");
    const weightParam = searchParams.get("weight");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    setFilters((prev) => ({
      ...prev,
      category: categoryParam ? [categoryParam] : [],
      goldPurity: purityParam ? [purityParam] : [],
      stoneType: stoneTypeParam ? [stoneTypeParam] : [],
      productWeight: weightParam ? [weightParam] : [],
      minPrice: minPriceParam ? parseInt(minPriceParam) : 0,
      maxPrice: maxPriceParam ? parseInt(maxPriceParam) : 150000,
    }));
  }, [searchParams]);

  console.log(filters, "params data");

  const toggleCategory = (id: string) => {
    setCategoryOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const [pendingPrice, setPendingPrice] = useState({
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
  });

  // Debounce timer
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        minPrice: pendingPrice.minPrice,
        maxPrice: pendingPrice.maxPrice,
      }));
    }, 500); // ⏱ debounce delay 500ms

    return () => clearTimeout(timeout);
  }, [pendingPrice]);
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);
        const categoriesData = await getAllCategory();
        setCategories(categoriesData || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);
  // Fetch products with filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params: ProductQueryParams = {
          page: currentPage,
          entries: productsPerPage,
        };

        if (filters.category.length > 0) {
          params.category = filters.category.join(",");
        }

        if (filters.goldPurity.length > 0) {
          params.purity = filters.goldPurity.join(",");
        }

        if (filters.minPrice > 0) params.minPrice = filters.minPrice;
        if (filters.maxPrice < 150000) params.maxPrice = filters.maxPrice;

        // ✅ Updated weight filter - pass the exact values as shown in UI
        if (filters.productWeight.length > 0) {
          // Use the exact values that will match against grossWeight/netWeight fields
          const weightValues = filters.productWeight.map(weight => {
            switch (weight) {
              case "<5g":
                return "5"; // or whatever value is stored in your database for <5g products
              case "5-10g":
                return "5-10"; // exact string that exists in grossWeight/netWeight fields
              case "10-20g":
                return "10-20"; // exact string that exists in grossWeight/netWeight fields
              case "20g+":
                return "20+"; // or "20+" depending on what's in your database
              default:
                return weight;
            }
          }).filter(Boolean);

          if (weightValues.length > 0) {
            params.weight = weightValues.join(",");
          }
        }

        if (filters.stoneType.length > 0) {
          params.tag = filters.stoneType.map((s) => s.toLowerCase()).join(",");
        }


        const res = await GetAllProducts(params);
        const apiProducts = res?.result || [];
        const total = res?.pagination?.total || 0;
        console.log(apiProducts, "data api")
        const normalized: Product[] = apiProducts.map((p: ApiProduct) => ({
          id: p._id,
          name: p.name,
          purity: p.purity,
          metalType: p.metalType,
          grossWeight: p.grossWeight,
          price: p.price,
          tags: p.tags,
          stoneWeight: p.stoneWeight,
          stoneCount: p.stoneCount,
          description: p.description,
          image: p.images?.[0]?.location,
          hoverImg: p.thumbnail?.location,
          variantItems: p.variantItems || [],
        }));

        setProducts(normalized);
        setTotalProducts(total);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, filters, categories]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleCheckbox = (category: keyof Filters, value: string) => {
    const current = filters[category] as string[];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setFilters({ ...filters, [category]: updated });
    setCurrentPage(1);
  };

  const handlePriceChange = (type: "minPrice" | "maxPrice", value: number) => {
    setPendingPrice((prev) => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  };
  const parentCategories = categories.filter((cat) => cat.parent === null);
  const childCategories = categories.filter((cat) => cat.parent !== null);

  const isCategorySelectedById = (categoryId: string) => {
    return filters.category.includes(categoryId);
  };

  return (
    <>
      <Banner Title="Collections" />

      <div className="container mx-auto relative bg-white ">
        <div className="flex items-center md:hidden justify-between w-full bg-white">
          <h2 className="block md:hidden px-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 pt-0">
            Our Collections
          </h2>
          <button
            className="md:hidden flex items-center justify-between w-[100px] px-4 py-2 mt-3 bg-[#d4b262] text-white rounded-full shadow-md hover:bg-amber-600 transition-all duration-200 mb-4"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
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


        <div className="flex flex-col md:flex-row gap-2 md:gap-6 h-full bg-white ">
          {/* LEFT FILTER SIDEBAR */}
          <aside
            className={`${mobileFilterOpen ? "block" : "hidden"
              } md:block md:w-64 w-full p-4 md:p-6 space-y-6 self-start sticky top-24 shadow-lg`}
          >
            {/* Category Filter */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setSectionOpen({
                    ...sectionOpen,
                    Category: !sectionOpen["Category"],
                  })
                }
              >
                <h3 className="font-semibold pt-4 pb-2">Category</h3>
                {sectionOpen["Category"] ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </div>

              {sectionOpen["Category"] && (
                <div className="space-y-4">
                  {categoryLoading ? (
                    <p className="text-sm text-gray-500">
                      Loading categories...
                    </p>
                  ) : (
                    <>
                      {parentCategories.map((parentCat) => {
                        const isOpen = categoryOpen[parentCat._id] ?? true;
                        return (
                          <div
                            key={parentCat._id}
                            className="border-l-1 border-[#d4b262] pl-3"
                          >
                            <div
                              className="flex items-center justify-between cursor-pointer"
                              onClick={() => toggleCategory(parentCat._id)}
                            >
                              <h4 className="font-medium text-gray-800 mb-2 text-sm">
                                {parentCat.name}
                              </h4>
                              {isOpen ? (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                              )}
                            </div>

                            {isOpen && (
                              <ul className="space-y-1 text-gray-700 text-sm ml-2">
                                {childCategories
                                  .filter(
                                    (childCat) =>
                                      childCat.parent?._id === parentCat._id
                                  )
                                  .map((childCat) => (
                                    <li key={childCat._id}>
                                      <label className="flex items-center hover:bg-gray-50 px-2 py-1 rounded">
                                        <input
                                          type="checkbox"
                                          className="mr-2 accent-[#d4b262]"
                                          checked={isCategorySelectedById(
                                            childCat._id
                                          )}
                                          onChange={() =>
                                            handleCheckbox(
                                              "category",
                                              childCat._id
                                            )
                                          }
                                        />
                                        <span className="flex-1">
                                          {childCat.name}
                                        </span>
                                        {childCat.productIds &&
                                          childCat.productIds.length > 0 && (
                                            <span className="text-xs text-gray-400 ml-1">
                                              ({childCat.productIds.length})
                                            </span>
                                          )}
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Other Filters */}
            {["Gold Purity", "Stone Type", "Product Weight"].map((section) => {
              const options =
                section === "Gold Purity"
                  ? goldPurityOptions
                  : section === "Stone Type"
                    ? stoneTypes
                    : productWeights;

              const isOpen = sectionOpen[section];

              return (
                <div key={section} >
                  <div
                    className="flex justify-between items-center cursor-pointer "
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
                    <ul className="space-y-2 text-gray-700 text-sm border-l-1 border-[#d4b262] pl-3">
                      {options.map((opt) => (
                        <li key={opt}>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2 accent-[#d4b262]"
                              checked={
                                section === "Gold Purity"
                                  ? filters.goldPurity.includes(opt)
                                  : section === "Stone Type"
                                    ? filters.stoneType.includes(opt)
                                    : filters.productWeight.includes(opt)
                              }
                              onChange={() =>
                                section === "Gold Purity"
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
            })}

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3 pt-4 pb-2">Price Range</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm">
                    Min: ₹{filters.minPrice}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={150000}
                    value={pendingPrice.minPrice}
                    onChange={(e) =>
                      handlePriceChange("minPrice", Number(e.target.value))
                    }
                    className="w-full accent-[#d4b262]"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    Max: ₹{filters.maxPrice}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={150000}
                    value={pendingPrice.maxPrice}
                    onChange={(e) =>
                      handlePriceChange("maxPrice", Number(e.target.value))
                    }
                    className="w-full accent-[#d4b262]"
                  />
                </div>
              </div>
            </div>
          </aside>


          {/* MAIN CONTENT */}
          <main className="flex-2 relative  bg-white">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="mt-10 text-gray-600 px-4">
                  Showing {products.length} of {totalProducts} products
                </div>
                <ProductListComp
                  products={products.map((p) => ({
                    ...p
                    // image: "/assets/images/card-img01.png",
                    // hoverImg: "/assets/images/catmod-01.jpg",
                  }))}
                />
              </>
            )}

            {/* Pagination */}
            {/* {totalPages > 1 && (
              <div className="flex justify-center mt-6 mb-6 items-center gap-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
            )} */}

            <div className="w-full bg-white py-4 flex justify-center absolute bottom-0 left-0">

              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />

            </div>
          </main>

        </div>

      </div>

    </>
  );
}

// Main component with Suspense boundary
const Collections = () => {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <CollectionsContent />
    </Suspense>
  );
};

export default Collections;