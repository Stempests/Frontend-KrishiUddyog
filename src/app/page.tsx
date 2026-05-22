'use client';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function LandingPage() {
  return (
    <main className="bg-hero min-h-screen text-white overflow-hidden">
      {/* ── Navigation ──────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass-card m-4 rounded-2xl px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌾</span>
          <div>
            <span className="font-bold text-lg gradient-text">KrishiUddyog AI</span>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>कृषि उद्योग AI</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-secondary text-sm py-2 px-4">Login</Link>
          <Link href="/register" className="btn-primary text-sm py-2 px-4">Get Started Free</Link>
        </div>
      </motion.nav>

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="badge badge-green mb-6 mx-auto" style={{ width: 'fit-content' }}>
            🚀 Built for Bharat&apos;s 140M+ Farmers
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Empowering</span> Indian<br />
            Farmers with <span className="gradient-text">AI</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl max-w-2xl mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
            Get AI-powered crop recommendations, live mandi prices, disease detection,
            and a multilingual farm assistant — all in your language.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary text-base py-4 px-8 pulse-green">
              🌱 Start Farming Smarter
            </Link>
            <Link href="/dashboard/mandi-prices" className="btn-secondary text-base py-4 px-8">
              📊 Live Mandi Prices
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            {[
              { value: '6', label: 'AI Features', emoji: '🤖' },
              { value: '7+', label: 'Languages', emoji: '🗣️' },
              { value: '28', label: 'States Covered', emoji: '🗺️' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <div className="text-4xl mb-1">{stat.emoji}</div>
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features Section ─────────────────────────────────── */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything a Farmer Needs</h2>
            <p style={{ color: 'var(--text-secondary)' }}>6 powerful AI tools in one platform</p>
          </motion.div>
          <motion.div variants={staggerContainer} className="dashboard-grid">
            {[
              { icon: '📊', title: 'Farmer Dashboard', titleHi: 'किसान डैशबोर्ड', desc: 'Real-time weather, crop status, market prices at a glance', href: '/dashboard', color: 'from-emerald-600 to-teal-600' },
              { icon: '🌾', title: 'AI Crop Recommendation', titleHi: 'फसल सिफारिश', desc: 'Get personalized crop suggestions based on soil, season, and budget', href: '/dashboard/crop-recommendation', color: 'from-green-600 to-emerald-600' },
              { icon: '💰', title: 'Live Mandi Prices', titleHi: 'मंडी भाव', desc: 'Real-time commodity prices from 7000+ markets across India', href: '/dashboard/mandi-prices', color: 'from-amber-600 to-orange-600' },
              { icon: '🔬', title: 'Disease Detection', titleHi: 'रोग पहचान', desc: 'Photo-based AI diagnosis with treatment recommendations', href: '/dashboard/disease-detection', color: 'from-cyan-600 to-blue-600' },
              { icon: '🤖', title: 'Multilingual Assistant', titleHi: 'कृषि मित्र', desc: 'Ask farming questions in Hindi, Marathi, Punjabi, and more', href: '/dashboard/assistant', color: 'from-violet-600 to-purple-600' },
              { icon: '🛒', title: 'Buyer Marketplace', titleHi: 'बाज़ार', desc: 'Connect directly with buyers, skip the middleman', href: '/dashboard/marketplace', color: 'from-rose-600 to-pink-600' },
            ].map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Link
                  href={feature.href}
                  className="glass-card p-6 group cursor-pointer block h-full"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                  <p className="text-xs mb-2" style={{ color: 'var(--color-primary)' }}>{feature.titleHi}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">Simple as 1-2-3</motion.h2>
          <motion.p variants={fadeInUp} className="mb-16" style={{ color: 'var(--text-secondary)' }}>Start in minutes, farm smarter immediately</motion.p>
          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '📝', title: 'Register Free', desc: 'Create your account with just your mobile number. Available in 7 Indian languages.' },
              { step: '02', icon: '🌾', title: 'Set Up Your Farm', desc: 'Enter your location, soil type, and crop preferences for personalized recommendations.' },
              { step: '03', icon: '🚀', title: 'Farm with AI', desc: 'Get instant recommendations, check mandi prices, detect diseases, and connect with buyers.' },
            ].map((item) => (
              <motion.div key={item.step} variants={fadeInUp} className="glass-card p-6">
                <div className="text-4xl font-bold gradient-text mb-3">{item.step}</div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="glass-card max-w-3xl mx-auto p-12"
        >
          <div className="text-5xl mb-4">🌾</div>
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Farm?</h2>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>Join thousands of farmers already using KrishiUddyog AI</p>
          <Link href="/register" className="btn-primary text-lg py-4 px-10 pulse-green">
            किसान बनें — Start Now
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="py-8 px-6 text-center border-t" style={{ borderColor: 'var(--bg-border)', color: 'var(--text-muted)' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span>🌾</span>
          <span className="font-bold" style={{ color: 'var(--text-secondary)' }}>KrishiUddyog AI</span>
        </div>
        <p className="text-sm">Built with ❤️ for Indian farmers | Hackathon Project 2025</p>
        <p className="text-xs mt-1">Empowering 140 million+ farmers with AI</p>
      </footer>
    </main>
  );
}
