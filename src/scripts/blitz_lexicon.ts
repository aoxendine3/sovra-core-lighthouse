import { TheProducer } from '../../agency/lib/agents/TheProducer.ts';
import { SOVRADB } from '../../agency/lib/db/SOVRADB.ts';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

/**
 * BLITZ_LEXICON (v1.0_SOVRA)
 * ─────────────────────────────────────────────────────────────
 * Mandate: Transform public domain wisdom into high-theta assets.
 * Source: Putnam's Word Book (1913) / Project Gutenberg #13188
 */
async function blitz() {
    console.log('─── [APEX_LEXICON_BLITZ_INITIATED] ───');
    
    const producer = new TheProducer();
    const db = await SOVRADB.getInstance();

    const product = {
        name: 'The Sovereign Lexicon: Exascale Persuasion & Authority',
        category: 'Courses & Books',
        price: 47.00,
        seller: 'SOVRA Prime',
        url: 'https://gumroad.com/l/sovra-lexicon',
        description: 'A modernized transformation of Putnam’s Word Book for the AI-driven influence era. Master the technical, cold, and high-IQ lexicon of the sovereign elite.'
    };

    console.log(`[Blitz] Grounding New Asset: ${product.name}...`);
    
    // 1. Ground in DB
    try {
        await db.run(
            'INSERT INTO sovra_products (name, category, price, seller, url, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [product.name, product.category, product.price, product.seller, product.url, 'ACTIVE', product.description]
        );
        console.log('[Blitz] Product Grounded in Sovereign Ledger.');
    } catch (e) {
        console.log('[Blitz] Product already exists or DB conflict. Proceeding with asset production.');
    }

    // 2. Produce Media Content
    console.log(`[Blitz] Executing Global Omni-Pulse for ${product.name}...`);
    const assets = await producer.directedBlast(
        product.name, 
        product.url, 
        'High-theta enterprise investors, AI engineers, and sovereign writers seeking absolute linguistic dominance.'
    );

    console.log(`[Blitz] Successfully produced ${assets.length} marketing assets.`);
    
    // 3. Generate a sample "Blog Post" specifically for the Word Book theme
    const blogBrief = {
        format: 'blog_post' as const,
        topic: 'Linguistic Sovereignty: Why Your Vocabulary Determines Your Net Worth in 2026',
        affiliateUrl: product.url,
        tone: 'luxury' as const,
        targetAudience: 'Sovereign entrepreneurs',
        cta: 'Download the Sovereign Lexicon'
    };
    const blog = await producer.produce(blogBrief);
    
    const blogPath = path.resolve(process.cwd(), 'src/content/blog/lexicon-launch.md');
    const blogDir = path.dirname(blogPath);
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
    
    fs.writeFileSync(blogPath, `---
title: ${blog.headline}
date: ${new Date().toISOString()}
author: SOVRA Prime
category: Sovereignty
---

${blog.body}

[${blog.cta}](${blog.affiliateLink})
`, 'utf8');

    console.log(`[Blitz] DEPLOYED: Blog post at src/content/blog/lexicon-launch.md`);
    console.log('\n─── LEXICON BLITZ COMPLETE. ───');
    process.exit(0);
}

blitz();
