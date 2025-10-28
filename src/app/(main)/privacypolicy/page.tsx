"use client";
import Banner from "@/components/common/Banner/Banner";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <>
      <Banner Title="Privacy Policy" />

      <div className="container mx-auto px-4 py-8">
        {/* Page Heading */}
        <h1 className="text-gray-900 text-2xl md:text-3xl font-bold mb-6">
          Privacy Policy
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-700 leading-relaxed mb-8">
          Thank you for visiting <strong>BinduJewellery.co.in</strong>. Bindu Jewellery
          respects your privacy, and we understand and share your concern about
          the protection of your personal information. This notice describes our
          privacy policies. By visiting the Bindu Jewellery website, you confirm
          your agreement to the privacy policies described in this Privacy
          Policy. If you do not agree to these terms, please exit this page and
          do not access or use the website.
        </p>

        {/* Policy Points */}
        <ul className="list-none p-0 m-0">
          <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
            <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
            Customer privacy is a top priority at Bindu Jewellery.
          </li>
          <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
            <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
            Personal details are collected and used solely for providing better
            service and effective communication.
          </li>
          <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
            <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
            We never sell, share, or misuse customer data under any
            circumstances.
          </li>
          <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
            <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
            All transactions and customer information are encrypted and remain
            strictly confidential.
          </li>
        </ul>
      </div>
    </>
  );
}
