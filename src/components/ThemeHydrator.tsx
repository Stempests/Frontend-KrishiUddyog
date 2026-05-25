'use client';
import { useEffect } from 'react';
import { useUIStore } from '@/store/uiStore';

export function ThemeHydrator() {
  const { theme } = useUIStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return null;
}
