"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BlogSidebar from "@/components/blogsidebar/BlogSidebar";
import Banner from "@/components/common/Banner/Banner";
import Pagination from "@/components/common/pagination/Pagination";
import { GetAllBlogs, MediaQueryParams } from "@/services/blogService/blogService";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  image: {
    location: string;
    name: string;
  };
  tags: string[];
  author: string;
  publishedAt: string;
  createdAt: string;
}

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const postsPerPage = 4;

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const params: MediaQueryParams = {};
        
        if (selectedTag) {
          params.tag = selectedTag;
        }
        
        if (searchTerm) {
          params.search = searchTerm;
        }
        
        const blogs = await GetAllBlogs(params);
        setBlogPosts(blogs || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedTag, searchTerm]);

  // Handle tag selection from sidebar
  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    setSearchTerm(""); // Clear search when tag is selected
    setCurrentPage(1);
  };

  // Handle search from sidebar
  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setSelectedTag(null); // Clear tag filter when searching
    setCurrentPage(1);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedTag(null);
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Pagination
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

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get active filter text
  const getActiveFilterText = () => {
    if (selectedTag) return `tag: "${selectedTag}"`;
    if (searchTerm) return `search: "${searchTerm}"`;
    return null;
  };

  if (loading) {
    return (
      <>
        <Banner Title="Blog" />
        <div className="container mx-auto px-4 py-10">
          <div className="text-center">Loading blogs...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Banner Title="Blog" />
        <div className="container mx-auto px-4 py-10">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Banner Title="Blog" />

      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Blog Posts (2 columns inside left side) */}
        <div className="md:col-span-2 flex flex-col min-h-screen">
          {/* Filter indicator */}
          {(selectedTag || searchTerm) && (
            <div className="mb-4 flex items-center justify-between bg-gray-100 p-3 rounded">
              <span className="text-sm text-gray-700">
                Showing blogs with: <strong>{getActiveFilterText()}</strong>
              </span>
              <button
                onClick={handleClearFilters}
                className="text-sm text-[#d4b262] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white shadow rounded-lg overflow-hidden mt-6 md:mt-2 sm:mt-6"
                >
                  <img
                    src={post.image.location || "/assets/images/placeholder.jpg"}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <span className="bg-[#d4b262] text-white text-xs px-2 py-1 rounded">
                      {formatDate(post.publishedAt)}
                    </span>
                    <h2 className="mt-3 text-lg font-semibold text-gray-800">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-gray-600 text-sm">
                      {post.excerpt || 
                        (post.content 
                          ? post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
                          : 'No content available')
                      }
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block mt-3 text-[#d4b262] text-sm font-semibold hover:underline"
                    >
                      READ MORE
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-gray-500">No blogs found.</p>
                {(selectedTag || searchTerm) && (
                  <button
                    onClick={handleClearFilters}
                    className="mt-2 text-[#d4b262] hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {blogPosts.length > 0 && (
            <div className="mt-auto align-middle w-full px-4 py-6">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <BlogSidebar 
          onTagSelect={handleTagSelect}
          onSearch={handleSearch}
          selectedTag={selectedTag}
          searchTerm={searchTerm}
        />
      </div>
    </>
  );
};

export default BlogPage;