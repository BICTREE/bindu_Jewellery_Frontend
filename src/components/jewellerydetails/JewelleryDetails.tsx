"use client";
import React, { useState } from "react";

// Define the product type
type Product = {
  _id: string;
  name: string;
  productID: string;
  description: string;
  grossWeight: string;
  netWeight: string;
  stoneWeight?: string;
  stoneCount?: number;
  metalType: string;
  productDimensions: string;
  price: number;
  makingCharges: number;
  stonePrice?: number;
  gst: number;
  color?: string;
  clarity?: string;
};

type JewelleryTabsProps = {
  product: Product;
};

export default function JewelleryTabs({ product }: JewelleryTabsProps) {
  const [activeTab, setActiveTab] = useState("details");

  // Calculate total price
  const calculateTotalPrice = () => {
    const basePrice = product.price || 0;
    const makingCharges = product.makingCharges || 0;
    const stonePrice = product.stonePrice || 0;
    const gstPercentage = product.gst || 0;
    
    const subtotal = basePrice + makingCharges + stonePrice;
    const gstAmount = (subtotal * gstPercentage) / 100;
    return subtotal + gstAmount;
  };

  const totalPrice = calculateTotalPrice();
  const gstAmount = ((product.price + product.makingCharges + (product.stonePrice || 0)) * product.gst) / 100;

  // Format currency in Indian format
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
                    <td className="py-2">{product.name || "N/A"}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Product ID</td>
                    <td className="py-2">{product.productID || "N/A"}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Gross Weight</td>
                    <td className="py-2">{product.grossWeight || "N/A"}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Net Weight</td>
                    <td className="py-2">{product.netWeight || "N/A"}</td>
                  </tr>
                  {product.stoneWeight && (
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium">Stone Weight</td>
                      <td className="py-2">{product.stoneWeight}</td>
                    </tr>
                  )}
                  {product.stoneCount && (
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium">Stone Count</td>
                      <td className="py-2">{product.stoneCount}</td>
                    </tr>
                  )}
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Metal Type</td>
                    <td className="py-2">{product.metalType || "N/A"}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Product Dimensions</td>
                    <td className="py-2">{product.productDimensions || "N/A"}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Color</td>
                    <td className="py-2">{product.color || product.metalType || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Clarity</td>
                    <td className="py-2">{product.clarity || "N/A"}</td>
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
                className="mb-4"
              />
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>
          </div>
        )}

        {activeTab === "price" && (
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start gap-6">
            {/* Table */}
            <div className="w-full md:w-1/2 max-w-lg">
              <table className="w-full border-collapse text-sm sm:text-base">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Gold Price</td>
                    <td className="py-2">₹ {formatCurrency(product.price)}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">Making Charges</td>
                    <td className="py-2">₹ {formatCurrency(product.makingCharges)}</td>
                  </tr>
                  {product.stonePrice && product.stonePrice > 0 && (
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium">Stone Price</td>
                      <td className="py-2">₹ {formatCurrency(product.stonePrice)}</td>
                    </tr>
                  )}
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-medium">GST ({product.gst}%)</td>
                    <td className="py-2">₹ {formatCurrency(gstAmount)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold">Total</td>
                    <td className="py-2 font-semibold">₹ {formatCurrency(totalPrice)}</td>
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
        )}
      </div>
    </section>
  );
}