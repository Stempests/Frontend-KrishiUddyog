import { create } from 'zustand';
import { CropRecommendation } from '@/types/crop.types';

interface CropStore {
  recommendations: CropRecommendation[];
  currentRec: CropRecommendation | null;
  addRecommendation: (rec: CropRecommendation) => void;
  setCurrentRec: (rec: CropRecommendation | null) => void;
  clearRecommendations: () => void;
}

export const useCropStore = create<CropStore>((set) => ({
  recommendations: [],
  currentRec: null,

  addRecommendation: (rec) =>
    set((s) => ({ recommendations: [rec, ...s.recommendations], currentRec: rec })),

  setCurrentRec: (rec) => set({ currentRec: rec }),

  clearRecommendations: () => set({ recommendations: [], currentRec: null }),
}));
