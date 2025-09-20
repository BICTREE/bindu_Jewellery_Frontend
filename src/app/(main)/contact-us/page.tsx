import Image from "next/image";
import Banner from '@/components/common/Banner/Banner'
import React from 'react'
import FreeshipingComp from "@/components/home/FreeshipingComp";
import SubscribeNewsletter from "@/components/home/SubscribeNewsletter";

const page = () => {
  return (
       <><Banner
      Title='Contact Us' />
      
   <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
  <div className="w-full">
    {/* Heading */}
    <h2 className="text-sm sm:text-base font-semibold text-[#d4b262] uppercase mb-3">
      Contact Us
    </h2>

    {/* Description */}
    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
      Please do not hesitate to{" "}
      <a href="/contact" className="text-[#d4b262] underline hover:text-amber-700">
        Reach Out To Us
      </a>{" "}
      for any queries or feedback. We are here to create effective solutions for
      any of your concerns. Kindly fill out the form below, and one of our
      representatives will get back to you.
    </p>
  </div>
</section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-1">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-500 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-500 py-2"
            />
            <input
              type="text"
              placeholder="Mobile No:"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-500 py-2"
            />
            <select className="w-full border-b border-gray-300 focus:outline-none focus:border-yellow-500 py-2">
              <option>Country</option>
            </select>
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full border border-gray-300 focus:outline-none focus:border-yellow-500 p-2"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 font-semibold tracking-wider hover:bg-gray-900"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Address Section */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="font-bold text-lg text-gray-900">Kerala</h3>
            <p className="text-gray-700">Bindu Jewellery</p>
            <p className="text-gray-700">NH - 17, Ashwini Nagar, Kasaragod</p>
            <p className="text-gray-700 mt-2">04994256888</p>
            <p className="text-gray-700">Contact@Bindujewellery.Co</p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-gray-900">Karnataka</h3>
            <p className="text-gray-700">Bindu Jewellery</p>
            <p className="text-gray-700">NH - 17, Ashwini Nagar, Kasaragod</p>
            <p className="text-gray-700 mt-2">04994256888</p>
            <p className="text-gray-700">Contact@Bindujewellery.Co</p>
          </div>
        </div>

        {/* Images */}
<div className="lg:col-span-1 space-y-4">
  <div className="w-full h-60 relative">
    <Image
      src="/assets/images/branch_kerala.png"
      alt="Kerala"
      fill
      className="object-contain"
    />
  </div>

  <div className="w-full h-60 relative">
    <Image
      src="/assets/images/branch_karnataka.png"
      alt="Karnataka"
      fill
      className="object-contain"
    />
  </div>
</div>
</div>
    </section>  
      <SubscribeNewsletter/>
     <FreeshipingComp/> 
      
      </>



  )
}

export default page