"use client";
import React, { useState, useMemo } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import Banner from "@/components/common/Banner/Banner";

const CartPage = () => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [showAlert, setShowAlert] = useState(false); // 👈 for custom alert

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Venera Floral Heart Diamond Pendant With Chain",
      image: "/assets/images/catmod-11.jpg",
      metal: "18K Yellow Gold (3.59g)",
      size: "43.82 cm",
      qty: 1,
      price: 57078,
      originalPrice: 65518,
    },
    {
      id: 2,
      name: "Tidal Diamond Ring",
      image: "/assets/images/catmod-11.jpg",
      metal: "18K Yellow Gold (3.30g)",
      size: "12",
      qty: 1,
      price: 58779,
      originalPrice: 68641,
    },
    {
      id: 3,
      name: "Kiaan Gold And Gemstone Mens Ring",
      image: "/assets/images/catmod-11.jpg",
      metal: "18K Yellow Gold (8.14g)",
      // gemstone: "0.465 Ct Gemstone",
      size: "18",
      qty: 1,
      price: 89907,
      originalPrice: 95776,
    },
  ]);

  // Remove item function
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle coupon apply
  const handleApply = () => {
    if (coupon.trim().toUpperCase() === "MONSOON") {
      setDiscount(20); // Example: 20% discount
      setAppliedCoupon("MONSOON");
    } else {
      setDiscount(0);
      setAppliedCoupon("");
      setShowAlert(true); // 👈 show custom alert
    }
  };

  // Calculate totals dynamically
  const { itemTotal, discountAmount, orderTotal } = useMemo(() => {
    const totalOriginal = cartItems.reduce(
      (sum, item) => sum + item.originalPrice * item.qty,
      0
    );
    const totalCurrent = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    // Apply coupon discount on top of current total
    const couponDiscount = appliedCoupon ? (totalCurrent * discount) / 100 : 0;
    const finalTotal = totalCurrent - couponDiscount;

    return {
      itemTotal: totalOriginal,
      discountAmount: totalOriginal - totalCurrent + couponDiscount,
      orderTotal: finalTotal,
    };
  }, [cartItems, discount, appliedCoupon]);

  return (
    <div className="bg-white">
      <Banner Title="My Cart" />

      {/* Custom Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-semibold text-red-600">
              Invalid Coupon
            </h2>
            <p className="text-gray-600 mt-2">
              Please try again with a valid code.
            </p>
            <button
              onClick={() => setShowAlert(false)}
              className="mt-4 px-4 py-2 bg-[#d4b262] text-white rounded-lg hover:bg-[#ce9f4e]"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="container mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
      
   
{/* Cart Items */}
<div className="md:col-span-2 space-y-4 h-full">
  <h2 className="text-sm font-semibold text-gray-600 mt-4 md:mt-0">
    TOTAL ITEMS {cartItems.length}
  </h2>

  {cartItems.length === 0 ? (
    <div className="flex items-center justify-center h-full  ">
      <div className="text-center text-gray-600">
        <p className="text-lg font-medium">🛒 Your cart is empty</p>
        <Link
          href="/"
          className="mt-4 inline-block px-6 py-2 bg-[#d4b262] text-white rounded-lg hover:bg-[#ce9f4e]"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  ) : (
    cartItems.map((item) => (
      <div
        key={item.id}
        className="flex items-start relative bg-white p-6 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] space-y-4"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-32 h-32 object-contain"
        />
        <div className="ml-4 flex-1">
          <h3 className="text-gray-800 font-semibold">{item.name}</h3>
          <div className="text-sm text-gray-600 mt-1 space-y-1">
            <p>Metal: {item.metal}</p>
            <p>Size: {item.size}</p>
            <p>Qty: {item.qty}</p>
          </div>
          <div className="mt-2">
            <span className="text-[#d4b262] font-semibold">
              ₹{item.price.toLocaleString("en-IN")}
            </span>
            <span className="text-gray-400 line-through ml-2">
              ₹{item.originalPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
        {/* Close Button */}
        <button
          onClick={() => removeItem(item.id)}
          className="absolute top-2 right-2 text-gray-400 hover:text-[#d4b262]"
        >
          <X size={18} />
        </button>
      </div>
    ))
  )}

  {cartItems.length > 0 && (
    <button className="mt-4 px-4 py-2 border border-[#d4b262] text-[#d4b262] hover:text-[#ffffff] rounded-lg hover:bg-[#d4b262] text-sm">
      CONTINUE SHOPPING
    </button>
  )}
</div>



        {/* Order Summary */}
        <div className=" bg-white p-6 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] space-y-4">
    
          {/* Coupon */}
          <div className="rounded-lg ">
            <p className="text-sm text-gray-700 font-medium">
              Apply Offer / Voucher
            </p>

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

          {/* Order Summary */}
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
        <Link
  href="/checkout"
  className="block w-60 text-center bg-[#d4b262] hover:bg-[#ce9f4e] text-white py-3 rounded-lg font-semibold"
>
  CHECKOUT SECURELY
</Link>
</div>
          {/* Help Section */}
          <div className=" pt-4 text-sm text-gray-600 border-gray-200">
            <p>Have any queries? Contact us for your assistance</p>
            <p className="mt-2">
              Call us at{" "}
              <a
                href="tel:+912261066262"
                className="text-[#d4b262] font-medium"
              >
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
