import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
/**
 * ResponseCache (Intelligence Memory Buffer)
 * MISSION: IRON_COMMAND. Zero-Compute, Zero-Latency Resolution.
 * Stores SHA-256 hashes of AI prompts to provide instant repeat results.
 */
class ResponseCache {
    cachePath;
    memoryCache;
    constructor() {
        this.cachePath = path.resolve(process.cwd(), 'src/data/ai_cache.json');
        this.memoryCache = new Map();
        this.initialize();
    }
    async initialize() {
        try {
            const data = await fs.readFile(this.cachePath, 'utf8');
            const parsed = JSON.parse(data);
            Object.entries(parsed).forEach(([hash, response]) => {
                this.memoryCache.set(hash, response);
            });
            console.log(`[Cache] Intelligence Buffer Initialized: ${this.memoryCache.size} nodes.`);
        }
        catch {
            console.log('[Cache] Initializing fresh Intelligence Node.');
        }
    }
    getHash(input) {
        return crypto.createHash('sha256').update(input).digest('hex');
    }
    get(prompt) {
        const hash = this.getHash(prompt);
        if (this.memoryCache.has(hash)) {
            console.log('[Cache] HIT: Instant AI Resolution Executed.');
            return this.memoryCache.get(hash) || null;
        }
        return null;
    }
    async set(prompt, response) {
        const hash = this.getHash(prompt);
        this.memoryCache.set(hash, response);
        // Periodically sync to disk - Simple debounced-like write
        const cacheObj = Object.fromEntries(this.memoryCache);
        await fs.writeFile(this.cachePath, JSON.stringify(cacheObj, null, 2));
        console.log('[Cache] SIGNAL_SAVED: Intelligence augmented.');
    }
}
export const responseCache = new ResponseCache();
