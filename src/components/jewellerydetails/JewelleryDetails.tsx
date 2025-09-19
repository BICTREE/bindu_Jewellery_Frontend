"use client";
import React, { useState } from "react";

export default function JewelleryTabs() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <section className="bg-gray-50 my-15 relative w-full">
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Title */}
      <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-8">
        JEWELLERY DETAILS
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex border rounded-full overflow-hidden">
          <button
            className={`px-6 py-2 text-sm sm:text-base font-medium transition ${
              activeTab === "details"
                ? "bg-black text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </button>
          <button
            className={`px-6 py-2 text-sm sm:text-base font-medium transition ${
              activeTab === "price"
                ? "bg-black text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setActiveTab("price")}
          >
            Price Breakup
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "details" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left - Table */}
          <div className="text-sm sm:text-base">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium">Product Name</td>
                  <td className="py-2">Gold Ring</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium">Product ID</td>
                  <td className="py-2">SUK-00215</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium">Gross Weight</td>
                  <td className="py-2">4.025g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium">Net Weight</td>
                  <td className="py-2">8.025g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium">Stone Weight</td>
                  <td className="py-2">4.00g</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium">Stone Count</td>
                  <td className="py-2">12</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium">Metal Type</td>
                  <td className="py-2">Yellow Gold (18ct)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium">Product Dimensions</td>
                  <td className="py-2">04cm X 02cm</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium">Color</td>
                  <td className="py-2">Yellow Gold (18ct)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Clarity</td>
                  <td className="py-2">NA</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Right - Description */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-2">
              Product Description
            </h3>
                <img
                    src="/assets/images/price-image.png"
                    alt="Brand Logo"
                    className=""
                  />
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Craft An Everlasting Impression With This 18 Karat Rose Gold
              Bangle, Elegantly Adorned With A Unique Circular Real Diamond
              Motif. Infuse Your Everyday Attire With The Tranquil Beauty Of Our
              Lotus-Inspired Natural Diamond Jewellery.
            </p>
          </div>
        </div>
      )}

      {activeTab === "price" && (
       <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-6">
  {/* Table */}
<div className="w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start gap-6">
  {/* Table */}
  <div className="w-full md:w-1/2 max-w-lg">
    <table className="w-full border-collapse text-sm sm:text-base">
      <tbody>
        <tr className="border-b">
          <td className="py-2 pr-4 font-medium">Gold Price</td>
          <td className="py-2">₹ 45,000</td>
        </tr>
        <tr className="border-b">
          <td className="py-2 pr-4 font-medium">Making Charges</td>
          <td className="py-2">₹ 5,000</td>
        </tr>
        <tr className="border-b">
          <td className="py-2 pr-4 font-medium">Stone Price</td>
          <td className="py-2">₹ 10,000</td>
        </tr>
        <tr className="border-b">
          <td className="py-2 pr-4 font-medium">GST (3%)</td>
          <td className="py-2">₹ 1,800</td>
        </tr>
        <tr>
          <td className="py-2 pr-4 font-semibold">Total</td>
          <td className="py-2 font-semibold">₹ 61,800</td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Right-side Image */}
   <div className="flex-1">
    <img
      src="/assets/images/price-image.png"
      alt="Jewellery"
      className="w-full h-auto rounded-lg object-cover"
    />
  </div>
</div>



</div>

      )}
    </div>
    </section>
  );
}
