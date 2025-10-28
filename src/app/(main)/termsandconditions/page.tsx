"use client";
import Banner from "@/components/common/Banner/Banner";
import React from "react";

export default function TermsAndConditions() {
  return (
    <>
      <Banner Title="Terms And Conditions" />

      <div className="container px-4 py-8">
        {/* Page Heading */}
        <h1 className="text-gray-900 text-2xl md:text-3xl font-bold mb-8">
          Terms &amp; Conditions
        </h1>

        <div className="text-gray-700 leading-relaxed space-y-6 mb-10">
          <p>
            BinduJewellery.co.in ("Bindu Jewellery" or "website" or "we" or
            "our") is the shopping website of CGD Private Limited allowing
            consumers to browse, select, and perform purchase transactions
            pertaining to precious stones and/or gold jewellery and accessories
            (“Products” or “Goods”) from the website.
          </p>

          <p>
            BinduJewellery.co.in provides services to you subject to the terms
            and conditions included in this Terms of Use and other customer
            service pages to help make your shopping experience with Bindu
            Jewellery as pleasant and beneficial as possible. Please read them
            thoroughly. By using or visiting this website or service, you
            acknowledge that you have read and understood, and agree to be bound
            by, these Terms of Use. You also agree to comply with all applicable
            laws and regulations, including Copyright and Trademark laws.
          </p>

          <p>
            If you disagree with these terms, please do not attempt to use
            BinduJewellery.co.in.
          </p>

          <p>
            If you would like to provide feedback about the
            BinduJewellery.co.in website, or recommend a way we can improve your
            shopping experience, please contact us at{" "}
            <a
              href="mailto:contact@bindujewellery.co.in"
              className="text-[#d4b262] underline"
            >
              contact@bindujewellery.co.in
            </a>
            .
          </p>

          <p>
            If you have any questions that need to be answered about these Terms
            and Conditions, please write to Bindu Jewellery at{" "}
            <a
              href="mailto:contact@bindujewellery.co.in"
              className="text-[#d4b262] underline"
            >
              contact@bindujewellery.co.in
            </a>
            .
          </p>
        </div>

        {/* Store Terms List */}
        <ul className="list-none p-0 m-0">
          <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
            <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
            All jewellery sold is BIS Hallmarked.
          </li>
          <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
            <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
            Prices include transparency in weight, making charges, and stone
            value.
          </li>
          <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
            <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
            Products are subject to availability and market rates.
          </li>
          <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
            <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
            Customized designs are final and non-refundable.
          </li>
          <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
            <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
            By purchasing, you agree to our store policies.
          </li>
        </ul>
      </div>
    </>
  );
}
