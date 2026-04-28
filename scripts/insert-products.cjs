const fs = require('fs');
const dotenv = require('dotenv');
const { execSync } = require('child_process');

if (fs.existsSync('.env.local')) {
    const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const tsCode = `
import { SOVRADB } from '../sovra/core/db/SOVRADB.ts';
import fs from 'fs';

async function main() {
    const db = await SOVRADB.getInstance();
    
    const products = [
        { name: 'AntiGravity Starter Guide', price: '0', category: 'Software / SaaS', url: 'https://trendsetter445.gumroad.com/l/wloayv', desc: 'Welcome to the AntiGravity Starter Guide. This comprehensive PDF guide is designed for anyone looking to build their first autonomous web application.' },
        { name: 'AntiGravity Pro Implementation Kit', price: '49.00', category: 'Software / SaaS', url: 'https://trendsetter445.gumroad.com/l/exnogw', desc: 'Master the full stack of AntiGravity Pro with our comprehensive implementation kit.' },
        { name: 'AntiGravity Enterprise License', price: '199.00', category: 'Software / SaaS', url: 'https://trendsetter445.gumroad.com/l/ndhdqhu', desc: 'Deploy and manage your AntiGravity platform with full commercial support.' }
    ];

    for (const p of products) {
        await db.run(
            "INSERT INTO sovra_products (name, category, price, seller, url, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [p.name, p.category, p.price, 'SOVRA Sovereign LLC', p.url, 'ACTIVE', p.desc]
        ).catch(err => console.log('Insert failed or already exists', err.message));
        console.log("Inserted:", p.name);
    }
}
main();
`;
fs.writeFileSync('./scripts/insert-products.ts', tsCode);
try {
    console.log(execSync('npx tsx scripts/insert-products.ts', { encoding: 'utf-8' }));
} catch (e) {
    console.log(e.stdout || e.message);
}
