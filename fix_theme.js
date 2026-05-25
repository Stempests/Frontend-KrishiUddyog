const fs = require('fs');

const path = 'd:/Project/Technomax/frontend/src/app/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Ensure useUIStore is imported
if (!content.includes('import { useUIStore }')) {
  content = content.replace(
    "import { useLanguageStore } from '@/store/languageStore';",
    "import { useLanguageStore } from '@/store/languageStore';\nimport { useUIStore } from '@/store/uiStore';"
  );
}

// Ensure theme is extracted
if (!content.includes('const { theme } = useUIStore();')) {
  content = content.replace(
    "const { t, locale } = useLanguageStore();",
    "const { t, locale } = useLanguageStore();\n  const { theme } = useUIStore();\n  const isDark = theme === 'dark';"
  );
}

// 1. Body
content = content.replace(
  "style={{ background: '#F8FAF9', color: '#1E293B' }}",
  "style={{ background: isDark ? 'var(--bg-base)' : '#F8FAF9', color: isDark ? 'var(--text-primary)' : '#1E293B' }}"
);

// 2. Header Container
content = content.replace(
  "background: '#FFFFFF',\n            borderColor: '#E2E8F0',\n            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',",
  "background: isDark ? 'rgba(19,42,36,0.70)' : '#FFFFFF',\n            borderColor: isDark ? 'rgba(63,163,77,0.20)' : '#E2E8F0',\n            backdropFilter: isDark ? 'blur(20px)' : 'none',\n            boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(125,255,138,0.06)' : '0 4px 12px rgba(0,0,0,0.05)',"
);

// 3. Logo text
content = content.replace(
  "style={{ color: '#166534' }}",
  "style={isDark ? { background: 'linear-gradient(135deg, #7DFF8A 0%, #4DA8DA 60%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : { color: '#166534' }}"
);
content = content.replace(
  "style={{ color: '#059669' }}",
  "style={{ color: isDark ? '#D4A017' : '#059669' }}"
);

// 4. Weather
content = content.replace(
  "background: '#F0F9FF',\n                borderColor: '#BAE6FD',",
  "background: isDark ? 'rgba(77,168,218,0.10)' : '#F0F9FF',\n                borderColor: isDark ? 'rgba(77,168,218,0.25)' : '#BAE6FD',"
);
content = content.replace(
  "style={{ background: '#E0F2FE' }}",
  "style={{ background: isDark ? 'rgba(77,168,218,0.18)' : '#E0F2FE' }}"
);
content = content.replace(
  "style={{ color: '#0F172A' }}>{t('dashboard.weatherLocation'",
  "style={{ color: isDark ? '#F5F7F2' : '#0F172A' }}>{t('dashboard.weatherLocation'"
);
content = content.replace(
  "style={{ color: '#0369A1' }}>",
  "style={{ color: isDark ? '#7ec8e8' : '#0369A1' }}>"
);

// 5. Profile
content = content.replace(
  "background: '#F0FDF4',\n                borderColor: '#BBF7D0',",
  "background: isDark ? 'rgba(63,163,77,0.10)' : '#F0FDF4',\n                borderColor: isDark ? 'rgba(63,163,77,0.22)' : '#BBF7D0',"
);
content = content.replace(
  "style={{ background: 'linear-gradient(135deg, #16A34A, #15803D)' }}",
  "className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${isDark ? 'shadow-[0_0_10px_rgba(63,163,77,0.40)]' : 'shadow-sm'}`}\n                style={{ background: isDark ? 'linear-gradient(135deg, #3FA34D, #1e6b2a)' : 'linear-gradient(135deg, #16A34A, #15803D)' }}"
);
// wait, the shadow-sm is inside className. Let's do it easier.
// Since the previous string is: className=\"w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm\"
content = content.replace(
  'className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm"\n                style={{ background: \'linear-gradient(135deg, #16A34A, #15803D)\' }}',
  'className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${isDark ? "shadow-[0_0_10px_rgba(63,163,77,0.40)]" : "shadow-sm"}`}\n                style={{ background: isDark ? "linear-gradient(135deg, #3FA34D, #1e6b2a)" : "linear-gradient(135deg, #16A34A, #15803D)" }}'
);
content = content.replace(
  "style={{ color: '#0F172A' }}>{displayName}",
  "style={{ color: isDark ? '#F5F7F2' : '#0F172A' }}>{displayName}"
);
content = content.replace(
  "style={{ color: '#16A34A' }}>",
  "style={{ color: isDark ? '#7DFF8A' : '#16A34A' }}>"
);

// 6. Alerts container
content = content.replace(
  "background: '#FFFFFF',\n            borderColor: '#E2E8F0',\n            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',",
  "background: isDark ? 'rgba(19,42,36,0.60)' : '#FFFFFF',\n            borderColor: isDark ? 'rgba(63,163,77,0.18)' : '#E2E8F0',\n            backdropFilter: isDark ? 'blur(16px)' : 'none',\n            boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.30)' : '0 4px 12px rgba(0,0,0,0.05)',"
);
content = content.replace(
  "style={{ color: '#F59E0B' }}",
  "style={{ color: isDark ? '#D4A017' : '#F59E0B' }}"
);
content = content.replace(
  "style={{ color: '#0F172A' }}>\n              {t('dashboard.newsFeed', 'Personalized News Feed')}",
  "style={{ color: isDark ? '#F5F7F2' : '#0F172A' }}>\n              {t('dashboard.newsFeed', 'Personalized News Feed')}"
);
content = content.replace(
  "style={{ background: '#FEF3C7', color: '#D97706', borderColor: '#FDE68A' }}",
  "style={{ background: isDark ? 'rgba(212,160,23,0.12)' : '#FEF3C7', color: isDark ? '#f0c040' : '#D97706', borderColor: isDark ? 'rgba(212,160,23,0.28)' : '#FDE68A' }}"
);

// 7. Alert 1
content = content.replace(
  "background: '#F0FDF4',\n                borderColor: '#BBF7D0',",
  "background: isDark ? 'rgba(63,163,77,0.08)' : '#F0FDF4',\n                borderColor: isDark ? 'rgba(63,163,77,0.22)' : '#BBF7D0',"
);
content = content.replace(
  "style={{ background: '#DCFCE7' }}",
  "style={{ background: isDark ? 'rgba(63,163,77,0.18)' : '#DCFCE7' }}"
);
content = content.replace(
  "style={{ color: '#16A34A' }}",
  "style={{ color: isDark ? '#7DFF8A' : '#16A34A' }}"
);
content = content.replace(
  "style={{ color: '#0F172A' }}>\n                  {t('dashboard.alertCotton'",
  "style={{ color: isDark ? '#F5F7F2' : '#0F172A' }}>\n                  {t('dashboard.alertCotton'"
);
content = content.replace(
  "style={{ color: '#475569' }}>\n                  {t('dashboard.cottonSowingSub'",
  "style={{ color: isDark ? '#A8B5A2' : '#475569' }}>\n                  {t('dashboard.cottonSowingSub'"
);

// 8. Alert 2
content = content.replace(
  "background: '#FEF2F2',\n                borderColor: '#FECACA',",
  "background: isDark ? 'rgba(239,68,68,0.07)' : '#FEF2F2',\n                borderColor: isDark ? 'rgba(239,68,68,0.22)' : '#FECACA',"
);
content = content.replace(
  "style={{ background: '#FEE2E2' }}",
  "style={{ background: isDark ? 'rgba(239,68,68,0.14)' : '#FEE2E2' }}"
);
content = content.replace(
  "style={{ color: '#DC2626' }}",
  "style={{ color: isDark ? '#f87171' : '#DC2626' }}"
);
content = content.replace(
  "style={{ color: '#991B1B' }}>\n                  {t('dashboard.alertTomato'",
  "style={{ color: isDark ? '#fca5a5' : '#991B1B' }}>\n                  {t('dashboard.alertTomato'"
);
content = content.replace(
  "style={{ color: '#475569' }}>\n                  {locale === 'en'",
  "style={{ color: isDark ? '#A8B5A2' : '#475569' }}>\n                  {locale === 'en'"
);

// 9. Mobile Nav
content = content.replace(
  "background: 'rgba(255,255,255,0.95)',\n          backdropFilter: 'blur(20px)',\n          borderColor: '#E2E8F0',\n          boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',",
  "background: isDark ? 'rgba(9,26,20,0.95)' : 'rgba(255,255,255,0.95)',\n          backdropFilter: 'blur(20px)',\n          borderColor: isDark ? 'rgba(63,163,77,0.18)' : '#E2E8F0',\n          boxShadow: isDark ? '0 -4px 24px rgba(0,0,0,0.40)' : '0 -4px 12px rgba(0,0,0,0.05)',"
);
content = content.replace(
  "style={{ color: active ? '#16A34A' : '#64748B' }}",
  "style={{ color: active ? (isDark ? '#7DFF8A' : '#16A34A') : (isDark ? '#6b7f6a' : '#64748B') }}"
);
content = content.replace(
  "style={{ color: active ? 'rgba(22,163,74,0.60)' : '#94A3B8' }}",
  "style={{ color: active ? (isDark ? 'rgba(125,255,138,0.60)' : 'rgba(22,163,74,0.60)') : (isDark ? '#4a5e49' : '#94A3B8') }}"
);

// 10. Floating Mic
content = content.replace(
  "className=\"w-16 h-16 rounded-full text-white flex items-center justify-center relative overflow-hidden cursor-pointer\"\n          style={{\n            background: 'linear-gradient(135deg, #16A34A, #15803D)',\n            boxShadow: '0 8px 24px rgba(22,163,74,0.40)',\n          }}",
  "className={`w-16 h-16 rounded-full text-white flex items-center justify-center relative overflow-hidden cursor-pointer ${isDark ? 'pulse-neon' : ''}`}\n          style={{\n            background: isDark ? 'linear-gradient(135deg, #3FA34D, #1e6b2a)' : 'linear-gradient(135deg, #16A34A, #15803D)',\n            border: isDark ? '2px solid rgba(125,255,138,0.35)' : 'none',\n            boxShadow: isDark ? '0 8px 32px rgba(63,163,77,0.50), 0 0 0 0 rgba(125,255,138,0.60)' : '0 8px 24px rgba(22,163,74,0.40)',\n          }}"
);
content = content.replace(
  '<div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />',
  '<div className={`absolute inset-0 rounded-full animate-ping ${isDark ? "bg-[#7DFF8A]/10" : "bg-white/20"}`} />'
);
content = content.replace(
  '<Mic size={26} className="relative z-10" />',
  '<Mic size={26} className={`relative z-10 ${isDark ? "drop-shadow-[0_0_8px_rgba(125,255,138,0.8)]" : ""}`} />'
);
content = content.replace(
  "background: '#FFFFFF',\n            borderColor: '#E2E8F0',\n            color: '#16A34A',\n            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',",
  "background: isDark ? 'rgba(9,26,20,0.90)' : '#FFFFFF',\n            borderColor: isDark ? 'rgba(63,163,77,0.28)' : '#E2E8F0',\n            color: isDark ? '#7DFF8A' : '#16A34A',\n            backdropFilter: isDark ? 'blur(8px)' : 'none',\n            boxShadow: isDark ? 'none' : '0 2px 4px rgba(0,0,0,0.05)',"
);

fs.writeFileSync(path, content);
