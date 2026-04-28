'use client';

import React from 'react';
import SovereignLayout from '@/components/dashboard/SovereignLayout';
import TradingViewWidget from '@/components/dashboard/TradingViewWidget';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Globe, TrendingUp, Shield, Activity } from 'lucide-react';

/**
 * SOVEREIGN STOCK MATRIX (v16.0)
 * Mission: Global Market Ingress Management
 */
const data = [
  { name: 'AAPL', performance: 2.1, color: '#00f0ff' },
  { name: 'MSFT', performance: -1.2, color: '#f87171' },
  { name: 'NVDA', performance: 4.8, color: '#00f0ff' },
  { name: 'GOOGL', performance: 0.5, color: '#00f0ff' },
  { name: 'TSLA', performance: -3.4, color: '#f87171' },
  { name: 'AMZN', performance: 1.7, color: '#00f0ff' },
];

export default function StockSpace() {
  return (
    <SovereignLayout>
      <header className="mb-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h1 className="text-5xl font-black italic tracking-tighter text-white">STOCK <span className="text-purple-500">MATRIX</span></h1>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">Institutional Global Market Ingress</p>
          </div>
          <div className="flex gap-4">
             <div className="glass-apex px-6 py-3 rounded-2xl border border-white/5 flex items-center gap-4">
                <Globe className="w-4 h-4 text-purple-500 animate-spin-slow" />
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">Global Sync: Online</span>
             </div>
          </div>
        </div>
      </header>

      {/* Primary Indices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          { label: 'S&P 500 (SPY)', val: '5,241.53', trend: '+0.85%', status: 'BULLISH' },
          { label: 'NASDAQ (QQQ)', val: '18,340.21', trend: '+1.42%', status: 'BULLISH' },
          { label: 'DOW JONES (DIA)', val: '39,127.42', trend: '-0.12%', status: 'NEUTRAL' },
        ].map((index, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-10 rounded-[48px] border border-white/5 bg-white/[0.01] hover:border-purple-500/20 transition-all group overflow-hidden relative"
          >
            <div className="relative z-10">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-6 italic leading-none">{index.label}</p>
              <div className="text-4xl font-black text-white italic mb-4 tracking-tighter">{index.val}</div>
              <div className="flex justify-between items-center">
                <span className={`text-xs font-bold ${index.trend.startsWith('+') ? 'text-cyan-glow' : 'text-red-400'} tracking-widest`}>{index.trend}</span>
                <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">{index.status}</span>
              </div>
            </div>
            <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-[60px] opacity-10 ${index.trend.startsWith('+') ? 'bg-cyan-glow' : 'bg-red-500'}`} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Market Heat Matrix */}
        <div className="xl:col-span-12">
          <div className="glass-panel p-10 rounded-[64px] border border-white/5 bg-white/[0.01] mb-12 h-[350px]">
             <div className="flex justify-between items-center mb-10">
               <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] italic leading-none">Sector Rotation Pulse</h3>
               <div className="flex gap-4">
                  {['TECH', 'FIN', 'BIO', 'ENERGY'].map(sector => (
                    <span key={sector} className="text-[7px] font-bold text-white/20 border border-white/5 px-3 py-1 rounded-full">{sector}</span>
                  ))}
               </div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.2)', fontSize: 10}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  contentStyle={{background: '#050510', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '10px'}} 
                />
                <Bar dataKey="performance" radius={[10, 10, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.6 + (index * 0.05)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-8">
           <TradingViewWidget symbol="AMEX:SPY" />
        </div>

        <div className="xl:col-span-4 space-y-12">
           <div className="glass-panel p-10 rounded-[56px] border border-white/5 bg-white/[0.01] relative overflow-hidden group">
              <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] mb-10 italic">Risk Management</h3>
              <div className="flex flex-col items-center justify-center p-8 bg-white/[0.01] border border-white/5 rounded-[40px] relative overflow-hidden">
                 <div className="text-5xl font-black text-cyan-glow italic mb-2 tracking-tighter">0.12%</div>
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">VIX_VOLATILITY_NODE</p>
                 <div className="absolute inset-0 bg-gradient-to-t from-cyan-glow/5 to-transparent pointer-events-none" />
              </div>
           </div>

           <div className="glass-panel p-10 rounded-[56px] border border-white/5 bg-white/[0.01]">
              <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] mb-10 italic">Institutional Orders</h3>
              <div className="space-y-6">
                {[
                  { id: 'ORD_92', ticker: 'NVDA', size: '$240K', action: 'B_LIMIT' },
                  { id: 'ORD_93', ticker: 'TSLA', size: '$120K', action: 'OFF' },
                  { id: 'ORD_94', ticker: 'AAPL', size: '$850K', action: 'B_LIMIT' },
                ].map((order) => (
                   <div key={order.id} className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div>
                        <p className="text-[11px] font-black text-white tracking-widest italic">{order.ticker}</p>
                        <p className="text-[8px] font-mono text-white/20 uppercase">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-cyan-glow italic leading-none mb-1">{order.size}</p>
                        <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest">{order.action}</p>
                      </div>
                   </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </SovereignLayout>
  );
}
