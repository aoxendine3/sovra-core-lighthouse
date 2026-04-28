const fs = require('fs');
const path = require('path');

const LEDGER_PATH = './src/data/ledger.json';

function scrub() {
    console.log("🛠️ [LEDGER_SCRUB] Initiating Deep Purge of Simulated Artifacts...");
    
    if (!fs.existsSync(LEDGER_PATH)) {
        console.error("❌ Ledger not found.");
        return;
    }

    const data = JSON.parse(fs.readFileSync(LEDGER_PATH, 'utf-8'));
    const initialCount = data.entries.length;

    // 1. Remove all Hive/Simulated entries
    data.entries = data.entries.filter(e => e.event !== 'HIVE_INSTANT_LOCKIN');
    
    const scrubbedCount = initialCount - data.entries.length;

    // 2. Recalculate totals based on REALITY
    let total = 0;
    data.entries.forEach(e => {
        if (e.amountUSD) total += e.amountUSD;
    });

    data.liquidAssets.total = total;
    data.totalRevenue = total; // This is the big one that was $191M
    
    console.log(`✅ Purged ${scrubbedCount} simulated entries.`);
    console.log(`✅ New Ground Truth Revenue: $${total.toFixed(2)}`);

    fs.writeFileSync(LEDGER_PATH, JSON.stringify(data, null, 2));
    console.log("✅ Ledger Hard-Locked to Reality.");
}

scrub();
