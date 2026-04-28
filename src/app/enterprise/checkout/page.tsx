"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const tierId = searchParams.get('tier') || 'guardian';
  const [step, setStep] = useState(1); // 1: Info, 2: Handshake, 3: Success
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [handshakeId, setHandshakeId] = useState('');

  const tiers: any = {
    guardian: { name: 'Guardian Node', price: 499, color: '#00f0ff' },
    sentinel: { name: 'Sentinel Node', price: 1999, color: '#a855f7' },
    apex: { name: 'SOVRA Sovereign', price: 9999, color: '#ff4d4d' }
  };

  const currentTier = tiers[tierId] || tiers.guardian;

  const handleHandshake = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    
    // Simulate deep-lock verification and DB sync
    setTimeout(async () => {
      try {
        const res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-deep-lock': 'verified-institutional' },
          body: JSON.stringify({ email, name, tierId, source: 'ENTERPRISE_CHECKOUT' })
        });
        const data = await res.json();
        if (data.success) {
          setHandshakeId(data.handshakeId);
          setStep(3);
        }
      } catch (err) {
        console.error('Handshake failure:', err);
        setStep(1); // Revert on fail
      }
    }, 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '120px 24px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        
        <Link href="/enterprise/aegis" style={{ color: '#64748b', textDecoration: 'none', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
          ← Back to Aegis Shield
        </Link>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Initialize Node Handshake</h1>
            <p style={{ color: '#94a3b8', marginBottom: 40 }}>Configure your sovereign credentials for the <span style={{ color: currentTier.color, fontWeight: 800 }}>{currentTier.name} ({currentTier.price}/mo)</span>.</p>
            
            <form onSubmit={handleHandshake} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 900, color: '#64748b', textTransform: 'uppercase' }}>Client/Entity Name</label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Global Tech Solutions"
                  style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 16 }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 900, color: '#64748b', textTransform: 'uppercase' }}>Sovereign Email</label>
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@enterprise.com"
                  style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 16 }}
                />
              </div>
              <button type="submit" style={{ marginTop: 20, padding: '18px', borderRadius: 100, background: currentTier.color, color: '#000', fontWeight: 900, border: 'none', cursor: 'pointer', fontSize: 16 }}>
                Initiate Secure Handshake
              </button>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{ width: 80, height: 80, borderRadius: '50%', border: `4px solid ${currentTier.color}`, borderTopColor: 'transparent', margin: '0 auto 40px' }}
            />
            <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Synchronizing Sovereign Node...</h2>
            <p style={{ color: '#94a3b8' }}>Verifying deep-lock integrity and provisioning institutional keys.</p>
          </div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '60px', borderRadius: 48, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#22c55e', color: '#000', fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>✓</div>
            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Handshake Verified</h1>
            <p style={{ color: '#94a3b8', marginBottom: 40 }}>Your <span style={{ color: currentTier.color, fontWeight: 800 }}>{currentTier.name}</span> is now active. Use the following ID for institutional API access.</p>
            
            <div style={{ padding: '24px', borderRadius: 16, background: '#000', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace', fontSize: 20, letterSpacing: '0.1em', marginBottom: 40, color: currentTier.color }}>
              {handshakeId}
            </div>

            <Link href="/enterprise/aegis" style={{ padding: '16px 40px', borderRadius: 100, background: 'rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', fontWeight: 900, fontSize: 14 }}>
              Return to Command Center
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ color: "#fff", padding: 100 }}>Loading Handshake Interface...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
