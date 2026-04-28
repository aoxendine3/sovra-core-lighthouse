'use client';

import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  MessageSquare, 
  RefreshCw, 
  Send, 
  Brain, 
  Zap, 
  Globe, 
  Eye, 
  ArrowUpRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tools = [
  {
    id: "market",
    icon: TrendingUp,
    label: "6-Month Market Oracle",
    tag: "PREDICTIVE",
    desc: "See what's coming before your competition wakes up.",
    color: "gold",
    prompt: (q: string) => `You are the world's most advanced luxury commerce AI oracle. Provide a 6-month predictive market analysis for: "${q}".
    
    Structure your response:
    • SIGNAL 1 — Emerging trend with specific timeline and size
    • SIGNAL 2 — Key threat to monitor with mitigation strategy  
    • SIGNAL 3 — Untapped opportunity with first-mover advantage window
    • ORACLE CALL — Your single most confident prediction for this market 6 months out
    
    Include specific numbers, percentages, and market forces. Under 180 words. Visionary, precise, elite.`,
    placeholder: "e.g. ultra-luxury sustainable accessories, Dubai",
  },
  {
    id: "competitor",
    icon: Target,
    label: "Competitive Dominance Map",
    tag: "INTELLIGENCE",
    desc: "X-ray your competition. Own the gaps they can't see.",
    color: "gold",
    prompt: (q: string) => `As a strategic intelligence AI, perform a competitive dominance analysis for a luxury brand in: "${q}".
    
    Deliver:
    • 3 Critical gaps competitors are blind to
    • 2 White-space opportunities to claim immediately
    • 1 "Blue Ocean" move that would redefine this category
    • The single moat to build right now
    
    Be surgical, specific, and unconventional. Under 150 words.`,
    placeholder: "e.g. luxury artisan jewelry DTC in Middle East",
  },
  {
    id: "sentiment",
    icon: Eye,
    label: "Desire Decoder",
    tag: "BEHAVIORAL AI",
    desc: "What your ultra-wealthy customers want before they know it.",
    color: "gold",
    prompt: (q: string) => `As a behavioral intelligence AI specializing in UHNW (ultra-high-net-worth) consumer psychology for: "${q}":

    Decode:
    • Core identity desire (what they're really buying beyond the product)
    • Hidden anxiety they're trying to resolve through purchase
    • Social signaling they're seeking
    • The exact emotional trigger word/concept that unlocks desire
    • 1 product positioning angle that makes them feel seen at the deepest level
    
    Under 130 words. Psychological depth, elite tone.`,
    placeholder: "e.g. bespoke artisan timepiece collectors",
  },
  {
    id: "pricing",
    icon: Zap,
    label: "Dynamic Pricing AI",
    tag: "REVENUE OPS",
    desc: "AI-driven price architecture that maximizes every transaction.",
    color: "gold",
    prompt: (q: string) => `As a luxury pricing strategy AI, design a dynamic pricing architecture for: "${q}".

    Provide:
    • Optimal price point with psychological justification
    • 3-tier pricing ladder (entry, flagship, ultra)
    • Scarcity/exclusivity pricing lever to test
    • When to increase price (signals to watch)
    • The one pricing mistake luxury brands make that kills perceived value
    
    Under 130 words. Precise, unconventional, profitable.`,
    placeholder: "e.g. limited edition leather goods collection",
  },
  {
    id: "expansion",
    icon: Globe,
    label: "Market Expansion Intel",
    tag: "GLOBAL",
    desc: "Which market to enter next. When. How. Exactly.",
    color: "gold",
    prompt: (q: string) => `As a global luxury market expansion AI, give precise market entry intelligence for: "${q}".

    Include:
    • Top 3 markets ranked by 6-month opportunity score
    • #1 market: specific entry strategy, timing, first move
    • Cultural nuance that will make or break success
    • Distribution channel that works in this space
    • Revenue realistic in 12 months with investment estimate
    
    Under 160 words. Specific countries/cities. Actionable.`,
    placeholder: "e.g. luxury skincare brand from Paris",
  },
  {
    id: "content",
    icon: MessageSquare,
    label: "Viral Content Formula",
    tag: "CREATOR AI",
    desc: "The exact formula for content that makes the 1% stop scrolling.",
    color: "gold",
    prompt: (q: string) => `As an elite content intelligence AI for luxury brands creating content about: "${q}":

    Deliver the complete viral formula:
    • The Emotion (what feeling must hit in 0.5 seconds)
    • The Hook (exact first sentence/frame)
    • The Story Arc (3 beats that hold attention)
    • The Status Signal (what makes the viewer feel elite for watching)
    • The Desire CTA (not "buy now" — what creates irresistible wanting)
    • Best format: video length, visual style, color palette
    
    Under 140 words. Make it feel like editorial direction from Vogue + Apple combined.`,
    placeholder: "e.g. new obsidian leather tote campaign",
  },
];

export default function AIOracleHub() {
  const [active, setActive] = useState(tools[0]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const res = await base44.integrations.Core.InvokeLLM({ prompt: active.prompt(query) });
      setResult(res);
    } catch (e) {
      setResult("SIGNAL_FAILURE: Oracle node desynchronized.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="pt-2">
        <p className="text-[#f59e0b] text-[10px] tracking-[0.6em] uppercase font-mono mb-2">Sovereign Intelligence Node — v1.0_SOVRA</p>
        <h1 className="text-6xl md:text-7xl font-black italic tracking-tightest text-white uppercase leading-none mb-4">Command <br/><span className="text-amber-500">Oracle</span></h1>
        <p className="text-white/30 text-xs font-medium max-w-2xl italic tracking-widest uppercase mb-10">6 elite intelligence modules · High-theta predictive analysis · Global market depth</p>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <motion.button
            key={tool.id}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setActive(tool); setResult(""); setQuery(""); }}
            className={`p-10 rounded-[48px] text-left transition-all border duration-500 relative overflow-hidden group ${
              active.id === tool.id
                ? "border-amber-500/40 bg-amber-500/[0.03] shadow-[0_20px_50px_rgba(245,158,11,0.1)]"
                : "border-white/5 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]"
            }`}
          >
            {active.id === tool.id && (
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] pointer-events-none" />
            )}
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className={`p-4 rounded-2xl ${active.id === tool.id ? "bg-amber-500/10 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "bg-white/5 text-white/20 group-hover:text-white/40"} transition-all`}>
                 <tool.icon size={20} />
              </div>
              <span className={`text-[9px] font-mono tracking-widest px-4 py-1.5 rounded-full border ${
                active.id === tool.id ? "text-amber-500 border-amber-500/30 bg-amber-500/10" : "text-white/10 border-white/5"
              }`}>{tool.tag}</span>
            </div>
            
            <p className={`text-xl font-black italic tracking-tighter uppercase mb-2 ${active.id === tool.id ? "text-white" : "text-white/60"}`}>{tool.label}</p>
            <p className="text-[11px] text-white/20 leading-relaxed uppercase italic font-bold tracking-wide">{tool.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* Input Space */}
      <motion.div 
        layout
        className="glass-panel p-12 rounded-[64px] border border-white/5 bg-white/[0.01] relative overflow-hidden"
      >
        <div className="flex items-center gap-6 mb-10 relative z-10">
          <div className="w-14 h-14 rounded-[24px] bg-amber-500 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)]">
            <active.icon size={24} className="text-black" />
          </div>
          <div>
            <h2 className="text-xs font-black text-amber-500 uppercase tracking-[0.5em] mb-1">{active.tag}</h2>
            <p className="text-3xl font-black text-white italic tracking-tighter uppercase">{active.label}</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 relative z-10">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && run()}
            placeholder={active.placeholder}
            className="flex-1 bg-white/[0.02] border border-white/10 rounded-full px-10 py-6 text-[15px] font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-amber-500/40 focus:bg-white/[0.04] transition-all italic tracking-tight"
          />
          <button
            onClick={run}
            disabled={loading || !query.trim()}
            className="bg-amber-500 text-black px-16 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white transition-all duration-500 disabled:opacity-20 shadow-[0_15px_40px_rgba(245,158,11,0.2)] active:scale-95"
          >
            {loading ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
            {loading ? "ANALYZING..." : "INVOKE ORACLE"}
          </button>
        </div>
      </motion.div>

      {/* Result Space */}
      <AnimatePresence mode="wait">
        {(result || loading) && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-16 rounded-[80px] border border-amber-500/20 bg-amber-500/[0.01] relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/[0.02] blur-[150px] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Sparkles size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.5em] mb-1 italic">{active.label}</p>
                    <p className="text-white text-base font-black italic tracking-tighter uppercase">INTELLIGENCE REPORT</p>
                  </div>
                </div>
                {result && <ArrowUpRight size={20} className="text-amber-500/40" />}
              </div>
              
              {loading ? (
                <div className="space-y-6">
                  {[85, 70, 90, 60, 75].map(w => (
                    <div key={w} className="h-4 bg-white/5 rounded-full overflow-hidden relative">
                       <motion.div 
                         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                         animate={{ x: ['-100%', '100%'] }}
                         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                       />
                       <div className="h-full bg-white/[0.03]" style={{ width: `${w}%` }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[48px]">
                   <p className="text-white/80 text-lg leading-relaxed font-bold italic tracking-tight whitespace-pre-wrap uppercase">
                     {result}
                   </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!result && !loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 border-t border-white/5 mt-20"
        >
          <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-10 group hover:border-amber-500/20 transition-all duration-700">
            <Brain size={40} className="text-white/10 group-hover:text-amber-500/40 group-hover:scale-110 transition-all" />
          </div>
          <p className="text-6xl font-black text-white/5 uppercase italic tracking-tightest mb-4">Intelligence <br/>Awaits Query</p>
          <p className="text-[10px] text-white/10 font-black uppercase tracking-[0.6em] italic">SELECT A MODULE · ENTER CONTEXT · RECEIVE ORACLE</p>
        </motion.div>
      )}
    </div>
  );
}
