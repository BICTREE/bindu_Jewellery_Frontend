"use client";
import Banner from "@/components/common/Banner/Banner";
import React from "react";

export default function ShippingPolicy() {
 

          
  return (
     <>
     <Banner Title="ShippingPolicy" />
     <div className="container px-4 py-8">
          {/* Page Heading */}
          <h1 className=" text-gray-900  text-2xl md:text-3xl font-bold  mb-8">
              Shipping Policy
          </h1>

          {/* Section 1 */}
          <section className="mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Processing Time
              </h2>
              <p className="text-gray-600 leading-relaxed">
                  All orders are processed within <span className="font-bold">2–3 business days</span>.
                  Orders are not shipped or delivered on weekends or holidays. If we are
                  experiencing a high volume of orders, shipments may be delayed by a few days.
                  Please allow additional days in transit for delivery.
              </p>
          </section>

          {/* Section 2 */}
          <section className="mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Shipping Rates & Delivery Estimates
              </h2>
              <p className="text-gray-600 leading-relaxed">
                  Shipping charges for your order will be calculated and displayed at checkout.
                  Delivery estimates vary based on your location and selected shipping method.
              </p>
          </section>

          {/* Section 3 */}
          <section className="mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Shipment Confirmation & Tracking
              </h2>
              <p className="text-gray-600 leading-relaxed">
                  You will receive a shipment confirmation email once your order has shipped
                  containing your tracking number(s). The tracking number will be active within 24 hours.
              </p>
          </section>

          {/* Section 4 */}
          <section className="mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  International Shipping
              </h2>
              <p className="text-gray-600 leading-relaxed">
                  We currently ship to select international locations. Shipping fees and delivery
                  times will vary depending on the destination country. Any customs duties, taxes,
                  or import fees are the responsibility of the customer.
              </p>
          </section>

          {/* Section 5 */}
          <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                  If you have any questions regarding this Shipping Policy, please contact our
                  support team at <a href="mailto:contact@bindujewellery.co.in" className="text-[#d4b262] hover:underline">contact@bindujewellery.co.in</a>.
              </p>
          </section>
      </div></>
  );
}
