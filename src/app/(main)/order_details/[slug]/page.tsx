import React from "react";
import Banner from "@/components/common/Banner/Banner";
import OrderTracker from "@/components/ordertracker/OrderTracker";

const OrderDetails = () => {
  return (
    <div className="w-full">
      {/* Banner */}
      <Banner Title="Order Details" />

      {/* Main Grid Layout */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {/* Left Section */}
          <section className="md:col-span-2">
<div className="bg-white p-4 shadow rounded">

            {/* Product Info */}
            <div className="flex items-start gap-4 border-b-2 border-gray-200 pb-2">
              <img
                src="/assets/images/catmod-11.jpg"
                alt="In Love Clover Diamond Ring"
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  In Love Clover Diamond Ring
                </h2>
                <p className="text-sm text-gray-500">1.83, Metal Grey</p>
                <p className="text-sm text-gray-500">Seller: RetailNet</p>
                <p className="text-lg font-bold text-[#d4b262] mt-2">₹123,168</p>
                <p className="text-xs text-gray-400 mt-1">1 offer</p>
              </div>
            </div>

            {/* Order Status */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-4">Order Status</h3>
              <OrderTracker />
            </div>

            {/* Action Buttons */}
          <div className="mt-6 flex justify-center items-center border-t border-gray-300 pt-4">
  <div className="flex flex-col sm:flex-row items-center gap-4">
    <button
      type="button"
      className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
    >
      Return
    </button>

    {/* Vertical divider for desktop */}
    <div className="hidden sm:block border-l border-gray-300 h-8"></div>

    <button
      type="button"
      className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
    >
      Chat with us
    </button>
  </div>
</div>


</div>
       {/* Rating Section */}

     
<div className="p-4 bg-white rounded-md shadow-sm my-6 space-y-4">
  {/* First row: Add photo/video */}
  <div className="flex items-center space-x-2">
    <input type="checkbox" className="form-checkbox text-green-500" />
    <span className="text-sm text-gray-700">Add a photo/video</span>
  </div>

  {/* Second row: Rating and button */}
  <div className="flex items-center justify-between">
    {/* Rating Section */}
    <div className="flex items-center space-x-1">
      <span className="text-sm text-gray-700">Great</span>
      <div className="flex space-x-1">
        {/* Filled stars */}
        {[...Array(4)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l3.09 1.635-.635-3.706L15 8.785l-3.772-.366L10 5l-1.228 3.419L5 8.785l2.545 3.144-.635 3.706L10 15z" />
          </svg>
        ))}
        {/* Empty star */}
        <svg
          className="w-5 h-5 text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l3.09 1.635-.635-3.706L15 8.785l-3.772-.366L10 5l-1.228 3.419L5 8.785l2.545 3.144-.635 3.706L10 15z" />
        </svg>
      </div>
    </div>

    {/* Add photo button */}
 <button className="px-3 py-1 text-sm text-[#d4b262] font-medium border border-[#dadada] rounded hover:bg-[#d4b262] hover:text-white focus:outline-none">
  Add photo
</button>

  </div>
</div>

        
          </section>

          {/* Right Section */}
          <aside className="bg-white p-4 shadow rounded space-y-4 ">
            {/* Delivery Details */}
            <div>
              <h3 className="font-semibold text-sm mb-2">Delivery details</h3>
              <p className="text-sm text-gray-600">
                TC9/1317-12, Behind Vigneswara Apartment, ...
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Abeesh Kumar - 9544XXXXXXX
              </p>
            </div>

            {/* Price Details */}
            <div>
              <h3 className="font-semibold text-sm mb-2">Price details</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Listing price</span>
                  <span className="line-through text-gray-400">₹7,499</span>
                </div>
                <div className="flex justify-between">
                  <span>Selling price</span>
                  <span>₹1,699</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Extra discount</span>
                  <span>-₹150</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Special price</span>
                  <span>₹1,549</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Other discount</span>
                  <span>-₹400</span>
                </div>
                <div className="flex justify-between">
                  <span>Total fees</span>
                  <span>₹19</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total amount</span>
                  <span>₹1,168</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <p className="text-sm text-gray-700">
                <strong>Paid by:</strong> Credit Card
              </p>
              <button
                type="button"
                className="mt-2 w-full border border-[#d4b262] text-[#d4b262] px-4 py-2 rounded hover:bg-[#d4b262] hover:text-white"
              >
                Download Invoice
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
