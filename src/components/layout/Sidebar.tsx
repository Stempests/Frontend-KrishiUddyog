'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useUIStore } from '@/store/uiStore';
import { useAuth } from '@/hooks/useAuth';
import { 
  Home, Bot, Cloud, TrendingUp, Microscope, ShoppingCart, Truck, 
  Leaf, Users, Settings, LogOut, Loader2, ArrowLeft
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout: handleLogout } = useAuth();
  const { isSidebarOpen, isMobileMenuOpen, closeMobileMenu, theme } = useUIStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isDark = theme === 'dark';

  const onLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    closeMobileMenu();
    handleLogout();
    setTimeout(() => setIsLoggingOut(false), 2000);
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'AI Assistant', href: '/dashboard/assistant', icon: Bot },
    { name: 'Weather', href: '/dashboard/weather', icon: Cloud },
    { name: 'Mandi Prices', href: '/dashboard/mandi-prices', icon: TrendingUp },
    { name: 'Disease Scan', href: '/dashboard/disease-detection', icon: Microscope },
    { name: 'Marketplace', href: '/dashboard/marketplace', icon: ShoppingCart },
    { name: 'Logistics', href: '/dashboard/logistics', icon: Truck },
    { name: 'Crop Advisory', href: '/dashboard/crop-recommendation', icon: Leaf },
    { name: 'Community', href: '/dashboard/community', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  // In mobile, we might translate-x. In desktop, we check isSidebarOpen to collapse/expand.
  const isExpanded = isSidebarOpen || isMobileMenuOpen;

  return (
    <>
      {/* ── Mobile Overlay ──────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside 
        className={`
          fixed md:sticky top-0 left-0 h-screen z-50 flex flex-col flex-shrink-0
          transition-all duration-300 border-r
          ${isExpanded ? 'w-64' : 'w-20'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isDark ? 'bg-[#1e293b] border-gray-800' : 'bg-[#f0fdf4] border-[#e2e8f0]'}
        `}
      >
        <div className={`p-5 flex items-center gap-3 border-b h-[72px] flex-shrink-0 overflow-hidden ${isDark ? 'border-gray-800' : 'border-[#e2e8f0]/50'}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
            <Leaf size={18} />
          </div>
          {isExpanded && (
            <div className="whitespace-nowrap transition-opacity duration-300">
              <h1 className={`font-bold text-lg leading-tight ${isDark ? 'text-green-400' : 'text-green-800'}`}>AgriConnect</h1>
              <p className={`text-[10px] font-medium ${isDark ? 'text-green-500' : 'text-green-600'}`}>Smart Farming</p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto hide-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
               <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                title={!isExpanded ? item.name : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? (isDark ? 'bg-[rgba(63,163,77,0.2)] text-green-400 shadow-sm' : 'bg-green-100 text-green-800 shadow-sm')
                    : (isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-green-400' : 'text-gray-600 hover:bg-green-50 hover:text-green-700')
                } ${!isExpanded ? 'justify-center' : ''}`}
              >
                <Icon size={18} className={`flex-shrink-0 ${isActive ? (isDark ? 'text-green-400' : 'text-green-700') : 'text-gray-500'}`} />
                {isExpanded && <span className="whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 mt-auto flex flex-col gap-2">


          <Link
            href="/"
            title={!isExpanded ? 'Back to Home' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${!isExpanded ? 'justify-center' : ''} ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
          >
            <ArrowLeft size={18} />
            {isExpanded && <span>Back to Website</span>}
          </Link>

          <button
            onClick={onLogout}
            disabled={isLoggingOut}
            title={!isExpanded ? 'Logout' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 ${!isExpanded ? 'justify-center' : ''} ${isDark ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300' : 'text-red-600 hover:bg-red-50 hover:text-red-700'}`}
          >
            {isLoggingOut ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
            {isExpanded && <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
