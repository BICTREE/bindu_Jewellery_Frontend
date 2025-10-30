import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["example.com"], // add your image host(s) here
  },
   eslint: {
    // ⚠️ This disables ESLint checks during build
    ignoreDuringBuilds: true,
  },
};


export default nextConfig;
