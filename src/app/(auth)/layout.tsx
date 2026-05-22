import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | KrishiUddyog AI',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-5xl float">🌾</span>
          <h1 className="text-2xl font-bold gradient-text mt-3">KrishiUddyog AI</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            कृषि उद्योग AI — Empowering Indian Farmers
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
