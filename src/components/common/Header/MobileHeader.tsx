"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronRight,
  Search,
  User,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

// Define proper TypeScript interfaces
interface MenuItemWithHref {
  label: string;
  href: string;
  subchildren?: never;
}

interface SubChildItem {
  label: string;
  href: string;
}

interface MenuItemWithSubchildren {
  label: string;
  href?: never;
  subchildren: SubChildItem[] | [];
}

type MenuChild = MenuItemWithHref | MenuItemWithSubchildren;

interface MenuItem {
  label: string;
  href?: string;
  children?: MenuChild[];
}

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
   const [userOpen, setUserOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { data: session } = useSession();
  const user = session?.user;

  const menuData: MenuItem[] = [
    {
      label: "ABOUT US",
      children: [
        { label: "Our Story", href: "/ourstory" },
        { label: "Mission & Vision", href: "/mission-vision" },
        { label: "MD Message", href: "/md-message" },
      ],
    },
    {
      label: "PRODUCTS",
      children: [
        {
          label: "JEWELLERY",
          subchildren: [
            { label: "Earrings", href: "/products/jewellery/earrings" },
            { label: "Rings", href: "/products/jewellery/rings" },
            { label: "Pendants", href: "/products/jewellery/pendants" },
            { label: "Bracelets", href: "/products/jewellery/bracelets" },
            { label: "Chains", href: "/products/jewellery/chains" },
            { label: "Necklaces", href: "/products/jewellery/necklaces" },
            { label: "Thali Chains", href: "/products/jewellery/thali-chains" },
            { label: "Bangles", href: "/products/jewellery/bangles" },
            { label: "Coins", href: "/products/jewellery/coins" },
          ],
        },
        {
          label: "PROMISE COLLECTIONS",
          subchildren: [
            { label: "Kids Collections", href: "/collections/kids" },
            { label: "Bridal Collections", href: "/collections/bridal" },
            {
              label: "Light Weight Collections",
              href: "/collections/light-weight",
            },
            { label: "New Collections", href: "/collections/new" },
            { label: "Antique Collection", href: "/collections/antique" },
          ],
        },
        {
          label: "PURITY",
          subchildren: [
            { label: "18 Carat", href: "/purity/18-carat" },
            { label: "20 Carat", href: "/purity/20-carat" },
            { label: "22 Carat", href: "/purity/22-carat" },
            { label: "24 Carat", href: "/purity/24-carat" },
          ],
        },
        {
          label: "DIAMOND",
          subchildren: [
            { label: "Kisna", href: "/diamond/kisna" },
            { label: "My Blue Diamonds", href: "/diamond/my-blue-diamonds" },
          ],
        },
      ],
    },
    { label: "SHOP ONLINE", href: "/product-list" },
    {
      label: "DIAMOND",
      children: [
        { label: "Kisna", href: "/diamond/kisna" },
        { label: "My blue Diamond", href: "/diamond/my-blue-diamond" },
      ],
    },
    { label: "CSR", href: "/csr" },
    {
      label: "OUR SCHEME",
      children: [
        { label: "Akshaynidhi", href: "/schemes/akshaynidhi" },
        { label: "Swarna Bindu", href: "/schemes/swarna-bindu" },
      ],
    },
    { label: "MEDIA", href: "/gallery" },
    { label: "CONTACT US", href: "/contact-us" },
  ];

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <header className="lg:hidden  top-0 left-0 w-full bg-white z-50 shadow-md">
      {/* Top row with gold rate bar */}
      <div className="bg-[#f3f4f6] py-2 font-semibold text-center ">
        <div className="news">
          <ul>
            <li className="flex justify-center items-center gap-2 text-sm">
              {"TODAY'S GOLD RATE"}
              <button className="bg-[#d4b262] text-white px-3 py-1 rounded-full text-sm font-bold">
                10000/gm
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main header with logo and icons */}
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={() => setIsOpen(true)} className="p-2">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <Link href="/" className="flex items-center">
          <img
            src="/assets/logo/icon-only.png"
            alt="Brand Logo"
            className="h-10"
          />
        </Link>

        <div className="flex items-center gap-3">
          <button 
          
           onClick={() => {
                      setUserOpen(!userOpen);
                    
                    }}
     className="text-gray-700 relative  hover:text-[#d4b262]">
            <User className="w-5 h-5" />
          </button>
   {userOpen && (
                    <div className="absolute right-0 top-[146px] mt-1 -translate-y-1/2 w-44 bg-white rounded-lg shadow-lg p-2 z-80">
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

          <button className="text-gray-700  hover:text-[#d4b262]">
            <Heart className="w-5 h-5" />
          </button>
          <button className="text-gray-700 relative hover:text-[#d4b262]">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-3 bg-amber-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Drawer */}
      <div
        className={`fixed h-full min-h-screen w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}

        <div className="bg-[#f3f4f6] py-2 font-semibold text-center ">
        <div className="news">
          <ul>
            <li className="flex justify-center items-center gap-2 text-sm">
              {"TODAY'S GOLD RATE"}
              <button className="bg-[#d4b262] text-white px-3 py-1 rounded-full text-sm font-bold">
                10000/gm
              </button>
            </li>
          </ul>
        </div>
      </div>

        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 ">
          <div className="flex items-center gap-3">
            <img
             src="/assets/logo/icon-only.png"
              alt="Brand Logo"
              className="h-8"
            />
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* User Section */}
        {/* <div className="px-4 py-3 border-b bg-gray-50">
          {user ? (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Welcome, {user.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-red-600 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/login" className="text-sm font-medium text-blue-600">
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-blue-600"
              >
                Register
              </Link>
            </div>
          )}
        </div> */}

        {/* Contact Info */}
        {/* <div className="px-4 py-3 border-b bg-gray-50 text-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-600">📧</span>
            <span>contact@bindujewellery.co.in</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-600">📞</span>
            <span>04994 256888</span>
          </div>
        </div> */}

        {/* Nav Items with Scroll */}
        <nav className="flex-1 overflow-y-auto max-h-[calc(100vh-300px)]">
          <div className="px-4 py-4 space-y-0">
            {menuData.map((item) => (
              <div key={item.label} className="border-b border-gray-100">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="flex justify-between items-center w-full py-3 text-left font-semibold text-gray-800 hover:text-amber-600"
                    >
                      <span>{item.label}</span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          openSubmenu === item.label ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {openSubmenu === item.label && (
                      <div className="pl-4 pb-2">
                        {item.children.map((child) => (
                          <div key={child.label}>
                            {"subchildren" in child ? (
                              <>
                                <div className="font-medium text-gray-700 py-2">
                                  {child.label}
                                </div>
                                <div className="pl-2">
                                  {(child.subchildren || []).map((subItem) => (
                                    <Link
                                      key={subItem.label}
                                      href={subItem.href}
                                      className="block py-1.5 text-sm text-gray-600 hover:text-amber-600 border-b border-gray-100 last:border-b-0"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              </>
                            ) : (
                              <Link
                                href={child.href}
                                className="block py-2 text-sm text-gray-600 hover:text-amber-600 border-b border-gray-100 last:border-b-0"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.label}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="block py-3 font-semibold text-gray-800 hover:text-amber-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Promotion Banner */}
        <div className="bg-[#d4b262] p-4 text-center text-black m-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2">BRIDAL COLLECTIONS</h3>
          <div className="bg-black text-yellow-400 inline-block px-4 py-1 rounded-full text-sm font-bold my-2">
            DISCOUNT UP TO 5%
          </div>
          <p className="text-sm mb-1 font-medium">LIMITED TIME OFFER</p>
          <p className="text-sm font-semibold">ENTIRE STORE</p>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}
