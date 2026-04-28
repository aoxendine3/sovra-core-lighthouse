import fs from 'fs';
import path from 'path';
import os from 'os';
import { CoreDB } from '../db/CoreDB.ts';
import { VoiceExecutive } from '../communication/VoiceExecutive.ts';
/**
 * ForensicSovereignNode
 *
 * Mandate: High-velocity asset reclamation.
 * Scours the local file system for legacy crypto artifacts and recovery markers.
 */
export class ForensicSovereignNode {
    scanTargets = [
        path.join(os.homedir(), 'Downloads'),
        path.join(os.homedir(), 'Documents'),
        path.join(os.homedir(), 'Desktop'),
        path.join(os.homedir(), 'Library/Application Support/Google/Chrome/Default')
    ];
    keywords = ['houseofoxone', 'mtgox', 'ymail.com', 'yahoo.com', 'mnemonic', 'seed', 'wallet'];
    /**
     * EXECUTE_SCOUR: The primary forensic search pulse.
     */
    async executeScour() {
        console.log('[ForensicSovereignNode] SCOUR: Initiating recursive asset scan...');
        await VoiceExecutive.announce('Initiating Forensic Scour for lost assets.');
        const findings = [];
        for (const target of this.scanTargets) {
            if (fs.existsSync(target)) {
                await this.recursiveScan(target, findings);
            }
        }
        if (findings.length > 0) {
            await VoiceExecutive.announce(`Forensic Scour complete. Identified ${findings.length} potential asset markers.`);
            await CoreDB.logAgentActivity('ForensicSovereignNode', 'Scour Completed', 'SUCCESS', { findings });
        }
        else {
            console.log('[ForensicSovereignNode] SCOUR: No direct markers identified in primary targets.');
        }
        return findings;
    }
    async recursiveScan(dir, findings, depth = 0) {
        if (depth > 5)
            return; // Limit depth for performance
        try {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const fullPath = path.join(dir, file);
                const stats = fs.statSync(fullPath);
                if (stats.isDirectory()) {
                    await this.recursiveScan(fullPath, findings, depth + 1);
                }
                else {
                    await this.analyzeFile(fullPath, findings);
                }
            }
        }
        catch (err) {
            // Skip inaccessible directories
        }
    }
    async analyzeFile(filePath, findings) {
        const ext = path.extname(filePath).toLowerCase();
        const basename = path.basename(filePath).toLowerCase();
        // 1. Check for specific wallet files
        if (basename === 'wallet.dat' || ext === '.json' || ext === '.txt') {
            const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
            // 2. Check for keywords
            const matched = this.keywords.some(k => content.includes(k) || basename.includes(k));
            // 3. Probabilistic Mnemonic Check (Space-separated sequence of 12+ words)
            const words = content.split(/\s+/);
            if (words.length >= 12 && words.length <= 25) {
                // High probability of being a seed phrase
                findings.push(filePath);
                console.log(`[ForensicSovereignNode] FOUND: High-probability marker in ${filePath}`);
            }
            else if (matched) {
                findings.push(filePath);
                console.log(`[ForensicSovereignNode] FOUND: Keyword marker in ${filePath}`);
            }
        }
    }
}
