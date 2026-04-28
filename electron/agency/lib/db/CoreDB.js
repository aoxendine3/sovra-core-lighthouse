import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';
/**
 * CoreDB
 * SOVRA_APEX Sovereign Persistence Layer
 *
 * Mandate: Permanent ledger of all wealth, agent actions, and research.
 * Zero-flaw data integrity for the $10M enterprise.
 */
export class CoreDB {
    static instance = null;
    static dbPath = path.resolve(process.cwd(), '.gemini/sovra_sovereign/SOVRA_APEX_sovereign.db');
    constructor() { }
    static async getInstance() {
        if (!CoreDB.instance) {
            // Ensure directory exists
            const dir = path.dirname(this.dbPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            CoreDB.instance = await open({
                filename: this.dbPath,
                driver: sqlite3.Database
            });
            console.log(`[CoreDB] Sovereign DB Connected: ${this.dbPath}`);
            await this.initializeSchema();
        }
        return CoreDB.instance;
    }
    /**
     * Loads the schema from the local SQL file.
     */
    static async initializeSchema() {
        const schemaPath = path.resolve(process.cwd(), 'src/lib/db/schema.sql');
        if (fs.existsSync(schemaPath)) {
            const schema = fs.readFileSync(schemaPath, 'utf8');
            await this.instance?.exec(schema);
            console.log('[CoreDB] Sovereign Schema Finalized.');
        }
    }
    /**
     * Tracks a revenue event across the global enterprise.
     */
    static async trackRevenue(source, gross, net) {
        const db = await this.getInstance();
        await db.run('INSERT INTO SOVRA_APEX_revenue (source, gross_amount, net_amount) VALUES (?, ?, ?)', [source, gross, net]);
        console.log(`[CoreDB] Revenue Logged: ${source} → +$${gross}`);
    }
    /**
     * Logs an agent action for institutional audit.
     */
    static async logAgentActivity(agent, activity, status = 'COMPLETED', metadata = {}) {
        const db = await this.getInstance();
        await db.run('INSERT INTO SOVRA_APEX_agent_logs (agent_name, activity, status, metadata) VALUES (?, ?, ?, ?)', [agent, activity, status, JSON.stringify(metadata)]);
    }
    /**
     * Registers a new sovereign storefront in the enterprise network.
     */
    static async registerStore(url, niche, email) {
        const db = await this.getInstance();
        await db.run('INSERT OR IGNORE INTO SOVRA_APEX_stores (url, niche, admin_email) VALUES (?, ?, ?)', [url, niche, email]);
        console.log(`[CoreDB] Store Registered: ${url} (${niche})`);
    }
    /**
     * Fetches the total business gross revenue.
     */
    static async getTotalGross() {
        const db = await this.getInstance();
        const result = await db.get('SELECT SUM(gross_amount) as total FROM SOVRA_APEX_revenue');
        return result?.total || 0;
    }
    /**
     * Stages a product for the Catalog Blitz.
     */
    static async stageProduct(name, description, price, category, metadata = {}) {
        const db = await this.getInstance();
        await db.run('INSERT INTO SOVRA_APEX_products (name, description, price, category, status, metadata) VALUES (?, ?, ?, ?, ?, ?)', [name, description, price, category, 'STAGED', JSON.stringify(metadata)]);
        console.log(`[CoreDB] Product Staged: ${name}`);
    }
    /**
     * Fetches all staged products.
     */
    static async getStagedProducts() {
        const db = await this.getInstance();
        return db.all('SELECT * FROM SOVRA_APEX_products WHERE status = "STAGED"');
    }
}
