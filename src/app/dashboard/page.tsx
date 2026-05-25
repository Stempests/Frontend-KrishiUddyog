'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { 
  CloudSun, Mic, Droplet, Wind, Umbrella, ArrowRight, 
  TrendingUp, Microscope, ShoppingCart, Truck, Leaf, 
  ChevronRight, CheckCircle2, MapPin, Send
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { theme } = useUIStore();
  const router = useRouter();
  const userName = user?.name || 'Ramesh Kumar';
  
  const isDark = theme === 'dark';
  const [aiQuery, setAiQuery] = useState('');

  const exploreFeatures = [
    { name: 'Disease Scan', desc: 'Detect crop diseases using AI', icon: Microscope, color: isDark ? 'text-green-400' : 'text-green-600', bg: isDark ? 'bg-[rgba(34,197,94,0.15)]' : 'bg-green-50', href: '/dashboard/disease-detection' },
    { name: 'Mandi Prices', desc: 'Live prices from mandis', icon: TrendingUp, color: isDark ? 'text-blue-400' : 'text-blue-600', bg: isDark ? 'bg-[rgba(59,130,246,0.15)]' : 'bg-blue-50', href: '/dashboard/mandi-prices' },
    { name: 'Weather', desc: 'Live weather & forecast', icon: CloudSun, color: isDark ? 'text-orange-400' : 'text-orange-500', bg: isDark ? 'bg-[rgba(249,115,22,0.15)]' : 'bg-orange-50', href: '/dashboard/weather' },
    { name: 'Marketplace', desc: 'Buy & sell crops & equipment', icon: ShoppingCart, color: isDark ? 'text-purple-400' : 'text-purple-600', bg: isDark ? 'bg-[rgba(168,85,247,0.15)]' : 'bg-purple-50', href: '/dashboard/marketplace' },
    { name: 'Logistics', desc: 'Find transport & routes', icon: Truck, color: isDark ? 'text-teal-400' : 'text-teal-600', bg: isDark ? 'bg-[rgba(20,184,166,0.15)]' : 'bg-teal-50', href: '/dashboard/logistics' },
    { name: 'Crop Advisory', desc: 'AI-based crop recommendations', icon: Leaf, color: isDark ? 'text-emerald-400' : 'text-emerald-600', bg: isDark ? 'bg-[rgba(16,185,129,0.15)]' : 'bg-emerald-50', href: '/dashboard/crop-recommendation' },
  ];

  const handleAISubmit = () => {
    if (aiQuery.trim()) {
      router.push(`/dashboard/assistant?q=${encodeURIComponent(aiQuery.trim())}`);
    } else {
      router.push('/dashboard/assistant');
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      
      {/* HERO BANNER SECTION */}
      <div className="relative rounded-3xl overflow-hidden bg-green-900 shadow-md">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/dashboard_banner_1779607415092.png" 
            alt="Farm background" 
            fill 
            className={`object-cover ${isDark ? 'opacity-60' : 'opacity-80'}`}
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-[#0f172a]/95 via-[#0f172a]/80' : 'from-white/95 via-white/80'} to-transparent`}></div>
        </div>
        
        <div className="relative z-10 p-6 md:p-8 flex flex-col lg:flex-row gap-8 justify-between">
          <div className="w-full lg:max-w-xl min-w-0">
            <h1 className={`text-3xl md:text-4xl font-extrabold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Good Morning, <br/>
              <span className={isDark ? 'text-green-400' : 'text-green-700'}>{userName} !</span> 👋
            </h1>
            <p className={`font-medium mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Let&apos;s make your farming better today.</p>

            {/* AI Input Box */}
            <div className={`${isDark ? 'bg-[#1e293b]/90 border-gray-700' : 'bg-white/90 border-white/50'} backdrop-blur-md rounded-2xl p-4 shadow-lg border`}>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center p-1 ${isDark ? 'bg-gray-800' : 'bg-green-100'}`}>
                   <Image src="/krishimitra_ai_1779607382000.png" alt="AI" width={24} height={24} className="object-contain" />
                </div>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Ask KrishiMitra AI</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${isDark ? 'bg-[rgba(34,197,94,0.2)] text-green-400' : 'bg-green-100 text-green-700'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Your Smart Assistant
                </span>
              </div>
              <div className="relative mb-3">
                <input 
                  type="text" 
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAISubmit()}
                  placeholder="Type your question..." 
                  className={`w-full border rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:border-green-500 transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:bg-gray-700' : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'}`}
                />
                <button onClick={handleAISubmit} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center text-white transition-colors">
                  {aiQuery.trim().length > 0 ? <Send size={14} className="ml-0.5" /> : <Mic size={16} />}
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {['🌿 Best crop for this season', '💧 Irrigation advice', '🌻 Fertilizer suggestion'].map((tag, i) => (
                  <button 
                    key={i} 
                    onClick={() => router.push(`/dashboard/assistant?q=${encodeURIComponent(tag)}`)}
                    className={`whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-[rgba(34,197,94,0.15)] hover:border-green-800 hover:text-green-400' : 'bg-white border-gray-200 text-gray-600 hover:bg-green-50 hover:border-green-200 hover:text-green-700'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Weather Card */}
          <div className="lg:w-72 w-full flex-shrink-0 bg-black/40 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-white shadow-xl self-center lg:self-start">
            <div className="text-sm font-medium text-white/80 mb-2">Today&apos;s Weather</div>
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="text-5xl font-bold leading-none mb-1">29°C</div>
                <div className="text-sm text-white/90">Partly Cloudy</div>
              </div>
              <CloudSun size={48} className="text-yellow-300 pb-2" />
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/20 pt-4 mb-4">
              <div>
                <div className="text-white/60 text-[10px] mb-0.5 flex items-center gap-1"><Droplet size={10}/> Humidity</div>
                <div className="font-semibold text-sm">61%</div>
              </div>
              <div>
                <div className="text-white/60 text-[10px] mb-0.5 flex items-center gap-1"><Wind size={10}/> Wind</div>
                <div className="font-semibold text-sm">12 km/h</div>
              </div>
              <div>
                <div className="text-white/60 text-[10px] mb-0.5 flex items-center gap-1"><Umbrella size={10}/> Rain</div>
                <div className="font-semibold text-sm">20%</div>
              </div>
            </div>
            <Link href="/dashboard/weather" className="w-full py-2 text-sm font-medium flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              View Full Forecast <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* EXPLORE FEATURES GRID */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Explore Features</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {exploreFeatures.map((f, i) => (
            <Link href={f.href} key={i} className={`p-4 rounded-2xl shadow-sm border transition-shadow group cursor-pointer flex flex-col items-center text-center ${isDark ? 'bg-[#1e293b] border-gray-800 hover:shadow-gray-900/50' : 'bg-white border-gray-100 hover:shadow-md'}`}>
              <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                <f.icon className={f.color} size={24} />
              </div>
              <div className={`font-bold text-sm leading-tight mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{f.name}</div>
              <div className={`text-[10px] leading-tight flex-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{f.desc}</div>
              <div className={`mt-3 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-gray-800 group-hover:bg-[rgba(34,197,94,0.2)]' : 'bg-gray-50 group-hover:bg-green-100'}`}>
                <ArrowRight size={12} className={`text-gray-400 ${isDark ? 'group-hover:text-green-400' : 'group-hover:text-green-600'}`} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* BOTTOM 3-COL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
        
        {/* Col 1: Mandi Prices */}
        <div className={`rounded-2xl shadow-sm border p-5 ${isDark ? 'bg-[#1e293b] border-gray-800' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Live Mandi Prices <span className={`text-xs font-normal ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>(Top Crops)</span></h3>
            <button onClick={() => router.push('/dashboard/mandi-prices')} className={`text-xs font-medium flex items-center hover:underline ${isDark ? 'text-green-400' : 'text-green-600'}`}>View All <ChevronRight size={14}/></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className={`text-xs border-b ${isDark ? 'text-gray-400 border-gray-800' : 'text-gray-500 border-gray-100'}`}>
                <tr>
                  <th className="pb-2 font-medium">Crop</th>
                  <th className="pb-2 font-medium text-right">Min Price</th>
                  <th className="pb-2 font-medium text-right">Max Price</th>
                  <th className="pb-2 font-medium text-right">Trend</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-gray-800' : 'divide-gray-50'}`}>
                {[
                  { crop: 'Wheat (गेहूं)', icon: '🌾', min: '₹2,050', max: '₹2,150', trend: '+3.2%', isUp: true },
                  { crop: 'Paddy (धान)', icon: '🌾', min: '₹1,850', max: '₹1,960', trend: '+2.1%', isUp: true },
                  { crop: 'Maize (మొక్కజొన్న)', icon: '🌽', min: '₹1,780', max: '₹1,920', trend: '-0.6%', isUp: false },
                  { crop: 'Mustard (सरसों)', icon: '🌼', min: '₹5,650', max: '₹5,950', trend: '+1.7%', isUp: true },
                ].map((row, i) => (
                  <tr key={i} onClick={() => router.push('/dashboard/mandi-prices')} className={`cursor-pointer transition-colors ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50/50'}`}>
                    <td className={`py-3 flex items-center gap-2 font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      <span className="text-lg">{row.icon}</span> {row.crop}
                    </td>
                    <td className={`py-3 text-right ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{row.min}</td>
                    <td className={`py-3 text-right font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{row.max}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded items-center gap-0.5 ${row.isUp ? (isDark ? 'text-green-400 bg-[rgba(34,197,94,0.15)]' : 'text-green-600 bg-green-50') : (isDark ? 'text-red-400 bg-[rgba(239,68,68,0.15)]' : 'text-red-600 bg-red-50')}`}>
                        {row.isUp ? <TrendingUp size={10}/> : <TrendingUp size={10} className="rotate-180" />}
                        {row.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Col 2: Disease Detections & Logistics */}
        <div className="flex flex-col gap-6">
          <div className={`rounded-2xl shadow-sm border p-5 ${isDark ? 'bg-[#1e293b] border-gray-800' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Recent Disease Detections</h3>
              <button onClick={() => router.push('/dashboard/disease-detection')} className={`text-xs font-medium flex items-center hover:underline ${isDark ? 'text-green-400' : 'text-green-600'}`}>View All <ChevronRight size={14}/></button>
            </div>
            <div className="space-y-3">
              <div onClick={() => router.push('/dashboard/disease-detection')} className={`flex gap-3 p-2 rounded-xl transition-colors border cursor-pointer ${isDark ? 'hover:bg-gray-800 border-transparent hover:border-gray-700' : 'hover:bg-gray-50 border-transparent hover:border-gray-100'}`}>
                <div className={`w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <Image src="/tomato_leaf_disease_1779607399731.png" alt="Disease" width={64} height={48} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-bold text-sm leading-tight ${isDark ? 'text-white' : 'text-gray-800'}`}>Tomato - Early Blight</h4>
                    <span className={`font-bold rounded-full text-[9px] py-0.5 px-2 ${isDark ? 'text-red-400 bg-[rgba(239,68,68,0.15)]' : 'text-red-700 bg-red-100'}`}>Severe</span>
                  </div>
                  <p className={`text-xs mt-1 flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <CheckCircle2 size={12} className={isDark ? 'text-green-400' : 'text-green-500'} /> 92% Confidence
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl shadow-sm border p-5 flex-1 ${isDark ? 'bg-[#1e293b] border-gray-800' : 'bg-white border-gray-100'}`}>
             <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Logistics Near You</h3>
              <button onClick={() => router.push('/dashboard/logistics')} className={`text-xs font-medium flex items-center hover:underline ${isDark ? 'text-green-400' : 'text-green-600'}`}>View All <ChevronRight size={14}/></button>
            </div>
            <div onClick={() => router.push('/dashboard/logistics')} className={`cursor-pointer hover:opacity-90 transition-opacity rounded-xl h-24 mb-3 flex items-center justify-center border relative overflow-hidden ${isDark ? 'bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.2)]' : 'bg-blue-50 border-blue-100'}`}>
               {/* Fake Map */}
               <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#4ade80 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
               <div className="relative z-10 flex items-center gap-1 w-full px-4">
                 <MapPin size={24} className={isDark ? 'text-green-400' : 'text-green-600'} />
                 <div className={`flex-1 h-0.5 border-t-2 border-dashed ${isDark ? 'bg-green-800 border-green-500' : 'bg-green-400 border-green-600'}`}></div>
                 <MapPin size={24} className="text-red-500" />
               </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div>
                <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Nearest Mandi</div>
                <div className={`font-bold flex items-center gap-1 ${isDark ? 'text-white' : 'text-gray-800'}`}><MapPin size={12} className={isDark ? 'text-green-400' : 'text-green-600'}/> 24 km</div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Est. Time</div>
                <div className={`font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>35 min</div>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-gray-800' : 'bg-green-100'}`}>
                <Truck size={20} className={isDark ? 'text-green-400' : 'text-green-700'} />
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Important Alerts & AI Crop Rec */}
        <div className="flex flex-col gap-6">
          <div className={`rounded-2xl shadow-sm border p-5 ${isDark ? 'bg-[#1e293b] border-gray-800' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Important Alerts</h3>
              <button onClick={() => router.push('/dashboard/weather')} className={`text-xs font-medium flex items-center hover:underline ${isDark ? 'text-green-400' : 'text-green-600'}`}>View All <ChevronRight size={14}/></button>
            </div>
            <div className="space-y-4">
              <div onClick={() => router.push('/dashboard/weather')} className="flex gap-3 items-start cursor-pointer hover:opacity-85 transition-opacity">
                <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-[rgba(59,130,246,0.15)]' : 'bg-blue-50'}`}>
                  <CloudSun size={16} className={isDark ? 'text-blue-400' : 'text-blue-500'} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium leading-snug ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Heavy rainfall expected in Western UP in next 2 days</p>
                  <p className={`text-[10px] mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>2h ago</p>
                </div>
              </div>
              <div onClick={() => router.push('/dashboard/weather')} className="flex gap-3 items-start cursor-pointer hover:opacity-85 transition-opacity">
                <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-[rgba(249,115,22,0.15)]' : 'bg-orange-50'}`}>
                  <TrendingUp size={16} className={isDark ? 'text-orange-400' : 'text-orange-500'} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium leading-snug ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Wheat prices increased by 3.2% in your district</p>
                  <p className={`text-[10px] mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>5h ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl shadow-sm border p-5 flex-1 flex flex-col justify-between ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100'}`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-bold ${isDark ? 'text-green-400' : 'text-green-900'}`}>AI Crop Recommendation</h3>
                <span className={`font-bold rounded-full text-[9px] py-0.5 px-2 ${isDark ? 'text-green-300 bg-[rgba(34,197,94,0.2)]' : 'text-green-700 bg-green-200/50'}`}>For Your Land</span>
              </div>
              <p className={`text-xs mb-4 font-medium ${isDark ? 'text-gray-300' : 'text-green-800/80'}`}>Based on your soil, weather & season, these crops are best for you:</p>
              
              <div className="grid grid-cols-3 gap-2">
                <div onClick={() => router.push('/dashboard/crop-recommendation')} className={`cursor-pointer hover:scale-[1.03] transition-all rounded-xl p-2 text-center shadow-sm border ${isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-green-100'}`}>
                  <div className="text-2xl mb-1">🌾</div>
                  <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Wheat</div>
                  <div className={`text-[9px] font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>High Yield</div>
                </div>
                <div onClick={() => router.push('/dashboard/crop-recommendation')} className={`cursor-pointer hover:scale-[1.03] transition-all rounded-xl p-2 text-center shadow-sm border ${isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-green-100'}`}>
                  <div className="text-2xl mb-1">🌼</div>
                  <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Mustard</div>
                  <div className={`text-[9px] font-medium ${isDark ? 'text-orange-400' : 'text-orange-500'}`}>Profitable</div>
                </div>
                <div onClick={() => router.push('/dashboard/crop-recommendation')} className={`cursor-pointer hover:scale-[1.03] transition-all rounded-xl p-2 text-center shadow-sm border opacity-70 ${isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-green-100'}`}>
                  <div className="text-2xl mb-1">🌿</div>
                  <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Moong</div>
                  <div className={`text-[9px] font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Low Risk</div>
                </div>
              </div>
            </div>
            
            <button onClick={() => router.push('/dashboard/crop-recommendation')} className="w-full mt-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl transition-colors shadow-md shadow-green-600/20">
              Get Full Recommendation →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
