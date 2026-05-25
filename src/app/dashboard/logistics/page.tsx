'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/languageStore';
import { Truck, MapPin, Calendar, Package, Search, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import api from '@/lib/api';

export default function LogisticsPage() {
  const toast = useToast();
  
  const [activeTab, setActiveTab] = useState<'find' | 'share'>('find');
  
  // Form State for Request Transport
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [routes, setRoutes] = useState<any[]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRoutes = async (query = '') => {
    try {
      setIsLoadingRoutes(true);
      const res = await api.get(`/logistics?search=${query}`);
      if (res.data?.data) {
        setRoutes(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch routes:', error);
      toast.error('Failed to load transport routes');
    } finally {
      setIsLoadingRoutes(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'find') {
      // eslint-disable-next-line
      fetchRoutes(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleSearch = () => {
    fetchRoutes(searchQuery);
  };

  const handleRequestTransport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !dropoff || !date || !weight) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await api.post('/logistics', {
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        date,
        weight
      });
      toast.success('Transport request submitted successfully!');
      setPickup('');
      setDropoff('');
      setDate('');
      setWeight('');
      setActiveTab('find'); // Switch back to see the new route
    } catch (error: unknown) {
      console.error('Failed to submit route:', error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any).response?.data?.message || 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 rounded-xl" style={{ background: 'rgba(212,160,23,0.15)', color: '#f0c040' }}>
          <Truck size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Logistics & Load Sharing</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Find transport or share load space with other farmers to reduce costs.
          </p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-[rgba(63,163,77,0.2)] pb-4">
        <button 
          onClick={() => setActiveTab('find')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'find' 
            ? 'bg-[rgba(212,160,23,0.15)] text-[#f0c040] border border-[rgba(212,160,23,0.3)]' 
            : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Find Transport
        </button>
        <button 
          onClick={() => setActiveTab('share')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'share' 
            ? 'bg-[rgba(63,163,77,0.15)] text-[#7DFF8A] border border-[rgba(63,163,77,0.3)]' 
            : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Post a Load Request
        </button>
      </div>

      {activeTab === 'find' ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by route (e.g. Pune to Mumbai)" 
                className="input-field w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="btn-primary" 
              style={{ background: 'linear-gradient(135deg, #D4A017 0%, #b88a10 100%)', borderColor: 'rgba(212,160,23,0.5)' }}
            >
              Search Trucks
            </button>
          </div>

          {isLoadingRoutes ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-[#f0c040]" size={40} />
            </div>
          ) : routes.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Truck size={48} className="mx-auto mb-4 opacity-20" />
              <p>No transport routes found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map((route) => (
                <div key={route._id} className="glass-card p-5 space-y-4 hover:-translate-y-1 transition-transform cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 text-[#F5F7F2] font-bold">
                      <MapPin size={18} className="text-[#f0c040]" />
                      {route.route}
                    </div>
                    <div className="px-2 py-1 rounded text-xs font-bold" style={{ background: 'rgba(63,163,77,0.15)', color: '#7DFF8A' }}>
                      {route.rating} ★
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" /> {new Date(route.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-gray-400" /> {route.weight} available
                    </div>
                    <div className="flex items-center gap-2">
                      <UserIcon size={16} className="text-gray-400" /> {route.driverName || 'Unassigned'}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[rgba(255,255,255,0.05)] flex justify-between items-center">
                    <div className="text-lg font-black text-[#f0c040]">{route.price || 'Negotiable'}</div>
                    <button className="px-4 py-2 rounded-lg text-sm font-bold bg-[rgba(212,160,23,0.15)] text-[#f0c040] hover:bg-[rgba(212,160,23,0.25)] transition-colors">
                      Book Space
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 max-w-2xl">
          <h2 className="text-xl font-bold mb-6 text-[#F5F7F2]">Request Transport</h2>
          <form onSubmit={handleRequestTransport} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Pickup Location</label>
                <input type="text" className="input-field w-full" placeholder="Farm/Mandi name, City" value={pickup} onChange={e => setPickup(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Drop-off Location</label>
                <input type="text" className="input-field w-full" placeholder="Mandi/Buyer name, City" value={dropoff} onChange={e => setDropoff(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Date required</label>
                <input type="date" className="input-field w-full text-white" style={{ colorScheme: 'dark' }} value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Total Weight (Tons/Kg)</label>
                <input type="text" className="input-field w-full" placeholder="e.g. 2.5 Tons" value={weight} onChange={e => setWeight(e.target.value)} />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-4 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>Loading...</>
              ) : (
                <><Truck size={18} /> Post Request</>
              )}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UserIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
