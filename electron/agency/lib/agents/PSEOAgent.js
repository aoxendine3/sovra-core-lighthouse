import fs from 'fs/promises';
import path from 'path';
export class PSEOAgent {
    baseDir = path.join(process.cwd(), 'src/app/affiliate');
    /**
     * Generates a programmatic comparison node for a specific competitor.
     * This version utilizes Ollama for dynamic content and includes the LeadMagnet component.
     */
    async generateComparisonNode(node) {
        const nodeDir = path.join(this.baseDir, node.slug);
        // 1. Create directory if missing
        try {
            await fs.mkdir(nodeDir, { recursive: true });
        }
        catch (err) {
            // already exists
        }
        // 2. Generate Dynamic USP via Ollama
        const usp = await this.generateDynamicUSP(node.competitor, node.target);
        // 3. Scaffold the Comparison Page (Titan Aesthetic + LeadMagnet)
        const content = `"use client";

import React from 'react';
import { motion } from 'framer-motion';
import LeadMagnet from '../../../components/LeadMagnet';

export default function ${node.competitor.replace(/\s+/g, '')}Vs${node.target.replace(/\s+/g, '')}Page() {
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
             ${node.competitor} vs. ${node.target}
           </h1>
           <p style={{ fontSize: 20, color: '#94a3b8', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
             Escape the Enterprise seat-tax trap. Deploy deep behavioral automation engineered for the modern SaaS stack.
           </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32, marginBottom: 80 }}>
          <div style={{ padding: 48, borderRadius: 32, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>
            <h3 style={{ fontSize: 14, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>The Legacy Platform</h3>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>${node.competitor}</h2>
            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>Complex seat-based pricing. Rigid data silos. Legacy friction that slows down high-velocity growth teams.</p>
          </div>
          
          <div style={{ padding: 48, borderRadius: 32, background: 'rgba(0,240,255,0.03)', border: '1px solid rgba(0,240,255,0.2)', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '12px 24px', background: '#00f0ff', color: '#000', fontSize: 12, fontWeight: 900, borderRadius: '0 0 0 16px' }}>WINNER</div>
            <h3 style={{ fontSize: 14, color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>The Disruptor</h3>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>${node.target}</h2>
            <p style={{ color: '#fff', lineHeight: 1.6 }}>${usp}</p>
          </div>
        </div>

        <section style={{ marginBottom: 80 }}>
           <LeadMagnet />
        </section>

        <div style={{ textAlign: 'center' }}>
          <a href="${node.referral}" 
             style={{ display: 'inline-block', padding: '24px 64px', background: '#00f0ff', color: '#000', borderRadius: '100px', fontWeight: 900, textDecoration: 'none', fontSize: 18, boxShadow: '0 10px 40px rgba(0, 240, 255, 0.3)', transition: 'transform 0.2s' }}>
            Claim the ${node.target} Advantage
          </a>
        </div>
      </main>
    </div>
  );
}
`;
        const filePath = path.join(nodeDir, 'page.tsx');
        await fs.writeFile(filePath, content);
        console.log(`[PSEOAgent] DEPLOYED: High-Fidelity node created at /affiliate/${node.slug}`);
        return true;
    }
    /**
     * Generates a dynamic USP via Ollama to differentiate the target from the competitor.
     */
    async generateDynamicUSP(competitor, target) {
        const prompt = `Why is ${target} better for a high-growth SaaS than ${competitor}? Focus on behavioral automation, integration velocity, and cost-efficiency. Keep it under 25 words. Return ONLY the USP text.`;
        try {
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'llama3.2',
                    prompt: prompt,
                    stream: false
                })
            });
            if (!response.ok)
                throw new Error('Ollama Offline');
            const result = await response.json();
            return result.response.trim().replace(/^"|"$/g, '');
        }
        catch (err) {
            return 'SaaS-native behavior flows that eliminate seat-tax and accelerate revenue velocity.';
        }
    }
    /**
     * Identifies competitive targets for the next pSEO cycle using the local index.
     */
    async getCompetitiveTargets() {
        try {
            const data = await fs.readFile(path.join(process.cwd(), 'src/data/pseo_targets.json'), 'utf8');
            return JSON.parse(data);
        }
        catch {
            // Fallback
            return [
                { competitor: 'Mailchimp', target: 'Encharge', slug: 'mailchimp-vs-encharge', referral: 'https://app.encharge.io/register?referral=UN3VSJ' }
            ];
        }
    }
}
