"use client";  
import React from 'react'

const SubscribeNewsletter = () => {
  return (
 

       <section className="bg-black mx-auto my-5 sm:my-8 md:my-12 py-7 sm:py-8 md:py-13 lg:py-15">
      <div className="container mx-auto text-center px-4">
        {/* Heading */}
<h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6 leading-relaxed sm:leading-normal md:leading-snug">
  Exclusive jewellery updates, crafted just for you — <br /> straight to your inbox.
</h2>

        {/* Email Form */}
      <form
  onSubmit={(e) => {
    e.preventDefault();
    alert("Subscribed!");
  }}
  className="flex justify-center max-w-3xl mx-auto bg-white rounded-md p-1"
>
  <input
    type="email"
    placeholder="your email"
    className="w-full px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
  />
 <button type="submit" className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-r-md whitespace-nowrap"
> Subscribe Now
</button>
</form>

      </div>
    </section>
  )
}

export default SubscribeNewsletter