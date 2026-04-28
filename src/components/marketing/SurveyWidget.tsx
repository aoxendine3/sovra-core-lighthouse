'use client';

import React, { useState } from 'react';

/**
 * SOVRA Institutional Survey Widget
 * 100/100 Lead Capture required to unlock the Ad-Supported "Free" Tier.
 */
export default function SurveyWidget({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const questions = [
    "What is your primary goal for 2026? (Wealth, Autonomy, Security)",
    "Current monthly business revenue? (0, $1k+, $10k+)",
    "Are you ready for Institutional Automation?"
  ];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl max-w-md mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <span className="text-xs font-bold tracking-widest text-[#00FFFF] uppercase">SOVRA Institutional Survey</span>
        <span className="text-xs text-zinc-500">{step + 1} / {questions.length}</span>
      </div>
      
      <h2 className="text-xl font-light text-white mb-8 leading-relaxed">
        {questions[step]}
      </h2>

      <div className="space-y-3">
        <button 
          onClick={handleNext}
          className="w-full py-4 bg-zinc-800 hover:bg-[#00FFFF]/10 border border-zinc-700 hover:border-[#00FFFF]/30 text-white rounded-xl transition-all duration-300 text-sm font-medium"
        >
          Confirm Entry
        </button>
      </div>

      <p className="mt-8 text-[10px] text-zinc-600 text-center uppercase tracking-tighter">
        Verified by SOVRA SOVRA Protocol | Mission 10M
      </p>
    </div>
  );
}
