"use client";
import { useState } from "react";
import { ClipboardList, Package, Truck, Home } from "lucide-react";

export default function OrderTracker() {
  const steps = [
    { id: 1, label: "Order Processed", icon: ClipboardList },
    { id: 2, label: "Order Shipped", icon: Package },
    { id: 3, label: "Order En Route", icon: Truck },
    { id: 4, label: "Order Arrived", icon: Home },
  ];

  // ✅ Track current step
  const [currentStep, setCurrentStep] = useState(1);

  // ✅ Progress calculation
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Line */}
      <div className="relative flex justify-between items-center mb-10">
        {/* Base Gray Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full"></div>

        {/* Active Blue Line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-[#d4b262] rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        ></div>

        {/* Circles (Clickable) */}
        {steps.map((step, index) => {
          const isActive = index + 1 <= currentStep;
          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)} // ✅ update state
              className={`relative flex items-center justify-center w-10 h-10 rounded-full border-4 transition-colors duration-300 ${
                isActive
                  ? "bg-[#d4b262] border-[#d4b262]"
                  : "bg-white border-gray-300"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  isActive ? "bg-white" : "bg-gray-300"
                }`}
              ></div>
            </button>
          );
        })}
      </div>

      {/* Labels + Icons */}
      <div className="grid grid-cols-4 text-center gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index + 1 <= currentStep;
          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)} // ✅ clickable label too
              className="flex flex-col items-center focus:outline-none"
            >
              <Icon
                className={`w-7 h-7 mb-2 transition-colors duration-300 ${
                  isActive ? "text-[#d4b262]" : "text-gray-400"
                }`}
              />
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-black" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
