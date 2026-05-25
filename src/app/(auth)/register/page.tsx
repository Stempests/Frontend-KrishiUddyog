'use client';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, RegisterFormData } from '@/lib/validators';
import { INDIAN_STATES } from '@/types/crop.types';
import { LANGUAGES } from '@/lib/constants';

export default function RegisterPage() {
  const { register: registerUser, loading, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema) as any,
    defaultValues: { role: 'farmer', language: 'hi' },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    await registerUser(registerData);
  };

  return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-bold mb-2">Join AgriConnect India 🌱</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        Create your free farmer account in seconds
      </p>

      {error && (
        <div className="badge badge-red w-full mb-4 p-3 rounded-xl text-sm">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            👤 Full Name
          </label>
          <input id="reg-name" {...register('name')} type="text" placeholder="Your name" className="input-field" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            📱 Mobile Number
          </label>
          <input id="reg-phone" {...register('phone')} type="tel" placeholder="10-digit number" className="input-field" maxLength={10} />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              👥 I am a
            </label>
            <select id="reg-role" {...register('role')} className="input-field">
              <option value="farmer">🌾 Farmer</option>
              <option value="buyer">🛒 Buyer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              🗣️ Language
            </label>
            <select id="reg-language" {...register('language')} className="input-field">
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            🗺️ State
          </label>
          <select id="reg-state" {...register('state')} className="input-field">
            <option value="">Select state</option>
            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            🔒 Password
          </label>
          <input id="reg-password" {...register('password')} type="password" placeholder="Min 6 characters" className="input-field" />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            🔒 Confirm Password
          </label>
          <input id="reg-confirm-password" {...register('confirmPassword')} type="password" placeholder="Re-enter password" className="input-field" />
          {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <button id="reg-submit" type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? '⏳ Creating Account...' : '🚀 Create Free Account'}
        </button>
      </form>

      <div className="divider" />

      <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        Already have an account?{' '}
        <Link href="/login" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Login</Link>
      </p>
    </div>
  );
}
