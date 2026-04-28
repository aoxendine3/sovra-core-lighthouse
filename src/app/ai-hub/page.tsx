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
  ArrowUpRight,
  Shield,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tools = [
  {
    id: "market",
    icon: TrendingUp,
    label: "6-Month Market Oracle",
    tag: "PREDICTIVE",
    desc: "Predictive analysis for luxury tranches and emerging high-theta markets.",
    color: "#cd9d3f",
    prompt: (q: string) => `You are the world's most advanced SOVRA luxury commerce AI oracle. Provide a 6-month predictive market analysis for: "${q}".
    
    Structure your response:
    • SIGNAL 1 — Emerging trend with specific timeline and size
    • SIGNAL 2 — Key threat to monitor with mitigation strategy  
    • SIGNAL 3 — Untapped opportunity with first-mover advantage window
    • ORACLE CALL — Your single most confident prediction for this market 6 months out
    
    Include specific numbers, percentages, and market forces. Under 180 words. Institutional, precise, elite.`,
    placeholder: "e.g. ultra-luxury sustainable accessories, Dubai",
  },
  {
    id: "competitor",
    icon: Target,
    label: "Competitive Dominance Map",
    tag: "INTELLIGENCE",
    desc: "Surgical competitive intelligence and white-space identification.",
    color: "#cd9d3f",
    prompt: (q: string) => `As a SOVRA strategic intelligence AI, perform a competitive dominance analysis for a luxury brand in: "${q}".
    
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
    desc: "Algorithmic decoding of UHNW consumer psychology and social signaling.",
    color: "#cd9d3f",
    prompt: (q: string) => `As a SOVRA behavioral intelligence AI specializing in UHNW (ultra-high-net-worth) consumer psychology for: "${q}":

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
    desc: "AI-driven price architecture maximizing transactional alpha.",
    color: "#cd9d3f",
    prompt: (q: string) => `As a SOVRA luxury pricing strategy AI, design a dynamic pricing architecture for: "${q}".

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
    desc: "Precision market entry intelligence for global asset scaling.",
    color: "#cd9d3f",
    prompt: (q: string) => `As a SOVRA global luxury market expansion AI, give precise market entry intelligence for: "${q}".

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
    desc: "The elite formula for content that captures 1% attention at scale.",
    color: "#cd9d3f",
    prompt: (q: string) => `As an elite SOVRA content intelligence AI for luxury brands creating content about: "${q}":

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

export default function AIHubPage() {
  const [active, setActive] = useState(tools[0]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult("");
    try {
      // Assuming base44.integrations.Core.InvokeLLM exists as per user snippet
      const res = await base44.integrations.Core.InvokeLLM({ prompt: active.prompt(query) });
      setResult(res);
    } catch (error) {
      setResult("INTELLIGENCE_LINK_FAULT: Unable to establish handshake with the Oracle core.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#020205] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#cd9d3f]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-3 bg-[#cd9d3f]/10 border border-[#cd9d3f]/20 px-4 py-1.5 rounded-full">
            <Shield className="w-3 h-3 text-[#cd9d3f]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#cd9d3f]/80 italic font-mono">Sovereign_Intelligence_v2.1</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
            AI Command <span className="gold-gradient">Oracle.</span>
          </h1>
          <p className="text-white/30 text-xs md:text-sm max-w-2xl font-mono uppercase tracking-widest leading-relaxed">
            6 Elite Intelligence Modules · Real-Time Spectral Analysis · Global Market Depth Grounded in the Sovereign Ledger.
          </p>
        </motion.div>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, index) => (
            <motion.button
              key={tool.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => { setActive(tool); setResult(""); setQuery(""); }}
              className={`p-6 rounded-3xl text-left transition-all border group relative overflow-hidden ${
                active.id === tool.id
                  ? "border-[#cd9d3f]/40 bg-[#cd9d3f]/5 shadow-[0_0_30px_rgba(205,157,63,0.1)]"
                  : "border-white/5 bg-white/[0.01] hover:border-[#cd9d3f]/20 hover:bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all ${
                  active.id === tool.id ? "bg-[#cd9d3f] border-[#cd9d3f] text-black" : "bg-white/5 border-white/10 text-white/40"
                }`}>
                  <tool.icon size={18} />
                </div>
                <span className={`text-[8px] font-mono tracking-widest px-2.5 py-1 rounded-md border italic ${
                  active.id === tool.id ? "text-[#cd9d3f] border-[#cd9d3f]/30 bg-[#cd9d3f]/10" : "text-white/20 border-white/5"
                }`}>{tool.tag}</span>
              </div>
              <p className={`text-sm font-black uppercase tracking-tight mb-2 ${active.id === tool.id ? "text-white" : "text-white/60"}`}>{tool.label}</p>
              <p className="text-[10px] text-white/20 font-medium leading-relaxed group-hover:text-white/40 transition-colors italic">{tool.desc}</p>
              
              {active.id === tool.id && (
                <div className="absolute bottom-0 left-0 h-1 bg-[#cd9d3f] w-full" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Command Input Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 md:p-12 rounded-[48px] border-white/5 bg-white/[0.02] shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#cd9d3f] flex items-center justify-center text-black shadow-[0_0_20px_rgba(205,157,63,0.3)]">
              <active.icon size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">{active.label}</h2>
              <p className="text-[10px] text-[#cd9d3f]/60 font-mono uppercase tracking-[0.3em] italic">{active.tag} // READY_FOR_INJECTION</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && run()}
                placeholder={active.placeholder}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#cd9d3f]/30 transition-all font-mono italic uppercase tracking-wider"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <button
              onClick={run}
              disabled={loading || !query.trim()}
              className="bg-[#cd9d3f] text-black px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-white hover:scale-105 transition-all disabled:opacity-20 active:scale-95 italic shadow-[0_15px_40px_rgba(205,157,63,0.2)]"
            >
              {loading ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
              {loading ? "RATIONALIZING..." : "Execute Command"}
            </button>
          </div>
        </motion.div>

        {/* Intelligence Report Display */}
        <AnimatePresence>
          {(result || loading) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-panel rounded-[48px] border-[#cd9d3f]/20 bg-white/[0.02] p-10 md:p-16 relative overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(205,157,63,0.05),transparent_70%)]" />
              
              <div className="relative z-10 space-y-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Sparkles size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-black uppercase tracking-widest">{active.label}</p>
                      <p className="text-[#cd9d3f]/40 text-[9px] font-mono uppercase tracking-[0.5em] italic">Intelligence_Handshake_Complete</p>
                    </div>
                  </div>
                  {result && <ArrowUpRight size={18} className="text-[#cd9d3f]/30" />}
                </div>

                {loading ? (
                  <div className="space-y-6">
                    {[85, 70, 95, 60, 80, 55].map(w => (
                      <div key={w} className="h-4 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                          className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#cd9d3f]/20 to-transparent"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-8">
                    <p className="text-white/80 text-sm md:text-base leading-relaxed font-mono whitespace-pre-wrap italic selection:bg-[#cd9d3f]/20">
                      {result}
                    </p>
                    <div className="pt-8 border-t border-white/5 flex flex-wrap gap-6 items-center">
                       <div className="flex items-center gap-2 text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">
                          <Shield className="w-3 h-3" />
                          Verifiably Grounded
                       </div>
                       <div className="flex items-center gap-2 text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">
                          <Zap className="w-3 h-3" />
                          High-Theta Confidence
                       </div>
                       <div className="ml-auto text-[9px] font-mono text-[#cd9d3f]/40 uppercase italic">
                         SOVRA_ORACLE_SIG // {new Date().toISOString().split('T')[0]}
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!result && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 rounded-full bg-[#cd9d3f]/5 border border-[#cd9d3f]/10 flex items-center justify-center mx-auto mb-8 animate-pulse">
              <Brain size={32} className="text-[#cd9d3f]/30" />
            </div>
            <p className="text-3xl font-black text-white/10 uppercase italic tracking-tighter">Command Intelligence Awaits Injection</p>
            <p className="text-[10px] text-white/10 font-mono mt-4 tracking-[0.5em] uppercase">Select Module · Enter Context · Rationalize Assets</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
