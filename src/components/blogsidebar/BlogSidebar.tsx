"use client";
import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
const BlogSidebar = () => {
  return (
    <aside className="  bg-white p-6 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] space-y-4 h-full">
      {/* Search */}
   <div className="relative">
  <input
    type="text"
    placeholder="Search..."
    className="w-full border border-gray-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#d4b262] pr-10"
  />
  <button
    type="button"
    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-[#d4b262]"
  >
    <Search size={18} />
  </button>
</div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <ul className="space-y-2 text-gray-600 text-sm">
         <li className=" text-gray-600  hover:text-[#d4b262]"><Link href="#">Travel and Aviation</Link></li>
          <li className=" text-gray-600  hover:text-[#d4b262]"><Link href="#">Business Services</Link></li>
           <li className=" text-gray-600  hover:text-[#d4b262]"><Link href="#">Consumer Products</Link></li>
           <li className=" text-gray-600  hover:text-[#d4b262]"><Link href="#">Financial Services</Link></li>
         <li className=" text-gray-600  hover:text-[#d4b262]"><Link href="#">Software Research</Link></li>
        </ul>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Recent Posts</h3>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex items-start space-x-2 border-b py-5 border-gray-200">
            <Link href="#" className="flex items-start space-x-2">
            <img
              src="/assets/images/blog-image-1.jpg"
              className="w-18 h-18 object-cover rounded"
              alt="thumb"
            />
            <div>
              <p>World don’t move to beat of just one drum.</p>
              <span className="text-xs text-gray-500">5 minutes ago</span>
            </div>
            </Link>
          </li>
          <li className="flex items-start space-x-2 border-b py-5 border-gray-200">
            <Link href="#" className="flex items-start space-x-2">
            <img
              src="/assets/images/blog-image-2.jpg"
              className="w-18 h-18 object-cover rounded"
              alt="thumb"
            />
            <div>
              <p>Be right for you may not be right for some.</p>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
                   </Link>
          </li>
          <li className="flex items-start space-x-2 border-b py-5 border-gray-200">
                  <Link href="#" className="flex items-start space-x-2">
            <img
              src="/assets/images/blog-image-3.jpg"
              className="w-18 h-18 object-cover rounded"
              alt="thumb"
            />
            <div>
              <p>World don’t move to beat of just one drum.</p>
              <span className="text-xs text-gray-500">1 month ago</span>
            </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Archives */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Archives</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className=" text-gray-600  hover:text-[#d4b262]"><Link href="#">January 2018</Link></li>
         <li className=" text-gray-600  hover:text-[#d4b262]"><Link href="#">February 2018</Link></li>
            <li className=" text-gray-600  hover:text-[#d4b262]"><Link href="#">March 2018</Link></li>
        </ul>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Business",
            "Consulting",
            "Sales",
            "Startup",
            "Marketing",
            "Services",
            "Financial",
            "Research",
          ].map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 text-sm border border-gray-200 rounded cursor-pointer hover:bg-[#b99748] hover:text-white ${
                tag === "Marketing" ? " rounded bg-[#d4b262] text-white" : ""
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
