"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GetProductById } from "@/services/productService/productService"; // your API function

type BannerProps = {
  Title?: string;
};

const Banner: React.FC<BannerProps> = ({ Title }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const [productName, setProductName] = useState<string>("");

  useEffect(() => {
    const fetchProductName = async () => {
      if (segments[0] === "products" && segments[1]) {
        try {
          const data = await GetProductById(segments[1]);
          console.log(data,"fsdfs")
          setProductName(data?.name || "Product Details");
        } catch (error) {
          setProductName("Product Details");
        }
      }
    };
    fetchProductName();
  }, [segments]);

  // Construct breadcrumb links
  const breadcrumbs = segments.map((segment, index) => {
    // Handle 'products' segment
    if (segment === "products") {
      return { href: "/product-list", label: "Product" };
    }

    // Handle product ID segment
    if (index === 1 && segments[0] === "products") {
      return { href: `/products/${segment}`, label: productName || "Product Details" };
    }

    // Default: capitalize segment
    return {
      href: "/" + segments.slice(0, index + 1).join("/"),
      label: decodeURIComponent(segment).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  });

  return (
    <section className="relative w-full">
      <img
        src="/assets/images/collections-banner.png"
        alt={Title || productName || "Banner"}
        className="w-full h-[115px] sm:h-[250px] md:h-[320px] lg:h-[280px] object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      <div className="absolute inset-0 flex flex-col justify-between container mx-auto px-4 py-4 z-20">
        {/* Breadcrumb */}
        <div className="text-white text-xs sm:text-sm md:text-base">
          <Link
            href="/"
            className="hover:underline hover:text-yellow-400 transition-colors"
          >
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
            {Title || productName || (breadcrumbs.at(-1)?.label ?? "Page")}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Banner;
