"use client";

import { useState } from "react";

export function BillingForm() {
  const [shipToSameAddress, setShipToSameAddress] = useState(true);
  const [showNewShipping, setShowNewShipping] = useState(false);
  const [showNewBilling, setShowNewBilling] = useState(false);

  const [selectedBilling, setSelectedBilling] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null);

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500";

  const addresses = [
    {
      id: 1,
      name: "Abeesh Kumar",
      address: "15/145 Kalathil house",
      city: "Ernakulam, Kerala 682002",
      country: "India",
      mobile: "9544121555",
    },
    {
      id: 2,
      name: "John Doe",
      address: "12/34 Rose Villa",
      city: "Kochi, Kerala 682001",
      country: "India",
      mobile: "9876543210",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] space-y-4">
      {/* ================= BILLING ADDRESS ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Billing Address</h2>

        {!showNewBilling && (
          <>
            {/* Saved Billing Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`relative border rounded-xl p-4 transition cursor-pointer ${
                    selectedBilling === addr.id
                      ? "border-2 border-[#d4b262] shadow-md "
                      : "border border-gray-200 bg-white hover:shadow-md"
                  }`}
                  onClick={() => setSelectedBilling(addr.id)}
                >
                  {/* Custom radio top right */}
                  <label className="absolute top-3 right-3 cursor-pointer">
                    <input
                      type="radio"
                      name="billingAddress"
                      checked={selectedBilling === addr.id}
                      onChange={() => setSelectedBilling(addr.id)}
                      className="hidden"
                    />

                    {/* Outer circle */}
                    <span
                      className={`flex items-center justify-center h-5 w-5 rounded-full border-2 transition
            ${
              selectedBilling === addr.id
                ? "border-[#d4b262]"
                : "border-gray-400"
            }
          `}
                    >
                      {/* Inner dot */}
                      <span
                        className={`h-2.5 w-2.5 rounded-full transition
              ${selectedBilling === addr.id ? "bg-[#d4b262]" : "bg-transparent"}
            `}
                      />
                    </span>
                  </label>

                  {/* Address content */}
                  <p className="font-medium">Billing to : {addr.name}</p>
                  <p className="text-gray-600 text-sm mt-1">
                    {addr.address} <br />
                    {addr.city} <br />
                    {addr.country}
                  </p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Mobile :</span> {addr.mobile}
                  </p>
                </div>
              ))}
            </div>

            {/* Add new billing */}
            <button
              type="button"
              className="border text-[#d4b262] border-[#d4b262] rounded-lg px-4 py-2 mt-4 hover:bg-[#cea04e] hover:text-white"
              onClick={() => setShowNewBilling(true)}
            >
              ADD NEW BILLING ADDRESS
            </button>
          </>
        )}

        {/* New billing form */}
        {showNewBilling && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-wite p-4 ">
              <input
                type="text"
                placeholder="First name"
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Last name"
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Mobile Number"
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Zip/Postal Code"
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Room/Flat/Building No."
                className={`${inputClass} md:col-span-2`}
              />
              <select className={inputClass}>
                <option>India</option>
              </select>
              <input type="text" placeholder="City" className={inputClass} />
              <select className={`${inputClass} md:col-span-2`}>
                <option>Please select a region, state or province.</option>
                <option>Kerala</option>
                <option>Tamil Nadu</option>
              </select>
            </div>

            <button
              type="button"
              className="border border-[#d4b262] text-[#d4b262] rounded-lg px-4 py-2 mt-4 
             hover:bg-[#d4b262] hover:text-white transition"
              onClick={() => setShowNewBilling(false)}
            >
              DISCARD NEW BILLING ADDRESS
            </button>
          </div>
        )}
      </div>

      {/* ================= SHIPPING ADDRESS ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

        {/* Ship to same address box */}
        <div className="md:col-span-2 mt-4 border border-gray-300 rounded-xl p-4 flex items-center justify-between">
          <p className="font-medium text-gray-800">Ship to same address?</p>

          <div className="flex items-center gap-6">
            {/* YES option */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ship"
                checked={shipToSameAddress}
                onChange={() => setShipToSameAddress(true)}
                className="hidden peer"
              />
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                  shipToSameAddress ? "border-[#d4b262]" : "border-gray-400"
                }`}
              >
                {shipToSameAddress && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d4b262]"></span>
                )}
              </span>
              <span className="text-gray-800">Yes</span>
            </label>

            {/* NO option */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="ship"
                checked={!shipToSameAddress}
                onChange={() => setShipToSameAddress(false)}
                className="hidden peer"
              />
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                  !shipToSameAddress ? "border-[#d4b262]" : "border-gray-400"
                }`}
              >
                {!shipToSameAddress && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d4b262]"></span>
                )}
              </span>
              <span className="text-gray-800">No</span>
            </label>
          </div>
        </div>

        {/* Show extra shipping if "No" */}
        {!shipToSameAddress && (
          <div className="mt-6 space-y-6">
            {!showNewShipping && (
              <>
                {/* Saved Shipping Addresses (same style as billing) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`relative border rounded-xl p-4 transition cursor-pointer ${
                        selectedShipping === addr.id
                          ? "border-2 border-[#d4b262] shadow-md"
                          : "border border-gray-200 bg-white hover:shadow-md"
                      }`}
                      onClick={() => setSelectedShipping(addr.id)}
                    >
                      {/* Custom radio top right */}
                      <label className="absolute top-3 right-3 cursor-pointer">
                        <input
                          type="radio"
                          name="shippingAddress"
                          checked={selectedShipping === addr.id}
                          onChange={() => setSelectedShipping(addr.id)}
                          className="hidden"
                        />

                        {/* Outer circle */}
                        <span
                          className={`flex items-center justify-center h-5 w-5 rounded-full border-2 transition
            ${
              selectedShipping === addr.id
                ? "border-[#d4b262]"
                : "border-gray-400"
            }
          `}
                        >
                          {/* Inner filled dot */}
                          <span
                            className={`h-2.5 w-2.5 rounded-full transition
              ${
                selectedShipping === addr.id ? "bg-[#d4b262]" : "bg-transparent"
              }
            `}
                          />
                        </span>
                      </label>

                      <p className="font-medium">Shipping to : {addr.name}</p>
                      <p className="text-gray-600 text-sm mt-1">
                        {addr.address} <br />
                        {addr.city} <br />
                        {addr.country}
                      </p>
                      <p className="text-sm mt-2">
                        <span className="font-medium">Mobile :</span>{" "}
                        {addr.mobile}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="border border-[#d4b262] text-[#d4b262] rounded-lg px-4 py-2 mt-4 hover:bg-[#d4b262] hover:text-white"
                  onClick={() => setShowNewShipping(true)}
                >
                  ADD NEW SHIPPING ADDRESS
                </button>
              </>
            )}

            {showNewShipping && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-white p-4 rounded-lg border border-gray-200">
                  <input
                    type="text"
                    placeholder="First name"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Zip/Postal Code"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Room/Flat/Building No."
                    className={`${inputClass} md:col-span-2`}
                  />
                  <select className={inputClass}>
                    <option>India</option>
                  </select>
                  <input
                    type="text"
                    placeholder="City"
                    className={inputClass}
                  />
                  <select className={`${inputClass} md:col-span-2`}>
                    <option>Please select a region, state or province.</option>
                    <option>Kerala</option>
                    <option>Tamil Nadu</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="border border-[#d4b262] text-[#d4b262] rounded-lg px-4 py-2 mt-4 hover:bg-[#d4b262] hover:text-white"
                  onClick={() => setShowNewShipping(false)}
                >
                  DISCARD NEW SHIPPING ADDRESS
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
