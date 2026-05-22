'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDiseaseDetection } from '@/hooks/useDiseaseDetection';
import { COMMON_CROPS, SEVERITY_CONFIG, DiseaseReport } from '@/types/disease.types';
import { INDIAN_STATES } from '@/types/crop.types';
import Image from 'next/image';

export default function DiseaseDetectionPage() {
  const { detect, loading, error, result, setResult } = useDiseaseDetection();
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cropType, setCropType] = useState('');
  const [state, setState] = useState('');

  const onDrop = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  }, [setResult]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false,
    maxSize: 10 * 1024 * 1024,
  });

  const handleDetect = async () => {
    if (!selectedFile || !cropType) return;
    await detect(selectedFile, cropType, { state, district: '' });
  };

  const severity = result?.diagnosis?.severity;
  const severityConfig = severity ? SEVERITY_CONFIG[severity] : null;

  return (
    <div className="page-wrapper">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🔬 AI Crop Disease Detection</h1>
        <p style={{ color: 'var(--text-secondary)' }}>रोग पहचान — Upload a photo of your crop for instant AI diagnosis</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-6">📸 Upload Crop Photo</h2>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            id="disease-dropzone"
            className="rounded-xl p-8 text-center cursor-pointer transition-all mb-4"
            style={{
              border: `2px dashed ${isDragActive ? 'var(--color-primary)' : 'var(--bg-border)'}`,
              background: isDragActive ? 'rgba(34, 197, 94, 0.05)' : 'var(--bg-muted)',
            }}
          >
            <input {...getInputProps()} />
            {preview ? (
              <div>
                <Image src={preview} alt="Crop preview" width={300} height={200} className="w-full h-48 object-cover rounded-xl mb-3" />
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Click to change image</p>
              </div>
            ) : (
              <div>
                <div className="text-5xl mb-3">📸</div>
                <p className="font-semibold mb-1">{isDragActive ? 'Drop image here!' : 'Drop crop image or click to upload'}</p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>JPG, PNG, WebP up to 10MB</p>
              </div>
            )}
          </div>

          {/* Crop type */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🌾 Crop Type *</label>
              <select id="disease-crop" value={cropType} onChange={(e) => setCropType(e.target.value)} className="input-field">
                <option value="">Select crop type</option>
                {COMMON_CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>🗺️ State (optional)</label>
              <select id="disease-state" value={state} onChange={(e) => setState(e.target.value)} className="input-field">
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {error && <div className="badge badge-red p-3 rounded-xl mt-4 w-full text-sm">⚠️ {error}</div>}

          <button
            id="disease-detect-btn"
            onClick={handleDetect}
            disabled={loading || !selectedFile || !cropType}
            className="btn-primary w-full mt-6"
          >
            {loading ? '🔬 Analyzing crop...' : '🤖 Detect Disease with AI'}
          </button>
        </div>

        {/* Results */}
        <div>
          {loading && (
            <div className="glass-card p-8 text-center">
              <div className="text-5xl mb-4 float">🔬</div>
              <h3 className="text-xl font-bold mb-2">Analyzing your crop...</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Gemini Vision AI is examining the image</p>
              <div className="mt-6 space-y-2">
                {[1, 2, 3].map((i) => <div key={i} className="skeleton h-14 rounded-xl" />)}
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold">{result.diagnosis.disease}</h2>
                  {result.diagnosis.diseaseHindi && (
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{result.diagnosis.diseaseHindi}</p>
                  )}
                </div>
                {severityConfig && (
                  <span className={`badge ${severityConfig.bg} ${severityConfig.color} border-0`}>
                    {result.diagnosis.isHealthy ? '✅ Healthy' : `⚠️ ${severityConfig.label} Severity`}
                  </span>
                )}
              </div>

              <div className="badge badge-blue mb-4">
                🎯 Confidence: {result.diagnosis.confidence}%
              </div>

              {!result.diagnosis.isHealthy && (
                <>
                  {result.diagnosis.symptoms?.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-sm mb-2">🔍 Symptoms</h3>
                      <ul className="space-y-1">
                        {result.diagnosis.symptoms.map((s, i) => (
                          <li key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>• {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.diagnosis.treatment?.length > 0 && (
                    <div className="mb-4 p-4 rounded-xl" style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.15)' }}>
                      <h3 className="font-semibold text-sm mb-2 text-green-400">💊 Treatment</h3>
                      <ul className="space-y-1">
                        {result.diagnosis.treatment.map((t, i) => (
                          <li key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>• {t}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.diagnosis.organicRemedies?.length > 0 && (
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
                      <h3 className="font-semibold text-sm mb-2 text-amber-400">🌿 Organic Remedies</h3>
                      <ul className="space-y-1">
                        {result.diagnosis.organicRemedies.map((r, i) => (
                          <li key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

              {result.diagnosis.isHealthy && (
                <div className="p-4 rounded-xl" style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                  <p className="text-green-400 font-semibold">✅ Your crop appears healthy!</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Continue your current care routine and monitor regularly.
                  </p>
                </div>
              )}
            </div>
          )}

          {!result && !loading && (
            <div className="glass-card p-8 text-center">
              <div className="text-6xl mb-4">🔬</div>
              <h3 className="text-xl font-bold mb-2">Disease Detection Ready</h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Upload a clear photo of your crop leaves or affected area
              </p>
              <div className="space-y-2 text-left">
                {['Take photo in good lighting', 'Focus on affected leaves or stem', 'Capture multiple angles if possible'].map((tip) => (
                  <p key={tip} className="text-sm" style={{ color: 'var(--text-muted)' }}>✓ {tip}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
