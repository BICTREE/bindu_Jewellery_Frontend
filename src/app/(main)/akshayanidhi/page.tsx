"use client";
import React from "react";
import Image from "next/image";

import AkshayanidhiBanner from "@/components/common/Banner/AkshayanidhiBanner";
import ProcessToLogin from "@/components/processtologin/ProcessToLogin";
import GoldSchemeFAQ from "@/components/schemefaq/GoldSchemeFAQ";
import HappyCustomers from "@/components/happycustomers/HappyCustomers";

const akshayaNidhiFaqs = [

  { question: "WHAT IS AKSHAYA NIDHI?", 
    answer: "It is a special savings scheme..." 
  },

  { question: "HOW TO PAY INSTALLMENTS?", 
    answer: "Installments can be paid online..." 
  },

  { question: "IS IT POSSIBLE TO CHANGE MY INSTALLMENT AMOUNT AFTER ENROLLMENT?",
    answer: "Yes, you can modify your installment amount by contacting our customer service or visiting a nearby showroom before your next due date.",
  },
  {
    question: "WHO IS A NOMINEE? WHAT ARE THE CRITERIA FOR NOMINATING SOMEONE?",
    answer: "A nominee is the person you authorize to receive the scheme benefits in your absence. You can nominate any trusted family member or relative.",
  },
];

const akshayaNidhiTerms = [
  "Akshaya Nidhi terms vary based on duration.",
  "Installments must be maintained to get the benefits.",
];


const akshayaCustomers = [
  {
    img: "/assets/images/no-pic01.jpg",
    name: "Priya S.",
    text: "Akshayanidhi scheme is perfect for long-term gold saving.",
  },
  {
    img: "/assets/images/no-pic01.jpg",
    name: "Vivek M.",
    text: "Good returns and secure savings plan. Highly satisfied!",
  },


  {
    img: "/assets/images/no-pic01.jpg",
    name: "Meera M.",
    text: "Good returns and secure savings plan. Highly satisfied!",
  },

  {
    img: "/assets/images/no-pic01.jpg",
    name: "kunal M.",
    text: "Good returns and secure savings plan. Highly satisfied!",
  },

  {
    img: "/assets/images/no-pic01.jpg",
    name: "Aishwarya.",
    text: "Good returns and secure savings plan. Highly satisfied!",
  },

];





const AkshayaNidhiPage = () => {
  return ( 
    <>
      {/* Banner Section */}
      <AkshayanidhiBanner />

      {/* Content Section */}
      <section className="w-full bg-white py-10 px-4 md:px-20">
      
      {/* Top Contact Line */}
      <p className="text-center text-lg md:text-xl font-medium text-gray-800 mb-10">
        For Akshayanidhi Investment Scheme help:{" "}
        <span className="font-semibold">+919847020400</span>
      </p>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-serif  font-semibold mb-10 text-center md:text-left">
    Akshaya Nidhi
      </h2>

      {/* Paragraph 1 */}
      <p className="font-normal  mb-4 text-sm sm:text-base text-gray-500 ">
        The Akshaya Nidhi Scheme is Bindu Jewellery’s way of helping you turn
        your savings into something precious and enduring. With flexible
        monthly payments starting from ₹500 or more, customers can steadily
        accumulate gold in their account, with each month’s value determined
        by that day’s gold rate. This transparent, fair, and smart approach
        ensures your investment grows with time.
      </p>

      {/* Paragraph 2 */}
      <p className="font-normal  mb-4 text-sm sm:text-base text-gray-500 ">
        After one year, you are rewarded with a 6% bonus on your total savings —
        an added sparkle for your dedication. You can then redeem your accumulated
        gold for jewellery of your choice. This scheme combines the security of
        saving with the joy of owning fine jewellery, allowing families to plan
        for special occasions or future needs in a way that’s practical yet deeply
        rewarding.
      </p>
    </section>
<ProcessToLogin 
  downloadLink="https://play.google.com/store/apps/details?id=akshaya.nidhi.app"
  buttonText="Download Now"
/>

 <GoldSchemeFAQ
      title="Akshaya Nidhi Scheme FAQ"
      faqs={akshayaNidhiFaqs}
      note="Benefits apply only to Akshaya Nidhi redemption rules."
      terms={akshayaNidhiTerms}
    />

     <HappyCustomers
        title="Happy  Customers"
        customers={akshayaCustomers}
      />
    </>
  );
};

export default AkshayaNidhiPage;
