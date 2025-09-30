"use client";
import React, { useState } from "react";
import Link from "next/link";
import BlogSidebar from "@/components/blogsidebar/BlogSidebar";
import Banner from "@/components/common/Banner/Banner";

const blogPosts = [
  {
    id: 1,
    date: "Feb 06, 2018",
    title: "Trouble with the law since",
    excerpt:
      "To seek out new life and new civilizations to boldly go where no man has gone before you would see the biggest gift.",
    image: "/assets/images/blog-image-1.jpg",
  },
  {
    id: 2,
    date: "Mar 30, 2018",
    title: "Kind of torture to have to watch",
    excerpt:
      "To seek out new life and new civilizations to boldly go where no man has gone before you would see the biggest gift.",
    image: "/assets/images/blog-image-2.jpg",
  },
  {
    id: 3,
    date: "Apr 14, 2018",
    title: "Make the best of things its an uphill.",
    excerpt:
      "To seek out new life and new civilizations to boldly go where no man has gone before you would see the biggest gift.",
    image: "/assets/images/blog-image-3.jpg",
  },
  {
    id: 4,
    date: "Feb 06, 2018",
    title: "Trouble with the law since",
    excerpt:
      "To seek out new life and new civilizations to boldly go where no man has gone before you would see the biggest gift.",
    image: "/assets/images/blog-image-4.jpg",
  },


    {
    id: 5,
    date: "Feb 06, 2018",
    title: "Trouble with the law since",
    excerpt:
      "To seek out new life and new civilizations to boldly go where no man has gone before you would see the biggest gift.",
    image: "/assets/images/blog-image-4.jpg",
  },

      {
    id: 6,
    date: "Feb 06, 2018",
    title: "Trouble with the law since",
    excerpt:
      "To seek out new life and new civilizations to boldly go where no man has gone before you would see the biggest gift.",
    image: "/assets/images/blog-image-4.jpg",
  },

     {
    id: 7,
    date: "Feb 06, 2018",
    title: "Trouble with the law since",
    excerpt:
      "To seek out new life and new civilizations to boldly go where no man has gone before you would see the biggest gift.",
    image: "/assets/images/blog-image-4.jpg",
  },

     {
    id:8,
    date: "Feb 06, 2018",
    title: "Trouble with the law since",
    excerpt:
      "To seek out new life and new civilizations to boldly go where no man has gone before you would see the biggest gift.",
    image: "/assets/images/blog-image-4.jpg",
  },


];

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Paginated posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <Banner Title="Blog" />

      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {/* Blog Posts (2 columns inside left side) */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow rounded-lg overflow-hidden mt-6 md:mt-2 sm:mt-6"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="bg-[#d4b262] text-white text-xs px-2 py-1 rounded">
                    {post.date}
                  </span>
                  <h2 className="mt-3 text-lg font-semibold text-gray-800">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-gray-600 text-sm">{post.excerpt}</p>
                  <Link
                    href="#"
                    className="block mt-3 text-[#d4b262] text-sm font-semibold hover:underline"
                  >
                    READ MORE
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "text-gray-200 border-gray-200 cursor-not-allowed"
                  : "hover:bg-[#d4b262] hover:text-white border-gray-200"
              }`}
            >
              « Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === page
                      ? "bg-[#d4b262] text-white border rounded border-gray-200"
                      : "hover:bg-[#d4b262] hover:text-whiteborder rounded border-gray-200"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded border-gray-200 ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "hover:bg-[#d4b262] hover:text-white border-gray-200"
              }`}
            >
              Next »
            </button>
          </div>
        </div>

        {/* Sidebar as component */}
        <BlogSidebar />
      </div>
    </>
  );
};

export default BlogPage;
