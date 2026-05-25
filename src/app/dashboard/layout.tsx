'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useLanguageStore } from '@/store/languageStore';
import { LANGUAGES } from '@/lib/constants';
import Sidebar from '@/components/layout/Sidebar';
import { Menu, Search, MapPin, CloudSun, Bell, Globe } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  const { toggleMobileMenu, theme } = useUIStore();
  const { locale, setLanguage, t } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Mandi Price Alert 🌾',
      message: 'Wheat prices in Muzaffarnagar rose by ₹50/quintal today!',
      time: '5 mins ago',
      unread: true,
      type: 'price',
    },
    {
      id: 2,
      title: 'Weather Advisory ⛈️',
      message: 'Heavy rain expected tomorrow afternoon. Plan harvesting accordingly.',
      time: '1 hour ago',
      unread: true,
      type: 'weather',
    },
    {
      id: 3,
      title: 'Disease Scan Complete 🔬',
      message: 'Your tomato leaf scan has finished. Health: 98% (Healthy).',
      time: '3 hours ago',
      unread: false,
      type: 'disease',
    },
    {
      id: 4,
      title: 'Community Reply 👥',
      message: 'Amit Sharma commented on your organic pesticide post.',
      time: 'Yesterday',
      unread: false,
      type: 'community',
    },
  ]);
  const router = useRouter();

  const isDark = theme === 'dark';
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  useEffect(() => { setMounted(true); }, []);

  // Client-side auth guard
  useEffect(() => {
    if (mounted && !isAuthenticated) router.replace('/');
  }, [mounted, isAuthenticated, router]);

  if (!mounted) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-green-500 border-t-transparent animate-spin" />
          <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
        <div className="w-12 h-12 rounded-full border-2 border-green-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className={`flex h-screen ${isDark ? 'bg-[#0f172a] text-gray-100' : 'bg-[#f8fafc] text-[#0f172a]'} font-sans overflow-hidden`}>
      <Sidebar />

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">

        {/* HEADER */}
        <header className={`h-16 border-b flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-40 ${isDark ? 'bg-[#1e293b] border-gray-800' : 'bg-white border-[#e2e8f0]'}`}>
          <div className="flex items-center gap-2">
            <button
              className={`md:hidden p-2 -ml-2 rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
              onClick={toggleMobileMenu}
            >
              <Menu size={22} />
            </button>
            <h2 className={`font-bold text-xl hidden sm:block ${isDark ? 'text-white' : 'text-gray-800'}`}>{t('nav.dashboard', 'Dashboard')}</h2>
            <div className="w-2 h-2 rounded-full bg-green-500 mt-1 hidden sm:block"></div>
          </div>

          <div className="flex-1 max-w-xl mx-4 md:mx-8">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
              <input 
                type="text" 
                placeholder={t('dashboard.search', 'Search...')} 
                className={`w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${isDark ? 'bg-gray-800 border-gray-700 text-white focus:bg-gray-700' : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`p-2 rounded-full transition-colors flex items-center gap-1 ${isDark ? 'text-gray-300 hover:bg-[rgba(63,163,77,0.1)]' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Globe size={20} />
                <span className="text-xs uppercase font-bold">{locale}</span>
              </button>
              
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)}></div>
                  <div className={`absolute right-0 mt-2 w-36 rounded-xl shadow-lg border transition-all duration-200 z-50 overflow-hidden ${isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-100'}`}>
                    <div className="py-2">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-[calc(100%-16px)] mx-2 my-0.5 text-left px-3.5 py-2 text-sm rounded-lg transition-all duration-200 flex items-center justify-between ${
                            locale === lang.code 
                              ? (isDark ? 'text-green-400 font-bold bg-[rgba(63,163,77,0.15)]' : 'text-green-700 font-bold bg-green-50') 
                              : (isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white hover:translate-x-1' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-1')
                          }`}
                        >
                          <span>{lang.name}</span>
                          {locale === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={`hidden lg:flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full border ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
              <MapPin size={16} className="text-green-500" />
              {user?.location ? `${user.location.district}, ${user.location.state}` : 'Muzaffarnagar, UP'}
            </div>
            
            <div className={`hidden xl:flex items-center gap-3 px-3 py-1.5 rounded-full border ${isDark ? 'bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.2)]' : 'bg-blue-50/50 border-blue-100'}`}>
              <CloudSun size={20} className="text-blue-500" />
              <div>
                <div className={`font-bold text-sm leading-none ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>29°C</div>
                <div className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('dashboard.weatherStatus', 'Partly Cloudy')}</div>
              </div>
            </div>

            {/* Notifications */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`relative p-2 rounded-full transition-all duration-200 ${isDark ? 'text-gray-300 hover:bg-[rgba(63,163,77,0.1)] hover:text-green-400' : 'text-gray-500 hover:bg-gray-100 hover:text-green-600'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border border-white text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)}></div>
                  <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-xl border transition-all duration-200 z-50 overflow-hidden ${isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-100'}`}>
                    <div className="p-4 border-b flex items-center justify-between flex-shrink-0" style={{ borderColor: 'var(--bg-border)' }}>
                      <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Notifications</span>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-xs text-green-500 hover:text-green-600 font-semibold"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto custom-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                          <div className="text-3xl mb-2">🔔</div>
                          <p className="text-xs font-semibold">All caught up!</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">No new notifications</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                          {notifications.map((n) => (
                            <div 
                              key={n.id} 
                              onClick={() => markAsRead(n.id)}
                              className={`p-3 text-left transition-colors cursor-pointer flex gap-3 ${n.unread ? (isDark ? 'bg-green-500/5 hover:bg-green-500/10' : 'bg-green-50/50 hover:bg-green-50') : (isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50')}`}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                  <p className={`text-xs font-bold truncate ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{n.title}</p>
                                  <span className="text-[9px] text-gray-400 flex-shrink-0">{n.time}</span>
                                </div>
                                <p className={`text-[11px] leading-relaxed line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{n.message}</p>
                              </div>
                              {n.unread && (
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 self-center flex-shrink-0"></span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-2 border-t text-center flex-shrink-0" style={{ borderColor: 'var(--bg-border)' }}>
                        <button 
                          onClick={clearAllNotifications}
                          className={`w-full py-1.5 text-xs rounded-lg transition-colors font-semibold ${isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'}`}
                        >
                          Clear all
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className={`flex items-center gap-3 md:pl-4 md:border-l cursor-pointer ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`w-9 h-9 rounded-full overflow-hidden border-2 flex-shrink-0 ${isDark ? 'border-[rgba(63,163,77,0.5)]' : 'border-green-100'}`}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(user as any)?.avatar ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={(user as any).avatar} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <Image src="/farmer_profile_1779607366553.png" alt="Profile" width={36} height={36} className="object-cover w-full h-full" />
                )}
              </div>
              <div className="hidden sm:block">
                <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('dashboard.welcome', 'Hello')}, {user?.name?.split(' ')[0] || 'Farmer'}</div>
                <div className={`text-sm font-bold leading-tight capitalize ${isDark ? 'text-white' : 'text-gray-800'}`}>{user?.role || 'Farmer'}</div>
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
