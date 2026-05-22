'use client';
import { motion } from 'framer-motion';
import { Message } from '@/hooks/useAssistant';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
    >
      {!isUser && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
          style={{ background: 'var(--color-primary)' }}
        >
          🤖
        </div>
      )}

      <div
        className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed ${
          isUser ? 'rounded-2xl rounded-br-sm' : 'rounded-2xl rounded-bl-sm'
        }`}
        style={{
          background: isUser ? 'var(--color-primary)' : 'var(--bg-card)',
          border: isUser ? 'none' : '1px solid var(--bg-border)',
          color: isUser ? '#fff' : 'var(--text-primary)',
        }}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <p className="text-xs mt-1 opacity-60">
          {new Date(message.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {isUser && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: 'rgba(34,197,94,0.2)', color: 'var(--color-primary)' }}
        >
          👤
        </div>
      )}
    </motion.div>
  );
};

export const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start items-end gap-2"
  >
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
      style={{ background: 'var(--color-primary)' }}
    >
      🤖
    </div>
    <div
      className="px-4 py-3 rounded-2xl rounded-bl-sm"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)' }}
    >
      <div className="flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: 'var(--color-primary)',
              animation: `pulse 1.4s ${i * 0.2}s ease-in-out infinite`,
            }}
          />
        ))}
        <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>KrishiMitra is thinking…</span>
      </div>
    </div>
  </motion.div>
);
