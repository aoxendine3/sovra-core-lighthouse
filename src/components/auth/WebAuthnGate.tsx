'use client';

import React, { useState, useEffect } from 'react';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';
import { Fingerprint } from 'lucide-react';

export default function WebAuthnGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Basic check for session (production would verify JWT/Cookie on SSR)
    const hasSession = document.cookie.includes('apex_fido_session=verified');
    if (hasSession) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthenticate = async () => {
    try {
      setError(null);
      const resp = await fetch('/api/auth/webauthn/authenticate');
      const options = await resp.json();

      if (options.error) throw new Error(options.error);

      // Trigger TouchID / FaceID
      const asseResp = await startAuthentication(options);

      const verificationResp = await fetch('/api/auth/webauthn/authenticate-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(asseResp),
      });

      const verification = await verificationResp.json();
      if (verification.verified) {
        setIsAuthenticated(true);
      } else {
        setError('Biometric Verification Failed. Connection Terminated.');
      }
    } catch (err: any) {
      setError(err.message || 'Deep-lock sequence aborted.');
    }
  };

  const handleRegister = async () => {
    try {
      setError(null);
      setIsRegistering(true);
      const resp = await fetch('/api/auth/webauthn/register');
      const options = await resp.json();

      // Trigger TouchID / FaceID Registration
      const attResp = await startRegistration(options);

      const verificationResp = await fetch('/api/auth/webauthn/register-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attResp),
      });

      const verification = await verificationResp.json();
      if (verification.verified) {
        setIsRegistering(false);
        await handleAuthenticate(); // Auto-login after registration
      } else {
        setError('Device registration failed.');
        setIsRegistering(false);
      }
    } catch (err: any) {
      setError(err.message || 'Registration aborted.');
      setIsRegistering(false);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      
      <div className="glass-panel p-12 rounded-[64px] border border-amber-500/20 bg-amber-500/[0.02] max-w-lg w-full text-center relative z-10 shadow-[0_0_100px_rgba(245,158,11,0.05)]">
        <div className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/20 mx-auto flex items-center justify-center mb-8 relative">
          <Fingerprint className="w-12 h-12 text-amber-500 animate-pulse" />
          <div className="absolute inset-0 rounded-full border border-amber-500/40 animate-ping opacity-20"></div>
        </div>

        <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">
          Apex Sovereignty Lock
        </h1>
        <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-12">
          Biometric Hardware Verification Required
        </p>

        {error && (
          <div className="mb-8 p-4 border border-red-500/20 bg-red-500/10 rounded-2xl">
            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <button 
            onClick={handleAuthenticate}
            className="w-full py-5 rounded-[32px] bg-amber-500 text-black font-black uppercase tracking-widest text-xs hover:bg-amber-400 transition-colors shadow-[0_0_30px_rgba(245,158,11,0.3)]"
          >
            Initiate Deep-Lock Sequence
          </button>

          <button 
            onClick={handleRegister}
            disabled={isRegistering}
            className="w-full py-5 rounded-[32px] bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-colors"
          >
            {isRegistering ? 'Registering Device...' : 'Register New Hardware'}
          </button>
        </div>
      </div>
    </div>
  );
}
