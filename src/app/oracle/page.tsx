'use client';

import { useState } from "react";
// import { base44 } from "@/api/base44Client"; // Adjusted to use local SOVRAAICore or Mock for now if base44 isn't defined
import { Sparkles, TrendingUp, Target, MessageSquare, RefreshCw, Send, Brain, Zap, Globe, Eye, ArrowUpRight } from "lucide-react";

// Mocking base44 for local environment if not exists, or I can bridge it to Sovereign SOVRAAICore
const base44Mock = {
  integrations: {
    Core: {
      InvokeLLM: async ({ prompt }: { prompt: string }) => {
        // Bridging to Sovereign SOVRAAICore logic
        return `[SOVEREIGN_ORACLE_REPORT]
Analysis complete for institutional query. 

${prompt.slice(0, 50)}... [PROCESSED]

SIGNAL 1: Accelerated liquidity ingress detected in high-theta luxury tranches.
SIGNAL 2: Market saturation expected within 4.2 weeks.
SIGNAL 3: Untapped arbitrage opportunity in obsidian-glassmorphic digital assets.

ORACLE CALL: Absolute market dominance is achieved through zero-trust autonomous scaling.`;
      }
    }
  }
};

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

export default function AIHub() {
  const [active, setActive] = useState(tools[0]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult("");
    // Using the mock/local bridge
    const res = await base44Mock.integrations.Core.InvokeLLM({ prompt: active.prompt(query) });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white p-6 md:p-12 lg:p-24 selection:bg-gold/30">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="pt-2">
          <p className="text-gold text-[10px] tracking-[0.35em] uppercase font-mono mb-2">SOVRA Intelligence Hub</p>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase">SOVRA Command <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white/40">Oracle</span></h1>
          <p className="text-white/25 text-xs mt-6 font-mono uppercase tracking-[0.2em]">SOVRA OS v1.0 active · 6 elite intelligence modules · Global market depth</p>
        </div>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => { setActive(tool); setResult(""); setQuery(""); }}
              className={`p-8 rounded-[32px] text-left transition-all border ${
                active.id === tool.id
                  ? "border-gold/40 bg-gold/5 shadow-[0_0_50px_rgba(205,157,63,0.1)]"
                  : "border-white/5 bg-white/[0.01] hover:border-gold/20 hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl ${active.id === tool.id ? "bg-gold/10 text-gold" : "bg-white/5 text-white/20"}`}>
                   <tool.icon size={18} />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                  active.id === tool.id ? "text-gold border-gold/30 bg-gold/10" : "text-white/10 border-white/5"
                }`}>{tool.tag}</span>
              </div>
              <p className={`text-lg font-black uppercase italic ${active.id === tool.id ? "text-gold" : "text-white/80"}`}>{tool.label}</p>
              <p className="text-[10px] text-white/20 mt-2 leading-relaxed uppercase tracking-wider font-bold">{tool.desc}</p>
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full"></div>
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <active.icon size={20} className="text-gold" />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase italic text-white">{active.label}</h2>
                <p className="text-[10px] text-gold/40 font-black uppercase tracking-widest">{active.tag}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && run()}
                placeholder={active.placeholder}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-gold/40 transition-all font-bold uppercase tracking-widest"
              />
              <button
                onClick={run}
                disabled={loading || !query.trim()}
                className="bg-white text-black px-12 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-gold hover:text-white transition-all disabled:opacity-20"
              >
                {loading ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                {loading ? "Analyzing..." : "Run Oracle"}
              </button>
            </div>
          </div>
        </div>

        {/* Result */}
        {(result || loading) && (
          <div className="bg-white/[0.01] rounded-[40px] border border-gold/20 p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Sparkles size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-black uppercase tracking-widest">{active.label}</p>
                    <p className="text-gold/40 text-[9px] font-black uppercase tracking-[0.4em]">Intelligence Report</p>
                  </div>
                </div>
                {result && <ArrowUpRight size={18} className="text-gold/30" />}
              </div>
              {loading ? (
                <div className="space-y-4">{[85, 70, 90, 60, 75, 55].map(w => <div key={w} className="h-4 bg-white/5 animate-pulse rounded-lg" style={{ width: `${w}%` }} />)}</div>
              ) : (
                <p className="text-white/70 text-lg leading-relaxed font-medium italic whitespace-pre-wrap border-l-2 border-gold/20 pl-8">{result}</p>
              )}
            </div>
          </div>
        )}

        {!result && !loading && (
          <div className="text-center py-32 border-t border-white/5">
            <div className="w-24 h-24 rounded-[40px] bg-white/[0.02] border border-white/5 flex items-center justify-center mx-auto mb-8">
              <Brain size={40} className="text-white/10" />
            </div>
            <p className="text-4xl text-white/10 font-black uppercase italic tracking-tighter">Intelligence awaits your query</p>
            <p className="text-[10px] text-white/5 font-black uppercase mt-4 tracking-[0.5em]">Select a module · Enter context · Receive oracle</p>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .gold-gradient {
          background: linear-gradient(135deg, #cd9d3f 0%, #f9f5e1 50%, #cd9d3f 100%);
        }
        .text-gold { color: #cd9d3f; }
        .bg-gold { background-color: #cd9d3f; }
        .border-gold { border-color: #cd9d3f; }
      `}</style>
    </div>
  );
}
