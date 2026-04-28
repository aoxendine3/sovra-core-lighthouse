import sqlite3
import os
import json
import logging

# Institutional Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SOVRA Sovereign.DBInit")

DB_PATH = 'SOVRA_APEX_sovereign.db'
SCHEMA_PATH = 'jarvis/db/schema.sql'

def initialize_db():
    logger.info(f"Initiating Sovereign Database Initialization: {DB_PATH}")
    
    # 1. Purge malformed/old database if requested (or if 0 bytes)
    if os.path.exists(DB_PATH) and os.path.getsize(DB_PATH) == 0:
        logger.warning("Empty database detected. Purging for clean rebuild.")
        os.remove(DB_PATH)
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 2. Apply Sovereign Schema
    if not os.path.exists(SCHEMA_PATH):
        logger.error(f"Schema Fault: {SCHEMA_PATH} not found.")
        return
        
    with open(SCHEMA_PATH, 'r') as f:
        cursor.executescript(f.read())
    
    logger.info("Sovereign Schema applied successfully.")
    
    # 3. Seed Initial Inventory (The Catalog Blitz Baseline)
    cursor.execute("SELECT COUNT(*) FROM SOVRA_APEX_products")
    if cursor.fetchone()[0] == 0:
        logger.info("Seeding initial 110-item Catalog Blitz baseline...")
        products = []
        # All Things AI (6-60)
        for i in range(6, 61):
            products.append((
                f"All Things AI: Vol {i}",
                f"Detailed breakdown and synthesis of the latest AI breakthroughs, Volume {i}.",
                49.99,
                "eBook",
                "LIVE",
                json.dumps({"volume": i, "series": "ATA"})
            ))
        
        # AI DevTools (6-60)
        for i in range(6, 61):
            products.append((
                f"AI DevTools: Vol {i}",
                f"Comprehensive guide to advanced AI engineering tools and patterns, Volume {i}.",
                99.99,
                "Tool/eBook",
                "LIVE",
                json.dumps({"volume": i, "series": "AIDT"})
            ))

        cursor.executemany(
            'INSERT INTO SOVRA_APEX_products (name, description, price, category, status, metadata) VALUES (?, ?, ?, ?, ?, ?)',
            products
        )
        
        # Log activity
        cursor.execute(
            'INSERT INTO SOVRA_APEX_agent_logs (agent_name, activity, status, metadata) VALUES (?, ?, ?, ?)',
            ('SovereignAdmin', f'Institutional Rebuild: Seeded {len(products)} products', 'SUCCESS', json.dumps({"count": len(products)}))
        )
        logger.info(f"Blitz Baseline Seeding Complete: {len(products)} products anchored.")
    else:
        logger.info("Inventory ledger already populated. Skipping seed pulse.")

    conn.commit()
    conn.close()
    logger.info("Sovereign Database verifiably initialized and grounded.")

if __name__ == "__main__":
    initialize_db()
