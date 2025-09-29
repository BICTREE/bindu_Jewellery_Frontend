"use client";

import { useState } from "react";
import { CreditCard, Banknote, Smartphone, Wallet } from "lucide-react";

export function OrderSummary() {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const products = [
    { name: "Venera Floral Heart Diamond Pendant With Chain", price: "₹65,640.00" },
    { name: "Tidal Diamond Ring", price: "₹68,754.00" },
    { name: "Kiaan Gold And Gemstone Men's Ring", price: "₹96,053.00" },
  ];

  const paymentOptions = [
    { id: 1, label: "Credit / Debit Card", icon: CreditCard },
    { id: 2, label: "Net Banking", icon: Banknote },
    { id: 3, label: "UPI", icon: Smartphone },
    { id: 4, label: "Cash on Delivery", icon: Wallet },
  ];

  return (
    <div className="space-y-6">
      {/* ✅ Order Summary Box */}
      <div className="bg-white p-6 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] space-y-4">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

        {/* Products */}
        <ul className="space-y-4">
          {products.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </li>
          ))}
        </ul>

        <div className="border-t my-4 border-gray-300"></div>

        {/* Totals */}
        <div className="flex justify-between text-gray-600">
          <span>Item Total</span>
          <span>₹230,447.00</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Discount (MONSOON)</span>
          <span>-₹24,172.00</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-2">
          <span>Order Total</span>
          <span>₹206,275.00</span>
        </div>
      </div>

      {/* ✅ Separate Payment Options Box */}
      <div className="bg-white p-6 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] space-y-4">
        <h3 className="text-lg font-semibold mb-4">Payment Options</h3>
        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <label
              key={option.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                selectedPayment === option.id
                  ? "border-2 border-[#d4b262] shadow-sm"
                  : "border border-gray-200 hover:shadow-sm"
              }`}
            >
              {/* Icon + Text */}
              <div className="flex items-center gap-3">
                <option.icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">{option.label}</span>
              </div>

              {/* Custom Radio */}
              <input
                type="radio"
                name="payment"
                value={option.id}
                checked={selectedPayment === option.id}
                onChange={() => setSelectedPayment(option.id)}
                className="hidden"
              />
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                  selectedPayment === option.id
                    ? "border-[#d4b262]"
                    : "border-gray-400"
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    selectedPayment === option.id ? "bg-[#d4b262]" : "bg-transparent"
                  }`}
                ></span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ✅ Continue button + info OUTSIDE boxes */}
<div className="flex flex-col items-center justify-center">
  <button className="w-70 bg-[#d4b262] rounded-xl hover:bg-[#d3ac52] transition text-white py-3 font-semibold">
    CONTINUE TO CHECKOUT
  </button>

  <p className="text-sm text-gray-500 mt-4">
    Your total savings{" "}
    <span className="text-green-600 font-semibold">₹24,172.00</span>
  </p>
  <p className="text-sm text-gray-500">
    Account: abeesh.kumar2012@gmail.com
  </p>
</div>


      {/* ✅ Support info remains separate */}
      <div className="border-t my-4 border-gray-300 "></div>
      <p className="text-sm text-gray-500 text-center">
        Have any queries? Contact us for your assistance <br />
        Call us at{" "}
        <a href="tel:+912261066262" className="text-[#d4b262]">
          +91 0487 232 6262
        </a>{" "}
        or{" "}
        <a href="#" className="text-[#d4b262]">
          Chat with us
        </a>
      </p>
    </div>
  );
}

export default OrderSummary;
