'use client';
import { useState, useRef, useEffect } from 'react';
import { useAssistant } from '@/hooks/useAssistant';
import { LANGUAGES } from '@/lib/constants';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { PulseDots } from '@/components/ui/Skeleton';
import { useLanguageStore } from '@/store/languageStore';

export default function AssistantPage() {
  const { messages, loading, error, sendMessage, clearChat } = useAssistant();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { locale: language, setLanguage, t } = useLanguageStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized.current) {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      if (q && messages.length === 0 && !loading) {
        initialized.current = true;
        sendMessage(q, language);
        window.history.replaceState({}, '', '/dashboard/assistant');
      }
    }
  }, [messages.length, loading, language, sendMessage]);

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

  const handleListen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(t('assistant.voiceNotSupported', 'Your browser does not support voice input.'));
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + (prev ? ' ' : '') + transcript);
    };
    
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const handleSpeak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const QUICK_QUESTIONS = [
    { key: 'q1', hi: 'गेहूं की बुवाई का सही समय क्या है?', en: 'Best time to sow wheat?' },
    { key: 'q2', hi: 'पीले पत्ते का क्या कारण है?', en: 'What causes yellow leaves?' },
    { key: 'q3', hi: 'PM-KISAN योजना के बारे में बताएं', en: 'Tell me about PM-KISAN scheme' },
    { key: 'q4', hi: 'जैविक खाद कैसे बनाएं?', en: 'How to make organic fertilizer?' },
  ];

  return (
    <div className="page-wrapper flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">🤖 {t('assistant.title', 'KrishiMitra AI')}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>{t('assistant.subtitle', 'Your multilingual farming assistant')}</p>
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
          <button onClick={clearChat} className="btn-secondary text-sm py-2 px-3">🗑️ {t('assistant.clear', 'Clear')}</button>
        </div>
      </div>

      {/* Chat Window */}
      <div className="glass-card flex-1 flex flex-col min-h-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4 float">🤖</div>
              <h3 className="text-xl font-bold mb-2">{t('assistant.greeting', 'Hello! I am KrishiMitra. Ask me anything about farming in your language!')}</h3>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                {t('assistant.placeholder', 'Type your farming question here...')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
                {QUICK_QUESTIONS.map((q) => {
                  const qText = language === 'hi' ? q.hi : q.en;
                  const qSubText = language === 'hi' ? q.en : q.hi;
                  return (
                    <button
                      key={q.key}
                      onClick={() => sendMessage(qText, language)}
                      className="glass-card p-3 text-left text-sm hover:border-green-500/30 transition-colors"
                    >
                      <div>{qText}</div>
                      <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{qSubText}</div>
                    </button>
                  );
                })}
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
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs opacity-60">
                    {new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {msg.role === 'assistant' && (
                    <button 
                      onClick={() => handleSpeak(msg.content)} 
                      className="opacity-60 hover:opacity-100 transition-opacity"
                      title="Listen"
                    >
                      <Volume2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ background: 'var(--color-primary)' }}>🤖</div>
              <div className="p-3 rounded-2xl rounded-bl-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)' }}>
                <PulseDots />
              </div>
            </div>
          )}

          {error && <div className="badge badge-red p-3 rounded-xl text-sm">⚠️ {error}</div>}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--bg-border)' }}>
          <div className="flex gap-3 items-end">
            <div className="relative flex-1">
              <textarea
                id="assistant-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={isListening ? t('assistant.listening', 'Listening... Speak now...') : t('assistant.placeholder', 'Type your farming question here...')}
                rows={1}
                className="input-field w-full resize-none pr-12"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
              <button
                onClick={handleListen}
                className={`absolute right-3 bottom-3 p-1.5 rounded-full transition-colors ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-gray-400 hover:text-green-400'}`}
                title="Voice Input"
              >
                {isListening ? <Mic size={18} /> : <MicOff size={18} />}
              </button>
            </div>
            <button
              id="assistant-send"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="btn-primary px-5 flex-shrink-0"
            >
              {loading ? '⏳' : `📤 ${t('assistant.send', 'Send')}`}
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
