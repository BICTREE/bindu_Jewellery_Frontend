"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { AddToWishlist, RemoveFromWishlist } from "@/services/wishlistService/wishlistService";
import { GetMyProfile } from "@/services/profileService/profileService";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";

type ProductCardProps = {
  id: string; // productId
  image: string;
  hoverImg: string;
  name: string;
  offer?: string;
  price: number | string;
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  hoverImg,
  name,
  offer,
  price,
}) => {
  const [user, setUser] = useState<{ _id: string; wishlist: string[] } | null>(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true); // ✅ loading state for fetching user
  const { data: session, status } = useSession();

  // ✅ fetch user data only if logged in
  const fetchUser = async () => {
    if (status !== "authenticated") {
      setLoadingUser(false);
      return;
    }

    setLoadingUser(true);
    try {
      const data = await GetMyProfile();
      setUser((prev) => {
        if (!prev || JSON.stringify(prev.wishlist) !== JSON.stringify(data.wishlist)) {
          return data;
        }
        return prev;
      });
      setInWishlist(data.wishlist.includes(id));
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      toast.error("Failed to load user data");
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUser();
    } else {
      setUser(null);
      setInWishlist(false);
      setLoadingUser(false);
    }
  }, [status]);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading || loadingUser) return;

    if (!user?._id) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    setLoading(true);
    const payload = { userId: user._id, productId: id };

    try {
      if (inWishlist) {
        await RemoveFromWishlist(payload);
        toast.success("Removed from wishlist");
      } else {
        await AddToWishlist(payload);
        toast.success("Added to wishlist");
      }
      // ✅ fetch user data only after change
      fetchUser();
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/products/${id}`} className="w-full sm:w-60 mx-auto">
      <div className="group cursor-pointer">
        {/* Card Image */}
        <div className="relative w-full aspect-[13/18] overflow-hidden bg-white shadow-lg transition-all duration-500 rounded-lg group-hover:rounded-t-[120px]">
          <img
            src={image}
            alt={name}
            className="absolute w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={hoverImg}
            alt={name}
            className="absolute w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
          />

          {/* Action Buttons */}
          <div className="absolute top-1/2 left-2 -translate-y-1/2 opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 flex flex-col space-y-2">

             {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              disabled={loading || loadingUser}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                inWishlist ? "bg-red-500" : "bg-gray-300 hover:bg-amber-500"
              }`}
            >
              {loadingUser ? (
                <span className="text-xs text-white">...</span>
              ) : (
                <Heart
                  size={18}
                  className="text-white"
                  fill={inWishlist ? "currentColor" : "none"} // ✅ fill for wishlisted
                  strokeWidth={2}
                />
              )}
            </button>
            
            {/* Preview Button */}
            <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-amber-500 transition">
              <img src="/assets/images/Eye.svg" alt="preview" />
            </button>

            {/* Share Button */}
            <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-amber-500 transition">
              <img src="/assets/images/Forward_Arrow.svg" alt="share" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center mt-3 px-2">
          <h3 className="text-sm sm:text-base font-bold text-amber-700 uppercase">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {offer ?? "22K Hallmarked"}
          </p>
          <div className="mt-2 text-base font-bold text-gray-900 relative">
            <span className="group-hover:hidden">₹{price}</span>
            <button className="hidden group-hover:inline-block text-amber-700 font-semibold">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
