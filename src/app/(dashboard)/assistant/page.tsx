'use client';
import { useState, useRef, useEffect } from 'react';
import { useAssistant } from '@/hooks/useAssistant';
import { LANGUAGES } from '@/lib/constants';

export default function AssistantPage() {
  const { messages, loading, error, sendMessage, clearChat } = useAssistant();
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('hi');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput('');
    await sendMessage(msg, language);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const QUICK_QUESTIONS = [
    { hi: 'गेहूं की बुवाई का सही समय क्या है?', en: 'Best time to sow wheat?' },
    { hi: 'पीले पत्ते का क्या कारण है?', en: 'What causes yellow leaves?' },
    { hi: 'PM-KISAN योजना के बारे में बताएं', en: 'Tell me about PM-KISAN scheme' },
    { hi: 'जैविक खाद कैसे बनाएं?', en: 'How to make organic fertilizer?' },
  ];

  return (
    <div className="page-wrapper flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">🤖 KrishiMitra AI</h1>
          <p style={{ color: 'var(--text-secondary)' }}>कृषि मित्र — Your multilingual farming assistant</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            id="assistant-language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input-field text-sm"
            style={{ width: 'auto' }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
            ))}
          </select>
          <button onClick={clearChat} className="btn-secondary text-sm py-2 px-3">🗑️ Clear</button>
        </div>
      </div>

      {/* Chat Window */}
      <div className="glass-card flex-1 flex flex-col min-h-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4 float">🤖</div>
              <h3 className="text-xl font-bold mb-2">नमस्ते! मैं कृषि मित्र हूँ 🙏</h3>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                Ask me anything about farming in your language
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q.hi}
                    onClick={() => { setInput(q.hi); }}
                    className="glass-card p-3 text-left text-sm hover:border-green-500/30 transition-colors"
                  >
                    <div>{q.hi}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{q.en}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm mr-2 flex-shrink-0"
                  style={{ background: 'var(--color-primary)' }}>
                  🤖
                </div>
              )}
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-br-sm'
                    : 'rounded-bl-sm'
                }`}
                style={{
                  background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--bg-card)',
                  border: msg.role === 'assistant' ? '1px solid var(--bg-border)' : 'none',
                  color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                }}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs mt-1 opacity-60">
                  {new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ background: 'var(--color-primary)' }}>🤖</div>
              <div className="p-3 rounded-2xl rounded-bl-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)' }}>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 rounded-full" style={{
                      background: 'var(--color-primary)',
                      animation: `pulse 1.4s ${i * 0.2}s ease-in-out infinite`,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {error && <div className="badge badge-red p-3 rounded-xl text-sm">⚠️ {error}</div>}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--bg-border)' }}>
          <div className="flex gap-3">
            <textarea
              id="assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={language === 'hi' ? 'यहाँ अपना सवाल लिखें...' : 'Type your farming question here...'}
              rows={1}
              className="input-field flex-1 resize-none"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button
              id="assistant-send"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="btn-primary px-5 flex-shrink-0"
            >
              {loading ? '⏳' : '📤 Send'}
            </button>
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            Press Enter to send • Shift+Enter for new line • Powered by Google Gemini
          </p>
        </div>
      </div>
    </div>
  );
}
