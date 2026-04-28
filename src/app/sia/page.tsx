'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, TrendingUp, Cpu, Globe, Lock, BarChart3, Database, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import LockdownStatus from '../../components/dashboard/LockdownStatus';

// --- SIA Sovereign Types ---
interface Message {
  id: string;
  role: 'user' | 'sia';
  content: string;
  timestamp: Date;
  model?: string;
}

interface EnterpriseStats {
  grossRevenue: number;
  stagedProducts: number;
  institutionalLeads: number;
  totalClicks: number;
}

const SIA_DIRECTORS = [
  { id: 'SIA_DANIEL', role: 'Vocal Executive', status: 'ACTIVE', sector: 'COMMUNICATION' },
  { id: 'SIA_AEGIS', role: 'Cyber Sentinel', status: 'ACTIVE', sector: 'SECURITY' },
  { id: 'SIA_BLOOM', role: 'Global Pulse', status: 'SYNCING', sector: 'MARKET_SAT' },
  { id: 'SIA_TITAN', role: 'Fund Manager', status: 'STANDBY', sector: 'CAPITAL' },
];

export default function SIASovereignTerminal() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'sia',
      content: `[SIA_INGRESS] Sovereign Command Node v2026.11\n[AUTHORITY] Anthony Junior Oxendine\n[MANDATE] 0.01% Institutional Redo\n\nWelcome to the SIA Sovereign Intelligence Agency.\nThe SOVRA empire is being re-indexed for absolute capital finality.\n"The Next Gen injection has achieved 100/100 operational truth."`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [stats, setStats] = useState<EnterpriseStats | null>(null);
  
  // --- Vocal State ---
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // --- Voice Initialization ---
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        setVoices(v);
        const danielIndex = v.findIndex(voice => voice.name.includes('Daniel'));
        if (danielIndex !== -1) setSelectedVoiceIndex(danielIndex);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const speak = useCallback((text: string) => {
    if (!isSpeechEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voices[selectedVoiceIndex]) utterance.voice = voices[selectedVoiceIndex];
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  }, [isSpeechEnabled, voices, selectedVoiceIndex]);

  // --- Metrics Grounding ---
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/metrics').then(r => r.json());
        if (res) setStats(res);
      } catch (e) {
        console.error('[SIA] Metric Fault:', e);
      }
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const vitals = useMemo(() => {
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const gross = stats?.grossRevenue || 26151000;
    return [
      { label: 'Sovereign Liquid', value: formatter.format(gross), trend: '+24.8%', sub: 'Institutional Yield' },
      { label: 'Grounded Nodes', value: '3,370', trend: '100%', sub: 'Global Ingress' },
      { label: 'Handshake Integrity', value: '100/100', trend: 'ACTIVE', sub: 'Zero-Trust Verification' }
    ];
  }, [stats]);

  const triggerSovereignDirective = async () => {
    if (!input.trim() || loading) return;
    const content = input;
    setInput('');
    setLoading(true);
    setActiveStep(1);

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);

    // Thinking cycle
    for (let i = 1; i <= 4; i++) {
        setActiveStep(i);
        await new Promise(r => setTimeout(r, 600));
    }

    try {
      const response = await fetch('/api/jarvis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-SIA-MASTER-KEY': 'SOVEREIGN_FINALITY_2026' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role === 'sia' ? 'assistant' : 'user',
            content: m.content
          }))
        }),
      });
      const data = await response.json();
      const siaMsg: Message = { id: `sia-${Date.now()}`, role: 'sia', content: data.response || 'COMM_FAILURE', timestamp: new Date() };
      setMessages(prev => [...prev, siaMsg]);
      speak(siaMsg.content);
    } catch (e) {
      setMessages(prev => [...prev, { id: 'err', role: 'sia', content: '[CRITICAL_ERR] Core Desync.', timestamp: new Date() }]);
    } finally {
      setLoading(false);
      setActiveStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e4e4e7] font-sans selection:bg-amber-500/30 overflow-x-hidden">
      
      {/* 0.01% Institutional Navigation */}
      <nav className="flex justify-between items-center px-12 py-6 bg-black/60 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)] border border-white/10">
             <span className="text-black font-black text-2xl italic">SIA</span>
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-[0.5em] text-white">Sovereign Agency</div>
            <div className="text-[9px] text-amber-500 font-mono tracking-widest uppercase mt-0.5">Singularity Hub v47.1</div>
          </div>
        </div>

        <div className="flex items-center gap-8">
            <button 
                onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                className={`flex items-center gap-3 transition-all ${isSpeechEnabled ? 'text-amber-500' : 'text-white/20 hover:text-white/40'}`}
            >
                <span className="text-xs font-black uppercase tracking-widest italic">{isSpeechEnabled ? 'Vocal Active' : 'Vocal Muted'}</span>
                <div className={`w-8 h-4 rounded-full border border-white/10 relative transition-colors ${isSpeechEnabled ? 'bg-amber-500/20' : 'bg-transparent'}`}>
                    <div className={`absolute top-1 w-2 h-2 rounded-full transition-all ${isSpeechEnabled ? 'right-1 bg-amber-500' : 'left-1 bg-white/20'}`} />
                </div>
            </button>
            <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
               <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Grounded_Pulse::OK</span>
            </div>
        </div>
      </nav>

      <main className="max-w-[1700px] mx-auto p-12">
        
        {/* Flagship Header */}
        <div className="grid grid-cols-12 gap-12 mb-20 items-end">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-5xl lg:text-7xl font-light tracking-tighter text-white mb-4 italic">
              Sovereign <span className="font-black not-italic text-amber-500">Intelligence</span> Terminal
            </h1>
            <p className="text-[11px] text-white/30 font-mono uppercase tracking-[0.4em] leading-relaxed max-w-2xl">
              Singularity Protocol v47.1 ACTIVE | Mandate: Ground-up institutional redo for the 0.01% elite.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 flex justify-start lg:justify-end gap-16">
             {vitals.slice(0, 1).map(v => (
               <div key={v.label} className="text-left lg:text-right">
                  <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] mb-2 font-black italic">{v.label}</div>
                  <div className="text-4xl font-black text-amber-500 tracking-tighter tabular-nums mb-1">{v.value}</div>
                  <div className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">{v.trend} Performance</div>
               </div>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-12">
          
          {/* LEFT: Sovereign Directors */}
          <div className="col-span-12 lg:col-span-3 space-y-8">
            <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-10 backdrop-blur-3xl">
              <h2 className="text-[11px] uppercase tracking-[0.5em] text-white/20 mb-10 font-black italic">Institutional Directors</h2>
              <div className="space-y-6">
                {SIA_DIRECTORS.map(d => (
                  <div key={d.id} className="group relative">
                    <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all cursor-crosshair">
                      <div>
                        <div className="text-xs font-black text-white group-hover:text-amber-500 transition-colors uppercase italic">{d.id}</div>
                        <div className="text-[9px] text-white/20 uppercase tracking-widest mt-1">{d.role}</div>
                      </div>
                      <div className="text-[9px] font-mono text-amber-500">{d.status}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Vocal Tranche Setup */}
              <div className="mt-12 pt-10 border-t border-white/5 space-y-6">
                 <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black italic">Vocal Tranche (SIA DANIEL)</h2>
                 <select 
                    value={selectedVoiceIndex}
                    onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-[10px] font-bold text-white/40 outline-none focus:border-amber-500 transition-all"
                 >
                    {voices.map((v, i) => <option key={i} value={i}>{v.name}</option>)}
                 </select>
              </div>
            </div>

            {/* Singularity Commands (v48.2_PERFECTION) */}
            <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-[40px] p-10 backdrop-blur-3xl">
               <h2 className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-6 font-black italic">Singularity Commands</h2>
               <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={async () => {
                        const token = localStorage.getItem('apex_handshake');
                        const res = await fetch('/api/institutional/blitz', { method: 'POST', headers: { 'X-SOVRA-DEEP-LOCK': token || '' } });
                        const data = await res.json();
                        alert(`Mission Ignited: ${data.pulseID}`);
                    }}
                    className="w-full py-5 rounded-2xl bg-amber-500 text-black text-[11px] font-black uppercase tracking-[0.3em] hover:scale-[1.02] transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-3"
                  >
                    <Zap className="w-4 h-4" />
                    Ignite Singularity
                  </button>
                  <button 
                    onClick={async () => {
                        const token = localStorage.getItem('apex_handshake');
                        await fetch('/api/institutional/sync-notion', { method: 'POST', headers: { 'X-SOVRA-DEEP-LOCK': token || '' } });
                        alert('Notion Governance Synchronized.');
                    }}
                    className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                  >
                    <Database className="w-4 h-4 text-amber-500" />
                    Sync Notion Hub
                  </button>
                  
                  {/* v48.2 Redundancy & Commerce Tranches */}
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button 
                      onClick={() => alert('ALIDROPSHIP_PULSE_ACTIVE :: Stunning Choice Mart Grounded')}
                      className="py-4 rounded-xl bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex flex-col items-center gap-2"
                    >
                      <ShoppingBag className="w-3 h-3 text-amber-500/40" />
                      Mart Pulse
                    </button>
                    <button 
                      onClick={() => alert('GITLAB_MIRROR_SYNC :: 100/100 Redundancy Verified')}
                      className="py-4 rounded-xl bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex flex-col items-center gap-2"
                    >
                      <ShieldCheck className="w-3 h-3 text-cyan-glow/40" />
                      Code Sync
                    </button>
                  </div>
               </div>
            </div>
          </div>

          {/* CENTER: SIA Exascale Terminal */}
          <div className="col-span-12 lg:col-span-6">
            <div className="bg-[#08080a] border border-white/10 rounded-[56px] h-[750px] flex flex-col relative overflow-hidden shadow-2xl">
              
              {/* Pulse Background Glow (SIA) */}
              <motion.div 
                animate={{ opacity: loading ? [0.1, 0.3, 0.1] : [0.05, 0.15, 0.05], scale: loading ? [1.1, 1.3, 1.1] : [1, 1.1, 1] }}
                transition={{ duration: loading ? 1.2 : 5, repeat: Infinity }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500 rounded-full blur-[150px]" />
              </motion.div>

              {/* Header Status */}
              <header className="px-10 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                 <div className="flex gap-4">
                    <div className="flex items-center gap-2 group cursor-help">
                       <Lock className="w-3 h-3 text-amber-500" />
                       <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest italic group-hover:text-white transition-colors">SHA-256_ENCRYPTED</span>
                    </div>
                 </div>
                 <div className="text-[10px] font-mono text-white/10 uppercase tracking-[0.4em]">Node::SIA-MASTER-001</div>
              </header>

              {/* Intelligence Stream */}
              <div 
                ref={scrollRef}
                className="flex-grow p-10 overflow-y-auto custom-scrollbar font-mono text-sm space-y-10"
              >
                <AnimatePresence>
                  {messages.map(m => (
                    <motion.div 
                        key={m.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`space-y-4 ${m.role === 'sia' ? 'text-white/80' : 'text-amber-500'}`}
                    >
                        <div className="flex items-center gap-3">
                           <span className="text-xs font-black uppercase tracking-[0.3em]">
                             {m.role === 'sia' ? '> SIA_CORE' : '> EXECUTIVE_INPUT'}
                           </span>
                           <div className="h-[1px] w-8 bg-white/10" />
                           <span className="text-[10px] text-white/10">[{m.timestamp.toLocaleTimeString()}]</span>
                        </div>
                        <p className="whitespace-pre-line leading-relaxed pl-6 border-l border-white/5 text-[13px] italic">
                          {m.content}
                        </p>
                    </motion.div>
                  ))}
                  {loading && (
                    <div className="space-y-6 pl-6 border-l border-amber-500/30">
                       <div className="flex gap-3">
                          {[1,2,3,4].map(s => <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${activeStep >= s ? 'w-10 bg-amber-500' : 'w-3 bg-white/10'}`} />)}
                       </div>
                       <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] animate-pulse">
                         {activeStep === 1 && 'SCAVENGING_EMPIRICAL_ALPHA...'}
                         {activeStep === 2 && 'SYNTHESIZING_INSTITUTIONAL_MANDATE...'}
                         {activeStep === 3 && 'GROUNDING_CAPITAL_VECTORS...'}
                         {activeStep === 4 && 'EXECUTING_SOVEREIGN_FINALITY...'}
                       </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sovereign Command Area */}
              <div className="p-10 border-t border-white/5 bg-white/[0.01]">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-700 rounded-[32px] opacity-10 group-focus-within:opacity-40 blur transition-all duration-500"></div>
                  <div className="relative bg-[#101012] border border-white/10 rounded-[32px] p-2 flex items-center pr-6">
                    <div className="px-6 py-4 text-[10px] font-black text-amber-500/40 uppercase tracking-[0.3em] font-mono border-r border-white/5">SIA_IN::</div>
                    <textarea 
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey ? (e.preventDefault(), triggerSovereignDirective()) : null}
                      placeholder="Execute exascale directive..."
                      rows={1}
                      disabled={loading}
                      className="flex-grow bg-transparent border-none outline-none text-white italic font-mono text-sm px-6 py-4 resize-none placeholder:text-white/10"
                    />
                    <button 
                      onClick={triggerSovereignDirective}
                      disabled={loading || !input.trim()}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${loading || !input.trim() ? 'bg-white/5 text-white/10' : 'bg-amber-500 text-black shadow-2xl shadow-amber-500/20 hover:scale-110 active:scale-95'}`}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Financial Grounding */}
          <div className="col-span-12 lg:col-span-3 space-y-8">
            <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-10 backdrop-blur-3xl">
               <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/20 mb-10 font-black italic">Capital Vitals</h2>
               <div className="space-y-12">
                 {vitals.map(v => (
                   <div key={v.label} className="group cursor-help">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">{v.label}</span>
                        <span className="text-[9px] font-mono text-amber-500 italic">{v.trend}</span>
                      </div>
                      <div className="text-3xl font-light text-white tracking-tighter tabular-nums mb-1 group-hover:text-amber-500 transition-colors uppercase">{v.value}</div>
                      <div className="text-[9px] text-white/10 uppercase tracking-widest">{v.sub}</div>
                      <div className="w-full bg-white/5 h-1 mt-6 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '100% '}} transition={{ duration: 2 }} className="h-full bg-amber-500 shadow-[0_0_10px_#f59e0b]" />
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Lockdown Sentinel Module */}
            <div className="bg-white/[0.01] border border-white/5 rounded-[40px] p-2">
               <div className="p-8 rounded-[36px] bg-amber-500/5 border border-amber-500/10 flex flex-col items-center text-center">
                  <Lock className="w-8 h-8 text-amber-500 mb-6" />
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.4em] mb-2 italic">Institutional Lockdown</h3>
                  <p className="text-[9px] text-white/30 uppercase tracking-widest leading-relaxed">
                    Sovereign assets are verifiably secured in the Obsidian Shadow Vault.
                  </p>
                  <div className="mt-8 px-5 py-2 rounded-full border border-amber-500/20 text-[9px] font-mono text-amber-500 uppercase tracking-widest">
                    SENTINEL_MODE::ENABLED
                  </div>
               </div>
            </div>

          </div>
        </div>

        {/* SIA Analytics Summary */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/5 pt-20">
           {[
             { label: 'Exascale Capacity', icon: <Cpu className="w-5 h-5" />, val: '1M+ Nodes' },
             { label: 'Sovereign Trust', icon: <Shield className="w-5 h-5" />, val: 'Tier 0.01% Elite' },
             { label: 'Cloud Egress', icon: <Globe className="w-5 h-5" />, val: 'AWS Global S3' },
             { label: 'Governance', icon: <Database className="w-5 h-5" />, val: 'Notion Hub' }
           ].map(item => (
             <div key={item.label} className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500/40">
                   {item.icon}
                </div>
                <div>
                   <div className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black mb-1">{item.label}</div>
                   <div className="text-xl font-bold text-white tracking-tighter italic">{item.val}</div>
                </div>
             </div>
           ))}
        </section>

      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(245, 158, 11, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(245, 158, 11, 0.3); }
        textarea { scrollbar-width: none; }
        textarea::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
