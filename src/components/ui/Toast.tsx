'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';

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

const typeStyles = {
  success: { icon: '✅', cls: 'badge-green border' },
  error: { icon: '❌', cls: 'badge-red border' },
  warning: { icon: '⚠️', cls: 'badge-yellow border' },
  info: { icon: 'ℹ️', cls: 'badge-blue border' },
};

interface ToastProps {
  toast: ToastItem;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ toast, onClose, duration = 4000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const { icon, cls } = typeStyles[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`flex items-center gap-3 px-5 py-3 rounded-xl glass-card ${cls} shadow-lg`}
      style={{ maxWidth: '380px', minWidth: '200px' }}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium flex-1">{toast.message}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity ml-2">✕</button>
    </motion.div>
  );
};

export const useToast = () => {
  const { addToast } = useToastStore();
  return {
    success: (msg: string) => addToast(msg, 'success'),
    error: (msg: string) => addToast(msg, 'error'),
    warning: (msg: string) => addToast(msg, 'warning'),
    info: (msg: string) => addToast(msg, 'info'),
  };
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 flex flex-col items-end pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-3">
        <AnimatePresence>
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
