"use client";
import Image from "next/image";
import OurBranchBanner from "@/components/common/Banner/OurBranchBanner";

export default function OurBranchesPage() {
  return (
    <>
      <OurBranchBanner />

    <section className="w-full py-16 bg-white text-center">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold  mb-6 leading-snug text-[#3b0b0b]">Our Branches</h2>

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

    {/* MANGALURU */}
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-md">
        <Image
          src="/assets/images/mangaluru-branch.png"
          alt="Mangaluru Branch"
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold mt-4">MANGALURU</h3>
      <p className="text-sm mt-2 leading-relaxed">
        Near SCS Hospital, Bendore<br />
        Tel: +91 499 4256 888<br />
        Email: bindujewellerymangalore@gmail.com
      </p>
    </div>

    {/* KASARAGOD */}
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-md">
        <Image
          src="/assets/images/kassaragod-branch.png"
          alt="Kasaragod Branch"
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold mt-4">KASARAGOD</h3>
      <p className="text-sm mt-2 leading-relaxed">
        NH-17, Ashwini Nagar, Kasaragod 671121<br />
        Tel: +91 499 4256 888<br />
        Mob: +91 98 470 20 400
      </p>
    </div>

    {/* SULLIA (Centered) */}
    <div className="flex flex-col items-center col-span-1 md:col-span-2">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-64 sm:h-72 md:h-80 rounded-lg overflow-hidden shadow-md mx-auto">
        <Image
          src="/assets/images/branch-sullia.png"
          alt="Sullia Branch"
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold mt-4 text-center">SULLIA</h3>
      <p className="text-sm mt-2 leading-relaxed text-center">
        Opposite Police Station, Sullia-574239<br />
        Tel: +91 4994256888<br />
        Email: bindujewellerymangalore@gmail.com
      </p>
    </div>

  </div>

  <div className="mt-16">
    <a href="#" className="text-lg text-red-700 font-semibold hover:underline">
      Visit Now »
    </a>
  </div>
</section>

    </>
  );
}
