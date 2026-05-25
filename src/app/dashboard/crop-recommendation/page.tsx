'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCropRecommendation } from '@/hooks/useCropRecommendation';
import { cropRecommendSchema, CropRecommendFormData } from '@/lib/validators';
import { SOIL_TYPES, IRRIGATION_TYPES, INDIAN_STATES, CropRecommendation } from '@/types/crop.types';
import { useLanguageStore } from '@/store/languageStore';

export default function CropRecommendationPage() {
  const { recommend, loading, error } = useCropRecommendation();
  const [result, setResult] = useState<CropRecommendation | null>(null);
  const { t } = useLanguageStore();

  const { register, handleSubmit, formState: { errors } } = useForm<CropRecommendFormData>({
    resolver: zodResolver(cropRecommendSchema),
    defaultValues: { season: 'kharif', rainfall: 600, temperature: 28, budget: 25000 },
  });

  const onSubmit = async (data: CropRecommendFormData) => {
    const rec = await recommend(data);
    if (rec) setResult(rec);
  };

  return (
    <div className="page-wrapper">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🌾 {t('crop.title', 'AI Crop Recommendation')}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{t('crop.subtitle', 'Get personalized crop suggestions powered by Gemini AI')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-6">📝 {t('crop.enterDetails', 'Enter Farm Details')}</h2>
          {error && <div className="badge badge-red p-3 rounded-xl mb-4 w-full text-sm">⚠️ {error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🗺️ {t('crop.state', 'State')}</label>
                <select id="crop-state" {...register('state')} className="input-field">
                  <option value="">{t('crop.selectState', 'Select state')}</option>
                  {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>📍 {t('crop.district', 'District')}</label>
                <input id="crop-district" {...register('district')} type="text" placeholder={t('crop.district', 'District')} className="input-field" />
                {errors.district && <p className="text-red-400 text-xs mt-1">{errors.district.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🌱 {t('crop.soilType', 'Soil Type')}</label>
                <select id="crop-soil" {...register('soilType')} className="input-field">
                  <option value="">{t('crop.selectSoil', 'Select soil')}</option>
                  {SOIL_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.soilType && <p className="text-red-400 text-xs mt-1">{errors.soilType.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>📅 {t('crop.season', 'Season')}</label>
                <select id="crop-season" {...register('season')} className="input-field">
                  <option value="kharif">🌧️ {t('crop.kharif', 'Kharif (June-November)')}</option>
                  <option value="rabi">❄️ {t('crop.rabi', 'Rabi (November-April)')}</option>
                  <option value="zaid">☀️ {t('crop.zaid', 'Zaid (March-June)')}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>💧 {t('crop.irrigationType', 'Irrigation Type')}</label>
              <select id="crop-irrigation" {...register('irrigationType')} className="input-field">
                <option value="">{t('crop.selectIrrigation', 'Select irrigation')}</option>
                {IRRIGATION_TYPES.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
              {errors.irrigationType && <p className="text-red-400 text-xs mt-1">{errors.irrigationType.message}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🌧️ {t('crop.rainfall', 'Rainfall (mm)')}</label>
                <input id="crop-rainfall" {...register('rainfall', { valueAsNumber: true })} type="number" className="input-field" placeholder="600" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🌡️ {t('crop.temperature', 'Temp (°C)')}</label>
                <input id="crop-temp" {...register('temperature', { valueAsNumber: true })} type="number" className="input-field" placeholder="28" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>💰 {t('crop.budget', 'Budget (₹/acre)')}</label>
                <input id="crop-budget" {...register('budget', { valueAsNumber: true })} type="number" className="input-field" placeholder="25000" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🌾 {t('crop.previousCrop', 'Previous Crop')}</label>
                <input id="crop-previous" {...register('previousCrop')} type="text" placeholder={t('crop.previousCrop', 'Previous Crop')} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>📏 {t('crop.landSize', 'Land Size (acres)')}</label>
                <input id="crop-land" {...register('landSize', { valueAsNumber: true })} type="number" placeholder={t('crop.landSize', 'Land Size (acres)')} className="input-field" />
              </div>
            </div>

            <button id="crop-recommend-btn" type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? `🤖 ${t('crop.loading', 'AI is analyzing...')}` : `🌾 ${t('crop.submit', 'Get AI Recommendations')}`}
            </button>
          </form>
        </div>

        {/* Results */}
        <div>
          {loading && (
            <div className="glass-card p-8 text-center">
              <div className="text-5xl mb-4 float">🤖</div>
              <h3 className="text-xl font-bold mb-2">{t('crop.loading', 'AI is analyzing...')}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{t('crop.subtitle', 'Get personalized crop suggestions powered by Gemini AI')}</p>
              <div className="mt-4 space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton h-16 rounded-xl" />
                ))}
              </div>
            </div>
          )}

          {result && !loading && (
            <div>
              <h2 className="text-xl font-bold mb-4">✅ {t('crop.resultsTitle', 'Top Crop Recommendations')}</h2>
              <div className="space-y-4">
                {result.recommendations.map((rec, idx) => (
                  <div key={idx} className="glass-card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl font-bold">#{idx + 1}</span>
                          <h3 className="text-lg font-bold">{rec.crop}</h3>
                          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>({rec.cropHindi})</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <span className="badge badge-green">✅ {rec.confidence}% {t('crop.confidenceMatch', 'match')}</span>
                          <span className="badge badge-yellow">💰 {t('crop.marketPrice', 'Market Price')}: ₹{rec.marketPrice?.toLocaleString()}/qtl</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                      <div className="p-2 rounded-lg" style={{ background: 'var(--bg-muted)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{t('crop.expectedYield', 'Expected Yield')}: </span>
                        <span className="font-medium">{rec.expectedYield}</span>
                      </div>
                      <div className="p-2 rounded-lg" style={{ background: 'var(--bg-muted)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{t('crop.duration', 'Duration')}: </span>
                        <span className="font-medium">{rec.growthDuration}</span>
                      </div>
                      <div className="p-2 rounded-lg" style={{ background: 'var(--bg-muted)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{t('crop.waterRequirement', 'Water')}: </span>
                        <span className="font-medium">{rec.waterRequirement}</span>
                      </div>
                      <div className="p-2 rounded-lg" style={{ background: 'var(--bg-muted)' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{t('crop.profitEstimate', 'Profit')}: </span>
                        <span className="font-medium text-green-700">₹{rec.profitEstimate?.toLocaleString()}/acre</span>
                      </div>
                    </div>
                    {rec.tips?.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>💡 Tips:</p>
                        <ul className="space-y-1">
                          {rec.tips.slice(0, 3).map((tip, i) => (
                            <li key={i} className="text-xs" style={{ color: 'var(--text-secondary)' }}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!result && !loading && (
            <div className="glass-card p-8 text-center">
              <div className="text-6xl mb-4">🌾</div>
              <h3 className="text-xl font-bold mb-2">{t('crop.title', 'AI Crop Recommendation')}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                {t('crop.subtitle', 'Get personalized crop suggestions powered by Gemini AI')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
