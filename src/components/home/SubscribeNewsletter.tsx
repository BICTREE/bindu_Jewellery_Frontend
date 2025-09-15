"use client";  
import React from 'react'

const SubscribeNewsletter = () => {
  return (
 

       <section className="bg-black mx-auto py-5 sm:py-8 md:py-12 my-6 sm:my-10 md:my-15">
      <div className="container mx-auto text-center px-4">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Get the newest and best designs <br /> to your inbox weekly.
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
 <button
  type="submit"
  className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-r-md whitespace-nowrap"
>
  Subscribe Now
</button>
</form>

      </div>
    </section>
  )
}

export default SubscribeNewsletter