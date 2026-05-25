// ── App-Wide Constants ────────────────────────────────────────────────────────

export const APP_NAME = 'AgriConnect India';
export const APP_TAGLINE = 'Empowering Indian Farmers with Smart Agricultural Solutions';

export const LANGUAGES = [
  { code: 'hi', name: 'हिंदी', englishName: 'Hindi', flag: '🇮🇳' },
  { code: 'en', name: 'English', englishName: 'English', flag: '🇬🇧' },
  { code: 'mr', name: 'मराठी', englishName: 'Marathi', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', englishName: 'Bengali', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', englishName: 'Telugu', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', englishName: 'Tamil', flag: '🇮🇳' },
] as const;

export const NAV_ITEMS = [
  { label: 'Dashboard', labelHi: 'डैशबोर्ड', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Crop AI', labelHi: 'फसल सिफारिश', href: '/dashboard/crop-recommendation', icon: 'Sprout' },
  { label: 'Mandi Prices', labelHi: 'मंडी भाव', href: '/dashboard/mandi-prices', icon: 'TrendingUp' },
  { label: 'Disease AI', labelHi: 'रोग पहचान', href: '/dashboard/disease-detection', icon: 'Microscope' },
  { label: 'KrishiMitra', labelHi: 'कृषि मित्र', href: '/dashboard/assistant', icon: 'MessageCircle' },
  { label: 'Marketplace', labelHi: 'बाज़ार', href: '/dashboard/marketplace', icon: 'ShoppingCart' },
  { label: 'Logistics', labelHi: 'परिवहन', href: '/dashboard/logistics', icon: 'Truck' },
] as const;

export const SEASON_INFO = {
  kharif: {
    label: 'Kharif',
    labelHi: 'खरीफ',
    months: 'June – November',
    color: 'from-emerald-500 to-teal-500',
  },
  rabi: {
    label: 'Rabi',
    labelHi: 'रबी',
    months: 'November – April',
    color: 'from-amber-500 to-orange-500',
  },
  zaid: {
    label: 'Zaid',
    labelHi: 'ज़ायद',
    months: 'March – June',
    color: 'from-rose-500 to-pink-500',
  },
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 12,
};
