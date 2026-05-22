'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { NAV_ITEMS } from '@/lib/constants';

const ICONS: Record<string, string> = {
  LayoutDashboard: '📊', Sprout: '🌾', TrendingUp: '💰',
  Microscope: '🔬', MessageCircle: '🤖', ShoppingCart: '🛒',
};

interface SidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  onLogout: () => void;
}

export const Sidebar = ({ isOpen, isMobileOpen, onMobileClose, onLogout }: SidebarProps) => {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 256 : 80,
          x: isMobileOpen ? 0 : -256,
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
        className={`fixed md:sticky top-0 left-0 h-screen z-50 flex flex-col md:translate-x-0 overflow-hidden`}
        style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--bg-border)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b whitespace-nowrap min-w-[256px]" style={{ borderColor: 'var(--bg-border)' }}>
          <span className="text-2xl flex-shrink-0">🌾</span>
          {isOpen && (
            <div>
              <span className="font-bold gradient-text">KrishiUddyog</span>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>AI Platform</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto min-w-[256px]">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`nav-item ${isActive ? 'active' : ''}`}
                title={!isOpen ? item.label : undefined}
              >
                <span className="text-xl flex-shrink-0 w-8 flex justify-center">{ICONS[item.icon]}</span>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap"
                    >
                      <div className="text-sm">{item.label}</div>
                      <div className="text-xs" style={{ color: isActive ? 'var(--color-primary)' : 'var(--text-muted)' }}>
                        {item.labelHi}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="p-3 border-t" style={{ borderColor: 'var(--bg-border)' }}>
          {isOpen && user && (
            <div className="glass-card p-3 mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: 'var(--color-primary)', color: '#fff' }}
                >
                  {user.name[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{user.role}</p>
                </div>
              </div>
            </div>
          )}
          <button
            id="sidebar-logout"
            onClick={onLogout}
            className="nav-item w-full text-red-400 hover:bg-red-500/10"
          >
            <span className="text-xl">🚪</span>
            {isOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
};
