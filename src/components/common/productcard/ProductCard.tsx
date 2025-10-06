"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchUser, toggleWishlist } from "@/redux/store/wishlistSlice";
import { AddToCart } from "@/services/cartService/cartService";
import { VariantItem } from "@/app/(main)/product-list/page";


// What we actually send to API
export interface CartSpec {
  variationId: string;
  optionId: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  specs: CartSpec[];
  giftWrap: boolean;
}


type ProductCardProps = {
  id: string; // productId
  image: string;
  hoverImg: string;
  name: string;
  description?: string;
  price: number | string;
  variantItems: VariantItem[];
};

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  hoverImg,
  name,
  description,
  price,
  variantItems,
}) => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  // console.log(variantItems, "variantItems")
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


  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please login to add items to cart");
      return;
    }

    if (!variantItems || variantItems.length === 0) {
      toast.error("Product specs not available");
      return;
    }

    const firstVariant: VariantItem = variantItems[0];

    if (!firstVariant.specs || firstVariant.specs.length === 0) {
      toast.error("Product specifications not found");
      return;
    }

    // ✅ Transform only to IDs
    const specs: CartSpec[] = firstVariant.specs.map((spec) => ({
      variationId: spec.variationId._id,
      optionId: spec.optionId._id,
    }));

    const cartItem: CartItem = {
      productId: id,
      quantity: 1,
      specs,
      giftWrap: false,
    };

    console.log("Cart item being sent:", cartItem);

    try {
      await AddToCart(cartItem);
      toast.success("Added to cart!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Add to cart error:", err);
      }
      toast.error("Failed to add to cart");
    }
  };



  return (
    <div className="w-full sm:w-60 mx-auto">
      <div className="group">
        {/* Card Image */}
        <Link href={`/products/${id}`}>
          <div className="relative w-full aspect-[13/18] overflow-hidden bg-white transition-all duration-500 rounded-lg group-hover:rounded-t-[120px]">
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
                className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer ${inWishlist ? "bg-red-500" : "bg-gray-300 hover:bg-amber-500"
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
              <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-amber-500 transition cursor-pointer">
                <img src="/assets/images/Eye.svg" alt="preview" />
              </button>

              {/* Share Button */}
              <button className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-amber-500 transition cursor-pointer">
                <img src="/assets/images/Forward_Arrow.svg" alt="share" />
              </button>
            </div>
          </div>
        </Link>

        {/* Product Info */}
        <div className="text-center mt-3 px-2">
          <h3 className="text-sm sm:text-base font-bold text-[#d4b262] uppercase">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
            {description ?? "22K Hallmarked"}
          </p>

          <div className=" cursor-pointer mt-2 text-base font-bold text-gray-900 relative h-[40px]">
            <span className="group-hover:hidden text-[#000] font-semibold">₹{price}</span>
            <button
              onClick={handleAddToCart} // ✅ Call API on click
              className="cursor-pointer px-3 py-1 hidden group-hover:inline-block rounded-full bg-[#d4b262] text-white text-sm font-medium hover:bg-[#c49b45] transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
