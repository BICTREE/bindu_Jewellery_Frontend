"use client";
import React from "react";
import BlogSidebar from "@/components/blogsidebar/BlogSidebar";
import Banner from "@/components/common/Banner/Banner";

const BlogDetails = () => {
  return (

  <><Banner Title="Blog" />

  <div className="bg-white">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left side - Blog content */}
        <div className="md:col-span-2">
          {/* Blog Image */}
          <img
            src="/assets/images/blog-image-3.jpg"
            alt="Blog Banner"
            className="w-full rounded-lg shadow-md" />

          {/* Blog Title */}
  <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
  {/* Left: Blog Meta & Title */}
  <div className="flex-1">
    <span className="inline-block bg-[#d4b262] text-white text-xs px-3 py-1 rounded">
      Feb 06, 2021
    </span>
    <h1 className="text-2xl md:text-3xl font-bold mt-4 text-gray-800">
      Its like a kind of torture to have to watch the show
    </h1>
    <p className="mt-4 text-gray-600 leading-relaxed">
      A tale of a fateful trip that started from this tropic port aboard
      this tiny ship today still wanted by the government apartment in the
      sky moving on up to the east side a family to explore strange new
      worlds to seek out new life and new civilizations...
    </p>
  </div>

  {/* Right: Share Icons */}
  <div className="flex md:flex-col items-center gap-3">
    <span className="text-gray-600 text-sm font-medium">Share:</span>
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
    >
      <i className="fab fa-facebook-f"></i>
    </a>
    <a
      href="https://twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center bg-sky-400 text-white rounded-full hover:bg-sky-500 transition"
    >
      <i className="fab fa-twitter"></i>
    </a>
    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
    >
      <i className="fab fa-linkedin-in"></i>
    </a>
    <a
      href="https://pinterest.com"
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition"
    >
      <i className="fab fa-pinterest-p"></i>
    </a>
  </div>
</div>


          {/* Author */}
          <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/17.jpg"
                alt="Author"
                className="w-20 h-20 rounded-lg object-cover" />
              <div>
                <p className="text-gray-600 italic">
                  Somehow form a family thats the way we all became the Brady
                  Bunch apartment in the sky moving on up...
                </p>
                <p className="mt-2 font-semibold text-gray-800">
                  - San Johnson -
                </p>
              </div>
            </div>
          </div>

          {/* More Text */}
          <div className="mt-6 text-gray-600 space-y-4">
            <p>
              A tale of a fateful trip that started from this tropic port aboard
              this tiny ship today still wanted by the government apartment...
            </p>
            <p>
              To seek out new life and new civilizations to boldly go where no
              man has gone before...
            </p>
          </div>

          {/* Comments */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 border-gray-200">
              COMMENTS (02)
            </h2>
            <div className="mt-4 space-y-6">
              {/* Comment 1 */}
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-bold">A</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Alex Martin</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Its a civilizations to boldly go where no man has gone
                    before...
                  </p>
                  <button className="mt-2 text-xs text-[#d4b262] font-medium hover:underline">
                    REPLY
                  </button>
                </div>
              </div>

              {/* Comment 2 */}
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-bold">J</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">James Frank</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Its a civilizations to boldly go where no man has gone
                    before...
                  </p>
                  <button className="mt-2 text-xs text-[#d4b262] font-medium hover:underline">
                    REPLY
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Post Comment */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3">
              POST A COMMENT
            </h2>
            <form className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4b262]" />
              <input
                type="text"
                placeholder="Phone"
                className="border  border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4b262]" />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-200  rounded-md px-3 py-2 text-sm col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#d4b262]" />
              <textarea
                placeholder="Comments"
                rows={4}
                className="border border-gray-200 rounded-md px-3 py-2 text-sm col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#d4b262]" />
              <div className="col-span-1 md:col-span-2">
                <button
                  type="submit"
                  className="bg-[#d4b262] text-white px-5 py-2 rounded-md hover:bg-[#d4b262] transition"
                >
                  POST COMMENT
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Sidebar */}
        <div>
          <BlogSidebar />
        </div>
      </div>
    </div></>
  );
};

export default BlogDetails;
