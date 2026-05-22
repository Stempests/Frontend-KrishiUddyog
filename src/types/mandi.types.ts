// ── Mandi Types ───────────────────────────────────────────────────────────────
export interface MandiPrice {
  _id: string;
  commodity: string;
  commodityHindi: string;
  variety: string;
  state: string;
  district: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  arrivalDate: string;
  fetchedAt: string;
}

export interface TrendingCommodity {
  _id: string;
  avgModal: number;
  count: number;
  commodityHindi: string;
}

export interface MandiFilters {
  commodity?: string;
  state?: string;
  district?: string;
}
