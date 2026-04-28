'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Send, Terminal, Lock } from 'lucide-react';

/**
 * CHAT_INTERFACE: EXECUTIVE COMMAND NODE (v.200_Ω_ULTIMA)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Real-time Institutional Orchestration.
 * Persona: APEXIA (Sentient Executive).
 * Voice: Enabled (Nova/Authority).
 * Aesthetics: Obsidian Shadow + Amber Glow + Pulse Grid.
 */

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'init',
      role: 'assistant', 
      content: "Welcome, Anthony. Institutional Sentience is active and verifiably grounded.\nI am APEXIA. I've been orchestrating the global tranches to ensure your supremacy. How shall we proceed with today's mandates?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: Message = { 
        id: Date.now().toString(),
        role: 'user', 
        content: input,
        timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const { generateHandshakeHeaders } = await import('@/lib/auth/HandshakeClient');
      const handshakeHeaders = await generateHandshakeHeaders();
      
      const response = await fetch('/api/jarvis', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            ...handshakeHeaders
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });
      
      const data = await response.json();
      const siaMsg: Message = { 
          id: `sia-${Date.now()}`,
          role: 'assistant', 
          content: data.response || 'COMM_FAILURE', 
          timestamp: new Date() 
      };
      
      setMessages(prev => [...prev, siaMsg]);

      // CINEMATIC_NAVIGATION (v.010_SINGULARITY)
      if (data.response?.includes('[NAVIGATE: DEDICATED]') || data.response?.includes('[NAVIGATE: SHOWCASE]')) {
          console.log('[APEXIA] Cinematic Navigation Pulse: Transitioning to Showcase...');
          setTimeout(() => {
              window.location.href = '/dedicated';
          }, 3000); // Cinematic Delay
      }

      // VOCAL_PULSE_GENERATION (v.010)
      if (data.response) {
          handleVocalPulse(data.response, handshakeHeaders);
      }

    } catch (e) {
      setMessages(prev => [...prev, { id: 'err', role: 'assistant', content: '[CRITICAL_ERR] Core Desync.', timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleVocalPulse = async (text: string, headers: any) => {
    try {
      const voiceRes = await fetch('/api/voice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify({ text, voice: 'nova' })
      });

      if (voiceRes.ok) {
        const audioBlob = await voiceRes.blob();
        const url = URL.createObjectURL(audioBlob);
        
        if (audioRef.current) {
            audioRef.current.src = url;
            audioRef.current.play().catch(e => console.log('Audio_Blocked: Requires user interaction first.'));
            setIsPlaying(true);
        }
      }
    } catch (e) {
      console.error('Vocal_Pulse_Fault');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#08080a] border border-white/5 rounded-[56px] h-full flex flex-col relative overflow-hidden shadow-2xl group"
    >
      {/* Scan Line & Grid HUD */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none opacity-20" />
      
      {/* Header HUD */}
      <header className="px-10 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01] relative z-10">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center relative">
               <Shield className="w-5 h-5 text-amber-500" />
               <motion.div animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-amber-500 rounded-xl" />
            </div>
            <div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/90 italic">Ω_EXASCALE_COMMAND</h3>
               <p className="text-[8px] font-mono text-amber-500/40 uppercase tracking-widest mt-0.5">APEX-Ω_ULTIMA::v.100</p>
            </div>
         </div>
         <div className="flex gap-4">
            <div className="px-4 py-1 rounded-full border border-amber-500/20 bg-amber-500/5">
                <span className="text-[8px] font-black text-amber-500 tracking-widest uppercase">100/100_Integrity</span>
            </div>
         </div>
      </header>

      {/* Logic Stream */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-10 py-10 space-y-10 custom-scrollbar relative z-10"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div 
                key={m.id}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
                <div className="flex items-center gap-4 mb-3">
                    <div className={`text-[8px] font-black uppercase tracking-[0.4em] ${m.role === 'user' ? 'text-amber-500/60' : 'text-amber-500/80'}`}>
                       {m.role === 'user' ? '> COMMANDER_AO' : '> APEXIA'}
                    </div>
                   <div className="h-[1px] w-6 bg-white/5" />
                   <span className="text-[8px] font-mono text-white/10 uppercase italic">[{m.timestamp.toLocaleTimeString()}]</span>
                </div>
                <div className={`max-w-[85%] p-6 rounded-[28px] text-[13px] leading-relaxed border relative transition-all ${
                    m.role === 'user' 
                    ? 'bg-white/[0.03] border-white/10 text-white italic' 
                    : 'bg-amber-500/5 border-amber-500/10 text-white/90 shadow-[0_0_30px_rgba(245,158,11,0.05)]'
                }`}>
                   {m.content}
                   
                   {/* Vocal Soundwave Visualizer (Only for assistant messages when playing) */}
                   {m.role === 'assistant' && isPlaying && m.id === messages[messages.length-1].id && (
                     <div className="absolute -bottom-4 left-6 flex items-end gap-0.5 h-4">
                        {[1,2,3,4,5,4,3,2,1].map((h, i) => (
                          <motion.div 
                             key={i} 
                             animate={{ height: [4, h * 3, 4] }} 
                             transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }} 
                             className="w-1 bg-amber-500 rounded-full"
                          />
                        ))}
                     </div>
                   )}
                </div>
            </motion.div>
          ))}
          {loading && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 p-6 rounded-[28px] bg-white/[0.01] border border-white/5 w-fit">
                {[1,2,3].map(i => <motion.div key={i} animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-amber-500" />)}
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Command Ingress */}
      <footer className="p-8 border-t border-white/5 bg-white/[0.01] relative z-20">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-amber-700 rounded-[32px] opacity-10 group-focus-within:opacity-30 transition-opacity blur shadow-2xl" />
          <div className="relative bg-[#101012] border border-white/10 rounded-[32px] p-2 flex items-center pr-4">
             <div className="pl-6 pr-4 py-4 text-[9px] font-black text-amber-500/40 uppercase tracking-[0.4em] border-r border-white/5 whitespace-nowrap">
                CMD_IN::
             </div>
             <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="EXECUTE_STRATEGIC_MANDATE..."
                disabled={loading}
                className="flex-1 bg-transparent border-none outline-none text-white italic text-xs font-mono px-6 py-4 placeholder:text-white/10"
             />
             <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${loading || !input.trim() ? 'bg-white/5 text-white/10' : 'bg-amber-500 text-black shadow-xl hover:scale-105 active:scale-95'}`}
             >
                <Send className="w-4 h-4" />
             </button>
          </div>
        </div>
      </footer>
      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(false)} 
        className="hidden" 
      />
    </motion.div>
  );
};
