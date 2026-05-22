import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthResponse } from '@/types/auth.types';

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
        localStorage.setItem('krishiuddyog_token', data.token);
        set({ token: data.token, user: data.user, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('krishiuddyog_token');
        localStorage.removeItem('krishiuddyog_user');
        set({ token: null, user: null, isAuthenticated: false });
      },

      updateUser: (updates: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'krishiuddyog-auth',
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
