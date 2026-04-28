'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SOVEREIGN SENSORY PULSE (v18.0_XORA)
 * 🧠 The Visual Soul of the Enterprise.
 * Provides the "Cutting-Edge" feel requested by the User.
 */
export const SensoryPulse = ({ active = false, status = 'IDLE' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<any[]>([]);

  // Neural Map Simulation
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const createParticles = () => {
      const p = [];
      for (let i = 0; i < 50; i++) {
        p.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2
        });
      }
      setParticles(p);
    };

    createParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = active ? '#00f0ff' : '#475569';
      ctx.globalAlpha = 0.2;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect lines
        particles.forEach((p2, j) => {
          if (i === j) return;
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = active ? '#00f0ff' : '#475569';
            ctx.globalAlpha = (100 - dist) / 1000;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [active, particles]);

  return (
    <div className="relative w-full h-full min-h-[300px] bg-[#020617] overflow-hidden rounded-2xl border border-slate-800/50">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      
      {/* 🏛️ GRID OVERLAY */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

      {/* 📡 HANDSHAKE STATUS */}
      <div className="absolute top-6 left-6 flex items-center space-x-3">
        <div className={`w-2 h-2 rounded-full ${active ? 'bg-[#00f0ff] animate-pulse shadow-[0_0_10px_#00f0ff]' : 'bg-slate-600'}`} />
        <span className="text-[10px] font-black italic uppercase tracking-widest text-slate-400">
          DEEP_LOCK: {status}
        </span>
      </div>

      {/* 🛡️ SCANNING LINE */}
      <motion.div 
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent shadow-[0_0_15px_#00f0ff]"
      />

      {/* 🧪 TELEMETRY DATA */}
      <div className="absolute bottom-6 right-6 text-right">
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter mb-1">TRANC_ID: 0xXORA_v18</div>
        <div className="text-xs font-black italic text-[#00f0ff] tracking-tight">ENCRYPTED_FLOW_ACTIVE</div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-32 h-32 rounded-full border border-[#00f0ff]/20 animate-ping absolute inset-0" />
              <div className="w-32 h-32 rounded-full border border-[#00f0ff]/50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-xl">
                <span className="text-[#00f0ff] text-2xl font-black italic">XORA</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
