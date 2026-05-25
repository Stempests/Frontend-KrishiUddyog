'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@/components/ui/Toast';
import api from '@/lib/api';
import { ImagePlus, Package, DollarSign, Sprout, Tag, X, Loader2 } from 'lucide-react';

export default function CreateListingPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    cropName: '',
    variety: 'Common',
    quantity: '',
    unit: 'quintal',
    pricePerUnit: '',
    quality: 'B',
    description: '',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray].slice(0, 4)); // Max 4 images
      
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, 4));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cropName || !formData.quantity || !formData.pricePerUnit) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const data = new FormData();
      data.append('cropName', formData.cropName);
      data.append('variety', formData.variety);
      data.append('quantity', formData.quantity);
      data.append('unit', formData.unit);
      data.append('pricePerUnit', formData.pricePerUnit);
      data.append('quality', formData.quality);
      data.append('description', formData.description);

      // Add user location to the form data
      if (user?.location?.state && user?.location?.district) {
        data.append('location[state]', user.location.state);
        data.append('location[district]', user.location.district);
      } else {
        // Fallback if user doesn't have location set
        data.append('location[state]', 'Maharashtra');
        data.append('location[district]', 'Pune');
      }

      images.forEach((image) => {
        data.append('images', image);
      });

      await api.post('/marketplace/listings', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Listing created successfully!');
      router.push('/dashboard/marketplace');
    } catch (error: unknown) {
      console.error('Failed to create listing:', error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any).response?.data?.message || 'Failed to create listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-white/5 transition-colors"
        >
          ←
        </button>
        <div>
          <h1 className="text-3xl font-bold">🌾 Sell Your Crop</h1>
          <p style={{ color: 'var(--text-secondary)' }}>List your produce directly on the marketplace to find buyers.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Details */}
          <div className="glass-card p-6 space-y-5">
            <h2 className="text-xl font-bold border-b border-[rgba(255,255,255,0.1)] pb-3 mb-4">Crop Details</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-gray-300">
                <Sprout size={16} className="text-[#3FA34D]" /> Crop Name *
              </label>
              <select 
                className="input-field w-full"
                value={formData.cropName}
                onChange={(e) => setFormData({...formData, cropName: e.target.value})}
                required
              >
                <option value="">Select Crop</option>
                {['Wheat', 'Rice', 'Cotton', 'Soybean', 'Onion', 'Potato', 'Tomato', 'Maize', 'Mustard', 'Gram'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-gray-300">
                <Tag size={16} className="text-[#3FA34D]" /> Variety
              </label>
              <input 
                type="text" 
                placeholder="e.g. Sharbati, Basmati" 
                className="input-field w-full"
                value={formData.variety}
                onChange={(e) => setFormData({...formData, variety: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-gray-300">
                  <Package size={16} className="text-[#3FA34D]" /> Quantity *
                </label>
                <input 
                  type="number" 
                  min="1"
                  placeholder="0" 
                  className="input-field w-full"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Unit</label>
                <select 
                  className="input-field w-full"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                >
                  <option value="quintal">Quintal</option>
                  <option value="ton">Ton</option>
                  <option value="kg">KG</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-gray-300">
                  <DollarSign size={16} className="text-[#3FA34D]" /> Price per Unit *
                </label>
                <input 
                  type="number" 
                  min="1"
                  placeholder="₹" 
                  className="input-field w-full"
                  value={formData.pricePerUnit}
                  onChange={(e) => setFormData({...formData, pricePerUnit: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Quality</label>
                <select 
                  className="input-field w-full"
                  value={formData.quality}
                  onChange={(e) => setFormData({...formData, quality: e.target.value})}
                >
                  <option value="A">Grade A (Premium)</option>
                  <option value="B">Grade B (Standard)</option>
                  <option value="C">Grade C (Fair)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column - Images & Extras */}
          <div className="space-y-6">
            <div className="glass-card p-6 space-y-4">
              <h2 className="text-xl font-bold border-b border-[rgba(255,255,255,0.1)] pb-3 mb-4">Photos (Optional)</h2>
              
              <div className="grid grid-cols-2 gap-3">
                {imagePreviews.map((preview, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-[rgba(63,163,77,0.3)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Crop preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {imagePreviews.length < 4 && (
                  <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-[rgba(63,163,77,0.3)] rounded-xl cursor-pointer hover:bg-[rgba(63,163,77,0.05)] transition-colors">
                    <ImagePlus size={24} className="text-[#3FA34D] mb-2" />
                    <span className="text-xs text-gray-400">Add Photo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500">Upload up to 4 images to attract more buyers.</p>
            </div>

            <div className="glass-card p-6 space-y-4">
              <h2 className="text-xl font-bold border-b border-[rgba(255,255,255,0.1)] pb-3 mb-4">Additional Details</h2>
              <textarea 
                placeholder="Describe your crop, farming methods, or any specific requirements for buyers..." 
                className="input-field w-full h-24 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-primary px-8 py-3 flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Sprout size={20} />}
            {isSubmitting ? 'Publishing...' : 'Publish Listing'}
          </button>
        </div>
      </form>
    </div>
  );
}
