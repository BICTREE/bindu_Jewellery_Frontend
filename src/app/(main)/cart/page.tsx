"use client";
import React, { useState, useMemo, useEffect } from "react";
// import { X } from "lucide-react";
import Link from "next/link";
import Banner from "@/components/common/Banner/Banner";
import { getMyCart, UpdateCart, RemoveFromCart } from "@/services/cartService/cartService";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Loader from "@/components/loader/Loader";
import { decrementCartCount } from "@/redux/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { toggleWishlist } from "@/redux/store/wishlistSlice";
interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  extraPrice: number;
  tax: number;
  quantity: number;
  image: {
    location: string;
    name: string;
    key: string;
  };
  specs: {
    variationId: string;
    optionId: string;
    variationName: string;
    optionValue: string;
  }[];
  stockStatus: string;
}

const CartPage = () => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState<string | null>(null);
 const { data: session, status } = useSession()
  const dispatch = useDispatch<AppDispatch>();
  const [showPromo, setShowPromo] = useState(false);
  const { _id: userId, wishlist } = useSelector(
    (state: RootState) => state.user
  );

  // 🔹 Fetch cart from API
 useEffect(() => {
  const fetchCart = async () => {
    try {
      const cart = await getMyCart();
      setCartItems(cart || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Wait until session is fully loaded
  if (status === "loading") return; // ⏳ wait for session to load

  if (status === "unauthenticated") {
    setLoading(false);
    return;
  }

  if (status === "authenticated") {
    fetchCart();
  }
}, [status]);


  // 🔹 Check if product is in wishlist
  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  console.log(wishlist, "current wishlist"); // Debug current wishlist

  // 🔹 Handle wishlist toggle
  const handleWishlist = async (e: React.MouseEvent, productId: string, cartId: string) => {
    e.preventDefault();

    if (wishlistLoading) return;

    if (!userId) {
      toast.error("Please login to manage wishlist");
      return;
    }

    setWishlistLoading(productId);

    try {
      // Check current state BEFORE the update
      const currentlyInWishlist = isInWishlist(productId);
      console.log(currentlyInWishlist, "is in list ")

      // ✅ If already in wishlist, just show message and exit
      if (currentlyInWishlist) {
        toast.success("Item is already in your wishlist");
        setWishlistLoading(null);
        return;
      }
      // Dispatch the toggle action
      await dispatch(toggleWishlist({ userId, productId, inWishlist: currentlyInWishlist })).unwrap();

      toast.success("Item added to wishlist");

      // If ADDING to wishlist (wasn't in wishlist before), remove from cart
      if (!currentlyInWishlist) {
        await removeItem(cartId);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong");
    } finally {
      setWishlistLoading(null);
    }
  };

  // 🔹 Remove item using API
  const removeItem = async (productId: string) => {
    try {
      const itemId = productId
      await RemoveFromCart({ itemId });
      dispatch(decrementCartCount())
      setCartItems((prev) => prev.filter((item) => item._id !== productId));
      toast.success("Item removed from cart.");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item. Try again.");

    }
  };

  // 🔹 Update quantity using API
  const updateQty = async (itemId: string, type: "inc" | "dec") => {
    const item = cartItems.find((i) => i._id === itemId);
    if (!item) return;

    const newQty = type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1);

    try {
      await UpdateCart({ itemId: item._id, quantity: newQty });
      setCartItems((prev) =>
        prev.map((i) => (i._id === itemId ? { ...i, quantity: newQty } : i))
      );
      toast.success(`Quantity ${type === "inc" ? "increased" : "decreased"}.`);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity. Try again."); toast.error("Failed to update quantity. Try again.");
    }
  };

  // Handle coupon
  const handleApply = () => {
    if (coupon.trim().toUpperCase() === "MONSOON") {
      setDiscount(20);
      setAppliedCoupon("MONSOON");
    } else {
      setDiscount(0);
      setAppliedCoupon("");
      setShowAlert(true);
    }
  };

  // Totals
  const { itemTotal, discountAmount, orderTotal } = useMemo(() => {
    const totalCurrent = cartItems.reduce(
      (sum, item) => sum + (item.price + item.extraPrice + item.tax) * item.quantity,
      0
    );
    const couponDiscount = appliedCoupon ? (totalCurrent * discount) / 100 : 0;
    const finalTotal = totalCurrent - couponDiscount;

    return {
      itemTotal: totalCurrent,
      discountAmount: couponDiscount,
      orderTotal: finalTotal,
    };
  }, [cartItems, discount, appliedCoupon]);

if (status === "loading" || loading) {
  return <Loader />;
}

  return (
    <div className="bg-white">
      <Banner Title="My Cart" />

      {/* Custom Alert */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-semibold text-red-600">Invalid Coupon</h2>
            <p className="text-gray-600 mt-2">Please try again with a valid code.</p>
            <button
              onClick={() => setShowAlert(false)}
              className="mt-4 px-4 py-2 bg-[#d4b262] text-white rounded-lg hover:bg-[#ce9f4e]"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">


        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-sm font-semibold text-gray-600 mt-4 md:mt-0">
            TOTAL ITEMS {cartItems.length}
          </h2>

          {cartItems.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-600">
                <p className="text-lg font-medium">🛒 Your cart is empty</p>
                <Link
                  href="/product-list"
                  className="mt-4 inline-block px-6 py-2 bg-[#d4b262] text-white rounded-lg hover:bg-[#ce9f4e]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-6 mb-4"
              >
                {/* Left side: Image + Details */}
                <div className="flex items-center gap-4 w-full md:w-1/2">
                  <img
                    src={item.image?.location}
                    alt={item.name}
                    className="w-28 h-28 object-contain border border-gray-200 rounded-md"
                  />
                  <div>
                    <p className="text-sm text-gray-500">{item.name || "Chocker"}</p>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name || "Temple Chocker"}
                    </h3>
                    <span className="inline-block mt-1 text-xs text-green-700 bg-green-100 border border-green-300 rounded-full px-2 py-0.5">
                      In stock
                    </span>
                    <div className="flex gap-4 text-sm text-gray-500 mt-2">
                      {/* <button className="hover:text-[#d4b262]">Edit</button> */}
                      <button
                        onClick={() => removeItem(item._id)}
                        className="hover:text-[#d4b262]"
                      >
                        Delete
                      </button>
                      <button
                        onClick={(e) => handleWishlist(e, item.productId, item._id)}
                        className="hover:text-[#d4b262] disabled:opacity-50"
                        disabled={wishlistLoading === item._id}
                      >Move to Wishlist</button>
                    </div>
                  </div>
                </div>

                {/* Right side: Price Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full md:w-1/2 mt-4 md:mt-0 text-sm text-gray-800 md:text-right gap-4 md:gap-8">
                  <div className="flex flex-col md:items-end">
                    <p className="text-gray-500 mb-1">Item Price</p>
                    <p className="font-medium text-gray-800">
                      ₹{(item.price + item.extraPrice + item.tax).toLocaleString("en-IN")}/-
                    </p>
                  </div>

                  <div className="flex flex-col md:items-end">
                    <p className="text-gray-500 mb-1">Quantity</p>
                    <div className="flex items-center border border-gray-800 rounded w-fit">
                      {/* Decrease button */}
                      <button
                        onClick={() => updateQty(item._id, "dec")}
                        className="px-2 py-1 text-gray-700 hover:text-white hover:bg-[#000000] transition rounded-l  border-r-1"
                      >
                        −
                      </button>

                      {/* Quantity Display */}
                      <span className="px-3 py-1 text-gray-900 font-medium text-center w-8">
                        {item.quantity}
                      </span>

                      {/* Increase button */}
                      <button
                        onClick={() => updateQty(item._id, "inc")}
                        className="px-2 py-1 text-gray-700 hover:text-white hover:bg-[#000000] transition rounded-r  border-l-1"
                      >
                        +
                      </button>
                    </div>
                  </div>


                  <div className="flex flex-col md:items-end">
                    <p className="text-gray-500 mb-1">Total</p>
                    <p className="font-semibold text-gray-900">
                      ₹{(
                        (item.price + item.extraPrice + item.tax) * item.quantity
                      ).toLocaleString("en-IN")}
                      /-
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <button className="mt-4 px-4 py-2 border border-[#d4b262] text-[#d4b262] hover:text-white rounded-lg hover:bg-[#d4b262] text-sm">
              CONTINUE SHOPPING
            </button>
          )}
        </div>


        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] space-y-4">
          <div>


            {appliedCoupon ? (
              <p className="text-green-600 text-sm mt-1">
                Coupon {appliedCoupon} Applied Successfully
              </p>
            ) : (
              <>
                {showAlert && (
                  <p className="text-red-500 text-sm mt-1">Invalid coupon. Try again.</p>
                )}

                {/** Show promo input if user clicked link */}
                {showPromo && (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon code"
                      className="border border-gray-200 rounded-md px-2 py-1 text-sm w-full focus:ring-1 focus:ring-[#ce9f4e] focus:outline-none"
                    />
                    <button
                      onClick={handleApply}
                      className="bg-[#d4b262] text-white text-sm px-3 py-1 rounded-md hover:bg-[#ce9f4e]"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {!showPromo && (
                  <button
                    onClick={() => setShowPromo(true)}
                    className="font-semibold text-gray-800 cursor-pointer"
                  >
                    Use Promo Code
                  </button>
                )}
              </>
            )}
          </div>

          <div className="text-sm text-gray-700 space-y-2 border-t pt-4 border-gray-200">
            <div className="flex justify-between">
              <span>Item total</span>
              <span>₹{itemTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800">
              <span>Sub total</span>
              <span>₹{orderTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
              <span>Order Total</span>
              <span>₹{orderTotal.toLocaleString("en-IN")}</span>
            </div>
            <p className="text-green-600 text-sm">
              Your total savings ₹{discountAmount.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="flex justify-center border-t border-gray-200 pt-4">
            {cartItems.length === 0 ? (
              <button
                disabled
                className="w-60 text-center bg-gray-300 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                CHECKOUT SECURELY
              </button>
            ) : (
              <Link
                href="/checkout"
                className="block w-60 text-center bg-[#000000] hover:bg-[#ce9f4e] text-white py-3 rounded-lg font-semibold"
              >
                CHECKOUT SECURELY
              </Link>
            )}
          </div>

          <div className="pt-4 text-sm text-gray-600 border-gray-200">
            <p>Have any queries? Contact us for your assistance</p>
            <p className="mt-2">
              Call us at{" "}
              <a href="tel:+912261066262" className="text-[#d4b262] font-medium">
                +91 4994 256888
              </a>{" "}
              or{" "}
              <a href="#" className="text-[#d4b262] font-medium">
                CHAT WITH US
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
