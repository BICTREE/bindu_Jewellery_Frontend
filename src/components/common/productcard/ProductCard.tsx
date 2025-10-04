"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchUser, toggleWishlist } from "@/redux/store/wishlistSlice";


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
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const { _id: userId, wishlist, loading } = useSelector(
    (state: RootState) => state.user
  );

  const inWishlist = wishlist.includes(id);

  // ✅ Fetch user only once after login
  useEffect(() => {
    if (status === "authenticated" && !userId) {
      dispatch(fetchUser());
    }
  }, [status, userId, dispatch]);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!userId) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    try {
      await dispatch(toggleWishlist({ userId, productId: id, inWishlist })).unwrap();
      toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Link href={`/products/${id}`} className="w-full sm:w-60 mx-auto">
      <div className="group">
        {/* Card Image */}
        <div className="relative w-full aspect-[13/18] overflow-hidden bg-white  transition-all duration-500 rounded-lg group-hover:rounded-t-[120px]">
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
              disabled={loading}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer  ${
                inWishlist ? "bg-red-500" : "bg-gray-300 hover:bg-amber-500"
              }`}
            >
              {loading ? (
                <span className="text-xs text-white">...</span>
              ) : (
                <Heart
                  size={18}
                  className="text-white"
                  fill={inWishlist ? "currentColor" : "none"}
                  strokeWidth={2}
                />
              )}
            </button>

            {/* Preview Button */}
            <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-amber-500 transition  cursor-pointer">
              <img src="/assets/images/Eye.svg" alt="preview" />
            </button>

            {/* Share Button */}
            <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-amber-500 transition  cursor-pointer">
              <img src="/assets/images/Forward_Arrow.svg" alt="share" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="text-center mt-3 px-2">
          <h3 className="text-sm sm:text-base font-bold text-[#d4b262] uppercase">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            {offer ?? "22K Hallmarked"}
          </p>
          <div className=" cursor-pointer mt-2 text-base font-bold text-gray-900 relative h-[40px]">
            <span className=" group-hover:hidden  text-[#000] font-semibold ">₹{price}</span>
           <button className=" cursor-pointer px-3 py-1 hidden group-hover:inline-block rounded-full bg-[#d4b262] text-white text-sm font-medium  hover:bg-[#c49b45] transition-all duration-300">
  Add to Cart
</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
