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
  const [isMobile, setIsMobile] = useState(false);

  // -------------------------------
  // ✅ Banner Images – Desktop + Mobile
  // -------------------------------
  const bannerMap: Record<string, { desktop: string; mobile: string }> = {
    missionandvision: {
      desktop: "/assets/images/mission-banner.jpg",
      mobile: "/assets/images/mission-banner-mobile.jpg", // 👉 Your mobile-friendly banner
    },
    ourstory: {
      desktop: "/assets/images/our-story01.jpg",
      mobile: "/assets/images/ourstory-bgimage-mob.png",
    },
    home: {
      desktop: "/assets/images/home-banner.jpg",
      mobile: "/assets/images/home-banner.jpg",
    },
    ourleadership: {
      desktop: "/assets/images/collections-banner.png",
      mobile: "/assets/images/collections-banner.png",
    },
    "product-list": {
      desktop: "/assets/images/collections-banner.png",
      mobile: "/assets/images/collections-banner.png",
    },
    products: {
      desktop: "/assets/images/collections-banner.png",
      mobile: "/assets/images/collections-banner.png",
    },
    kisnadiamond: {
      desktop: "/assets/images/collections-banner.png",
      mobile: "/assets/images/collections-banner.png",
    },
    mybluediamond: {
      desktop: "/assets/images/mybluebanner.jpg",
      mobile: "/assets/images/mybluebanner.jpg",
    },
    csr: {
      desktop: "/assets/images/collections-banner.png",
      mobile: "/assets/images/collections-banner.png",
    },
    akshayanidhi: {
      desktop: "/assets/images/akshaya-nidhi-banner.jpg",
      mobile: "/assets/images/akshaya-nidhi-banner.jpg",
    },
    swarnabindu: {
      desktop: "/assets/images/collections-banner.png",
      mobile: "/assets/images/collections-banner.png",
    },
    gallery: {
      desktop: "/assets/images/collections-banner.png",
      mobile: "/assets/images/collections-banner.png",
    },
    contact: {
      desktop: "/assets/images/contact-us-banner.jpg",
      mobile: "/assets/images/contact-us-banner-mobile.jpg",
    },
    blog: {
      desktop: "/assets/images/collections-banner.png",
      mobile: "/assets/images/collections-banner.png",
    },
    faq: {
      desktop: "/assets/images/collections-banner.png",
      mobile: "/assets/images/collections-banner.png",
    },
  };

  const defaultBanner = "/assets/images/collections-banner.png";

  // -------------------------------
  // ✅ Detect Mobile Screen
  // -------------------------------
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // -------------------------------
  // ✅ Set Banner Image Based on Route + Device
  // -------------------------------
  useEffect(() => {
    const key = segments[0]?.toLowerCase() || "home";

    if (bannerMap[key]) {
      const img = bannerMap[key];
      setBannerImage(isMobile ? img.mobile : img.desktop);
    } else {
      setBannerImage(defaultBanner);
    }
  }, [segments, isMobile]);

  // -------------------------------
  // ✅ Fetch Product Name Dynamically
  // -------------------------------
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

  // -------------------------------
  // ✅ Breadcrumbs
  // -------------------------------
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

  // -------------------------------
  // ✅ UI Render
  // -------------------------------
  return (
    <section className="relative w-full">
      <img
        src={bannerImage}
        alt={Title || productName || "Banner"}
        className="w-full object-contain transition-opacity duration-500"
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
      </div>
    </section>
  );
};

export default Banner;
