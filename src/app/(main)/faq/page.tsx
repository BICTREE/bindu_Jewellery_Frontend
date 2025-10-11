"use client";

import Banner from "@/components/common/Banner/Banner";
import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Are all products hallmarked?",
    answer:
      "Yes, all gold jewellery is BIS Hallmarked for guaranteed purity",
  },
  {
    question: "Can I exchange jewellery?",
    answer: "Jewellery can be exchanged within 4 days without deductions. Customized orders are non-returnable ",
  },
  {
    question: "What schemes do you offer?",
    answer: "We provide Akshaya Nidhi and Swarna Bindu, designed for flexible gold investment and ownership.",
  },

  {
    question: "How can I shop online?",
    answer: "Visit our online store to explore KISNA & My Blue Diamonds and place secure orders",
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
