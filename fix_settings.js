const fs = require('fs');

const path = 'd:/Project/Technomax/frontend/src/app/dashboard/settings/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add isDark
content = content.replace(
  "const { theme, toggleTheme } = useUIStore();\n  const [activeTab, setActiveTab] = useState('profile');",
  "const { theme, toggleTheme } = useUIStore();\n  const isDark = theme === 'dark';\n  const [activeTab, setActiveTab] = useState('profile');"
);

// 2. Titles
content = content.replace(
  '<h1 className="text-3xl font-bold mb-2">',
  '<h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>'
);
content = content.replace(
  "style={{ color: 'var(--text-secondary)' }}",
  "style={{ color: isDark ? 'var(--text-secondary)' : '#475569' }}"
);

// 3. glass-cards
content = content.replace(
  '<div className="w-full md:w-64 glass-card p-4 h-fit">',
  '<div className={`w-full md:w-64 p-4 h-fit ${isDark ? "glass-card" : "bg-white rounded-xl shadow-sm border border-gray-200"}`}>'
);
content = content.replace(
  '<div className="flex-1 glass-card p-6 min-h-[400px]">',
  '<div className={`flex-1 p-6 min-h-[400px] ${isDark ? "glass-card" : "bg-white rounded-xl shadow-sm border border-gray-200"}`}>'
);

// 4. Sidebar Nav Buttons
content = content.replaceAll(
  "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent",
  "${isDark ? 'text-gray-400 hover:bg-[rgba(63,163,77,0.1)] hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'} border border-transparent"
);

// 5. Section Headers
content = content.replaceAll(
  'className="text-xl font-bold border-b border-gray-200 pb-4"',
  'className={`text-xl font-bold border-b pb-4 ${isDark ? "border-[rgba(63,163,77,0.3)] text-white" : "border-gray-200 text-gray-900"}`}'
);

// 6. Labels
content = content.replaceAll(
  'className="text-sm font-semibold text-gray-700"',
  'className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}'
);

// 7. Input fields
content = content.replaceAll(
  'className={`input-field w-full',
  'className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${isDark ? "input-field" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"}'
);
content = content.replaceAll(
  'className="input-field w-full"',
  'className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${isDark ? "input-field" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"}`}'
);
content = content.replaceAll(
  'className="input-field w-full opacity-50 cursor-not-allowed"',
  'className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all opacity-50 cursor-not-allowed ${isDark ? "input-field" : "bg-gray-50 border-gray-200 text-gray-900"}`}'
);

// 8. Dark Mode Toggle Text
content = content.replace(
  '<div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 mt-6">',
  '<div className={`flex items-center justify-between p-4 rounded-xl border mt-6 ${isDark ? "bg-[rgba(19,42,36,0.8)] border-[rgba(63,163,77,0.3)]" : "bg-gray-50 border-gray-200"}`}>'
);
content = content.replace(
  '<p className="font-semibold text-gray-800">',
  '<p className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>'
);
content = content.replace(
  '<p className="text-xs text-gray-500">',
  '<p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>'
);

// 9. Notifications Text
content = content.replace(
  '<p className="text-gray-600 text-sm">',
  '<p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>'
);

fs.writeFileSync(path, content);
