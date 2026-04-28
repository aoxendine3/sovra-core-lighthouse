"use client";

import React from 'react';
import { motion } from 'framer-motion';
import LeadMagnet from '../../../components/LeadMagnet';

export default function PardotVsEnchargePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#fff', padding: '120px 24px', fontFamily: 'Inter, sans-serif', backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.05) 0%, transparent 50%)' }}>
      <main style={{ maxWidth: 1000, margin: '0 auto' }}>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           style={{ textAlign: 'center', marginBottom: 80 }}
        >
           <span style={{ color: '#00f0ff', fontWeight: 800, letterSpacing: '0.2em', fontSize: 13, textTransform: 'uppercase' }}>
             Enterprise Logic Comparison
           </span>
           <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 900, letterSpacing: '-0.04em', marginTop: 16, marginBottom: 24, background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
             Pardot vs. Encharge
           </h1>
           <p style={{ fontSize: 20, color: '#94a3b8', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
             Escape the Enterprise seat-tax trap. Deploy deep behavioral automation engineered for the modern SaaS stack.
           </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32, marginBottom: 80 }}>
          <div style={{ padding: 48, borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>
            <h3 style={{ fontSize: 14, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>The Legacy Platform</h3>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Pardot</h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>Complex seat-based pricing. Rigid data silos. Legacy friction that slows down high-velocity growth teams.</p>
          </div>
          
          <div style={{ padding: 48, borderRadius: 32, background: 'rgba(0,240,255,0.03)', border: '1px solid rgba(0,240,255,0.2)', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '12px 24px', background: '#00f0ff', color: '#000', fontSize: 12, fontWeight: 900, borderRadius: '0 0 0 16px' }}>WINNER</div>
            <h3 style={{ fontSize: 14, color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>The Disruptor</h3>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Encharge</h2>
            <p style={{ color: '#fff', lineHeight: 1.6 }}>Encharge offers AI-driven behavioral automation, seamless integrations with 100+ apps, and affordable pricing (starting at $49/month), outperforming Pardot's traditional approach.</p>
          </div>
        </div>

        <section style={{ marginBottom: 80 }}>
           <LeadMagnet />
        </section>

        <div style={{ textAlign: 'center' }}>
          <a href="https://app.encharge.io/register?referral=UN3VSJ" 
             style={{ display: 'inline-block', padding: '24px 64px', background: '#00f0ff', color: '#000', borderRadius: '100px', fontWeight: 900, textDecoration: 'none', fontSize: 18, boxShadow: '0 10px 40px rgba(0, 240, 255, 0.3)', transition: 'transform 0.2s' }}>
            Claim the Encharge Advantage
          </a>
        </div>
      </main>
    </div>
  );
}
