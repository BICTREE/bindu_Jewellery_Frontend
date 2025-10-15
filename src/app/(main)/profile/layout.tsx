'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User as UserIcon,
  MapPin,
  CreditCard,
  Receipt,
  Heart,
  Settings,
  LogOut,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const currentUser = session?.user;

  const links = [
    { href: '/profile', label: 'Profile', icon: UserIcon },
    { href: '/profile/address', label: 'Addresses', icon: MapPin },
    { href: '/profile/payment', label: 'Payments', icon: CreditCard },
    { href: '/profile/orderhistory', label: 'Order History', icon: Receipt },
    { href: '/wishlist', label: 'Wishlist', icon: Heart },
    { href: '/profile/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-4 md:p-6 flex md:block justify-around md:justify-start">
        <h2 className="hidden md:block text-lg font-semibold mb-6">
          Hello, {currentUser?.firstName ?? currentUser?.name}
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
                <Icon size={30} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center justify-center md:justify-start gap-2 px-3 py-2 text-red-500 hover:bg-red-100 rounded-md"
          >
            <LogOut size={20} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-4 md:p-8 rounded-md shadow-sm m-4">
        {children}
      </main>
    </div>
  );
}
