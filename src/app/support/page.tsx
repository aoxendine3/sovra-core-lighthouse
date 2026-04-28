'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Shield, MessageSquare, CheckCircle2, Zap, ArrowRight, User } from 'lucide-react';

export default function SupportPage() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'agent', content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = message;
    setMessage('');
    setChat(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // Simulate Agent Response
    setTimeout(() => {
      const response = "SOVRA_INGRESS: We acknowledge your friction. Our institutional support node has analyzed your request. We are committed to absolute satisfaction. A senior deployment specialist has been assigned to your tranche. In the meantime, please accept a 100% discount code for our 'Sovereign Scaling Brief' as a token of our commitment to your success.";
      setChat(prev => [...prev, { role: 'agent', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white p-6 md:p-24 overflow-hidden relative selection:bg-[#cd9d3f]/30">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#cd9d3f]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-24">
        
        {/* Sidebar Info */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
              <Shield className="w-4 h-4 text-[#cd9d3f]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#cd9d3f] italic">Institutional Integrity</span>
            </div>
            <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">
              Support <br/><span className="gold-gradient">Matrix.</span>
            </h1>
            <p className="text-white/40 text-lg font-medium italic leading-relaxed border-l-2 border-[#cd9d3f]/30 pl-8 uppercase tracking-widest">
              Resolution is final. Satisfaction is absolute. We do not provide refunds; we provide solutions.
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-4">
              <p className="text-[9px] font-black text-[#cd9d3f] uppercase tracking-[0.4em] italic font-mono">Current_Resolution_Rate</p>
              <p className="text-4xl font-black text-white italic tracking-tighter">99.8%</p>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[99.8%] h-full bg-[#cd9d3f] shadow-[0_0_10px_#cd9d3f]" />
              </div>
            </div>
            <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-4">
              <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic font-mono">Response_Latency</p>
              <p className="text-4xl font-black text-emerald-400 italic tracking-tighter">&lt; 4 Mins</p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2 flex flex-col h-[700px] glass-panel rounded-[60px] border-white/5 overflow-hidden shadow-3xl bg-black/40 backdrop-blur-3xl">
          
          {/* Chat Header */}
          <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#cd9d3f]/10 border border-[#cd9d3f]/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#cd9d3f]" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#cd9d3f] italic font-mono">Support_Orchestrator</p>
                <p className="text-sm font-black text-white uppercase italic tracking-tighter">Active Protocol v1.5</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest italic">Node_Healthy</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-10 space-y-12 scrollbar-hide">
            {chat.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                <Shield className="w-20 h-20 mb-8" />
                <p className="text-xs font-black uppercase tracking-[0.5em] italic">Awaiting Customer Ingress</p>
              </div>
            )}
            
            <AnimatePresence initial={false}>
              {chat.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-white/10' : 'bg-[#cd9d3f]'
                  }`}>
                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Shield className="w-5 h-5 text-black" />}
                  </div>
                  <div className={`max-w-[80%] p-8 rounded-[32px] text-sm font-medium leading-relaxed italic ${
                    msg.role === 'user' 
                      ? 'bg-white/5 border border-white/10 rounded-tr-none' 
                      : 'bg-white/[0.02] border border-white/5 text-white/80 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl bg-[#cd9d3f] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-black" />
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[32px] rounded-tl-none flex gap-2">
                  <div className="w-1.5 h-1.5 bg-[#cd9d3f] rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-[#cd9d3f] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-[#cd9d3f] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-10 bg-white/[0.02] border-t border-white/5">
            <form onSubmit={handleSubmit} className="relative">
              <input 
                type="text" 
                placeholder="Describe your operational friction..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-8 pr-24 text-[13px] font-black text-white placeholder-white/10 focus:outline-none focus:border-[#cd9d3f]/30 transition-all shadow-inner uppercase tracking-widest italic"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#cd9d3f] text-black px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest italic hover:scale-105 transition-all shadow-xl flex items-center gap-2"
              >
                Pulse <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
