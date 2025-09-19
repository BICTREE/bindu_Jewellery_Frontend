"use client";
import React, { useState, useEffect, useRef } from "react";
import { useScrollAnimation, useScrollLogo } from "./header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";

const Header: React.FC = () => {
  // ✅ Hooks auto-disable on mobile
  useScrollAnimation(".header1", { threshold: 50, activeClass: "fixed" });
  useScrollLogo(
    [".do-brand-logo", ".logo-icon"],
    50,
    ["scroll-haid", "logo-icon-block"]
  );

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLLIElement>(null);
  const navRef = useRef<HTMLUListElement>(null);

  // ✅ Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // ✅ Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <div className="bj_goldrate_sticky_bar py-2 font-semibold text-center">
        <div className="news">
          <ul>
            <li className="flex justify-center items-center gap-2">
              {"TODAY'S GOLD RATE"}
              <button className="btn23 bg-black text-yellow-400 px-3 py-1 rounded-full text-sm font-bold">
                10000/gm
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Top header bar */}
      <div className="do-header-top bg-gray-100  py-2 transition-all duration-300">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
          <div className="do-top-left mb-2 md:mb-0">
            <ul className="navbar-top-right flex flex-wrap gap-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 flex items-center gap-1">
                  <i className="fa-solid fa-envelope text-amber-600"></i>
                 {"contact@bindujewellery.co.in"}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 flex items-center gap-1">
                  <i className="fa-solid fa-phone text-amber-600"></i>
                  04994 256888
                </a>
              </li>
            </ul>
          </div>
          <div className="do-top-right">
            <ul className="navbar-top-right flex items-center gap-4 text-sm">
              <li>
                <a href="#" className="text-gray-700">
                  dfcs
                </a>
              </li>
              <li>
                <div className="social-test">
                  <ul className="social flex gap-3 text-gray-700">
                    <li>
                      <i className="fa-brands fa-facebook"></i>
                    </li>
                    <li>
                      <i className="fa-brands fa-twitter"></i>
                    </li>
                    <li>
                      <i className="fa-brands fa-instagram"></i>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="header1 transition-all duration-300 bg-white shadow-md sticky top-0 z-50">
        <nav className="relative">
          <div className="container mx-auto px-4 flex items-center justify-between ">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i
                className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}
              ></i>
            </button>

            {/* Menu items */}
            <ul
              ref={navRef}
              className={`${
                mobileMenuOpen ? "flex" : "hidden"
              } lg:flex flex-col lg:flex-row w-full  absolute lg:static top-full left-0  bg-white lg:bg-transparent shadow-lg lg:shadow-none z-50`}
            >
              <li className="liclass logo-icon hidden lg:block">
                <a href="#">
                  <img
                    src="/assets/logo/icon-only.png"
                    alt="Brand Logo"
                    className="mt-3 h-8"
                  />
                </a>
              </li>
              <li className="liclass">
                <Link
                  href="/aboutus"
                  className="text-gray-800 hover:text-amber-600 font-semibold block py-2 px-4 lg:py-0"
                >
                  ABOUT US
                </Link>
              </li>

              <li
                className="relative group liclass"
                ref={triggerRef}
                onMouseEnter={() => !isMobile && setOpen(true)}
                onMouseLeave={() => !isMobile && setOpen(false)}
                onClick={() => isMobile && setOpen(!open)}
              >
                <button className="text-gray-800 hover:text-amber-600 font-semibold  py-2 px-4 lg:py-0 w-full text-left lg:w-auto flex items-center">
                  PRODUCTS{" "}
                  {isMobile && (
                    <i
                      className={`fas ${
                        open ? "fa-chevron-up" : "fa-chevron-down"
                      } ml-2`}
                    ></i>
                  )}
                </button>
              </li>

              <li className="liclass">
                <Link
                  href="/product-list"
                  className="text-gray-800 hover:text-amber-600 font-semibold block py-2 px-4 lg:py-0"
                >
                  SHOP ONLINE
                </Link>
              </li>
              <li className="liclass">
                <a
                  href="#"
                  className="text-gray-800 hover:text-amber-600 font-semibold block py-2 px-4 lg:py-0"
                >
                  CERTIFICATIONS
                </a>
              </li>
              <li className="liclass mobile-icon hidden lg:block" style={{ margin: 0 }}>
                <a href="#" className="do-brand-logo margin-t">
                  <img src="/assets/logo/brand-logo.png" alt="Brand Logo" />
                </a>
              </li>
              <li className="liclass">
                <a
                  href="#"
                  className="text-gray-800 hover:text-amber-600 font-semibold block py-2 px-4 lg:py-0"
                >
                  CSR
                </a>
              </li>
              <li className="liclass">
                <a
                  href="#"
                  className="text-gray-800 hover:text-amber-600 font-semibold block py-2 px-4 lg:py-0"
                >
                  Our Scheme
                </a>
              </li>
              <li className="liclass">
                <a
                  href="#"
                  className="text-gray-800 hover:text-amber-600 font-semibold block py-2 px-4 lg:py-0"
                >
                  Our Branches
                </a>
              </li>
              <li className="liclass">
                <Link
                  href="/contact-us"
                  className="text-gray-800 hover:text-amber-600 font-semibold block py-2 px-4 lg:py-0"
                >
                  CONTACT US
                </Link>
              </li>
            </ul>

            {/* Brand logo for mobile */}
            <div className="lg:hidden flex items-center justify-center flex-grow ">
              <a href="#" className="">
                <img
                  src="/assets/logo/icon-only.png"
                  alt="Brand Logo"
                  className="h-10"
                />
              </a>
            </div>

            {/* Placeholder for alignment on mobile */}
            <div className="lg:hidden w-10"></div>
          </div>

          {/* Mega Menu - Full width of the navigation container */}
          {(open || (isMobile && open)) && (
            <div
              ref={menuRef}
              className="absolute lg:top-full container p-6 z-50
             overflow-y-auto overflow-x-hidden max-h-[80vh]"
              onMouseEnter={() => !isMobile && setOpen(true)}
              onMouseLeave={() => !isMobile && setOpen(false)}
              style={{
                left: 0,
                right: 0,
                width: "100%",
              }}
            >
              <div className=" bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shadow-lg ">
              {/* Column 1 */}
              <div className="lg:pl-12">
                <h4 className="font-bold text-amber-600  pb-2 mb-3 text-lg">
                  JEWELLERY
                </h4>
                <ul className="space-y-2">
                  {[
                    "Earrings",
                    "Rings",
                    "Pendants",
                    "Bracelets",
                    "Chains",
                    "Necklaces",
                    "Thali Chains",
                    "Bangles",
                    "Coins",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-amber-600 block py-1 transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <h4 className="font-bold text-amber-600 border-b border-amber-200 pb-2 mb-3 text-lg">
                  PROMISE COLLECTIONS
                </h4>
                <ul className="space-y-2 mb-6">
                  {[
                    "Kids Collections",
                    "Bridal Collections",
                    "Light Weight Collections",
                    "New Collections",
                    "Antique Collection",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-amber-600 block py-1 transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>

                <h4 className="font-bold text-amber-600 border-b border-amber-200 pb-2 mb-3 text-lg mt-8">
                  DIAMOND
                </h4>
                <ul className="space-y-2">
                  {["Kisna", "My Blue Diamonds"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-amber-600 block py-1 transition-colors duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <h4 className="font-bold text-amber-600 border-b border-amber-200 pb-2 mb-3 text-lg">
                  PURITY
                </h4>
                <ul className="space-y-2">
                  {["18 Carat", "20 Carat", "22 Carat", "24 Carat"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-700 hover:text-amber-600 block py-1 transition-colors duration-200"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Column 4 - Promotion */}
              <div className="bg-gradient-to-r from-amber-400 to-yellow-400 p-6 rounded-lg text-center text-black flex flex-col justify-center items-center">
                <h3 className="font-bold text-xl mb-3">BRIDAL COLLECTIONS</h3>
                <div className="bg-black text-yellow-400 inline-block px-6 py-2 rounded-full text-base font-bold my-3">
                  DISCOUNT UP TO 5%
                </div>
                <p className="text-base mb-2 font-medium">LIMITED TIME OFFER</p>
                <p className="text-base font-semibold">ENTIRE STORE</p>
              </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
