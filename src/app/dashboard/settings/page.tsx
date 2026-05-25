'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { LANGUAGES } from '@/lib/constants';
import { useLanguageStore } from '@/store/languageStore';
import { useUIStore } from '@/store/uiStore';
import { Save, User, Bell, Shield, Globe, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { useToast } from '@/components/ui/Toast';

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore();
  const { t, locale, setLanguage } = useLanguageStore();
  const { theme, toggleTheme } = useUIStore();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('profile');
  const toast = useToast();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line
      setName(user.name || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleProfileSave = async () => {
    if (!name.trim() || !phone.trim()) {
      toast.error('Name and phone are required');
      return;
    }
    
    try {
      setLoading(true);
      let payload;
      let headers = {};

      if (avatarFile) {
        payload = new FormData();
        payload.append('name', name);
        payload.append('phone', phone);
        payload.append('image', avatarFile);
        headers = { 'Content-Type': 'multipart/form-data' };
      } else {
        payload = { name, phone };
      }
      
      const res = await api.put('/auth/profile', payload, { headers });
      
      // Update global Zustand store with new user data
      if (res.data?.data) {
        updateUser(res.data.data);
      }
      
      toast.success(t('settings.saveSuccess', 'Profile updated successfully'));
      setIsEditing(false);
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: t('settings.profileInfo', 'Profile Information'), icon: User },
    { id: 'notifications', label: t('settings.notifications', 'Notifications'), icon: Bell },
    { id: 'privacy', label: t('settings.privacy', 'Privacy & Security'), icon: Shield },
    { id: 'preferences', label: t('settings.appPreferences', 'Preferences'), icon: Globe },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>⚙️ {t('settings.title', 'Settings')}</h1>
        <p style={{ color: isDark ? 'var(--text-secondary)' : '#475569' }}>
          {t('settings.subtitle', 'Manage your account, preferences, and security.')}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className={`w-full md:w-64 p-4 h-fit ${isDark ? "glass-card" : "bg-white rounded-xl shadow-sm border border-gray-200"}`}>
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                    isActive 
                      ? 'bg-green-500/10 text-green-800 border border-green-500/20 font-bold' 
                      : (isDark ? 'text-gray-400 hover:bg-[rgba(63,163,77,0.1)] hover:text-white border border-transparent' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent')
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className={`flex-1 p-6 min-h-[400px] ${isDark ? "glass-card" : "bg-white rounded-xl shadow-sm border border-gray-200"}`}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold border-b pb-4 ${isDark ? "border-[rgba(63,163,77,0.3)] text-white" : "border-gray-200 text-gray-900"}`}>{t('settings.profileInfo', 'Profile Information')}</h2>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-20 h-20 rounded-full border-2 border-green-500 overflow-hidden bg-gray-100 flex-shrink-0 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      src={avatarPreview || (user as any)?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name)} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                    {isEditing && (
                      <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold">Edit</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setAvatarFile(e.target.files[0]);
                              setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Profile Picture</h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Click edit to upload a new avatar</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{t('settings.fullName', 'Full Name')}</label>
                    <input 
                      type="text" 
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${isDark ? "input-field" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"} ${!isEditing ? 'opacity-70 cursor-default' : ''}`}
                      disabled={!isEditing}
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{t('settings.phoneNumber', 'Phone Number')}</label>
                    <input 
                      type="tel" 
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${isDark ? "input-field" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"} ${!isEditing ? 'opacity-70 cursor-default' : ''}`}
                      disabled={!isEditing}
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{t('settings.role', 'Role')}</label>
                    <input type="text" className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all opacity-50 cursor-not-allowed ${isDark ? "input-field" : "bg-gray-50 border-gray-200 text-gray-900"}`} disabled value={user?.role || 'Farmer'} />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{t('settings.location', 'Location')}</label>
                    <input 
                      type="text" 
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all opacity-50 cursor-not-allowed ${isDark ? "input-field" : "bg-gray-50 border-gray-200 text-gray-900"}`} 
                      disabled 
                      value={user?.location ? `${user.location.district || ''}, ${user.location.state || ''}`.replace(/^, |^,$/, '') : 'Pune, Maharashtra'} 
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  {isEditing ? (
                    <>
                      <button 
                        className="btn-primary flex items-center gap-2"
                        onClick={handleProfileSave}
                        disabled={loading}
                      >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {t('settings.saveChanges', 'Save Changes')}
                      </button>
                      <button 
                        className="px-4 py-2 rounded-lg font-bold text-gray-400 hover:text-white transition-colors"
                        onClick={() => {
                          setIsEditing(false);
                          setName(user?.name || '');
                          setPhone(user?.phone || '');
                        }}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      className="px-5 py-2.5 rounded-lg font-bold border transition-colors"
                      style={{ borderColor: 'rgba(63,163,77,0.3)', color: '#7DFF8A', background: 'rgba(63,163,77,0.1)' }}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold border-b pb-4 ${isDark ? "border-[rgba(63,163,77,0.3)] text-white" : "border-gray-200 text-gray-900"}`}>{t('settings.appPreferences', 'App Preferences')}</h2>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{t('settings.displayLanguage', 'Display Language')}</label>
                    <select 
                      value={locale}
                      onChange={(e) => setLanguage(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all ${isDark ? "input-field" : "bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"}`}
                    >
                      {LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code}>{l.flag} {l.englishName} ({l.name})</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">{t('settings.displayLanguageDesc', 'This will change the interface language of the dashboard.')}</p>
                  </div>
                  
                  <div className={`flex items-center justify-between p-4 rounded-xl border mt-6 ${isDark ? "bg-[rgba(19,42,36,0.8)] border-[rgba(63,163,77,0.3)]" : "bg-gray-50 border-gray-200"}`}>
                    <div>
                      <p className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>{t('settings.darkTheme', 'Dark Mode')}</p>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{t('settings.darkThemeDesc', 'Enable dark theme across the app')}</p>
                    </div>
                    <div 
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${theme === 'dark' ? 'bg-green-600' : 'bg-gray-300'}`}
                      onClick={toggleTheme}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${theme === 'dark' ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold border-b pb-4 ${isDark ? "border-[rgba(63,163,77,0.3)] text-white" : "border-gray-200 text-gray-900"}`}>{t('settings.notifications', 'Notifications')}</h2>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{t('settings.noNotifications', 'You have no new notifications.')}</p>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className={`text-xl font-bold border-b pb-4 ${isDark ? "border-[rgba(63,163,77,0.3)] text-white" : "border-gray-200 text-gray-900"}`}>{t('settings.privacy', 'Privacy & Security')}</h2>
                <button className="btn-secondary text-red-600 hover:bg-red-50 border-red-200">
                  {t('settings.changePassword', 'Change Password')}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
