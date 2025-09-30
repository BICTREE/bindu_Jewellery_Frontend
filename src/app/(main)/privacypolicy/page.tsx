"use client";
import Banner from "@/components/common/Banner/Banner";
import React from "react";

export default function PrivacyPolicy() {
  return (

        <>
        <Banner
          Title="Privacy Policy" />
          
          
          
          <div className="container mx-auto px-4 py-8">
              {/* Page Heading */}
              <h1 className=" text-gray-900  text-2xl md:text-3xl font-bold  mb-8">
                  Privacy Policy
              </h1>

              {/* Intro */}
              <p className="text-gray-600 leading-relaxed mb-6">
                  At <span className="font-bold">Bindu Jewellery</span>, we are committed
                  to protecting your personal information and respecting your privacy. This
                  Privacy Policy outlines how we collect, use, and safeguard your data
                  when you interact with our website and services.
              </p>

              {/* Section 1 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Information We Collect
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      We may collect personal details such as your name, email address,
                      phone number, billing/shipping address, and payment information when
                      you make a purchase or contact us. We may also collect non-personal
                      data such as browser type, IP address, and device information to
                      improve your shopping experience.
                  </p>
              </section>

              {/* Section 2 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      How We Use Your Information
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      Your information helps us process transactions, deliver products,
                      improve our website, and provide customer support. We may also use
                      your contact details to send promotional offers and updates, but you
                      can opt out at any time.
                  </p>
              </section>

              {/* Section 3 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Data Protection & Security
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      We implement strict security measures to protect your data against
                      unauthorized access, alteration, or disclosure. However, no online
                      transmission or storage system is 100% secure, and we cannot guarantee
                      absolute security.
                  </p>
              </section>

              {/* Section 4 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Sharing of Information
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      We do not sell or trade your personal information. We may share data
                      with trusted third-party service providers (such as payment gateways
                      and shipping partners) only to the extent necessary for fulfilling
                      your orders.
                  </p>
              </section>

              {/* Section 5 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Cookies & Tracking Technologies
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      Our website may use cookies and similar technologies to enhance your
                      browsing experience, analyze traffic, and personalize content. You can
                      disable cookies in your browser settings, but some features of our
                      site may not function properly.
                  </p>
              </section>

              {/* Section 6 */}
              <section className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Your Rights
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      You have the right to access, update, or delete your personal
                      information. If you would like to exercise these rights, please
                      contact us using the information below.
                  </p>
              </section>

              {/* Section 7 */}
              <section>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      Contact Us
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                      If you have any questions regarding this Privacy Policy, please reach
                      out to us at{" "}
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
