"use client";

import Banner from '@/components/common/Banner/Banner';
import React from "react";
import { JSX } from "react/jsx-runtime";

const COMPANY_NAME = "Your Company Name";
const SUPPORT_EMAIL = "support@yourcompany.com";
const SUPPORT_PHONE = "+91 98765 43210";

export default function ReturnPolicyPage(): JSX.Element {
  return (
 <><Banner
          Title="Refund Policy" />
          
          
          <main className=" container mx-auto p-6 sm:p-10 bg-white ">
              <header className="mb-8">
                  <h1 className=" text-gray-900  text-2xl md:text-3xl font-bold  mb-8">Refund Policy</h1>
                  <p className="mt-2 text-sm text-gray-600">Last updated: September 30, 2025</p>
              </header>

              <section className="prose prose-neutral">
    <ul className="list-none p-0 m-0">
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Jewellery can be exchanged within 4 days with no deduction on gold rate or making charges.
      </li>
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Cash buy-back is available with 1% deduction on gold rate.
      </li>
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Lifetime free maintenance and purity checks on all ornaments.
      </li>
      <li className="relative pl-6 mb-3 text-gray-700 leading-relaxed">
        <span className="absolute left-0 top-2 w-2.5 h-2.5 bg-[#d4b262] rounded-full"></span>
        Customized orders cannot be returned once confirmed.
      </li>
    </ul>
     
            
              </section>

              {/* <footer className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <span className="text-sm text-gray-600">© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</span>
      <div className="flex gap-3">
        <button
          onClick={() => window.print()}
          className="inline-block px-4 py-2 border rounded-lg text-sm font-medium hover:shadow">
          Print
        </button>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="inline-block px-4 py-2 bg-[#d4b262] text-white rounded-lg text-sm font-medium hover:opacity-95">
          Contact Support
        </a>
      </div>
    </footer> */}
          </main></>
  );
}
