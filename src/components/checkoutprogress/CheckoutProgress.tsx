"use client";
import React, { useState } from "react";
import { ShoppingBag, MapPin, CreditCard } from "lucide-react";

const steps = [
  { id: 1, name: "Bag", icon: ShoppingBag },
  { id: 2, name: "Address", icon: MapPin },
  { id: 3, name: "Payment", icon: CreditCard },
];

export default function CheckoutSteps() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="bg-gray-900 py-6">
      <div className="flex justify-center items-center text-white">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step button */}
              <button
                onClick={() => setCurrentStep(step.id)}
                className="flex flex-col items-center group focus:outline-none"
              >
                {/* Circle */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition 
                    ${
                      isActive
                        ? "bg-teal-600 border-teal-600 text-white"
                        : isCompleted
                        ? "bg-teal-500 border-teal-500 text-white"
                        : "bg-gray-600 border-gray-500 text-white"
                    }`}
                >
                  <Icon size={18} />
                </div>

                {/* Label */}
                <span
                  className={`mt-1 text-sm transition 
                    ${
                      isActive
                        ? "text-teal-400 font-semibold"
                        : isCompleted
                        ? "text-teal-300"
                        : "text-gray-300"
                    }`}
                >
                  {step.name}
                </span>
              </button>

              {/* Connector line (skip last step) */}
              {index < steps.length - 1 && (
                <div
                  className={`border-t-2 w-20 mx-2 transition
                    ${
                      currentStep > step.id
                        ? "border-teal-500"
                        : "border-gray-500 border-dashed"
                    }`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
