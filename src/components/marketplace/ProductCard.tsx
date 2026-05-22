'use client';
import Image from 'next/image';
import { Listing, QUALITY_LABELS } from '@/types/marketplace.types';

interface ProductCardProps {
  listing: Listing;
}

export const ProductCard = ({ listing }: ProductCardProps) => {
  const qualityInfo = QUALITY_LABELS[listing.quality];
  const distanceKm = listing.distance ? Math.round(listing.distance / 1000) : null;

  return (
    <div className="glass-card overflow-hidden group">
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
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <span className="badge badge-green text-xs">{qualityInfo.label}</span>
          {distanceKm && (
            <span className="badge badge-blue text-xs">📍 {distanceKm} km</span>
          )}
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
          <span className="badge badge-blue text-xs">{listing.quantity} {listing.unit} available</span>
          {listing.variety && listing.variety !== 'Common' && (
            <span className="badge badge-yellow text-xs">{listing.variety}</span>
          )}
        </div>

        <div className="text-xs space-y-1 mb-4" style={{ color: 'var(--text-secondary)' }}>
          <p>📍 {listing.location?.district}, {listing.location?.state}</p>
          {listing.sellerId?.name && <p>👤 {listing.sellerId.name}</p>}
          <p>⏰ Expires: {new Date(listing.expiresAt).toLocaleDateString('en-IN')}</p>
        </div>

        <a
          href={`tel:${listing.sellerId?.phone}`}
          className="btn-primary w-full text-sm py-2 text-center block"
        >
          📞 Contact Seller
        </a>
      </div>
    </div>
  );
};
