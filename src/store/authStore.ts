import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthResponse } from '@/types/auth.types';

// ── Cookie helpers (readable by Next.js middleware on the Edge) ───────────────
function setAuthCookie() {
  if (typeof document === 'undefined') return;
  // SameSite=Lax is safe for same-origin navigation; no HttpOnly so JS can write it.
  document.cookie = 'agriconnect_authenticated=true; path=/; SameSite=Lax; max-age=604800'; // 7 days
}

function clearAuthCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = 'agriconnect_authenticated=; path=/; SameSite=Lax; max-age=0';
}

// ── Store ─────────────────────────────────────────────────────────────────────
interface AuthStore {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (data: AuthResponse) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (data: AuthResponse) => {
        localStorage.setItem('agriconnect_token', data.token);
        setAuthCookie();
        set({ token: data.token, user: data.user, isAuthenticated: true });
      },

      logout: () => {
        // Clear every storage layer
        localStorage.removeItem('agriconnect_token');
        localStorage.removeItem('agriconnect_user');
        localStorage.removeItem('agriconnect-auth'); // Zustand persist key
        sessionStorage.clear();
        clearAuthCookie();
        set({ token: null, user: null, isAuthenticated: false });
      },

      updateUser: (updates: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'agriconnect-auth',
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
