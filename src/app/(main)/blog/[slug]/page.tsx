"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import BlogSidebar from "@/components/blogsidebar/BlogSidebar";
import Banner from "@/components/common/Banner/Banner";
import { GetBlogBySlug } from "@/services/blogService/blogService";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: {
    location: string;
    name: string;
  };
  tags: string[];
  author: string;
  publishedAt: string;
  createdAt: string;
}

type Comment = {
  id: number;
  name: string;
  text: string;
};

const BlogDetails = () => {
  const params = useParams();
  const slug = params.slug as string;
  
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [comments] = useState<Comment[]>([
    { id: 1, name: "Alex Martin", text: "Its a civilizations to boldly go where no man has gone before..." },
    { id: 2, name: "James Frank", text: "Its a civilizations to boldly go where no man has gone before..." },
  ]);

  const [activeReply, setActiveReply] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  // Fetch blog data by slug
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const blogData = await GetBlogBySlug(slug);
        setBlog(blogData);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog post");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const handleReply = (id: number) => {
    setActiveReply(activeReply === id ? null : id);
    setReplyText("");
  };

  const postReply = (id: number) => {
    if (!replyText.trim()) return;
   
    alert(`Reply to comment #${id}: ${replyText}`);
    setReplyText("");
    setActiveReply(null);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Function to create HTML from content string
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  if (loading) {
    return (
      <>
        <Banner Title="Blog" />
        <div className="container mx-auto px-4 py-10">
          <div className="text-center">Loading blog post...</div>
        </div>
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Banner Title="Blog" />
        <div className="container mx-auto px-4 py-10">
          <div className="text-center text-red-500">{error || "Blog post not found"}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Banner Title="Blog" />

      <div className="bg-white py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left side - Blog content */}
          <div className="md:col-span-2 order-2 sm:order-1">
            {/* Blog Image */}
            <img
              src={blog.image?.location || "/assets/images/placeholder.jpg"}
              alt={blog.title}
              className="w-full rounded-lg shadow-md"
            />

            {/* Blog Title */}
            <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Left: Blog Meta & Title */}
              <div className="flex-1">
                <span className="inline-block bg-[#d4b262] text-white text-xs px-3 py-1 rounded">
                  {formatDate(blog.publishedAt)}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold mt-4 text-gray-800">
                  {blog.title}
                </h1>
                
                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Share Icons */}
              <div className="flex md:flex-col items-center gap-3">
                <span className="text-gray-600 text-sm font-medium">Share:</span>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 flex items-center justify-center bg-sky-400 text-white rounded-full hover:bg-sky-500 transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-800 transition">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </div>
            </div>

            {/* Blog Content */}
            <div 
              className="mt-6 text-gray-600 leading-relaxed blog-content"
              dangerouslySetInnerHTML={createMarkup(blog.content)}
            />

            {/* Author */}
            <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-bold text-xl">
                    {blog.author?.charAt(0) || 'A'}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 italic">
                    Written by {blog.author || "Unknown Author"}
                  </p>
                  <p className="mt-2 font-semibold text-gray-800">- {blog.author} -</p>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 border-gray-200">
                COMMENTS ({comments.length})
              </h2>

              <div className="mt-4 space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 font-bold">
                        {comment.name.charAt(0)}
                      </span>
                    </div>

                    {/* Comment content */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{comment.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{comment.text}</p>

                      {/* Reply button */}
                      <button
                        className="mt-2 text-xs text-[#d4b262] font-medium hover:underline"
                        onClick={() => handleReply(comment.id)}
                      >
                        {activeReply === comment.id ? "Cancel" : "REPLY"}
                      </button>

                      {/* Reply box */}
                      {activeReply === comment.id && (
                        <div className="mt-3">
                          <textarea
                            className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4b262]"
                            rows={2}
                            placeholder="Write your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <button
                            className="mt-2 px-3 py-1 bg-[#d4b262] text-white text-xs rounded hover:bg-[#c49b45]"
                            onClick={() => postReply(comment.id)}
                          >
                            Post Reply
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post Comment */}
            <div className="mt-10">
              <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-3">
                POST A COMMENT
              </h2>
              <form className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Name"
                       className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4b262]" />
                <input type="text" placeholder="Phone"
                       className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4b262]" />
                <input type="email" placeholder="Email"
                       className="border border-gray-200 rounded-md px-3 py-2 text-sm col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#d4b262]" />
                <textarea placeholder="Comments" rows={4}
                          className="border border-gray-200 rounded-md px-3 py-2 text-sm col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-[#d4b262]" />
                <div className="col-span-1 md:col-span-2">
                  <button type="submit"
                          className="bg-[#d4b262] text-white px-5 py-2 rounded-md hover:bg-[#c49b45] transition">
                    POST COMMENT
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right side - Sidebar */}
          <div className="order-1 sm:order-2">
            <BlogSidebar 
              onTagSelect={() => {}} 
              onSearch={() => {}} 
              selectedTag={null} 
              searchTerm="" 
            />
          </div>
        </div>
      </div>

      {/* Add some basic styling for the blog content */}
      <style jsx>{`
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          font-weight: bold;
          color: #1f2937;
        }
        .blog-content h2 {
          font-size: 1.5rem;
        }
        .blog-content p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .blog-content ul, 
        .blog-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default BlogDetails;