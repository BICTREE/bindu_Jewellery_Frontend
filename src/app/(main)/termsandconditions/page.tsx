"use client";
import Banner from "@/components/common/Banner/Banner";
import React from "react";

export default function TermsAndConditions() {
  return (
           <>
           <Banner Title="Terms And Conditions" />
          
          <div className="container px-4 py-8">
              {/* Page Heading */}
              <h1 className=" text-gray-900  text-2xl md:text-3xl font-bold  mb-8">
                  Terms &amp; Conditions
              </h1>

              {/* Intro */}
              <p className="text-gray-600 leading-relaxed mb-6">
                  Welcome to <span className="font-bold">Bindu Jewellery</span>. By
                  accessing or using our website, you agree to comply with and be bound by
                  the following Terms &amp; Conditions. Please read them carefully before
                  using our services.
              </p>

              {/* Section 1 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Use of Website
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      You agree to use this website only for lawful purposes and in a way
                      that does not infringe the rights of, restrict, or inhibit anyone
                      else’s use of the site. Unauthorized use of this website may give rise
                      to a claim for damages and/or be a criminal offense.
                  </p>
              </section>

              {/* Section 2 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Product Information
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      We strive to ensure that all product descriptions, prices, and images
                      are accurate. However, errors may occur, and we reserve the right to
                      correct any inaccuracies or update information at any time without
                      prior notice.
                  </p>
              </section>

              {/* Section 3 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Orders & Payment
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      By placing an order, you agree to provide accurate and complete
                      information. All payments must be made through our secure payment
                      gateways. We reserve the right to refuse or cancel any order at our
                      discretion.
                  </p>
              </section>

              {/* Section 4 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Shipping & Delivery
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      Delivery times are estimates and not guaranteed. We are not
                      responsible for delays caused by third-party couriers or unforeseen
                      circumstances beyond our control. Please review our{" "}
                      <a
                          href="/shipping-policy"
                          className="text-[#d4b262] hover:underline"
                      >
                          Shipping Policy
                      </a>{" "}
                      for more details.
                  </p>
              </section>

              {/* Section 5 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Returns & Exchanges
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      Please refer to our{" "}
                      <a
                          href="/return-policy"
                          className="text-[#d4b262] hover:underline"
                      >
                          Return Policy
                      </a>{" "}
                      for details on returns, refunds, and exchanges.
                  </p>
              </section>

              {/* Section 6 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Intellectual Property
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      All content on this website, including text, graphics, logos, images,
                      and designs, is the property of Bindu Jewellery and is protected by
                      copyright and trademark laws. You may not reproduce, distribute, or
                      exploit any content without prior written permission.
                  </p>
              </section>

              {/* Section 7 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Limitation of Liability
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      To the maximum extent permitted by law, Bindu Jewellery shall not be
                      liable for any direct, indirect, incidental, or consequential damages
                      resulting from the use of our website or products.
                  </p>
              </section>

              {/* Section 8 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Changes to Terms
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      We may update or modify these Terms &amp; Conditions at any time
                      without prior notice. Continued use of our website after changes
                      indicates your acceptance of the revised terms.
                  </p>
              </section>

              {/* Section 9 */}
              <section>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Contact Us
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      If you have any questions regarding these Terms &amp; Conditions,
                      please contact us at{" "}
                      <a
                          href="mailto:contact@bindujewellery.co.in"
                          className="text-[#d4b262] hover:underline"
                      >
                          contact@bindujewellery.co.in
                      </a>
                      .
                  </p>
              </section>
          </div></>
  );
}
