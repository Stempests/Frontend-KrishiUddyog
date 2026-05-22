// ── Auth Types ────────────────────────────────────────────────────────────────
export type UserRole = 'farmer' | 'buyer' | 'admin';
export type Language = 'hi' | 'en' | 'mr' | 'pa' | 'bn' | 'te' | 'ta';

export interface User {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  language: Language;
  location: {
    state: string;
    district: string;
    coordinates?: [number, number];
  };
  landSize?: number;
  crops: string[];
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  password: string;
  role?: UserRole;
  language?: Language;
  state?: string;
  district?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
