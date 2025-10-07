import React from 'react'

const CollectionBanners = () => {
  return (
<section className="bg-white ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Classic Diamond Collection */}
          <a
            href="/classic-diamond"
            className="relative group block overflow-hidden"
          >
            <img
              src="/assets/images/diamind-01.png"
              alt="Classic Diamond Collection"
              className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-6">
              <h3 className="text-white text-2xl font-semibold mb-4">
                CLASSIC DIAMOND <br /> COLLECTION
              </h3>
              <span className="inline-block border border-white px-4 py-2 text-white text-sm font-medium hover:bg-white hover:text-black transition">
                Shop Now
              </span>
            </div>
          </a>

          {/* Gemstones Collection */}
          <a
            href="/gemstones"
            className="relative group block overflow-hidden"
          >
            <img
              src="/assets/images/gemstones01.png"
              alt="Gemstones Collection"
              className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-6">
              <h3 className="text-white text-2xl font-semibold mb-4">
                GEMSTONES <br /> COLLECTION
              </h3>
              <span className="inline-block border border-white px-4 py-2 text-white text-sm font-medium hover:bg-white hover:text-black transition">
                Shop Now
              </span>
            </div>
          </a>

        </div>
      </div>
    </section>
  )
}

export default CollectionBanners