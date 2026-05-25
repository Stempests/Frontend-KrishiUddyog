const fs = require('fs');

const path = 'd:/Project/Technomax/frontend/src/app/dashboard/layout.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add theme
content = content.replace(
  "const { isSidebarOpen, toggleSidebar, toggleMobileMenu } = useUIStore();",
  "const { isSidebarOpen, toggleSidebar, toggleMobileMenu, theme } = useUIStore();\n  const isDark = theme === 'dark';"
);

// 2. Loadings
content = content.replaceAll(
  "style={{ background: '#0B1F1A' }}",
  "style={{ background: isDark ? '#0B1F1A' : '#F8FAF9' }}"
);
content = content.replace(
  "style={{ color: '#A8B5A2' }}>Loading",
  "style={{ color: isDark ? '#A8B5A2' : '#475569' }}>Loading"
);

// 3. Container
content = content.replace(
  "style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}",
  "style={{ background: isDark ? 'var(--bg-base)' : '#F8FAF9', color: isDark ? 'var(--text-primary)' : '#1E293B' }}"
);

// 4. Header
content = content.replace(
  "background: 'rgba(11,31,26,0.88)',",
  "background: isDark ? 'rgba(11,31,26,0.88)' : 'rgba(255,255,255,0.88)',"
);
content = content.replace(
  "boxShadow: '0 1px 0 rgba(63,163,77,0.10), 0 4px 24px rgba(0,0,0,0.30)',",
  "boxShadow: isDark ? '0 1px 0 rgba(63,163,77,0.10), 0 4px 24px rgba(0,0,0,0.30)' : '0 1px 0 rgba(226,232,240,1), 0 4px 12px rgba(0,0,0,0.05)',"
);

// 5. Back & toggles
content = content.replaceAll(
  "style={{ color: '#A8B5A2' }}",
  "style={{ color: isDark ? '#A8B5A2' : '#475569' }}"
);

content = content.replace(
  "background: 'rgba(63,163,77,0.08)',\n                borderColor: 'rgba(63,163,77,0.25)',\n                color: '#7DFF8A',",
  "background: isDark ? 'rgba(63,163,77,0.08)' : '#F0FDF4',\n                borderColor: isDark ? 'rgba(63,163,77,0.25)' : '#BBF7D0',\n                color: isDark ? '#7DFF8A' : '#16A34A',"
);

// 6. Welcome
content = content.replace(
  "style={{ color: '#F5F7F2' }}",
  "style={{ color: isDark ? '#F5F7F2' : '#0F172A' }}"
);

// 7. Lang dropdown
content = content.replace(
  "background: 'rgba(19,42,36,0.90)',\n                  borderColor: 'rgba(63,163,77,0.22)',\n                  color: '#A8B5A2',",
  "background: isDark ? 'rgba(19,42,36,0.90)' : '#FFFFFF',\n                  borderColor: isDark ? 'rgba(63,163,77,0.22)' : '#E2E8F0',\n                  color: isDark ? '#A8B5A2' : '#475569',"
);

content = content.replace(
  "background: 'rgba(13,33,25,0.98)',\n                      borderColor: 'rgba(63,163,77,0.25)',\n                      boxShadow: '0 16px 48px rgba(0,0,0,0.60), 0 0 20px rgba(63,163,77,0.12)',",
  "background: isDark ? 'rgba(13,33,25,0.98)' : '#FFFFFF',\n                      borderColor: isDark ? 'rgba(63,163,77,0.25)' : '#E2E8F0',\n                      boxShadow: isDark ? '0 16px 48px rgba(0,0,0,0.60), 0 0 20px rgba(63,163,77,0.12)' : '0 4px 20px rgba(0,0,0,0.10)',"
);

content = content.replace(
  "background: locale === lang.code ? 'rgba(63,163,77,0.16)' : 'transparent',\n                          color: locale === lang.code ? '#7DFF8A' : '#A8B5A2',\n                          border: locale === lang.code ? '1px solid rgba(63,163,77,0.28)' : '1px solid transparent',",
  "background: locale === lang.code ? (isDark ? 'rgba(63,163,77,0.16)' : '#F0FDF4') : 'transparent',\n                          color: locale === lang.code ? (isDark ? '#7DFF8A' : '#16A34A') : (isDark ? '#A8B5A2' : '#475569'),\n                          border: locale === lang.code ? (isDark ? '1px solid rgba(63,163,77,0.28)' : '1px solid #BBF7D0') : '1px solid transparent',"
);

// 8. Live Prices
content = content.replace(
  "background: 'rgba(63,163,77,0.10)',\n                borderColor: 'rgba(63,163,77,0.28)',\n                color: '#7DFF8A',\n                boxShadow: '0 0 12px rgba(63,163,77,0.15)',",
  "background: isDark ? 'rgba(63,163,77,0.10)' : '#F0FDF4',\n                borderColor: isDark ? 'rgba(63,163,77,0.28)' : '#BBF7D0',\n                color: isDark ? '#7DFF8A' : '#16A34A',\n                boxShadow: isDark ? '0 0 12px rgba(63,163,77,0.15)' : 'none',"
);

fs.writeFileSync(path, content);
