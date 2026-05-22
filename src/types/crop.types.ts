// ── Crop Types ────────────────────────────────────────────────────────────────
export type Season = 'kharif' | 'rabi' | 'zaid';

export interface CropRecommendInput {
  soilType: string;
  state: string;
  district: string;
  season: Season;
  rainfall: number;
  temperature: number;
  budget: number;
  irrigationType: string;
  previousCrop?: string;
  landSize?: number;
}

export interface CropResult {
  crop: string;
  cropHindi: string;
  confidence: number;
  expectedYield: string;
  marketPrice: number;
  profitEstimate: number;
  waterRequirement: string;
  growthDuration: string;
  tips: string[];
  risks: string[];
}

export interface CropRecommendation {
  _id: string;
  userId: string;
  input: CropRecommendInput;
  recommendations: CropResult[];
  aiModel: string;
  createdAt: string;
}

export interface SeasonalCalendar {
  kharif: string[];
  rabi: string[];
  zaid: string[];
}

export const SOIL_TYPES = [
  'Alluvial', 'Black/Cotton', 'Red and Yellow', 'Laterite',
  'Arid/Desert', 'Sandy', 'Clayey', 'Loamy', 'Sandy Loam',
] as const;

export const IRRIGATION_TYPES = [
  'Rainfed', 'Canal', 'Drip', 'Sprinkler', 'Borewell', 'Well', 'Tube Well',
] as const;

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
] as const;
