"use client";
import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  faqs: FAQItem[];
  note: string;
  terms: string[];
}

const GoldSchemeFAQ: React.FC<FAQProps> = ({ title, faqs, note, terms }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showTerms, setShowTerms] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#fff8f4] text-[#111] py-16 px-6 sm:px-10 md:px-20 lg:px-32">
      <h2 className="text-2xl sm:text-3xl font-serif text-center font-semibold mb-10">
        {title}
      </h2>

      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 bg-white overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-4 py-3 font-medium hover:bg-[#f9f5f3] transition-all"
            >
              {faq.question}
              {openIndex === index
                ? <ChevronDown className="w-5 h-5 text-[#7c0f0f]" />
                : <ChevronRight className="w-5 h-5 text-[#7c0f0f]" />}
            </button>

            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-700 leading-relaxed bg-[#fffdfc]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-sm sm:text-base mt-10 text-gray-700">
        <span className="text-[#c00000] font-semibold">NOTE:</span> {note}
      </p>

      <div className="text-center mt-6">
        <button
          onClick={() => setShowTerms(!showTerms)}
          className="text-[#7c0f0f] font-medium hover:underline focus:outline-none"
        >
          {showTerms ? "Hide all Terms & Conditions <<" : "View all Terms & Conditions >>"}
        </button>

        <div
          className={`transition-all duration-500 overflow-hidden ${
            showTerms ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-5 max-w-3xl mx-auto text-left text-gray-700">
            <h3 className="font-semibold text-lg mb-2 text-[#7c0f0f]">Terms & Conditions</h3>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              {terms.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldSchemeFAQ;
