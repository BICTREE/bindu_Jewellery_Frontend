"use client";
import React, { useState, useEffect, useRef } from "react";
import { useScrollAnimation, useScrollLogo } from "./header";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import MobileHeader from "./MobileHeader";
import Home from "@/app/(main)/page";

const Header: React.FC = () => {
  // ✅ Hooks auto-disable on mobile
  useScrollAnimation(".header1", { threshold: 50, activeClass: "fixed" });
  useScrollLogo([".do-brand-logo", ".logo-icon"], 50, [
    "scroll-haid",
    "logo-icon-block",
  ]);

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [aboutusOpen, setaboutusOpen] = useState(false);
  const [openScheme, setOpenScheme] = useState(false);
  const [diamondOpen, setdiamondOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLLIElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const [userOpen, setUserOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;

  // ✅ Detect screen size - only desktop functionality
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // ✅ Close menu on outside click - desktop only
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
      <div className="lg:hedder-wrap-lg hidden lg:block">
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
        <div className="do-top-right items-center ml-auto do-header-top py-2 transition-all duration-300 flex-col md:flex-row bg-gray-200 p-4">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
            {/* Left section */}
            <div className="hidden md:flex">
              <ul className="navbar-top-right flex flex-wrap gap-4 text-sm">
                <li>
                  <a href="#" className="text-gray-700 flex items-center gap-1">
                    <i className="fa-solid fa-envelope text-amber-600"></i>
                    contact@bindujewellery.co.in
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

            {/* Right section */}
            <div className="p-2 do-top-right items-center ml-auto">
              <ul className="navbar-top-right flex items-center gap-3 text-lg">
                {/* User icon with badge + dropdown */}
                <li className="relative">
                  <button
                    onClick={() => {
                      setUserOpen(!userOpen);
                      setCartOpen(false);
                    }}
                    className="text-[#a8a7aa]  relative hover:text-[#d4b262] cursor-pointer"
                  >
                    <i className="fa-regular fa-user text-xl"></i>
                  </button>

                  {userOpen && (
                    <div className="absolute left-0 top-[80px] mt-1 -translate-y-1/2 w-44 bg-white rounded-lg shadow-lg p-2 z-80">
                      <ul className="text-[16px]">
                        {!user && (
                          <>
                            <li>
                              <Link
                                href="/login"
                                className="block px-3 py-2 hover:bg-gray-100"
                              >
                                Login
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/register"
                                className="block px-3 py-2 hover:bg-gray-100 rounded"
                              >
                                Register
                              </Link>
                            </li>
                          </>
                        )}

                        {user && (
                          <>
                            <li>
                              <Link
                                href="/profile"
                                className="block px-3 py-2 hover:bg-gray-100 rounded"
                              >
                                My Profile
                              </Link>
                            </li>
                            <li>
                              <button
                                onClick={() => signOut({ callbackUrl: "/login" })}
                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-600"
                              >
                                Logout
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </li>

                {/* Wishlist */}
                <li>
                  <a href="#" className="text-gray-700">
                    <i className="fa-regular fa-heart"></i>
                  </a>
                </li>

                {/* Cart icon with dropdown */}
                <li className="relative">
                  <Link href="cart" className="text-gray-700 relative">
                    <i className="fa-solid fa-cart-shopping text-xl"></i>
                    <span className="absolute -top-2 -right-3 bg-amber-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      3
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="header1 transition-all duration-300 bg-white shadow-md sticky top-0 z-50">
          <nav className="relative">
            <div className="container mx-auto px-4 flex items-center justify-between">
              {/* Menu items */}
              <ul
                ref={navRef}
                className="flex flex-row w-full bg-transparent"
              >
                <li className="liclass logo-icon">
                <Link href="/">
                    <img
                      src="/assets/logo/icon-only.png"
                      alt="Brand Logo"
                      className="mt-3 h-8"
                    />
                  </Link>
                </li>

                <li
                  className="relative liclass"
                  onMouseEnter={() => setaboutusOpen(true)}
                  onMouseLeave={() => setaboutusOpen(false)}
                >
                  <button className="text-gray-800 hover:text-amber-600 font-semibold py-2 px-4 flex items-center">
                    ABOUT US
                  </button>

                  {aboutusOpen && (
                    <ul className="absolute left-0 bg-white shadow-lg rounded-md w-48 top-full py-2 z-50">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-700 hover:bg-amber-100 hover:text-amber-600 font-medium"
                        >
                          Story
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-700 hover:bg-amber-100 hover:text-amber-600 font-medium"
                        >
                          Mission & Vision
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-700 hover:bg-amber-100 hover:text-amber-600 font-medium"
                        >
                          MD Message
                        </a>
                      </li>
                    </ul>
                  )}
                </li>

                <li
                  className="relative group liclass"
                  ref={triggerRef}
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                  <button className="text-gray-800 hover:text-amber-600 font-semibold py-2 px-4 flex items-center">
                    PRODUCTS
                  </button>
                </li>

                <li className="liclass">
                  <Link
                    href="/product-list"
                    className="text-gray-800 hover:text-amber-600 font-semibold block py-2 px-4"
                  >
                    SHOP ONLINE
                  </Link>
                </li>

                <li
                  className="relative liclass"
                  onMouseEnter={() => setdiamondOpen(true)}
                  onMouseLeave={() => setdiamondOpen(false)}
                >
                  <button className="text-gray-800 hover:text-amber-600 font-semibold py-2 px-4 flex items-center">
                    DIAMOND
                  </button>

                  {diamondOpen && (
                    <ul className="absolute left-0 bg-white shadow-lg rounded-md w-48 top-full py-2 z-50">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-700 hover:bg-amber-100 hover:text-amber-600 font-medium"
                        >
                          Kisna
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-700 hover:bg-amber-100 hover:text-amber-600 font-medium"
                        >
                          My blue Diamond
                        </a>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="liclass mobile-icon" style={{ margin: 0 }}>
                  <a href="/" className="do-brand-logo margin-t">
                    <img src="/assets/logo/brand-logo.png" alt="Brand Logo" />
                  </a>
                </li>

                <li className="liclass">
                  <a
                    href="#"
                    className="text-gray-800 hover:text-amber-600 font-semibold block py-2 px-4"
                  >
                    CSR
                  </a>
                </li>

                <li
                  className="relative group liclass"
                  onMouseEnter={() => setOpenScheme(true)}
                  onMouseLeave={() => setOpenScheme(false)}
                >
                  <button className="text-gray-800 hover:text-amber-600 font-semibold py-2 px-4 flex items-center">
                    OUR SCHEME
                  </button>

                  {openScheme && (
                    <ul className="absolute left-0 top-full bg-white shadow-lg rounded-md w-48 py-2 z-50">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-700 hover:bg-amber-100"
                        >
                          Akshaynidhi
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-700 hover:bg-amber-100"
                        >
                          Swarna Bindu
                        </a>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="liclass">
                  <Link
                    href="/gallery"
                    className="text-gray-800 hover:text-amber-600 font-semibold block py-2 px-4"
                  >
                    MEDIA
                  </Link>
                </li>

                <li className="liclass">
                  <Link
                    href="/contact-us"
                    className="text-gray-800 hover:text-amber-600 font-semibold block py-2 px-4"
                  >
                    CONTACT US
                  </Link>
                </li>
              </ul>
            </div>

            {/* Mega Menu - Full width of the navigation container */}
            {open && (
              <div
                ref={menuRef}
                className=" shadow-lg absolute bg-white left-0 right-0 top-12 container p-6 z-50 overflow-y-auto overflow-x-hidden max-h-[80vh] "
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                style={{ width: "100%" }}
              >
                <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                  {/* Column 1 */}
                  <div className="bg-white lg:pl-12">
                    <h4 className="font-bold text-[#d4b262] border-b border-amber-200 pb-2 mb-3 text-lg">
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
                            href="/collections"
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
                    <h4 className="font-bold text-[#d4b262] border-b border-amber-200 pb-2 mb-3 text-lg">
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

                    <h4 className="font-bold text-[#d4b262] border-b border-amber-200 pb-2 mb-3 text-lg mt-8">
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
                    <h4 className="font-bold text-[#d4b262] border-b border-amber-200 pb-2 mb-3 text-lg">
                      PURITY
                    </h4>
                    <ul className="space-y-2">
                      {["18 Carat", "20 Carat", "22 Carat", "24 Carat"].map((item) => (
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

                  {/* Column 4 - Promotion */}
                  <div className="bg-[#d4b262]  text-center text-black flex flex-col justify-center items-center">
                    {/* <h3 className="font-bold text-xl mb-3">BRIDAL COLLECTIONS</h3>
                    <div className="bg-black text-yellow-400 inline-block px-6 py-2 rounded-full text-base font-bold my-3">
                      DISCOUNT UP TO 5%
                    </div>
                    <p className="text-base mb-2 font-medium">LIMITED TIME OFFER</p>
                    <p className="text-base font-semibold">ENTIRE STORE</p>  */}

                      <img
                      src="/assets/images/menubanner.png"
                      alt="Brand Logo"
                      className=" "
                    />
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
      <MobileHeader />
    </header>
  );
};

export default Header;