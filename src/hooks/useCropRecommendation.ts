'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { CropRecommendInput, CropRecommendation } from '@/types/crop.types';
import { useCropStore } from '@/store/cropStore';

export const useCropRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addRecommendation, recommendations, currentRec } = useCropStore();

  const recommend = async (formData: CropRecommendInput): Promise<CropRecommendation | null> => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/crop/recommend', formData);
      const rec: CropRecommendation = data.data;
      addRecommendation(rec);
      return rec;
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to get recommendations';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getHistory = async (page = 1) => {
    try {
      const { data } = await api.get(`/crop/history?page=${page}&limit=10`);
      return data;
    } catch {
      return null;
    }
  };

  const getCalendar = async (state?: string) => {
    try {
      const { data } = await api.get(`/crop/calendar${state ? `?state=${state}` : ''}`);
      return data.data;
    } catch {
      return null;
    }
  };

  return { recommend, getHistory, getCalendar, loading, error, recommendations, currentRec };
};
