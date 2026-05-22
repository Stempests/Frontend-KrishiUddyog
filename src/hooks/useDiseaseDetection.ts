'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { DiseaseReport } from '@/types/disease.types';

export const useDiseaseDetection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseReport | null>(null);

  const detect = async (
    imageFile: File,
    cropType: string,
    location?: { state: string; district: string }
  ): Promise<DiseaseReport | null> => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('cropType', cropType);
      if (location?.state) formData.append('state', location.state);
      if (location?.district) formData.append('district', location.district);

      const { data } = await api.post('/disease/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000, // AI analysis can be slow
      });
      setResult(data.data);
      return data.data;
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Disease detection failed';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getReports = async (page = 1) => {
    try {
      const { data } = await api.get(`/disease/reports?page=${page}&limit=10`);
      return data;
    } catch {
      return null;
    }
  };

  return { detect, getReports, loading, error, result, setResult };
};
