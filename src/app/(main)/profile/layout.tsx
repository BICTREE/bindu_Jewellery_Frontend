'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  MapPin,
  CreditCard,
  Receipt,
  Heart,
  Settings,
  LogOut,
} from 'lucide-react';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/profile/address', label: 'Addresses', icon: MapPin },
    { href: '/profile/payment', label: 'Payments', icon: CreditCard },
    { href: '/profile/orderhistory', label: 'Order History', icon: Receipt },
    { href: '/profile/wishlist', label: 'Wishlist', icon: Heart },
    { href: '/profile/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-4 md:p-6 flex md:block justify-around md:justify-start">
        <h2 className="hidden md:block text-lg font-semibold mb-6">
          Hello, Abeesh Kumar
        </h2>

        <div className="flex md:flex-col gap-2 w-full">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-center md:justify-start gap-2 px-3 py-2 rounded-md flex-1 md:flex-none
                  ${isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-100'}`}
              >
                <Icon size={20} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}

          <button className="flex items-center justify-center md:justify-start gap-2 px-3 py-2 text-red-500 hover:bg-red-100 rounded-md">
            <LogOut size={20} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-4 md:p-8 rounded-md shadow-sm m-4">
        {/* Search bar */}
       

        {/* Page content passed as children */}
        {children}
      </main>
    </div>
  );
}
