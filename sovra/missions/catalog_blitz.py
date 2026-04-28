import sqlite3
import json
import os

db_path = 'SOVRA_APEX_sovereign.db'

def Blitz():
    if not os.path.exists(db_path):
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(db_path), exist_ok=True)

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Ensure schema is applied
    schema_path = 'src/lib/db/schema.sql'
    if os.path.exists(schema_path):
        with open(schema_path, 'r') as f:
            cursor.executescript(f.read())
        print("[Blitz] Schema applied successfully.")

    # Generate 110 items
    products = []
    # All Things AI (6-60)
    for i in range(6, 61):
        products.append((
            f"All Things AI: Vol {i}",
            f"Detailed breakdown and synthesis of the latest AI breakthroughs, Volume {i}.",
            49.99,
            "eBook",
            "STAGED",
            json.dumps({"volume": i, "series": "ATA"})
        ))
    
    # AI DevTools (6-60)
    for i in range(6, 61):
        products.append((
            f"AI DevTools: Vol {i}",
            f"Comprehensive guide to advanced AI engineering tools and patterns, Volume {i}.",
            99.99,
            "Tool/eBook",
            "STAGED",
            json.dumps({"volume": i, "series": "AIDT"})
        ))

    cursor.executemany(
        'INSERT INTO SOVRA_APEX_products (name, description, price, category, status, metadata) VALUES (?, ?, ?, ?, ?, ?)',
        products
    )
    
    # Log activity
    cursor.execute(
        'INSERT INTO SOVRA_APEX_agent_logs (agent_name, activity, status, metadata) VALUES (?, ?, ?, ?)',
        ('GumroadAgent', f'Catalog Blitz: Staged {len(products)} products', 'COMPLETED', json.dumps({"count": len(products)}))
    )

    conn.commit()
    conn.close()
    print(f"Blitz Complete: {len(products)} items staged.")

if __name__ == "__main__":
    Blitz()
