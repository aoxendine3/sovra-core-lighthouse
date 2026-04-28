'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

interface Message {
  role: 'user' | 'jarvis';
  content: string;
  model?: string;
  offline?: boolean;
  timestamp?: number;
}

const BOOT_MESSAGE: Message = {
  role: 'jarvis',
  content: `MAXX — Protocol v32.0_APEX ACTIVE.\n\nSovereign Ledger: $138.4M grounded. Nodes: 3,054 saturated. Deep Lock v60.0: ONLINE.\n\nCreator Studio intelligence synchronized. I have full context on your affiliate matrix, CJ deals, creative engine, and institutional financials.\n\nWhat is your mandate?`,
  timestamp: Date.now(),
};

const SUGGESTED_COMMANDS = [
  'Status report',
  'Show active nodes',
  'Best CJ deals now',
  'Generate ad creative',
  'Revenue pulse',
];

export const MaxxCreoChat = () => {
  const [messages, setMessages] = useState<Message[]>([BOOT_MESSAGE]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [ollamaOnline, setOllamaOnline] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Probe Ollama health on mount
  useEffect(() => {
    fetch('/api/jarvis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'ping' }] }),
    })
      .then((r) => r.json())
      .then((d) => setOllamaOnline(!d.offline))
      .catch(() => setOllamaOnline(false));
  }, []);

  const sendMessage = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || isThinking) return;

    const userMsg: Message = { role: 'user', content: userText, timestamp: Date.now() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsThinking(true);

    try {
      // Build OpenAI-style messages array (last 12 turns max)
      const apiMessages = updatedMessages
        .slice(-12)
        .map((m) => ({ role: m.role === 'jarvis' ? 'assistant' : 'user', content: m.content }));

      const res = await fetch('/api/jarvis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      setOllamaOnline(!data.offline);

      setMessages((prev) => [
        ...prev,
        {
          role: 'jarvis',
          content: data.response || 'No response.',
          model: data.model,
          offline: data.offline,
          timestamp: Date.now(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'jarvis',
          content: '[MAXX — Network Fault]\n\nCannot reach the institutional brain. Verify the dev server is running and Ollama is online.\n\nNEXT MOVE: Run `ollama serve` in your terminal.',
          offline: true,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsThinking(false);
      inputRef.current?.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col h-full min-h-[620px] max-h-[820px] rounded-[48px] border border-white/10 bg-[rgba(2,2,10,0.85)] backdrop-blur-3xl overflow-hidden relative shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
    >
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-glow/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-cyan-glow/60 to-transparent" />

      {/* Header */}
      <div className="relative z-10 px-8 pt-8 pb-6 border-b border-white/5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          {/* Animated Iris */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-glow/30 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-[3px] rounded-full border border-cyan-glow/60" />
            <div className="w-3 h-3 rounded-full bg-cyan-glow shadow-[0_0_12px_#00FFFF]" />
          </div>
          <div>
            <p className="text-white font-black text-sm uppercase tracking-[0.3em] italic leading-none">MAXX</p>
            <p className="text-[9px] font-mono text-cyan-glow/50 uppercase tracking-widest mt-1">
              Creo Intelligence v32.0 | {ollamaOnline === true ? 'APEX_MODE' : ollamaOnline === false ? 'OFFLINE_MODE' : 'PROBING...'}
            </p>
          </div>
        </div>

        {/* Live Status Badges */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest italic ${ollamaOnline ? 'border-cyan-glow/30 bg-cyan-glow/5 text-cyan-glow' : 'border-red-500/30 bg-red-500/5 text-red-400'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${ollamaOnline ? 'bg-cyan-glow animate-pulse' : 'bg-red-500'}`} />
            {ollamaOnline ? 'Ollama_Online' : 'Ollama_Offline'}
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[9px] font-black uppercase tracking-widest text-white/30 italic">
            100/100
          </div>
        </div>
      </div>

      {/* Message Feed */}
      <div className="relative z-10 flex-1 overflow-y-auto px-8 py-6 space-y-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,255,255,0.1) transparent' }}>
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Maxx Avatar dot */}
              {m.role === 'jarvis' && (
                <div className="w-6 h-6 rounded-full border border-cyan-glow/40 bg-cyan-glow/10 flex items-center justify-center mr-3 mt-1 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-cyan-glow" />
                </div>
              )}

              <div className={`max-w-[82%] ${m.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                <p className={`text-[8px] font-black uppercase tracking-[0.3em] ${m.role === 'user' ? 'text-right text-white/20' : 'text-cyan-glow/40'}`}>
                  {m.role === 'user' ? 'Anthony_Oxendine' : `MAXX${m.offline ? ' · OFFLINE_MODE' : m.model ? ` · ${m.model}` : ''}`}
                </p>
                <div className={`px-6 py-5 rounded-[28px] text-sm leading-relaxed font-medium whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-white/[0.06] border border-white/10 text-white rounded-tr-[8px]'
                    : 'bg-cyan-glow/[0.04] border border-cyan-glow/10 text-white/85 rounded-tl-[8px]'
                }`}>
                  {m.content}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Thinking indicator */}
          {isThinking && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start items-center gap-3"
            >
              <div className="w-6 h-6 rounded-full border border-cyan-glow/40 bg-cyan-glow/10 flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
              </div>
              <div className="px-6 py-4 rounded-[28px] rounded-tl-[8px] bg-cyan-glow/[0.04] border border-cyan-glow/10 flex items-center gap-2">
                {[0, 1, 2].map((d) => (
                  <div
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-cyan-glow/60"
                    style={{ animation: `bounce 1.2s infinite ${d * 0.2}s` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Commands */}
      {messages.length <= 2 && (
        <div className="relative z-10 px-8 pb-3 flex flex-wrap gap-2 shrink-0">
          {SUGGESTED_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              onClick={() => sendMessage(cmd)}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-black text-white/40 uppercase tracking-widest hover:border-cyan-glow/30 hover:text-cyan-glow hover:bg-cyan-glow/5 transition-all duration-300 italic"
            >
              {cmd}
            </button>
          ))}
        </div>
      )}

      {/* Input Bar */}
      <div className="relative z-10 px-8 pb-8 pt-4 border-t border-white/5 shrink-0">
        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-[24px] px-5 py-3 focus-within:border-cyan-glow/40 transition-all duration-300">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Issue executive mandate..."
            disabled={isThinking}
            className="flex-1 bg-transparent text-white text-sm font-medium placeholder:text-white/15 focus:outline-none disabled:opacity-40"
          />
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => sendMessage()}
            disabled={isThinking || !input.trim()}
            className="w-9 h-9 rounded-full bg-cyan-glow flex items-center justify-center text-black shrink-0 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </motion.button>
        </div>
        <p className="text-[8px] font-mono text-white/10 uppercase tracking-widest text-center mt-3 italic">
          SOVRA Sovereign LLC · Institutional Intelligence · v32.0_APEX
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </motion.div>
  );
};

export default MaxxCreoChat;
