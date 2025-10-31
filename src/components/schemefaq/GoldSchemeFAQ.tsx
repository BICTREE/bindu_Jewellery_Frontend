"use client";
import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "CAN I ENROLL ONLINE IN THE EASY GOLD SCHEME?",
    answer:
      "Yes, you can enroll online easily through our official website or by visiting any of our showrooms. The process is quick and secure.",
  },
  {
    question: "HOW CAN I ENROLL IN THE EASY GOLD PROGRAM ONLINE?",
    answer:
      "Simply visit the scheme section on our website, fill in your details, select your preferred plan, and complete payment online to get started.",
  },
  {
    question: "IS IT POSSIBLE TO CHANGE MY INSTALLMENT AMOUNT AFTER ENROLLMENT?",
    answer:
      "Yes, you can modify your installment amount by contacting our customer service or visiting a nearby showroom before your next due date.",
  },
  {
    question:
      "WHO IS A NOMINEE? WHAT ARE THE CRITERIA FOR NOMINATING SOMEONE?",
    answer:
      "A nominee is the person you authorize to receive the scheme benefits in your absence. You can nominate any trusted family member or relative.",
  },
];

const GoldSchemeFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#fff8f4] text-[#111] py-16 px-6 sm:px-10 md:px-20 lg:px-32">
      <h2 className="text-2xl sm:text-3xl font-serif text-center font-semibold mb-10">
        Ask Us Your Easy Gold Scheme Related Questions
      </h2>

      <div className=" max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300  overflow-hidden bg-white "
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left text-sm sm:text-base font-medium hover:bg-[#f9f5f3] transition-all"
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronDown className="w-5 h-5 text-[#7c0f0f]" />
              ) : (
                <ChevronRight className="w-5 h-5 text-[#7c0f0f]" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-700 text-sm sm:text-base leading-relaxed bg-[#fffdfc]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Note Section */}
      <p className="text-center text-sm sm:text-base mt-10 text-gray-700">
        <span className="text-[#c00000] font-semibold">NOTE:</span> The
        subscription amount and benefits can be used towards the purchase of
        either Gold, Silver, Diamond studded jewellery or plain gold jewellery.
      </p>

      {/* Terms link */}
      <div className="text-center mt-6">
        <a
          href="#"
          className="text-[#7c0f0f] font-medium hover:underline text-sm sm:text-base"
        >
          View all Terms & Conditions &gt;&gt;
        </a>
      </div>
    </section>
  );
};

export default GoldSchemeFAQ;
