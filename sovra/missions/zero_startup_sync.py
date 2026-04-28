import sqlite3
import json
import csv
import os

# SOVEREIGN_ZERO_STARTUP_SYNC (v1.0)
# Mandate: Instant market readiness via structured manifest generation.

DB_PATH = 'SOVRA_APEX_sovereign.db'
SHOPIFY_CSV = 'shopify_import.csv'
PINTEREST_JSON = 'pinterest_manifest.json'

def generate_manifests():
    if not os.path.exists(DB_PATH):
        print(f"FAULT: Database {DB_PATH} not found.")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT name, description, price, category, metadata FROM SOVRA_APEX_products")
    products = cursor.fetchall()

    # 1. Shopify Import CSV Generation
    # Shopify CSV Headers: Handle, Title, Body (HTML), Vendor, Type, Tags, Published, Option1 Name, Option1 Value, Variant SKU, Variant Grams, Variant Inventory Tracker, Variant Inventory Qty, Variant Inventory Policy, Variant Fulfillment Service, Variant Price, Variant Compare At Price, Variant Requires Shipping, Variant Taxable, Variant Barcode, Image Src, Image Alt Text, Gift Card, SEO Title, SEO Description, Google Shopping / Google Product Category, Google Shopping / Gender, Google Shopping / Age Group, Google Shopping / MPN, Google Shopping / AdWords Grouping, Google Shopping / AdWords Labels, Google Shopping / Condition, Google Shopping / Custom Product, Google Shopping / Custom Label 0, Google Shopping / Custom Label 1, Google Shopping / Custom Label 2, Google Shopping / Custom Label 3, Google Shopping / Custom Label 4, Variant Image, Variant Weight Unit, Variant Tax Code, Cost per item, Price / International, Compare At Price / International, Status
    
    shopify_header = [
        'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Type', 'Tags', 'Published', 
        'Variant Price', 'Variant Inventory Qty', 'Status',
        'Google Shopping / Google Product Category', 'Google Shopping / Condition',
        'Image Src', 'Image Alt Text'
    ]

    shopify_rows = []
    pinterest_manifest = []

    for name, desc, price, cat, meta in products:
        handle = name.lower().replace(':', '').replace(' ', '-')
        meta_data = json.loads(meta)
        
        # Determine Google Product Category (Simplified mapping for AI/Tools)
        gpc = 'Software > Digital Goods' if 'Tool' in cat else 'Media > Books'
        
        # Determine Image Src based on series
        series = meta_data.get('series', 'ATA')
        img_src = 'https://sovra-15.myshopify.com/assets/ata_hero.png' if series == 'ATA' else 'https://sovra-15.myshopify.com/assets/aidt_hero.png'
        
        # 🚀 Institutional High-Fidelity Copywriting
        premium_desc = f"""
            <div class="sovra-product-card">
                <p class="sovra-eyebrow">Institutional Synthesis // Volume {name.split(' ')[-1]}</p>
                <h3 class="sovra-title">{name}</h3>
                <div class="sovra-description">
                    <p>Experience the absolute finality of <strong>{name}</strong>. This is not a mere publication; it is an exascale cognitive asset verifiably grounded in the APEX Sovereign framework.</p>
                    <p>Designed for the new elite, this volume provides the strategic ingress required for global market dominance and cognitive arbitrage. Each data tranche has been synthetically audited by the Sentinel swarm to ensure 100% operational integrity.</p>
                </div>
                <ul class="sovra-features">
                    <li>✓ High-Theta Reasoning Protocols</li>
                    <li>✓ Zero-Trust Data Ingress</li>
                    <li>✓ Institutional-Grade Insights</li>
                </ul>
            </div>
        """
        
        # Shopify Row
        shopify_rows.append([
            handle, name, premium_desc.replace('\n', '').strip(), 'APEX Sovereign', cat, f"AI, {cat}, APEX", 'TRUE',
            price, 999, 'active',
            gpc, 'new',
            img_src, name
        ])

        # Pinterest Manifest Entry
        # Mandate: Pattern Interrupt -> Value Debt Identification -> Sovereign Resolution.
        pin_title = f"{name} | Sovereign Intelligence"
        pin_desc = f"Institutional Breakdown: {desc} Ground your infrastructure in the {meta_data.get('series')} reality. APEX Prime certified."
        
        pinterest_manifest.append({
            "title": pin_title,
            "description": pin_desc,
            "link": f"https://sovra-15.myshopify.com/products/{handle}",
            "image_alt": f"Minimalist luxury tech ad for {name}",
            "keywords": ["ai", "luxury tech", "productivity", "sovereign"]
        })

    # Save Shopify CSV
    with open(SHOPIFY_CSV, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(shopify_header)
        writer.writerows(shopify_rows)

    # Save Pinterest JSON
    with open(PINTEREST_JSON, 'w') as f:
        json.dump(pinterest_manifest, f, indent=2)

    conn.close()
    print(f"SUCCESS: Generated {SHOPIFY_CSV} and {PINTEREST_JSON}.")
    print(f"Total Products Processed: {len(products)}")

if __name__ == "__main__":
    generate_manifests()
