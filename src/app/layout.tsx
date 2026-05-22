import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'KrishiUddyog AI — Empowering Indian Farmers',
    template: '%s | KrishiUddyog AI',
  },
  description:
    'AI-powered platform for Indian farmers. Get crop recommendations, mandi prices, disease detection, multilingual assistant, and connect with buyers.',
  keywords: [
    'Indian farming', 'AI agriculture', 'mandi prices', 'crop recommendation',
    'kisan', 'krishi', 'farmer app', 'KrishiUddyog',
  ],
  authors: [{ name: 'KrishiUddyog AI Team' }],
  openGraph: {
    title: 'KrishiUddyog AI',
    description: 'Empowering Indian Farmers with Artificial Intelligence',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#22c55e',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
