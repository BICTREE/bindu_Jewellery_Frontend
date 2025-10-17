import React from 'react'

const FreeshipingComp = () => {
  return (
   <section className="bg-white">
      <div className="container ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start mx-auto px-4 pb-15">
          
          {/* Free Shipping */}
          <div className="flex flex-col items-center text-center space-y-2 px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full ">
              {/* Truck Icon */}
           <img src="/assets/images/truk.png" alt="ree Shipping" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Free Shipping</h3>
            <p className="text-base text-gray-500">For All Orders Over $100</p>
          </div>

          {/* 30 Days Returns */}
          <div className="flex flex-col items-center text-center space-y-2 px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full ">
              {/* Return Icon */}
             <img src="/assets/images/return.png" alt="30 Days Returns" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">30 Days Returns</h3>
            <p className="text-base text-gray-500">For An Exchange Product</p>
          </div>

          {/* Secured Payment */}
          <div className="flex flex-col items-center text-center space-y-2 px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full ">
              {/* Card Icon */}
            <img src="/assets/images/card.png" alt="Secured Payment" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Secured Payment</h3>
            <p className="text-base text-gray-500">Payment Cards Accepted</p>
          </div>

          {/* Support 24/7 */}
          <div className="flex flex-col items-center text-center space-y-2 px-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full ">
              {/* Headset Icon */}
           <img src="/assets/images/support.png" alt="Support 24/7<" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Support 24/7</h3>
            <p className="text-base text-gray-500">Contact Us Anytime</p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default FreeshipingComp