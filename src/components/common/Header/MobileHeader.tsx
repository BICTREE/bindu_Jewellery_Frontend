"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronRight,
  User,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchUser } from "@/redux/store/wishlistSlice";
import { fetchCart } from "@/redux/store/cartSlice";
import { getAllCategory } from "@/services/categoryService/categorySerice";
import toast from "react-hot-toast";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { data: session } = useSession();
  const user = session?.user;

  // ✅ Redux state
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const userState = useAppSelector((state) => state.user);

  // Calculate counts from Redux state
  const cartCount = cart.count || 0;
  const wishlistCount = userState.wishlist?.length || 0;

  console.log("Mobile - Cart count from Redux:", cartCount);
  console.log("Mobile - Wishlist count from Redux:", wishlistCount);

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

  // ✅ Fetch categories for mobile menu
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

  // Group categories by parent for better organization
  const parentCategories = categories.filter(cat => cat.parent === null);
  const childCategories = categories.filter(cat => cat.parent !== null);

  // Find specific parent categories dynamically
  const findParentCategory = (keywords: string[]) => {
    return parentCategories.find(cat => 
      keywords.some(keyword => 
        cat.name.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };

  // Find jewellery parent category with multiple possible keywords
  const jewelleryParent = findParentCategory([
    "jewellery", "jewelry", "jewellary", "ornaments", 
    "earrings", "rings", "necklaces", "bangles"
  ]);

  // Find collections parent category with multiple possible keywords
  const collectionsParent = findParentCategory([
    "collection", "collections", "promise", "series",
    "bridal", "kids", "premium", "new", "antique"
  ]);

  // Get child categories for each parent
  const jewelleryChildren = childCategories.filter(child => 
    jewelleryParent && child.parent?._id === jewelleryParent._id
  );

  const collectionsChildren = childCategories.filter(child => 
    collectionsParent && child.parent?._id === collectionsParent._id
  );

  // Other categories (excluding the main ones we're using)
  const otherParentCategories = parentCategories.filter(cat => 
    cat !== jewelleryParent && cat !== collectionsParent
  );

  // Build dynamic menu data from categories
  const buildMenuData = (): MenuItem[] => {
    const menuData: MenuItem[] = [
      {
        label: "ABOUT US",
        children: [
          { label: "Our Story", href: "/ourstory" },
          { label: "Mission & Vision", href: "/missionandvision" },
          { label: "MD Message", href: "/md-message" },
         
        ],
      },
      {
        label: "PRODUCTS",
        children: [
          // Dynamic JEWELLERY section
          {
            label: jewelleryParent ? jewelleryParent.name.toUpperCase() : "JEWELLERY",
            subchildren: jewelleryChildren.length > 0 
              ? jewelleryChildren.map(child => ({
                  label: child.name,
                  href: `/product-list?category=${child._id}`
                }))
              : [] // Return empty array if no children found
          },
          // Dynamic COLLECTIONS section
          {
            label: collectionsParent ? collectionsParent.name.toUpperCase() : "COLLECTIONS",
            subchildren: collectionsChildren.length > 0
              ? collectionsChildren.map(child => ({
                  label: child.name,
                  href: `/product-list?category=${child._id}`
                }))
              : [] // Return empty array if no children found
          },
          // Purity section (static)
          {
            label: "PURITY",
            subchildren: [
              { label: "18 Carat", href: "/product-list?purity=18K" },
              { label: "20 Carat", href: "/product-list?purity=20K" },
              { label: "22 Carat", href: "/product-list?purity=22K" },
              { label: "24 Carat", href: "/product-list?purity=24K" },
            ],
          },
        
        ].filter(section => 
          // Filter out empty sections (only show if they have subchildren)
          section.subchildren && section.subchildren.length > 0
        ) as MenuItemWithSubchildren[]
      },
      { label: "SHOP ONLINE", href: "/product-list" },
      {
        label: "DIAMOND",
        children: [
          { label: "Kisna", href: "/kisnadiamond" },
          { label: "My blue Diamond", href: "/mybluediamond" },
        ],
      },
      { label: "CSR", href: "/csr" },
      {
        label: "OUR SCHEME",
        children: [
          { label: "Akshaynidhi", href: "/akshayanidhi" },
          { label: "Swarna Bindu", href: "/swarnabindu" },
        ],
      },
      { label: "MEDIA", href: "/gallery" },
      { label: "CONTACT US", href: "/contact" },
    ];

    return menuData;
  };

  const menuData = buildMenuData();

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <header className="lg:hidden top-0 left-0 w-full bg-white z-50 shadow-md">
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
          {/* User icon with dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setUserOpen(!userOpen);
              }}
              className="text-gray-700 relative hover:text-[#d4b262]"
            >
              <User className="w-5 h-5" />
            </button>
            
            {userOpen && (
              <div className="absolute right-0 top-8 mt-1 w-44 bg-white rounded-lg shadow-lg p-2 z-80">
                <ul className="text-[16px]">
                  {!user && (
                    <>
                      <li>
                        <Link
                          href="/login"
                          className="block px-3 py-2 hover:bg-gray-100"
                          onClick={() => setUserOpen(false)}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/register"
                          className="block px-3 py-2 hover:bg-gray-100 rounded"
                          onClick={() => setUserOpen(false)}
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
                          onClick={() => setUserOpen(false)}
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            signOut({ callbackUrl: "/login" });
                            setUserOpen(false);
                          }}
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
          </div>

          {/* Wishlist icon with dynamic count */}
          <Link href="/wishlist" className="text-gray-700 relative hover:text-[#d4b262]">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart icon with dynamic count */}
          <Link href="/cart" className="text-gray-700 relative hover:text-[#d4b262]">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
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
  <Link href="/">
    <img
      src="/assets/logo/icon-only.png"
      alt="Brand Logo"
      className="h-8 cursor-pointer"
    />
  </Link>
</div>
          <button onClick={() => setIsOpen(false)} className="p-2">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="animate-pulse space-y-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-4"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nav Items with Scroll */}
        <nav className="flex-1 overflow-y-auto max-h-[calc(100vh-300px)]">
          <div className="px-4 py-4 space-y-0">
            {!loading && menuData.map((item) => (
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