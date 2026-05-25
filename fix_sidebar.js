const fs = require('fs');

const path = 'd:/Project/Technomax/frontend/src/components/layout/Sidebar.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add theme
content = content.replace(
  "const { isSidebarOpen, isMobileMenuOpen, closeMobileMenu } = useUIStore();",
  "const { isSidebarOpen, isMobileMenuOpen, closeMobileMenu, theme } = useUIStore();\n  const isDark = theme === 'dark';"
);

// 2. Sidebar background
content = content.replace(
  "background: 'linear-gradient(180deg, #0c2218 0%, #0b1f1a 60%, #091a14 100%)',",
  "background: isDark ? 'linear-gradient(180deg, #0c2218 0%, #0b1f1a 60%, #091a14 100%)' : '#FFFFFF',"
);
content = content.replace(
  "boxShadow: '4px 0 32px rgba(0,0,0,0.50), inset -1px 0 0 rgba(63,163,77,0.10)',",
  "boxShadow: isDark ? '4px 0 32px rgba(0,0,0,0.50), inset -1px 0 0 rgba(63,163,77,0.10)' : '4px 0 32px rgba(0,0,0,0.05), inset -1px 0 0 rgba(226,232,240,1)',"
);

// 3. Logo texts
content = content.replace(
  "text-[#F5F7F2]",
  "${isDark ? 'text-[#F5F7F2]' : 'text-gray-900'}"
);
content = content.replace(
  "style={{ color: '#D4A017' }}",
  "style={{ color: isDark ? '#D4A017' : '#B45309' }}"
);
content = content.replace(
  "style={{ color: '#A8B5A2' }}",
  "style={{ color: isDark ? '#A8B5A2' : '#64748B' }}"
);

// 4. Nav items
content = content.replaceAll(
  "${isActive\n                    ? 'bg-[rgba(63,163,77,0.16)] text-[#7DFF8A] border border-[rgba(63,163,77,0.32)] shadow-[0_0_14px_rgba(63,163,77,0.18)]'\n                    : 'text-[#A8B5A2] hover:bg-[rgba(63,163,77,0.08)] hover:text-[#F5F7F2] border border-transparent'\n                  }",
  "${isActive\n                    ? (isDark ? 'bg-[rgba(63,163,77,0.16)] text-[#7DFF8A] border border-[rgba(63,163,77,0.32)] shadow-[0_0_14px_rgba(63,163,77,0.18)]' : 'bg-green-50 text-green-700 border border-green-200 shadow-sm')\n                    : (isDark ? 'text-[#A8B5A2] hover:bg-[rgba(63,163,77,0.08)] hover:text-[#F5F7F2] border border-transparent' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent')\n                  }"
);

// wait, the settings item has a different logic block:
content = content.replace(
  "${pathname === '/dashboard/settings'\n                ? 'bg-[rgba(63,163,77,0.16)] text-[#7DFF8A] border border-[rgba(63,163,77,0.32)] shadow-[0_0_14px_rgba(63,163,77,0.18)]'\n                : 'text-[#A8B5A2] hover:bg-[rgba(63,163,77,0.08)] hover:text-[#F5F7F2] border border-transparent'\n              }",
  "${pathname === '/dashboard/settings'\n                ? (isDark ? 'bg-[rgba(63,163,77,0.16)] text-[#7DFF8A] border border-[rgba(63,163,77,0.32)] shadow-[0_0_14px_rgba(63,163,77,0.18)]' : 'bg-green-50 text-green-700 border border-green-200 shadow-sm')\n                : (isDark ? 'text-[#A8B5A2] hover:bg-[rgba(63,163,77,0.08)] hover:text-[#F5F7F2] border border-transparent' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent')\n              }"
);


content = content.replaceAll(
  "${isActive ? 'drop-shadow-[0_0_6px_rgba(125,255,138,0.7)]' : 'group-hover:scale-110'}",
  "${isActive ? (isDark ? 'drop-shadow-[0_0_6px_rgba(125,255,138,0.7)]' : '') : 'group-hover:scale-110'}"
);
content = content.replace(
  "${pathname === '/dashboard/settings'\n                  ? 'drop-shadow-[0_0_6px_rgba(125,255,138,0.7)]'\n                  : 'group-hover:rotate-90'\n              }",
  "${pathname === '/dashboard/settings'\n                  ? (isDark ? 'drop-shadow-[0_0_6px_rgba(125,255,138,0.7)]' : '')\n                  : 'group-hover:rotate-90'\n              }"
);

content = content.replaceAll(
  "${isActive ? 'text-[rgba(125,255,138,0.65)]' : 'text-[#6b7f6a]'}",
  "${isActive ? (isDark ? 'text-[rgba(125,255,138,0.65)]' : 'text-green-600') : (isDark ? 'text-[#6b7f6a]' : 'text-gray-400')}"
);
content = content.replace(
  "${pathname === '/dashboard/settings' ? 'text-[rgba(125,255,138,0.65)]' : 'text-[#6b7f6a]'}",
  "${pathname === '/dashboard/settings' ? (isDark ? 'text-[rgba(125,255,138,0.65)]' : 'text-green-600') : (isDark ? 'text-[#6b7f6a]' : 'text-gray-400')}"
);

// 5. User Profile
content = content.replace(
  "className=\"flex items-center gap-3 mb-3 px-3 py-2.5 rounded-xl border border-[rgba(63,163,77,0.18)] bg-[rgba(63,163,77,0.06)]\"",
  "className={`flex items-center gap-3 mb-3 px-3 py-2.5 rounded-xl border border-[rgba(63,163,77,0.18)] ${isDark ? 'bg-[rgba(63,163,77,0.06)]' : 'bg-green-50'}`}"
);
content = content.replace(
  "className=\"text-[13px] font-bold text-[#F5F7F2] truncate leading-tight\"",
  "className={`text-[13px] font-bold truncate leading-tight ${isDark ? 'text-[#F5F7F2]' : 'text-gray-900'}`}"
);
content = content.replace(
  "style={{ color: '#7DFF8A' }}",
  "style={{ color: isDark ? '#7DFF8A' : '#16A34A' }}"
);

// 6. Logout
content = content.replace(
  "hover:bg-[rgba(239,68,68,0.10)] hover:border-[rgba(239,68,68,0.25)] hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed group\"",
  "${isDark ? 'hover:bg-[rgba(239,68,68,0.10)] hover:border-[rgba(239,68,68,0.25)] hover:text-red-300' : 'hover:bg-red-50 hover:border-red-200 hover:text-red-600'} disabled:opacity-50 disabled:cursor-not-allowed group\""
);
content = content.replace(
  "style={{ color: '#f87171' }}",
  "style={{ color: isDark ? '#f87171' : '#DC2626' }}"
);

fs.writeFileSync(path, content);
