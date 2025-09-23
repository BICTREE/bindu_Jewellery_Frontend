import React from "react";
import Image from "next/image";

const orders = [
  {
    id: 1,
    title: "Revatee Solitaire Diamond Ring",
    color: "Metal Grey",
    size: "1.83",
    price: "₹1,168",
    status: "Delivered",
    statusDate: "Thu Sep 18",
image: "",
    reviewLink: "#",
  },
  {
    id: 2,
    title: "Blush Heart Diamond Ring",
    color: "Metal Grey",
    size: "1.83",
    price: "₹1,168",
    status: "Failed",
    statusDate: null,
    error: "Your payment was not confirmed by the bank.",
    message:
      "Payment not successful. Please contact your bank for any money deducted.",
  image: "/assets/images/catmod-10.jpg",
  },
  {
    id: 3,
    title: " 2 grams 24K Candere Gold",
    color: "Tan",
    size: "7",
    price: "₹589",
    status: "Delivered",
    statusDate: "Nov 16, 2023",
    image: "/assets/images/history_product.png",
    reviewLink: "#",
  },
];

export default function OrderHistory() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search your orders here"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col md:flex-row items-start md:items-center border p-4 rounded-lg shadow-sm"
          >
            <img
              src={order.image}
              alt="Product"
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{order.title}</h3>
              <p className="text-sm text-gray-600">
                Color: {order.color} &nbsp; | &nbsp; Size: {order.size}
              </p>
              <p className="font-semibold mt-1">{order.price}</p>

              {/* Status */}
              {order.status === "Delivered" && (
                <div className="flex items-center space-x-2 mt-2">
                  <span className="h-3 w-3 rounded-full bg-green-500 inline-block"></span>
                  <p className="text-sm font-medium text-green-700">
                    Delivered on {order.statusDate}
                  </p>
                </div>
              )}

              {order.status === "Failed" && (
                <>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="h-3 w-3 rounded-full bg-red-500 inline-block"></span>
                    <p className="text-sm font-medium text-red-700">
                      Order Not Placed
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{order.error}</p>
                  <div className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-2 rounded mt-2 text-sm">
                    {order.message}
                  </div>
                </>
              )}

              {/* Review link */}
              {order.status === "Delivered" && order.reviewLink && (
                <a
                  href={order.reviewLink}
                  className="text-blue-600 hover:underline mt-2 inline-block text-sm"
                >
                  ★ Rate & Review Product
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
