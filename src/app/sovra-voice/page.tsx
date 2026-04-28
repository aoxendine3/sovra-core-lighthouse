'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateHandshake } from '@/lib/auth/HandshakeClient';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  ArrowLeft, 
  Zap, 
  ShieldCheck, 
  Activity,
  Cpu
} from 'lucide-react';

/**
 * SOVRA_VOICE_SINGULARITY (v15.0_Ω)
 * ─────────────────────────────────────────────────────────────
 * MISSION: COGNITIVE_ORCHESTRATION_FINALITY
 * Protocol: VOICE_ACCESS_EXASCALE_v15.0
 * Aesthetic: OBSIDIAN_GOLD (Gold/Black/Deep Silver)
 */
export default function SOVRATerminal() {
  const [sessionState, setSessionState] = useState<'REGISTRATION' | 'AUTHORIZED' | 'EXASCALE'>('REGISTRATION');
  const [email, setEmail] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sovraResponse, setSovraResponse] = useState('Voice protocol standby. Authorize institutional identity to commence exascale orchestration.');
  
  const recognitionRef = useRef<any>(null);

  // 1. Session Initialization
  useEffect(() => {
    const existingSession = localStorage.getItem('sovra_session_id');
    const existingEmail = localStorage.getItem('sovra_session_email');
    if (existingSession && existingEmail) {
      setSessionId(existingSession);
      setEmail(existingEmail);
      setSessionState('AUTHORIZED');
    }
  }, []);

  const startSession = () => {
    if (!email || !email.includes('@')) return;
    const sid = `SS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setSessionId(sid);
    localStorage.setItem('sovra_session_id', sid);
    localStorage.setItem('sovra_session_email', email);
    setSessionState('AUTHORIZED');
    setSovraResponse('Identity grounded. Voice Singularity active. Synchronizing SOVRA node clusters...');
    speak('Identity grounded. Voice Singularity active.');
  };

  // 3. Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.onresult = (event: any) => {
          const speechToText = event.results[0][0].transcript;
          handleVoiceQuery(speechToText);
        };
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
  }, []);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 0.9; // Deeper, more authoritative voice
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  async function handleVoiceQuery(query: string) {
    try {
      const lock = await generateHandshake();
      const res = await fetch('/api/sovra', {
        method: 'POST',
        headers: { 'X-SOVRA-DEEP-LOCK': lock, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, sessionType: sessionState, sessionId, email })
      });
      const data = await res.json();
      setSovraResponse(data.response);
      speak(data.response);
    } catch (e) {
      console.error('[SOVRA] Interaction Fault');
    }
  };

  const toggleListen = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#020205] text-[#e5e7eb] font-sans flex flex-col items-center justify-center relative overflow-hidden selection:bg-[#cd9d3f]/30">
      
      {/* CINEMATIC_ATMOSPHERE — GOLD_GRADIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(205,157,63,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#cd9d3f]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#cd9d3f]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* EXECUTIVE_CONTROLS */}
      <div className="absolute top-0 w-full p-12 flex justify-between items-center z-50">
        <button 
          onClick={() => window.location.href='/admin/war-room'}
          className="flex items-center gap-4 group text-white/20 hover:text-[#cd9d3f] transition-all font-black text-[10px] uppercase tracking-[0.4em]"
        >
           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
           Back to Apex Command
        </button>

        <div className="flex gap-8 items-center">
           <div className="px-6 py-2 rounded-full border border-[#cd9d3f]/30 bg-[#cd9d3f]/5 text-[#cd9d3f] text-[10px] font-black tracking-widest flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#cd9d3f] rounded-full animate-pulse shadow-[0_0_10px_#cd9d3f]" />
              SINGULARITY_LINK: ACTIVE
           </div>
           <div className="w-10 h-10 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/20 group hover:border-[#cd9d3f]/30 transition-all cursor-pointer">
              <Activity className="w-5 h-5 group-hover:text-[#cd9d3f] transition-colors" />
           </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center z-10 w-full max-w-5xl px-8">
        
        {/* VOLUMETRIC_AI_AVATAR */}
        <div className={`relative mb-20 transition-all duration-1000 ${isSpeaking ? 'scale-105' : 'scale-100'}`}>
           <motion.div 
             animate={{ y: [0, -15, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
             className="w-64 h-64 relative"
           >
              {/* CORE_SPHERE */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full border border-white/20 backdrop-blur-3xl shadow-[0_0_100px_rgba(205,157,63,0.2)] flex items-center justify-center overflow-hidden">
                <div className={`w-32 h-32 rounded-full bg-black/60 border border-white/10 relative flex items-center justify-center overflow-hidden`}>
                   {/* WAVEFORM_SIMULATION */}
                   <div className="flex gap-1 items-end h-8">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div 
                          key={i}
                          animate={{ 
                            height: isSpeaking ? [8, 32, 8] : isListening ? [4, 16, 4] : 4
                          }}
                          transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                          className={`w-1.5 bg-[#cd9d3f] rounded-full shadow-[0_0_15px_rgba(205,157,63,0.8)]`} 
                        />
                      ))}
                   </div>
                </div>
                {/* AMBIENT_PARTICLES */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
              </div>
              
              {/* ORBITAL_RINGS */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-20px] border border-[#cd9d3f]/20 rounded-full border-dashed"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-40px] border border-[#cd9d3f]/10 rounded-full border-dotted"
              />
           </motion.div>
        </div>

        {/* ORCHESTRATION_INTERFACE */}
        <div className="w-full max-w-3xl bg-white/[0.02] border border-white/5 rounded-[4rem] p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden text-center space-y-12 group">
          <div className="absolute inset-0 bg-gradient-to-b from-[#cd9d3f]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="space-y-4">
             <div className="inline-flex items-center gap-3 text-[#cd9d3f]/40 font-black text-[9px] uppercase tracking-[0.6em]">
                <Cpu className="w-3.5 h-3.5" />
                <span>Exascale_Cognitive_Pulse</span>
             </div>
             <h2 className="text-5xl font-black tracking-tighter text-white">
                {sessionState === 'REGISTRATION' ? 'Authorize Ingress' : 'SOVRA Singularity Active'}
             </h2>
          </div>

          <div className="min-h-[120px] flex items-center justify-center px-12 border-y border-white/5 py-12 relative overflow-hidden">
             <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
             <p className="text-2xl font-medium text-white/70 leading-relaxed italic tracking-tight">
               "{sovraResponse}"
             </p>
          </div>

          <AnimatePresence mode="wait">
            {sessionState === 'REGISTRATION' ? (
              <motion.div 
                key="reg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="IDENTITY_ROOT_HASH"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-3xl px-10 py-6 text-center text-sm font-mono tracking-[0.3em] focus:border-[#cd9d3f]/40 focus:bg-[#cd9d3f]/5 transition-all outline-none"
                />
                <button 
                  onClick={startSession}
                  className="w-full py-6 bg-white text-black font-black text-[10px] uppercase tracking-[0.5em] rounded-3xl hover:bg-[#cd9d3f] transition-all active:scale-95 shadow-2xl"
                >
                  Initiate Cognitive Bridge
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="active"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-10"
              >
                <button 
                  onClick={toggleListen}
                  className={`w-36 h-36 rounded-full border-2 flex items-center justify-center transition-all duration-700 shadow-2xl relative group ${isListening ? 'bg-[#cd9d3f] border-[#ffdfa1] shadow-[0_0_80px_rgba(205,157,63,0.5)] scale-110' : 'bg-white/5 border-white/10 hover:border-[#cd9d3f]/40'}`}
                >
                   {isListening ? (
                     <Mic className="w-14 h-14 text-black" />
                   ) : (
                     <MicOff className="w-14 h-14 text-white/20 group-hover:text-[#cd9d3f] transition-colors" />
                   )}
                   {isListening && (
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-[-10px] rounded-full border border-[#cd9d3f]"
                      />
                   )}
                </button>
                <div className="flex flex-col gap-2">
                   <span className="text-[10px] font-black tracking-[0.6em] text-[#cd9d3f]/60 uppercase">
                      {isListening ? 'Synthesizing Tactical Query...' : 'Tap to Command Swarm'}
                   </span>
                   <div className="flex gap-2 justify-center">
                      {[1,2,3,4,5].map(i => (
                         <span key={i} className={`w-1 h-3 rounded-full bg-[#cd9d3f]/20 ${isListening ? 'animate-bounce' : ''}`} style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* EXASCALE_CAPABILITY_TRANCHES */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-4xl opacity-50">
           {[
             { icon: Zap, label: 'Throughput', val: 'SOVRA_Ω' },
             { icon: ShieldCheck, label: 'Integrity', val: '100/100' },
             { icon: Activity, label: 'Pulse', val: 'Deterministic' },
             { icon: Cpu, label: 'Nodes', val: '100,000,000' }
           ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group/stat">
                 <stat.icon className="w-5 h-5 text-gray-500 group-hover/stat:text-[#cd9d3f] transition-colors" />
                 <p className="text-[9px] font-black uppercase tracking-[0.4em]">{stat.label}: {stat.val}</p>
              </div>
           ))}
        </div>
      </div>

      <div className="absolute bottom-10 w-full text-center text-[10px] font-mono tracking-[0.6em] text-white/10 uppercase italic">
        © 2026 SOVRA Sovereign Enterprise LLC | INTELLECTUAL PROPERTY
      </div>
    </main>
  );
}
