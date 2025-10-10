"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { GetAllBlogs } from "@/services/blogService/blogService";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  image: {
    location: string;
  };
  tags: string[];
  publishedAt: string;
}

interface BlogSidebarProps {
  onSearch: (searchTerm: string) => void;
  selectedTag: string | null;
  onTagSelect: (tag: string) => void;
  searchTerm: string;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ 
  onSearch, 
  selectedTag, 
  onTagSelect,
  searchTerm: externalSearchTerm 
}) => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  // Sync local search term with external search term
  useEffect(() => {
    setLocalSearchTerm(externalSearchTerm || "");
  }, [externalSearchTerm]);

  // Fetch recent posts and tags
  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        // Fetch recent posts (limit to 3)
        const posts = await GetAllBlogs({ entries: 3 });
        setRecentPosts(posts || []);

        // Fetch all posts to extract unique tags
        const allPosts = await GetAllBlogs();
        if (allPosts) {
          const tags = Array.from(
            new Set(allPosts.flatMap((post: BlogPost) => post.tags || []))
          ) as string[];
          setAllTags(tags);
        }
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      }
    };

    fetchSidebarData();
  }, []);

  // Handle search
  const handleSearch = () => {
    if (localSearchTerm.trim()) {
      onSearch(localSearchTerm.trim());
    } else {
      // If search term is empty, clear the search
      onSearch("");
    }
  };

  // Handle Enter key in search
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setLocalSearchTerm("");
    onSearch("");
  };

  // Format date relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <aside className="bg-white p-6 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] space-y-4 h-full">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search blogs..."
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full border border-gray-200 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#d4b262] pr-20"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-1">
          {localSearchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="p-1 text-gray-400 hover:text-gray-600 mr-1"
            >
              ×
            </button>
          )}
          <button
            type="button"
            onClick={handleSearch}
            className="flex items-center px-2 text-gray-500 hover:text-[#d4b262]"
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Recent Posts</h3>
        <ul className="space-y-3 text-sm text-gray-700">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <li key={post._id} className="flex items-start space-x-2 border-b py-5 border-gray-200">
                <Link href={`/blog/${post.slug}`} className="flex items-start space-x-2">
                  <img
                    src={post.image?.location || "/assets/images/placeholder.jpg"}
                    className="w-18 h-18 object-cover rounded"
                    alt={post.title}
                  />
                  <div>
                    <p className="line-clamp-2">{post.title}</p>
                    <span className="text-xs text-gray-500">
                      {getRelativeTime(post.publishedAt)}
                    </span>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-sm">No recent posts</li>
          )}
        </ul>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.length > 0 ? (
            allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                onClick={() => onTagSelect(tag)}
                className={`px-3 py-1 text-sm border border-gray-200 rounded cursor-pointer hover:bg-[#b99748] hover:text-white transition-colors ${
                  selectedTag === tag ? "bg-[#d4b262] text-white" : ""
                }`}
              >
                {tag}
              </button>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No tags available</span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;