import fs from 'fs';
import path from 'path';

const jsonPath = path.resolve(process.cwd(), '.gemini/sovra_sovereign/sovra_sovereign.json');

if (fs.existsSync(jsonPath)) {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const newData: any = {};
    
    for (const key in data) {
        const newKey = key.replace('SOVRA_APEX_', 'sovra_').toLowerCase();
        newData[newKey] = data[key];
        console.log(`[MIGRATION] ${key} -> ${newKey}`);
    }
    
    // Ensure all required keys exist
    const requiredKeys = [
        'sovra_revenue', 'sovra_agent_logs', 'sovra_deployments', 'sovra_products', 
        'sovra_leads', 'sovra_physical_assets', 'sovra_specialists', 'sovra_voice_sessions', 
        'sovra_earnings', 'sovra_payouts', 'sovra_compliance_logs', 'sovra_agency_leads', 
        'sovra_contracts', 'sovra_knowledge_index', 'sovra_market_nodes', 'sovra_prosperity_index', 
        'sovra_identities', 'sovra_ledger', 'sovra_threat_ledger', 'sovra_agent_memory'
    ];
    
    requiredKeys.forEach(key => {
        if (!newData[key]) {
            newData[key] = [];
            console.log(`[MIGRATION] Added missing key: ${key}`);
        }
    });
    
    fs.writeFileSync(jsonPath, JSON.stringify(newData, null, 2));
    console.log('[MIGRATION] Database keys verifiably grounded.');
} else {
    console.log('[MIGRATION] No database found at ' + jsonPath);
}
