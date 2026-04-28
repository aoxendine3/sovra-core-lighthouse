'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ArrowUpRight } from 'lucide-react';
import { generateHandshake } from '@/lib/auth/HandshakeClient';

interface Feedback {
  id: string;
  timestamp: string;
  score: number;
  comment: string;
  url: string;
}

/**
 * EXECUTIVE_FEEDBACK_FEED (v20.0)
 * Mandate: Real-time Qualitative Ingress.
 * Styling: SOVRA Institutional Glass.
 */
export default function ExecutiveFeedbackFeed() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeedback = async () => {
    try {
      const lock = await generateHandshake();
      const res = await fetch('/api/admin/feedback', {
        headers: { 'X-SOVRA-DEEP-LOCK': lock }
      });
      if (res.ok) {
        const data = await res.ok ? await res.json() : [];
        setFeedback(data);
      }
    } catch (err) {
      console.error('[FeedbackFeed] Synchronization Failure');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
    const interval = setInterval(fetchFeedback, 60000); // 1-minute sentiment pulse
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
        <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] italic leading-none">Whale Sentiment Ingress</h3>
        <span className="text-[9px] font-mono text-cyan-glow/40 bg-cyan-glow/5 px-4 py-1 rounded-full uppercase italic">
          {feedback.length} TRANCHES_CAPTURED
        </span>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {feedback.map((fb, i) => (
            <motion.div
              key={fb.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < fb.score ? 'text-gold-sia_core fill-gold-sia_core' : 'text-white/10'}`} 
                    />
                  ))}
                </div>
                <span className="text-[8px] font-mono text-white/20 uppercase">
                  {new Date(fb.timestamp).toLocaleDateString()}
                </span>
              </div>

              <div className="relative">
                <Quote className="absolute -left-2 -top-2 w-8 h-8 text-white/[0.02] -z-10" />
                <p className="text-[11px] text-white/60 leading-relaxed italic uppercase">
                  {fb.comment || "APEX_ACTIVE: POSITIVE_SENTIMENT_VERIFIED"}
                </p>
              </div>

              <div className="mt-6 flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none italic">
                    Node: {fb.url.replace('https://sovra.apex', '').substring(0, 20)}...
                  </span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-cyan-glow/40 group-hover:text-cyan-glow transition-colors" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
