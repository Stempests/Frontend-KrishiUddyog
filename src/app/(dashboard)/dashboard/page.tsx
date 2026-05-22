import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard | KrishiUddyog AI' };

export default function DashboardPage() {
  return (
    <div className="page-wrapper">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          🌾 Farmer Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          किसान डैशबोर्ड — Your farm intelligence hub
        </p>
      </div>

      {/* Quick Stats */}
      <div className="dashboard-grid mb-8">
        {[
          { icon: '🌡️', label: 'Weather', value: '28°C', sub: 'Partly Cloudy', color: '#06b6d4' },
          { icon: '🌾', label: 'Active Crops', value: '3', sub: 'Wheat, Rice, Mustard', color: '#22c55e' },
          { icon: '💰', label: 'Wheat Price', value: '₹2,180', sub: 'per quintal ↑ 2.3%', color: '#f59e0b' },
          { icon: '📈', label: 'Market Trend', value: 'Bullish', sub: 'Last 7 days', color: '#8b5cf6' },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{stat.sub}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="section-title">⚡ Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { href: '/dashboard/crop-recommendation', icon: '🌾', label: 'Crop AI', bg: 'from-emerald-600 to-teal-600' },
            { href: '/dashboard/mandi-prices', icon: '💰', label: 'Mandi Prices', bg: 'from-amber-600 to-orange-600' },
            { href: '/dashboard/disease-detection', icon: '🔬', label: 'Disease AI', bg: 'from-cyan-600 to-blue-600' },
            { href: '/dashboard/assistant', icon: '🤖', label: 'KrishiMitra', bg: 'from-violet-600 to-purple-600' },
            { href: '/dashboard/marketplace', icon: '🛒', label: 'Market', bg: 'from-rose-600 to-pink-600' },
            { href: '/dashboard/crop-recommendation', icon: '📊', label: 'History', bg: 'from-slate-600 to-gray-600' },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              className={`glass-card p-4 text-center group`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.bg} flex items-center justify-center text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <p className="text-xs font-semibold">{action.label}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Seasonal Advisory */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6">
          <h2 className="section-title text-lg">📅 Seasonal Advisory</h2>
          <div className="space-y-3">
            {[
              { season: 'Kharif (खरीफ)', status: 'Current', crops: 'Rice, Maize, Cotton, Soybean', color: 'badge-green' },
              { season: 'Rabi (रबी)', status: 'Next', crops: 'Wheat, Mustard, Gram', color: 'badge-yellow' },
            ].map((s) => (
              <div key={s.season} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
                <span className={`badge ${s.color} flex-shrink-0`}>{s.status}</span>
                <div>
                  <p className="font-semibold text-sm">{s.season}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.crops}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="section-title text-lg">🏛️ Govt. Schemes</h2>
          <div className="space-y-2">
            {[
              { name: 'PM-KISAN', desc: '₹6,000/year direct income support', icon: '💸' },
              { name: 'Kisan Credit Card', desc: 'Easy credit up to ₹3 lakh', icon: '💳' },
              { name: 'Fasal Bima Yojana', desc: 'Crop insurance with low premium', icon: '🛡️' },
              { name: 'e-NAM', desc: 'Electronic national market place', icon: '📱' },
            ].map((scheme) => (
              <div key={scheme.name} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-muted)' }}>
                <span className="text-xl">{scheme.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{scheme.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{scheme.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Feature Cards */}
      <div>
        <h2 className="section-title">🤖 AI Tools Ready for You</h2>
        <div className="dashboard-grid">
          {[
            { icon: '🌾', title: 'Crop Recommendation', desc: 'AI-powered crop suggestions based on your soil and budget', href: '/dashboard/crop-recommendation', cta: 'Get Recommendations' },
            { icon: '🔬', title: 'Disease Detection', desc: 'Upload a photo of your crop to diagnose diseases instantly', href: '/dashboard/disease-detection', cta: 'Detect Disease' },
            { icon: '🤖', title: 'KrishiMitra Assistant', desc: 'Chat in Hindi, Marathi, Punjabi or English about any farming topic', href: '/dashboard/assistant', cta: 'Start Chat' },
          ].map((card) => (
            <div key={card.title} className="glass-card p-6">
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="font-bold mb-2">{card.title}</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{card.desc}</p>
              <a href={card.href} className="btn-primary text-sm py-2 px-4 w-full justify-center">
                {card.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
