'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Listing, QUALITY_LABELS } from '@/types/marketplace.types';
import { INDIAN_STATES } from '@/types/crop.types';
import Image from 'next/image';

export default function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [crop, setCrop] = useState('');
  const [state, setState] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchListings = async (p = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: p.toString(), limit: '12' });
      if (crop) params.set('crop', crop);
      if (state) params.set('state', state);
      const { data } = await api.get(`/marketplace/listings?${params}`);
      setListings(data.data || []);
      setTotalPages(data.meta?.pages || 1);
      setTotal(data.meta?.total || 0);
    } catch {
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchListings(1); }, []);

  const handleSearch = () => { setPage(1); fetchListings(1); };

  const CROP_OPTIONS = ['Wheat', 'Rice', 'Cotton', 'Soybean', 'Onion', 'Potato', 'Tomato', 'Maize', 'Mustard', 'Gram'];

  return (
    <div className="page-wrapper">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">🛒 Buyer Marketplace</h1>
          <p style={{ color: 'var(--text-secondary)' }}>बाज़ार — Buy directly from farmers, no middlemen</p>
        </div>
        <a href="/dashboard/marketplace/create" className="btn-primary text-sm">
          + List Your Crop
        </a>
      </div>

      {/* Filters */}
      <div className="glass-card p-5 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🌾 Crop</label>
            <select id="market-crop" value={crop} onChange={(e) => setCrop(e.target.value)} className="input-field">
              <option value="">All Crops</option>
              {CROP_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🗺️ State</label>
            <select id="market-state" value={state} onChange={(e) => setState(e.target.value)} className="input-field">
              <option value="">All States</option>
              {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button id="market-search" onClick={handleSearch} className="btn-primary w-full">
              🔍 Search Listings
            </button>
          </div>
        </div>
      </div>

      {/* Count */}
      {!loading && (
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Found <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{total}</span> active listings
        </p>
      )}

      {/* Listings Grid */}
      {loading ? (
        <div className="dashboard-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton h-64 rounded-xl" />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h3 className="text-xl font-bold mb-2">No Listings Found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Be the first to list your crop in this market!</p>
          <a href="/dashboard/marketplace/create" className="btn-primary mt-4 inline-block">
            + Create First Listing
          </a>
        </div>
      ) : (
        <>
          <div className="dashboard-grid">
            {listings.map((listing) => {
              const qualityInfo = QUALITY_LABELS[listing.quality];
              return (
                <div key={listing._id} className="glass-card overflow-hidden group">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden" style={{ background: 'var(--bg-muted)' }}>
                    {listing.images?.[0] ? (
                      <Image
                        src={listing.images[0]}
                        alt={listing.cropName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">🌾</div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className="badge badge-green text-xs">{qualityInfo.label}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{listing.cropName}</h3>
                        {listing.cropNameHindi && (
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{listing.cropNameHindi}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold gradient-text">₹{listing.pricePerUnit?.toLocaleString()}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>per {listing.unit}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap mb-3">
                      <span className="badge badge-blue text-xs">{listing.quantity} {listing.unit}</span>
                      {listing.variety && listing.variety !== 'Common' && (
                        <span className="badge badge-yellow text-xs">{listing.variety}</span>
                      )}
                    </div>

                    <div className="text-xs space-y-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
                      <p>📍 {listing.location?.district}, {listing.location?.state}</p>
                      {listing.sellerId?.name && <p>👤 {listing.sellerId.name}</p>}
                    </div>

                    <a
                      href={`tel:${listing.sellerId?.phone}`}
                      className="btn-primary w-full text-sm py-2"
                    >
                      📞 Contact Seller
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <button onClick={() => { const p = Math.max(1, page - 1); setPage(p); fetchListings(p); }}
                disabled={page === 1} className="btn-secondary py-2 px-4 text-sm">← Prev</button>
              <span className="badge badge-blue py-2 px-4">{page} / {totalPages}</span>
              <button onClick={() => { const p = Math.min(totalPages, page + 1); setPage(p); fetchListings(p); }}
                disabled={page === totalPages} className="btn-secondary py-2 px-4 text-sm">Next →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
