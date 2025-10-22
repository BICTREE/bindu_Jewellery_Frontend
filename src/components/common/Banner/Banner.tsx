"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GetProductById } from "@/services/productService/productService";

type BannerProps = {
  Title?: string;
};

const Banner: React.FC<BannerProps> = ({ Title }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const [productName, setProductName] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<string>("/assets/images/collections-banner.png");

  // ✅ Define banner images per route
  const bannerMap: Record<string, string> = {
    home: "/assets/images/home-banner.jpg",
    ourstory: "/assets/images/ourstory.png",
    missionandvision: "/assets/images/ourstory.png",
    ourleadership: "/assets/images/ourstory.png",
    "product-list": "/assets/images/collections-banner.png",
    products: "/assets/images/collections-banner.png",
    kisnadiamond: "/assets/images/collections-banner.png",
    mybluediamond: "/assets/images/mybluebanner.jpg",
    csr: "/assets/images/collections-banner.png",
    akshayanidhi: "/assets/images/akshaya-nidhi-banner.jpg",
    swarnabindu: "/assets/images/collections-banner.png",
    gallery: "/assets/images/collections-banner.png",
    contact: "/assets/images/collections-banner.png",
    blog: "/assets/images/collections-banner.png",
    faq: "/assets/images/collections-banner.png",
  };

  const defaultBanner = "/assets/images/collections-banner.png";

  // ✅ Single useEffect for banner logic
  useEffect(() => {
    const key = segments[0]?.toLowerCase() || "home";
    if (bannerMap[key]) {
      setBannerImage(bannerMap[key]);
    } else {
      setBannerImage(defaultBanner);
    }
  }, [segments]);

  // ✅ Fetch product name dynamically
  useEffect(() => {
    const fetchProductName = async () => {
      if (segments[0] === "products" && segments[1]) {
        try {
          const data = await GetProductById(segments[1]);
          setProductName(data?.name || "Product Details");
        } catch (error) {
          setProductName("Product Details");
        }
      }
    };
    fetchProductName();
  }, [segments]);

  // ✅ Breadcrumb logic
  const breadcrumbs = segments.map((segment, index) => {
    if (segment === "products") {
      return { href: "/product-list", label: "Product" };
    }
    if (index === 1 && segments[0] === "products") {
      return { href: `/products/${segment}`, label: productName || "Product Details" };
    }
    return {
      href: "/" + segments.slice(0, index + 1).join("/"),
      label: decodeURIComponent(segment)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  });

  return (
    <section className="relative w-full">
      <img
        src={bannerImage}
        alt={Title || productName || "Banner"}
        className="w-full h-[115px] sm:h-[250px] md:h-[320px] lg:h-[280px] object-cover transition-opacity duration-500"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>

      <div className="absolute inset-0 flex flex-col justify-between container mx-auto px-4 py-4 z-20">
        {/* Breadcrumb */}
        <div className="text-white text-xs sm:text-sm md:text-base">
          <Link href="/" className="hover:underline hover:text-yellow-400 transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={crumb.href}>
              {" / "}
              {i === breadcrumbs.length - 1 ? (
                <span className="text-gray-200">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:underline hover:text-yellow-400 transition-colors capitalize"
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Title */}
        <div className="flex-1 flex items-center">
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white capitalize">
            {Title || productName || breadcrumbs.at(-1)?.label || "Page"}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Banner;
