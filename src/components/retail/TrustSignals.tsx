'use client';

import React from 'react';
import { ShieldCheck, Lock, Star, CheckCircle2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustSignals = () => {
  const signals = [
    { icon: ShieldCheck, label: 'Sovereign Verified', detail: 'Verifiable Ledger Entry' },
    { icon: Lock, label: 'Secure Procurement', detail: '256-bit SSL Handshake' },
    { icon: Star, label: 'Elite Rating', detail: 'Avg. 4.9/5 Across Index' },
    { icon: CheckCircle2, label: 'Institutional Grade', detail: 'Vetted by NOBOO Core' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
      {signals.map((s, i) => (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          key={i}
          className="p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center text-center group hover:bg-purple-600/10 hover:border-purple-500/20 transition-all"
        >
          <s.icon className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white italic">{s.label}</p>
          <p className="text-[8px] font-bold uppercase tracking-widest text-white/30 mt-2 italic">{s.detail}</p>
        </motion.div>
      ))}
    </div>
  );
};

export const LivePulse = () => {
  const purchases = [
    { name: 'Marcus V.', action: 'authorized', item: 'Sovereign Syntax', time: '2m ago' },
    { name: 'Elena S.', action: 'acquired', item: 'Exascale Manual', time: '5m ago' },
    { name: 'X-71 Node', action: 'provisioned', item: 'Deep Lock V1', time: '12m ago' },
  ];

  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % purchases.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-10 left-10 z-[100] hidden md:block">
      <motion.div
        key={active}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-black/80 backdrop-blur-3xl border border-white/10 rounded-full py-4 px-8 flex items-center gap-4 shadow-2xl"
      >
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_#A855F7]" />
        <p className="text-[9px] font-black uppercase tracking-widest text-white italic">
          <span className="text-purple-400">{purchases[active].name}</span> {purchases[active].action} {purchases[active].item} <span className="text-white/20 ml-2">{purchases[active].time}</span>
        </p>
      </motion.div>
    </div>
  );
};
