import React from "react";

const SplOfferbanner = () => {
  return (
    <section className="w-full relative mt-4">
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[420px] lg:h-[520px] bg-cover bg-center">
        {/* Banner Image */}
        <img
          src="/assets/images/offerbanner.jpg"
          alt="Bindu offer banner"
          className="w-full h-full object-cover"
        />

        {/* Overlay content */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-2 sm:px-4">
          {/* Optional text or title */}
       
          {/* Shop Now button */}
          <a
            href="#"
            className="inline-block bg-white text-black px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 font-medium rounded shadow hover:bg-[#d4b262] hover:text-white transition"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default SplOfferbanner;
