"use client";
import React, { useState, useEffect, useRef } from "react";
import { useScrollAnimation, useScrollLogo } from "./header";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import MobileHeader from "./MobileHeader";
import { getAllCategory } from "@/services/categoryService/categorySerice";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchUser } from "@/redux/store/wishlistSlice";
import { fetchCart } from "@/redux/store/cartSlice";

// Create a type for the global Redux dispatch methods
type ReduxDispatchMethods = {
  refreshCart: () => void;
  refreshUser: () => void;
};

// Extend the Window interface to include our custom property
declare global {
  interface Window {
    reduxDispatch?: ReduxDispatchMethods;
  }
}
// Category type based on your API response
type Category = {
  _id: string;
  parent: {
    _id: string;
    parent: null | string;
    name: string;
    description: string;
    isArchived: boolean;
    image: {
      name: string;
      key: string;
      location: string;
      _id: string;
    };
    productIds: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  } | null;
  name: string;
  description: string;
  isArchived: boolean;
  image: {
    name: string;
    key: string;
    location: string;
    _id: string;
  };
  productIds: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Loading Skeleton Components
const CategorySkeleton = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
    <ul className="space-y-2">
      {[...Array(6)].map((_, index) => (
        <li key={index}>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </li>
      ))}
    </ul>
  </div>
);

const MegaMenuSkeleton = () => (
  <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Column 1 Skeleton */}
    <div className="bg-white lg:pl-12">
      <div className="h-7 bg-gray-200 rounded mb-3 w-3/4"></div>
      <ul className="space-y-2">
        {[...Array(8)].map((_, index) => (
          <li key={index}>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </li>
        ))}
      </ul>
    </div>

    {/* Column 2 Skeleton */}
    <div>
      <div className="h-7 bg-gray-200 rounded mb-3 w-3/4"></div>
      <ul className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <li key={index}>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </li>
        ))}
      </ul>
    </div>

    {/* Column 3 Skeleton */}
    <div>
      <div className="h-7 bg-gray-200 rounded mb-3 w-3/4"></div>
      <ul className="space-y-2">
        {[...Array(4)].map((_, index) => (
          <li key={index}>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </li>
        ))}
      </ul>
    </div>

    {/* Column 4 Skeleton */}
    <div>
      <div className="h-7 bg-gray-200 rounded mb-3 w-3/4"></div>
      <ul className="space-y-2">
        {[...Array(6)].map((_, index) => (
          <li key={index}>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLLIElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  
  const [userOpen, setUserOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  const { data: session, status } = useSession();

  // ✅ Redux state
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.user);

  // Calculate counts from Redux state
  const cartCount = cart.count || 0;
  const wishlistCount = user.wishlist?.length || 0;

  console.log("Cart count from Redux:", cartCount);
  console.log("Wishlist count from Redux:", wishlistCount);

  // ✅ Fetch user data and cart when session changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) {
        // User is logged out - counts will be reset by redux
        return;
      }

      try {
        await Promise.all([
          dispatch(fetchUser()), // This will fetch user with wishlist
          dispatch(fetchCart())  // This will fetch cart count
        ]);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data. Please try again.");
      }
    };

    fetchUserData();
  }, [session, dispatch]);

// Then in your useEffect:
useEffect(() => {
  if (typeof window !== 'undefined') {
    // Make these available globally for other components to use
    window.reduxDispatch = {
      // Cart actions
      refreshCart: () => dispatch(fetchCart()),
      // User/wishlist actions
      refreshUser: () => dispatch(fetchUser()),
    };
  }
}, [dispatch]);

  // ✅ Fetch categories for mega menu
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await getAllCategory();
        setCategories(categoriesData || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

  // Group categories by parent for better organization
  const parentCategories = categories.filter(cat => cat.parent === null);
  const childCategories = categories.filter(cat => cat.parent !== null);

  // Find specific parent categories
  const jewelleryParent = parentCategories.find(cat => 
    cat.name.toLowerCase().includes("jewellery") || 
    cat.name.toLowerCase().includes("jewelry")
  );

  const promiseCollectionsParent = parentCategories.find(cat => 
    cat.name.toLowerCase().includes("promise") || 
    cat.name.toLowerCase().includes("collection")
  );

  // Get child categories for each parent
  const jewelleryChildren = childCategories.filter(child => 
    jewelleryParent && child.parent?._id === jewelleryParent._id
  );

  const promiseCollectionsChildren = childCategories.filter(child => 
    promiseCollectionsParent && child.parent?._id === promiseCollectionsParent._id
  );

  // Other categories (excluding the main ones we're using)
  const otherParentCategories = parentCategories.filter(cat => 
    cat !== jewelleryParent && cat !== promiseCollectionsParent
  );

  const purityItems = [
    "18 Carat",
    "20 Carat", 
    "22 Carat",
    "24 Carat"
  ];

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
                  <Link href="#" className="text-gray-400 flex items-center gap-1 hover:text-[#d4b262]">
                    <i className="fa-solid fa-envelope text-[#d4b262]"></i>
                    contact@bindujewellery.co.in
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-400 flex items-center gap-1 hover:text-[#d4b262]">
                    <i className="fa-solid fa-phone text-[#d4b262]"></i>
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
                 <div className="absolute left-0 top-[60px] mt-1 -translate-y-1/2 w-44 bg-white rounded-lg shadow-xl p-2 z-80 border-[1px] border-[#dededf]">
  <ul className="text-[15px] font-medium">
    {!session?.user && (
      <>
        <li>
          <Link
            href="/login"
            className="block px-3 py-2 rounded hover:bg-gray-100 transition-colors capitalize"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            href="/register"
            className="block px-3 py-2 rounded hover:bg-gray-100 transition-colors capitalize"
          >
            Register
          </Link>
        </li>
      </>
    )}

    {session?.user && (
      <>
        <li>
          <Link
            href="/profile"
            className="block px-3 py-2 rounded hover:bg-gray-100 transition-colors capitalize"
          >
            My Profile
          </Link>
        </li>
        <li>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-red-600 transition-colors capitalize"
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
                <li className="relative">
                  <Link href="/wishlist" className="text-gray-700 relative">
                    <i className="fa-regular fa-heart"></i>
                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-3 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {wishlistCount > 99 ? '99+' : wishlistCount}
                      </span>
                    )}
                  </Link>
                </li>

                {/* Cart icon with dropdown */}
                <li className="relative">
                  <Link href="/cart" className="text-gray-700 relative">
                    <i className="fa-solid fa-cart-shopping text-xl"></i>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-3 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                    )}
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
                  <button className="text-gray-800 hover:text-[#d4b262] font-semibold py-2 px-4 flex items-center">
                    ABOUT US
                  </button>

                  {aboutusOpen && (
                    <ul className="absolute left-0 bg-white shadow-lg rounded-md w-48 top-full py-2 z-50">
                      <li>
                        <Link
                          href="/ourstory"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#d4b262] font-medium"
                        >
                          Our Story
                        </Link>
                      </li>
                      <li>
                        <a
                          href="/missionandvision"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#d4b262] font-medium"
                        >
                          Mission & Vision
                        </a>
                      </li>
                      <li>
                        <Link
                          href="/ourleadership"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#d4b262]  font-medium"
                        >
                          Our Leadership
                        </Link>
                    
                      </li>

                  {/* <li>
                        <a
                          href="/ourbranches"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#d4b262] font-medium"
                        >
                          Our Branches
                        </a>
                   </li> */}


                    </ul>
                  )}
                </li>

                <li
                  className="relative group liclass"
                  ref={triggerRef}
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                  <button className="text-gray-800 hover:text-[#d4b262] font-semibold py-2 px-4 flex items-center">
                    PRODUCTS
                  </button>
                </li>

                <li className="liclass">
                  <Link
                    href="/product-list"
                    className="text-gray-800 hover:text-[#d4b262] font-semibold block py-2 px-4"
                  >
                    SHOP ONLINE
                  </Link>
                </li>

                <li
                  className="relative liclass"
                  onMouseEnter={() => setdiamondOpen(true)}
                  onMouseLeave={() => setdiamondOpen(false)}
                >
                  <button className="text-gray-800 hover:text-[#d4b262] font-semibold py-2 px-4 flex items-center">
                    DIAMOND
                  </button>

                  {diamondOpen && (
                    <ul className="absolute left-0 bg-white shadow-lg rounded-md w-48 top-full py-2 z-50">
                      <li>
                        <Link
                          href="/kisnadiamond"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-[#d4b262] font-medium"
                        >
                          Kisna
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/mybluediamond#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-[#d4b262] font-medium"
                        >
                          My blue Diamond
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="liclass mobile-icon" style={{ margin: 0 }}>
                  <Link href="/" className="do-brand-logo margin-t">
                    <img src="/assets/logo/brand-logo.png" alt="Brand Logo" />
                  </Link>
                </li>

                <li className="liclass">
                  <Link
                    href="/csr"
                    className="text-gray-800 hover:text-[#d4b262] font-semibold block py-2 px-4"
                  >
                    CSR
                  </Link>
                </li>

                <li
                  className="relative group liclass"
                  onMouseEnter={() => setOpenScheme(true)}
                  onMouseLeave={() => setOpenScheme(false)}
                >
                  <button className="text-gray-800 hover:text-[#d4b262] font-semibold py-2 px-4 flex items-center">
                    OUR SCHEME
                  </button>

                  {openScheme && (
                    <ul className="absolute left-0 top-full bg-white shadow-lg rounded-md w-48 py-2 z-50">
                      <li>
                        <Link
                          href="/akshayanidhi"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-[#d4b262] font-medium"
                        >
                          Akshaynidhi
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/swarnabindu"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-[#d4b262] font-medium"
                        >
                          Swarna Bindu
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="liclass">
                  <Link
                    href="/gallery"
                    className="text-gray-800 hover:text-[#d4b262] font-semibold block py-2 px-4"
                  >
                    MEDIA
                  </Link>
                </li>

                <li className="liclass">
                  <Link
                    href="/contact"
                    className="text-gray-800 hover:text-[#d4b262] font-semibold block py-2 px-4"
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
                {loading ? (
                  <MegaMenuSkeleton />
                ) : (
                  <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                    {/* Column 1 - JEWELLERY (from categories) */}
                    <div className="bg-white lg:pl-12">
                      <h4 className="font-bold text-[#d4b262] border-b border-amber-200 pb-2 mb-3 text-lg">
                        {jewelleryParent ? jewelleryParent.name.toUpperCase() : "JEWELLERY"}
                      </h4>
                      <ul className="space-y-2">
                        {jewelleryChildren.length > 0 ? (
                          jewelleryChildren.map((child) => (
                            <li key={child._id}>
                              <Link
                                href={`/product-list?category=${child._id}`}
                                className="text-gray-700 hover:text-amber-600 block py-1 transition-colors duration-200"
                              >
                                {child.name}
                                {child.productIds && child.productIds.length > 0 && (
                                  <span className="text-xs text-gray-400 ml-1">
                                    ({child.productIds.length})
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))
                        ) : (
                          // Fallback if no jewellery categories found
                          ["Earrings", "Rings", "Pendants", "Bracelets", "Necklaces", "Bangles"].map((item) => (
                            <li key={item}>
                              <Link
                                href="/collections"
                                className="text-gray-700 hover:text-amber-600 block py-1 transition-colors duration-200"
                              >
                                {item}
                              </Link>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>

                    {/* Column 2 - PROMISE COLLECTIONS (from categories) */}
                    <div>
                      <h4 className="font-bold text-[#d4b262] border-b border-amber-200 pb-2 mb-3 text-lg">
                        {promiseCollectionsParent ? promiseCollectionsParent.name.toUpperCase() : "COLLECTIONS"}
                      </h4>
                      <ul className="space-y-2">
                        {promiseCollectionsChildren.length > 0 ? (
                          promiseCollectionsChildren.map((child) => (
                            <li key={child._id}>
                              <Link
                                href={`/product-list?category=${child._id}`}
                                className="text-gray-700 hover:text-amber-600 block py-1 transition-colors duration-200"
                              >
                                {child.name}
                                {child.productIds && child.productIds.length > 0 && (
                                  <span className="text-xs text-gray-400 ml-1">
                                    ({child.productIds.length})
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))
                        ) : (
                          // Fallback if no promise collections found
                          ["Bridal Collections", "Kids Collections", "New Arrivals", "Premium Collection"].map((item) => (
                            <li key={item}>
                              <Link
                                href="/collections"
                                className="text-gray-700 hover:text-amber-600 block py-1 transition-colors duration-200"
                              >
                                {item}
                              </Link>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>

                    {/* Column 3 - PURITY (static) */}
                    <div>
                      <h4 className="font-bold text-[#d4b262] border-b border-amber-200 pb-2 mb-3 text-lg">
                        PURITY
                      </h4>
                      <ul className="space-y-2">
                        {purityItems.map((item) => (
                          <li key={item}>
                            <Link
                              href={`/product-list?purity=${item.replace(' Carat', 'K')}`}
                              className="text-gray-700 hover:text-amber-600 block py-1 transition-colors duration-200"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Promotion Column */}
                    <div className="col-span-full lg:col-span-1 bg-[#d4b262] text-center text-black flex flex-col justify-center items-center">
                      <img
                        src="/assets/images/menubanner.png"
                        alt="Brand Logo"
                        className=""
                      />
                    </div>
                  </div>
                )}
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