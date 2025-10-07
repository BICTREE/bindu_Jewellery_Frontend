"use client";
import React, { useState, useMemo, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import Banner from "@/components/common/Banner/Banner";
import { getMyCart, UpdateCart, RemoveFromCart } from "@/services/cartService/cartService";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Loader from "@/components/loader/Loader";
import { decrementCartCount } from "@/redux/store/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  extraPrice: number;
  tax: number;
  quantity: number;
  thumbnail: {
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
  const { data: session } = useSession();
const dispatch = useDispatch<AppDispatch>();

  // 🔹 Fetch cart from API
  useEffect(() => {
    const fetchCart = async () => {
      if (!session) {
        setLoading(false); // ✅ stop loading if user not logged in
        return;
      }

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

    fetchCart();
  }, [session]);



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

  if (loading) {
    return <Loader />
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
        <div className="md:col-span-2 space-y-4">
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
                className="flex items-start relative bg-white p-6 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.1)]"
              >
                <img
                  src={item.thumbnail?.location}
                  alt={item.name}
                  className="w-32 h-32 object-contain"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-gray-800 font-semibold">{item.name}</h3>
                  <div className="text-sm text-gray-600 mt-1 space-y-1">
                    {item.specs?.map((spec, idx) => (
                      <p key={idx}>
                        {spec.variationName}: {spec.optionValue}
                      </p>
                    ))}

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item._id, "dec")}
                        className="px-3 py-1 border border-[#d4b262] rounded hover:bg-[#d4b262] text-[#d4b262] hover:text-white hover:border-[#d4b262]"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item._id, "inc")}
                        className="px-3 py-1 border border-[#d4b262] rounded hover:bg-[#d4b262] text-[#d4b262] hover:text-white hover:border-[#d4b262]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-[#d4b262] font-semibold">
                      ₹{(item.price + item.extraPrice + item.tax).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item._id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-[#d4b262]"
                >
                  <X size={18} />
                </button>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <button   className="mt-4 px-4 py-2 border border-[#d4b262] text-[#d4b262] hover:text-white rounded-lg hover:bg-[#d4b262] text-sm">
              CONTINUE SHOPPING
            </button>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] space-y-4">
          <div>
            <p className="text-sm text-gray-700 font-medium">Apply Offer / Voucher</p>

            {appliedCoupon ? (
              <p className="text-green-600 text-sm mt-1">
                Coupon {appliedCoupon} Applied Successfully
              </p>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="border-gray-200 border rounded-md px-2 py-1 text-sm w-full focus:ring-1 focus:ring-[#ce9f4e] focus:outline-none"
                />
                <button
                  onClick={handleApply}
                  className="bg-[#d4b262] text-white text-sm px-3 py-1 rounded-md hover:bg-[#ce9f4e]"
                >
                  Apply
                </button>
              </div>
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
                className="block w-60 text-center bg-[#d4b262] hover:bg-[#ce9f4e] text-white py-3 rounded-lg font-semibold"
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
