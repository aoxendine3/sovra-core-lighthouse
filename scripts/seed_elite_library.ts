import { TonyDB } from '../sovra/core/db/TonyDB.ts';
import fs from 'node:fs';
import path from 'node:path';

async function seedEliteLibrary() {
    console.log('--- [ELITE_LIBRARY_SEEDING] ---');
    
    const db = await TonyDB.getInstance();
    const dbPath = path.resolve(process.cwd(), '.gemini/sovra_sovereign/sovra_sovereign.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const books = [
        {
            name: "The Art of War - Sun Tzu (Elite Edition)",
            category: "Philosophy, Strategy",
            price: 25.00,
            seller: "trendsetter445",
            url: "https://trendsetter445.gumroad.com/l/art-of-war-elite",
            description: "Premium, high-fidelity digital edition of Sun Tzu's masterpiece. Features obsidian-glassmorphic cover and institutional strategy notes.",
            image: "art_of_war_cover"
        },
        {
            name: "Meditations - Marcus Aurelius (Elite Edition)",
            category: "Philosophy, Stoicism",
            price: 25.00,
            seller: "trendsetter445",
            url: "https://trendsetter445.gumroad.com/l/meditations-elite",
            description: "The definitive stoic manual for the modern sovereign operator. Premium formatting and custom imagery.",
            image: "meditations_cover"
        },
        {
            name: "The Republic - Plato (Elite Edition)",
            category: "Philosophy, Governance",
            price: 25.00,
            seller: "trendsetter445",
            url: "https://trendsetter445.gumroad.com/l/republic-elite",
            description: "Classical governance architecture for the institutional elite. High-fidelity digital manuscript.",
            image: "republic_cover"
        },
        {
            name: "Beyond Good and Evil - Friedrich Nietzsche (Elite Edition)",
            category: "Philosophy, Nihilism",
            price: 25.00,
            seller: "trendsetter445",
            url: "https://trendsetter445.gumroad.com/l/beyond-good-evil-elite",
            description: "Aggressive intellectual dominance framework. Premium digital edition with custom cover.",
            image: "beyond_good_and_evil_cover"
        },
        {
            name: "Thus Spoke Zarathustra - Friedrich Nietzsche (Elite Edition)",
            category: "Philosophy, Aspiration",
            price: 25.00,
            seller: "trendsetter445",
            url: "https://trendsetter445.gumroad.com/l/zarathustra-elite",
            description: "The epic scale of human potential. High-ticket aspirational asset for the elite library.",
            image: "thus_spoke_zarathustra_cover"
        }
    ];

    // Append to sovra_products
    books.forEach(book => {
        if (!data.sovra_products.find((p: any) => p.name === book.name)) {
            data.sovra_products.push({
                ...book,
                status: 'ACTIVE',
                metadata: { image_artifact: book.image },
                conversion_score: 95
            });
        }
    });

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    console.log('[EliteLibrary] SEED_COMPLETE: 5 Premium Assets Grounded.');
}

seedEliteLibrary();
