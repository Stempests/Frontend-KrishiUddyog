import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign In | AgriConnect India',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #061210 0%, #0B1F1A 40%, #091a14 70%, #071510 100%)',
      }}
    >
      {/* ── Ambient glow orbs ─────────────────────────────── */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(63,163,77,0.10) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translate(-50%, -40%)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(77,168,218,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translate(30%, 30%)',
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,160,23,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translate(40%, -50%)',
        }}
      />

      {/* ── Rain lines decoration ─────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 w-px"
            style={{
              left: `${5 + i * 8}%`,
              height: `${30 + Math.random() * 40}%`,
              background: 'linear-gradient(180deg, transparent 0%, rgba(77,168,218,0.6) 50%, transparent 100%)',
              animation: `rain-drop ${1.5 + Math.random() * 2}s ease-in ${Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Floating Back Button ──────────────────────────── */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-bold opacity-70 hover:opacity-100 transition-opacity z-50"
        style={{ color: '#A8B5A2' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </Link>

      {/* ── Card wrapper ──────────────────────────────────── */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 select-none">
          {/* Logo mark */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-[0_0_32px_rgba(63,163,77,0.50)]"
            style={{ background: 'linear-gradient(135deg, #3FA34D, #1e6b2a)' }}
          >
            <svg className="w-9 h-9" viewBox="0 0 36 36" fill="none">
              <path d="M18 3C11 3 6 8 6 15c0 5 3 9 8 11V30h8v-4c5-2 8-6 8-11 0-7-5-12-12-12z" fill="#7DFF8A" opacity="0.95"/>
              <path d="M18 6v18" stroke="#0B1F1A" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M18 10l-5-4M18 14l5-4M18 18l-4-3" stroke="#0B1F1A" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <h1
            className="text-2xl font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #7DFF8A 0%, #4DA8DA 60%, #D4A017 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AgriConnect India
          </h1>
          <p
            className="text-xs mt-1.5 font-semibold tracking-widest uppercase"
            style={{ color: '#6b7f6a' }}
          >
            कृषि सेवा • AI समाधान
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
