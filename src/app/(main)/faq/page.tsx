"use client";

import Banner from "@/components/common/Banner/Banner";
import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What is the basher vera?",
    answer:
      "If your control element is targeting a single collapsible element – i.e. the data-target attribute is pointing to an id selector – you should add the aria-controls attribute to the control element, containing the id of the collapsible element. Modern screen readers and similar assistive technologies make use of this attribute to provide users with additional shortcuts to navigate directly to the collapsible element itself.",
  },
  {
    question: "What is the potar vera?",
    answer: "This is the answer for the potar vera question.",
  },
  {
    question: "How pota work?",
    answer: "This is the answer for how pota works.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
  
      <><Banner
          Title="FAQ" />
          
          <main className=" container min-h-screen py-12 px-4">
              <div className="w-full max-w-3xl mx-auto">
                  <div className="bg-white border border-gray-200 rounded-md">
                      {faqs.map((faq, idx) => (
                          <div key={idx} className="border-b last:border-b-0 border-gray-200">
                              {/* Question Row */}
                              <button
                                  onClick={() => toggle(idx)}
                                  className="w-full flex justify-between items-center p-5 font-bold text-gray-600 hover:bg-gray-50 focus:outline-none"
                              >
                                  <span>{faq.question}</span>
                                  <span className="text-xl">
                                      {openIndex === idx ? "−" : "+"}
                                  </span>
                              </button>

                              {/* Answer */}
                              {openIndex === idx && (
                                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                                      {faq.answer}
                                  </div>
                              )}
                          </div>
                      ))}
                  </div>
              </div>
          </main></>
  );
}
