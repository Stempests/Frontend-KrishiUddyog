'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { NAV_ITEMS } from '@/lib/constants';

const ICONS: Record<string, string> = {
  LayoutDashboard: '📊', Sprout: '🌾', TrendingUp: '💰',
  Microscope: '🔬', MessageCircle: '🤖', ShoppingCart: '🛒',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { isSidebarOpen, toggleSidebar, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-base)' }}>
      {/* ── Mobile Overlay ──────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen z-50 flex flex-col
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64' : 'w-20'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--bg-border)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b" style={{ borderColor: 'var(--bg-border)' }}>
          <span className="text-2xl flex-shrink-0">🌾</span>
          {isSidebarOpen && (
            <div>
              <span className="font-bold gradient-text">KrishiUddyog</span>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>AI Platform</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`nav-item ${isActive ? 'active' : ''}`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <span className="text-xl flex-shrink-0">{ICONS[item.icon]}</span>
                {isSidebarOpen && (
                  <div>
                    <div className="text-sm">{item.label}</div>
                    <div className="text-xs" style={{ color: isActive ? 'var(--color-primary)' : 'var(--text-muted)' }}>
                      {item.labelHi}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="p-3 border-t" style={{ borderColor: 'var(--bg-border)' }}>
          {isSidebarOpen && user && (
            <div className="glass-card p-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'var(--color-primary)', color: '#fff' }}>
                  {user.name[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.role}</p>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="nav-item w-full text-red-400 hover:bg-red-500/10"
          >
            <span className="text-xl">🚪</span>
            {isSidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
          style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--bg-border)' }}>
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden btn-secondary py-2 px-3 text-sm"
              onClick={toggleMobileMenu}
            >
              ☰
            </button>
            {/* Desktop sidebar toggle */}
            <button
              className="hidden md:flex btn-secondary py-2 px-3 text-sm"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? '◀' : '▶'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  नमस्ते, {user.name.split(' ')[0]}! 🙏
                </span>
              </div>
            )}
            <Link href="/dashboard/mandi-prices" className="badge badge-green text-xs">
              📊 Live Prices
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
