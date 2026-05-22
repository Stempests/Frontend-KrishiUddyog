// ── Marketplace Types ─────────────────────────────────────────────────────────
export type ListingUnit = 'kg' | 'quintal' | 'ton';
export type ListingQuality = 'A' | 'B' | 'C';
export type ListingStatus = 'active' | 'sold' | 'expired' | 'draft';

export interface Listing {
  _id: string;
  sellerId: {
    _id: string;
    name: string;
    phone: string;
    location: { state: string; district: string };
  };
  cropName: string;
  cropNameHindi: string;
  variety: string;
  quantity: number;
  unit: ListingUnit;
  pricePerUnit: number;
  quality: ListingQuality;
  description: string;
  images: string[];
  location: {
    state: string;
    district: string;
    village?: string;
    coordinates?: [number, number];
  };
  status: ListingStatus;
  harvestDate?: string;
  expiresAt: string;
  views: number;
  contactCount: number;
  createdAt: string;
  updatedAt: string;
  distance?: number; // from geo-near query (in meters)
}

export interface ListingFilters {
  crop?: string;
  state?: string;
  district?: string;
  quality?: ListingQuality;
  page?: number;
}

export const QUALITY_LABELS: Record<ListingQuality, { label: string; desc: string }> = {
  A: { label: 'Grade A', desc: 'Premium quality, export grade' },
  B: { label: 'Grade B', desc: 'Good quality, market standard' },
  C: { label: 'Grade C', desc: 'Average quality, local market' },
};
