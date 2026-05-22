// ── Disease Types ─────────────────────────────────────────────────────────────
export type Severity = 'none' | 'low' | 'medium' | 'high';

export interface DiseaseDiagnosis {
  disease: string;
  diseaseHindi: string;
  confidence: number;
  severity: Severity;
  isHealthy: boolean;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  preventionTips: string[];
  organicRemedies: string[];
}

export interface DiseaseReport {
  _id: string;
  userId: string;
  imageUrl: string;
  cropType: string;
  diagnosis: DiseaseDiagnosis;
  location: { state: string; district: string };
  aiModel: string;
  createdAt: string;
}

export const COMMON_CROPS = [
  'Wheat', 'Rice', 'Maize', 'Cotton', 'Soybean', 'Sugarcane',
  'Potato', 'Tomato', 'Onion', 'Mustard', 'Gram', 'Groundnut',
  'Banana', 'Mango', 'Turmeric', 'Ginger', 'Chilli',
] as const;

export const SEVERITY_CONFIG: Record<Severity, { label: string; color: string; bg: string }> = {
  none: { label: 'Healthy', color: 'text-green-400', bg: 'bg-green-500/20' },
  low: { label: 'Low', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  medium: { label: 'Medium', color: 'text-orange-400', bg: 'bg-orange-500/20' },
  high: { label: 'High', color: 'text-red-400', bg: 'bg-red-500/20' },
};
