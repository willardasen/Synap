"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  MessageSquare, 
  Package, 
  Settings, 
  Store,
  LogOut,
  ChevronRight,
  Menu,
  X,
  CreditCard
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";

import { Button } from "@Synap/ui/components/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Percakapan", href: "/dashboard/conversations", icon: MessageSquare },
  { name: "Produk", href: "/dashboard/products", icon: Package },
  { name: "Tagihan", href: "/dashboard/billing", icon: CreditCard },
  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden relative" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Store className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Synap</span>
            </Link>
            <button 
              className="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
            <div className="text-xs font-semibold leading-6 text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 px-2">
              Menu
            </div>
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href as any}
                  className={`group flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive ? "text-blue-700 dark:text-blue-400" : "text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400"
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4" />}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer User Info */}
          <div className="border-t border-slate-200 dark:border-slate-800 p-4">
            <div className="flex items-center gap-x-4 py-3 px-2">
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-9 w-9 ring-2 ring-slate-100 dark:ring-slate-800"
                  }
                }} 
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900 dark:text-white truncate w-40">
                  {user?.fullName || "Akses Admin"}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate w-40">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header line for Mobile */}
        <div className="lg:hidden flex h-16 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4">
          <button
            type="button"
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Buka menu sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-x-4">
            <UserButton />
          </div>
        </div>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
