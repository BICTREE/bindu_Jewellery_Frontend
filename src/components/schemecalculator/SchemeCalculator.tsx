"use client";
import React, { useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { Diamond, CircleDollarSign } from "lucide-react";

export default function SchemeCalculator() {
  const [isDiamond, setIsDiamond] = useState(true);
  const [amount, setAmount] = useState(5000);

  // Data based on selection
  const schemeData = isDiamond
    ? {
        name: "Diamond Jewellery",
        color: ["#FACC15", "#38BDF8"], // yellow & sky blue
        months11: { paid: amount * 11, bonus: amount, total: amount * 12 },
        months6: { paid: amount * 6, bonus: amount / 2, total: amount * 6.5 },
      }
    : {
        name: "Gold Jewellery",
        color: ["#EAB308", "#F59E0B"], // gold tones
        months11: { paid: amount * 11, bonus: amount * 0.8, total: amount * 11.8 },
        months6: { paid: amount * 6, bonus: amount * 0.4, total: amount * 6.4 },
      };

  const pieData = [
    { name: "Amount Paid", value: schemeData.months11.paid },
    { name: "Additional Bonus", value: schemeData.months11.bonus },
  ];

  return (
    <div className="bg-[#f8f2c2] min-h-screen flex flex-col items-center justify-center  py-10 md:py-15 px-6">
      <h1 className="text-[#5a2e00]  text-2xl sm:text-3xl font-serif text-center font-semibold mb-10">
        Scheme Calculator
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div>
          {/* Toggle */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Diamond
                size={18}
                className={isDiamond ? "text-sky-500" : "text-gray-400"}
              />
              <span className={`cursor-pointer ${
                  isDiamond ? "text-sky-600 font-semibold" : "text-gray-400"
                }`}
                onClick={() => setIsDiamond(true)}
              >
                Diamond jewellery
              </span>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!isDiamond}
                onChange={() => setIsDiamond(!isDiamond)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-gray-300"></div>
              <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-[#2fbcce] rounded-full transition-all peer-checked:translate-x-5"></div>
            </label>

            <div className="flex items-center gap-2 text-gray-700">
              <CircleDollarSign
                size={18}
                className={!isDiamond ? "text-sky-500" : "text-gray-400"}
              />
              <span
                className={`cursor-pointer ${
                  !isDiamond ? "text-sky-500 font-semibold" : "text-gray-400"
                }`}
                onClick={() => setIsDiamond(false)}
              >
                Gold jewellery
              </span>
            </div>
          </div>

          {/* Amount Slider */}
          <div className="flex items-center mb-6">
            <input
              type="range"
              min="1000"
              max="100000"
              step="500"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-gry-500"
            />
          </div>

         {/* Input + Check Button */}
<div className="flex mb-4 w-full">
  <input
    type="number"
    min="1000"
    value={amount}
    onChange={(e) => setAmount(Math.max(1000, Number(e.target.value)))}
    className="w-full border border-sky-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    placeholder="Enter monthly amount"
  />
  <button
    className="bg-sky-500 text-white px-6 py-2  hover:bg-sky-600 transition font-medium"
  >
    CHECK
  </button>
</div>

          {/* Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={schemeData.color[i]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Section - Scheme Details */}
 <div className="flex flex-col gap-6 max-w-sm">
  {/* 11 Months Scheme */}
  <div>
    <h2 className="font-semibold text-lg mb-2 text-gray-800">
      11 months Scheme
    </h2>

    <div className="border border-gray-200 shadow-sm overflow-hidden bg-white">
      <div className="p-4">
        <div className="space-y-2 text-gray-700">
          <p className="flex justify-between">
            <span>Amount Paid:</span>
            <span className="font-medium">
              ₹{schemeData.months11.paid.toLocaleString()}
            </span>
          </p>

          <p className="flex justify-between items-end">
            <span>
              Additional Bonus:
              <span className="block text-sm text-gray-500">
                (100% of 1st Installment)
              </span>
            </span>
            <span className="font-medium text-gray-800">
              ₹{schemeData.months11.bonus.toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-[#f1f7fa] p-3 border-t border-gray-200">
        <p className="flex justify-between font-semibold text-gray-800">
          <span>Total Amount:</span>
          <span>₹{schemeData.months11.total.toLocaleString()}</span>
        </p>
      </div>
    </div>
  </div>

  {/* 6 Months Scheme */}
  <div>
    <h2 className="font-semibold text-lg mb-2 text-gray-800">
      6 months Scheme
    </h2>

    <div className="border border-gray-200  shadow-sm overflow-hidden bg-white">
      <div className="p-4">
        <div className="space-y-2 text-gray-700">
          <p className="flex justify-between">
            <span>Amount Paid:</span>
            <span className="font-medium">
              ₹{schemeData.months6.paid.toLocaleString()}
            </span>
          </p>

          <p className="flex justify-between items-end">
            <span>
              Additional Bonus:
              <span className="block text-sm text-gray-500">
                (50% of 1st Installment)
              </span>
            </span>
            <span className="font-medium text-gray-800">
              ₹{schemeData.months6.bonus.toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-[#f1f7fa] p-3 border-t border-gray-200">
        <p className="flex justify-between font-semibold text-gray-800">
          <span>Total Amount:</span>
          <span>₹{schemeData.months6.total.toLocaleString()}</span>
        </p>
      </div>
    </div>
  </div>

  <p className="text-xs text-gray-400 mt-2 italic text-center">
    *This chart is for representational purposes only. Actual values may vary.
    Refer to terms & conditions.
  </p>
</div>


      </div>
    </div>
  );
}
