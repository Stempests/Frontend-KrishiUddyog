import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageHydrator } from '@/components/LanguageHydrator';
import { ThemeHydrator } from '@/components/ThemeHydrator';

export const metadata: Metadata = {
  title: {
    default: 'AgriConnect — Smart Farming, Better Tomorrow',
    template: '%s | AgriConnect',
  },
  description:
    'AgriConnect is a smart farming dashboard providing live mandi prices, disease detection, weather updates, and AI-powered agricultural recommendations.',
  keywords: [
    'AgriConnect', 'Smart Farming', 'Indian farming', 'AI agriculture', 'mandi prices', 'crop recommendation',
  ],
  authors: [{ name: 'AgriConnect Team' }],
  openGraph: {
    title: 'AgriConnect Dashboard',
    description: 'Empowering Farmers with Smart Farming Dashboard',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LanguageHydrator />
        <ThemeHydrator />
        {children}
      </body>
    </html>
  );
}
