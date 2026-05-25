'use client';
import { useState } from 'react';
import { useMandiPrices } from '@/hooks/useMandiPrices';
import { INDIAN_STATES } from '@/types/crop.types';
import { useLanguageStore } from '@/store/languageStore';

const COMMODITIES = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Soybean', 'Mustard', 'Onion', 'Potato', 'Tomato', 'Gram', 'Sugarcane', 'Turmeric'];

export default function MandiPricesPage() {
  const { prices, trending, loading, error, applyFilters } = useMandiPrices();
  const { t } = useLanguageStore();
  const [commodity, setCommodity] = useState('');
  const [state, setState] = useState('');

  const handleSearch = () => applyFilters({ commodity, state });

  return (
    <div className="page-wrapper">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">💰 {t('mandi.title', 'Live Mandi Prices')}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{t('mandi.subtitle', 'Real-time commodity prices from 7,000+ markets across India')}</p>
      </div>

      {/* Trending */}
      {trending.length > 0 && (
        <div className="mb-8 text-center">
          <h2 className="section-title">🔥 {t('mandi.trending', "Today's Trending")} <span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>(₹/quintal)</span></h2>
          <div className="flex gap-3 flex-wrap justify-center">
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
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🌾 {t('mandi.commodity', 'Commodity')}</label>
            <select id="mandi-commodity" value={commodity} onChange={(e) => setCommodity(e.target.value)} className="input-field">
              <option value="">{t('mandi.allCommodities', 'All Commodities')}</option>
              {COMMODITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🗺️ {t('mandi.state', 'State')}</label>
            <select id="mandi-state" value={state} onChange={(e) => setState(e.target.value)} className="input-field">
              <option value="">{t('mandi.allStates', 'All States')}</option>
              {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button id="mandi-search" onClick={handleSearch} className="btn-primary w-full">
              {loading ? `⏳ ${t('mandi.loading', 'Loading...')}` : `🔍 ${t('mandi.searchBtn', 'Search Prices')}`}
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
              <h3 className="text-xl font-bold mb-2">{t('mandi.noData', 'No Data Found')}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{t('mandi.noDataSub', 'Try adjusting your filters or check back later for live prices.')}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'var(--bg-muted)', borderBottom: '1px solid var(--bg-border)' }}>
                    {[
                      { key: 'mandi.headers.commodity', fallback: 'Commodity' },
                      { key: 'mandi.headers.market', fallback: 'Market' },
                      { key: 'mandi.headers.stateDistrict', fallback: 'State/District' },
                      { key: 'mandi.headers.min', fallback: 'Min (₹/quintal)' },
                      { key: 'mandi.headers.max', fallback: 'Max (₹/quintal)' },
                      { key: 'mandi.headers.modal', fallback: 'Modal (₹/quintal)' },
                      { key: 'mandi.headers.date', fallback: 'Date' }
                    ].map((h) => (
                      <th key={h.key} className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        {t(h.key, h.fallback)}
                      </th>
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
                      <td className="px-4 py-3 text-red-600">₹{price.minPrice?.toLocaleString()}</td>
                      <td className="px-4 py-3 text-green-700">₹{price.maxPrice?.toLocaleString()}</td>
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
              Showing {prices.length} price records • Per quintal • Source: AgriConnect Market Database
            </div>
          )}
        </div>
      )}
    </div>
  );
}
