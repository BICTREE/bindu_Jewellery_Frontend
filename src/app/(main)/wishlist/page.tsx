"use client";

import React, { useEffect, useState } from "react";
import Banner from "@/components/common/Banner/Banner";
import ProductListComp from "@/components/wishlist/WishlistComp";
import { getMyList } from "@/services/wishlistService/wishlistService";
import { useSession } from "next-auth/react";


interface Product {
  _id: string; // changed from number → string
  name: string;
  price: number;
  image: string;
  hoverImg: string;
  purity?: string;
  stone?: string;
  weight?: string;
  offer?: string;
}

const Collections = () => {
  const { data: session } = useSession(); // ✅ Get user session
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!session?.user) {
        setLoading(false); // ✅ Don’t call API if user not logged in
        return;
      }

      try {
        setLoading(true);
        const res = await getMyList();
        console.log(res, "wishlist data");
        if (res) {
          setProducts(res || []);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [session?.user]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <Banner Title="Wishlist" />

      <div className="container mx-auto flex flex-col gap-6 pb-20">
        <main className="flex-1">
          {loading ? (
            <p className="text-center py-12">Loading wishlist...</p>
          ) : products.length === 0 ? (
            <p className="text-center py-12">Your wishlist is empty.</p>
          ) : (
            <>
              <ProductListComp
                products={currentProducts.map((p) => ({
                  ...p,
                    price: p.price, // ✅ keep string if UI expects it
                  image: p.image || "/assets/images/card-img01.png",
                  hoverImg: p.hoverImg || "/assets/images/catmod-01.jpg",
                }))}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 mb-6 items-center gap-1">
                  {/* Prev */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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

                  {/* Next */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
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
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Collections;
