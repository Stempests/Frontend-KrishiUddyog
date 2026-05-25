import { create } from 'zustand';

interface UIStore {
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  theme: 'dark' | 'light';
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  setLoading: (loading: boolean) => void;
  closeMobileMenu: () => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: true,
  isMobileMenuOpen: false,
  isLoading: false,
  theme: 'dark',

  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
}));
