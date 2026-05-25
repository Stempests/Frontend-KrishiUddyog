'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { MandiPrice, MandiFilters, TrendingCommodity } from '@/types/mandi.types';

export const useMandiPrices = (initialFilters?: MandiFilters) => {
  const [prices, setPrices] = useState<MandiPrice[]>([]);
  const [trending, setTrending] = useState<TrendingCommodity[]>([]);
  const [commodities, setCommodities] = useState<string[]>([]);
  const [filters, setFilters] = useState<MandiFilters>(initialFilters || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async (f?: MandiFilters) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      const activeFilters = f || filters;
      if (activeFilters.commodity) params.set('commodity', activeFilters.commodity);
      if (activeFilters.state) params.set('state', activeFilters.state);
      if (activeFilters.district) params.set('district', activeFilters.district);

      const { data } = await api.get(`/mandi/prices?${params.toString()}`);
      setPrices(data.data || []);
    } catch {
      setError('Failed to fetch mandi prices');
    } finally {
      setLoading(false);
    }
  };

  const fetchTrending = async () => {
    try {
      const { data } = await api.get('/mandi/trending');
      setTrending(data.data || []);
    } catch {}
  };

  const fetchCommodities = async () => {
    try {
      const { data } = await api.get('/mandi/commodities');
      setCommodities(data.data || []);
    } catch {}
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchPrices();
    fetchTrending();
    fetchCommodities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilters = (newFilters: MandiFilters) => {
    setFilters(newFilters);
    fetchPrices(newFilters);
  };

  return { prices, trending, commodities, filters, loading, error, applyFilters, refetch: fetchPrices };
};
