'use client';
import { useEffect } from 'react';
import { useLanguageStore } from '@/store/languageStore';

/**
 * Reads the stored locale from localStorage after mount and syncs it into the
 * Zustand language store. This is done in a client component so the server always
 * renders with the default 'en' locale (preventing SSR hydration mismatches), and
 * the actual user-preferred locale is applied immediately after hydration.
 */
export function LanguageHydrator() {
  const hydrate = useLanguageStore(s => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
  return null;
}
