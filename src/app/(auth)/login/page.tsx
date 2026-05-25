'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, LoginFormData } from '@/lib/validators';

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <div className="glass-card p-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back! 👋</h2>
      <p className="text-sm mb-6 text-center w-full" style={{ color: 'var(--text-secondary)' }}>
        Login to your AgriConnect account
      </p>

      {error && (
        <div className="badge badge-red w-full mb-4 p-3 rounded-xl text-sm">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            📱 Mobile Number
          </label>
          <input
            id="login-phone"
            {...register('phone')}
            type="tel"
            placeholder="Enter 10-digit mobile number"
            className="input-field"
            maxLength={10}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            🔒 Password
          </label>
          <input
            id="login-password"
            {...register('password')}
            type="password"
            placeholder="Enter your password"
            className="input-field"
          />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button
          id="login-submit"
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? '⏳ Logging in...' : '🌾 Login to Dashboard'}
        </button>
      </form>

      <div className="divider" />

      <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        New farmer?{' '}
        <Link href="/register" className="font-semibold" style={{ color: 'var(--color-primary)' }}>
          Register Free
        </Link>
      </p>

      {/* Demo credentials */}
      <div className="mt-4 p-3 rounded-xl" style={{ background: 'var(--bg-muted)', border: '1px solid var(--bg-border)' }}>
        <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>🧪 Demo Credentials</p>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Phone: 9876543210</p>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Password: password123</p>
      </div>
    </div>
  );
}
