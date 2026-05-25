'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { LoginCredentials, RegisterData } from '@/types/auth.types';

export const useAuth = () => {
  const { user, token, isAuthenticated, setAuth, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', credentials);
      setAuth(data.data);
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Login failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/register', formData);
      setAuth(data.data);
      router.push('/dashboard');
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    // router.refresh() clears Next.js's client router cache so the middleware
    // re-evaluates and the dashboard layout unmounts immediately.
    router.refresh();
    router.push('/');
  };

  return { user, token, isAuthenticated, loading, error, login, register, logout: handleLogout };
};
