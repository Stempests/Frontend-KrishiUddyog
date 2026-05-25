'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { WeatherData } from '@/types/weather.types';
import { useGeolocation } from './useGeolocation';

export const useWeather = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { lat, lng, error: geoError, getLocation } = useGeolocation();

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = lat && lng ? `?lat=${lat}&lon=${lng}` : '';
        const res = await api.get(`/weather${query}`);
        setData(res.data.data);
      } catch (err: unknown) {
        console.error('Failed to fetch weather', err);
        setError('Failed to fetch weather data.');
      } finally {
        setLoading(false);
      }
    };

    // If geolocation had an error, we still fetch using default Pune coords.
    // If we have lat/lng, we fetch with them.
    if ((lat && lng) || geoError) {
      fetchWeather();
    }
  }, [lat, lng, geoError]);

  return { data, loading, error, refetch: getLocation };
};
