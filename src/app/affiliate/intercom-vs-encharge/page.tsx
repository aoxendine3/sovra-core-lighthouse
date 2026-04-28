"use client";
import React from 'react';

export default function IntercomVsEnchargePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#fff', padding: 80, fontFamily: 'Inter, sans-serif' }}>
      <main style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 24 }}>Intercom vs. Encharge</h1>
        <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 40 }}>
          Stop the seat-tax. Shift your marketing automation to a behavior-based engine built for SaaS.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 60 }}>
          <div style={{ padding: 32, borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: '#64748b' }}>Intercom</h3>
            <p>Traditional list-based marketing. Scaling costs per team member.</p>
          </div>
          <div style={{ padding: 32, borderRadius: 16, background: 'rgba(0,240,255,0.05)', border: '1px solid #00f0ff' }}>
            <h3 style={{ color: '#00f0ff' }}>Encharge</h3>
            <p>Unified behavioral automation.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="https://app.encharge.io/register?referral=UN3VSJ" 
             style={{ padding: '16px 48px', background: '#00f0ff', color: '#000', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>
            Switch to Encharge Today
          </a>
        </div>
      </main>
    </div>
  );
}
