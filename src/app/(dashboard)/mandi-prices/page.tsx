'use client';
import { useState } from 'react';
import { useMandiPrices } from '@/hooks/useMandiPrices';
import { INDIAN_STATES } from '@/types/crop.types';

const COMMODITIES = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Soybean', 'Mustard', 'Onion', 'Potato', 'Tomato', 'Gram', 'Sugarcane', 'Turmeric'];

export default function MandiPricesPage() {
  const { prices, trending, loading, error, applyFilters } = useMandiPrices();
  const [commodity, setCommodity] = useState('');
  const [state, setState] = useState('');

  const handleSearch = () => applyFilters({ commodity, state });

  return (
    <div className="page-wrapper">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">💰 Live Mandi Prices</h1>
        <p style={{ color: 'var(--text-secondary)' }}>मंडी भाव — Real-time commodity prices from 7,000+ markets across India</p>
      </div>

      {/* Trending */}
      {trending.length > 0 && (
        <div className="mb-8">
          <h2 className="section-title">🔥 Today&apos;s Trending</h2>
          <div className="flex gap-3 flex-wrap">
            {trending.slice(0, 8).map((t) => (
              <button
                key={t._id}
                onClick={() => { setCommodity(t._id); applyFilters({ commodity: t._id, state }); }}
                className={`badge cursor-pointer hover:scale-105 transition-transform ${commodity === t._id ? 'badge-green' : 'badge-blue'}`}
              >
                {t._id} — ₹{Math.round(t.avgModal).toLocaleString()}
                {t.commodityHindi && <span className="ml-1 opacity-70">({t.commodityHindi})</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="glass-card p-5 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🌾 Commodity</label>
            <select id="mandi-commodity" value={commodity} onChange={(e) => setCommodity(e.target.value)} className="input-field">
              <option value="">All Commodities</option>
              {COMMODITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🗺️ State</label>
            <select id="mandi-state" value={state} onChange={(e) => setState(e.target.value)} className="input-field">
              <option value="">All States</option>
              {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button id="mandi-search" onClick={handleSearch} className="btn-primary w-full">
              {loading ? '⏳ Loading...' : '🔍 Search Prices'}
            </button>
          </div>
        </div>
      </div>

      {/* Price Table */}
      {error && <div className="badge badge-red p-3 rounded-xl mb-4 w-full text-sm">⚠️ {error}</div>}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => <div key={i} className="skeleton h-14 rounded-xl" />)}
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          {prices.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">No Data Found</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your filters or check back later for live prices.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'var(--bg-muted)', borderBottom: '1px solid var(--bg-border)' }}>
                    {['Commodity', 'Market', 'State/District', 'Min ₹', 'Max ₹', 'Modal ₹', 'Date'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prices.map((price, i) => (
                    <tr key={price._id || i}
                      style={{ borderBottom: '1px solid var(--bg-border)' }}
                      className="hover:bg-green-500/5 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-semibold">{price.commodity}</div>
                        {price.commodityHindi && <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{price.commodityHindi}</div>}
                      </td>
                      <td className="px-4 py-3">{price.market}</td>
                      <td className="px-4 py-3">
                        <div>{price.state}</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{price.district}</div>
                      </td>
                      <td className="px-4 py-3 text-red-400">₹{price.minPrice?.toLocaleString()}</td>
                      <td className="px-4 py-3 text-green-400">₹{price.maxPrice?.toLocaleString()}</td>
                      <td className="px-4 py-3 font-bold gradient-text">₹{price.modalPrice?.toLocaleString()}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {new Date(price.arrivalDate).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {prices.length > 0 && (
            <div className="p-4 text-xs" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--bg-border)' }}>
              Showing {prices.length} price records • Per quintal • Source: data.gov.in Agmarknet
            </div>
          )}
        </div>
      )}
    </div>
  );
}
