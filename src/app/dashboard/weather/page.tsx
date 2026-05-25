'use client';
import React from 'react';
import { useWeather } from '@/hooks/useWeather';
import { useLanguageStore } from '@/store/languageStore';
import { CloudSun, CloudRain, Wind, Droplets, ThermometerSun, AlertTriangle, RefreshCw, Sun, MapPin } from 'lucide-react';

export default function WeatherPage() {
  const { data, loading, error, refetch } = useWeather();

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-green-600 border-t-transparent animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Fetching live satellite telemetry...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-red-700 mb-2">Unable to load weather</h2>
          <p className="text-red-600/80 mb-6">{error || 'Something went wrong.'}</p>
          <button onClick={refetch} className="btn-primary inline-flex items-center gap-2">
            <RefreshCw size={18} /> Retry
          </button>
        </div>
      </div>
    );
  }

  const current = data.current;
  const isRainy = current.weather[0]?.main.toLowerCase().includes('rain');
  
  // Get next 5 forecasts for today
  const todayForecasts = data.forecast?.list?.slice(0, 5) || [];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
            <CloudSun className="text-orange-500" size={32} />
            AgriWeather
            {data.isMock && (
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-bold ml-2 border border-yellow-200 uppercase">
                Demo Mode
              </span>
            )}
          </h1>
          <p className="text-gray-500 font-medium mt-1">Live telemetry and hyper-local forecasting</p>
        </div>
        <div className="flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold border border-blue-100">
          <MapPin size={16} />
          {current.name || 'Unknown Location'} ({current.sys.country})
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Current Weather Card */}
        <div className="lg:col-span-2 glass-card overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
             {isRainy ? <CloudRain size={160} /> : <Sun size={160} className="text-yellow-500" />}
          </div>
          
          <div className="relative z-10 p-8 text-white" style={{ background: isRainy ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' : 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' }}>
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-white/80 font-bold uppercase tracking-wider text-sm mb-1">Current Conditions</p>
                <h2 className="text-5xl font-black">{Math.round(current.main.temp)}°C</h2>
                <p className="text-white/90 text-lg capitalize mt-2 flex items-center gap-2">
                  {current.weather[0]?.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-white/70 text-xs font-bold mb-1 flex items-center gap-1"><ThermometerSun size={14}/> Feels Like</div>
                <div className="font-bold text-lg">{Math.round(current.main.feels_like)}°C</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-white/70 text-xs font-bold mb-1 flex items-center gap-1"><Wind size={14}/> Wind</div>
                <div className="font-bold text-lg">{current.wind.speed} m/s</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-white/70 text-xs font-bold mb-1 flex items-center gap-1"><Droplets size={14}/> Humidity</div>
                <div className="font-bold text-lg">{current.main.humidity}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="text-white/70 text-xs font-bold mb-1 flex items-center gap-1"><CloudSun size={14}/> Cloud Cover</div>
                <div className="font-bold text-lg">{current.clouds.all}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="glass-card p-6 flex flex-col justify-between">
           <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-orange-500" /> Farming Insights
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 text-green-800 p-3 rounded-xl border border-green-100 text-sm font-medium">
                  ✅ Good time for fertilizer application. Low chance of rain wash-off in the next 12 hours.
                </div>
                <div className="bg-blue-50 text-blue-800 p-3 rounded-xl border border-blue-100 text-sm font-medium">
                  💧 Soil moisture likely decreasing. Prepare for irrigation if last watered \u003e 3 days ago.
                </div>
              </div>
           </div>
           <button className="btn-secondary w-full mt-6">View Full Advisory</button>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Today&apos;s Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {todayForecasts.map((forecast, idx) => {
            const timeStr = new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <span className="text-sm font-bold text-gray-500 mb-2">{timeStr}</span>
                <div className="text-blue-500 mb-2">
                  {forecast.weather[0]?.main.includes('Rain') ? <CloudRain size={24} /> : <Sun size={24} className="text-orange-400" />}
                </div>
                <span className="text-xl font-bold text-gray-800 mb-1">{Math.round(forecast.main.temp)}°C</span>
                <span className="text-xs text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <Droplets size={10} /> {Math.round((forecast.pop || 0) * 100)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
