'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastItem['type']) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = Date.now().toString();
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

const typeConfig = {
  success: {
    icon: CheckCircle2,
    bg:     'rgba(13,33,25,0.92)',
    border: 'rgba(63,163,77,0.45)',
    iconColor: '#7DFF8A',
    glow:   '0 0 20px rgba(63,163,77,0.25)',
    barColor: '#3FA34D',
  },
  error: {
    icon: XCircle,
    bg:     'rgba(25,13,13,0.92)',
    border: 'rgba(239,68,68,0.40)',
    iconColor: '#f87171',
    glow:   '0 0 20px rgba(239,68,68,0.22)',
    barColor: '#ef4444',
  },
  warning: {
    icon: AlertTriangle,
    bg:     'rgba(25,20,8,0.92)',
    border: 'rgba(212,160,23,0.40)',
    iconColor: '#f0c040',
    glow:   '0 0 20px rgba(212,160,23,0.22)',
    barColor: '#D4A017',
  },
  info: {
    icon: Info,
    bg:     'rgba(11,22,35,0.92)',
    border: 'rgba(77,168,218,0.40)',
    iconColor: '#7ec8e8',
    glow:   '0 0 20px rgba(77,168,218,0.22)',
    barColor: '#4DA8DA',
  },
};

interface ToastProps {
  toast: ToastItem;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ toast, onClose, duration = 4000 }: ToastProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    const interval = setInterval(() => {
      setProgress((p) => Math.max(0, p - (100 / (duration / 100))));
    }, 100);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [duration, onClose]);

  const cfg = typeConfig[toast.type];
  const Icon = cfg.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        boxShadow: `${cfg.glow}, 0 8px 32px rgba(0,0,0,0.45)`,
        maxWidth: '380px',
        minWidth: '260px',
      }}
      className="relative rounded-xl backdrop-blur-xl overflow-hidden"
    >
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-0.5 transition-all duration-100"
        style={{ width: `${progress}%`, background: cfg.barColor }}
      />

      <div className="flex items-start gap-3 px-4 py-3.5">
        <Icon
          size={18}
          className="flex-shrink-0 mt-0.5"
          style={{ color: cfg.iconColor }}
        />
        <span
          className="text-sm font-medium flex-1 leading-snug"
          style={{ color: '#F5F7F2' }}
        >
          {toast.message}
        </span>
        <button
          onClick={onClose}
          className="flex-shrink-0 mt-0.5 opacity-50 hover:opacity-100 transition-opacity"
          style={{ color: '#A8B5A2' }}
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export const useToast = () => {
  const { addToast } = useToastStore();
  return {
    success: (msg: string) => addToast(msg, 'success'),
    error:   (msg: string) => addToast(msg, 'error'),
    warning: (msg: string) => addToast(msg, 'warning'),
    info:    (msg: string) => addToast(msg, 'info'),
  };
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              toast={toast}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
