-- SOVEREIGN_SOVRA_APEX_SCHEMA (v5.5)
-- Mandate: Institutional persistence for the SOVRA Sovereign Sovereign Intelligence.

-- 1. Inventory & Asset Vault
CREATE TABLE IF NOT EXISTS SOVRA_APEX_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL,
    category TEXT,
    status TEXT DEFAULT 'STAGED', -- STAGED, LIVE, ARCHIVED
    metadata TEXT, -- JSON payload
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Institutional Agent Logs (The Audit Trail)
CREATE TABLE IF NOT EXISTS SOVRA_APEX_agent_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_name TEXT NOT NULL,
    activity TEXT NOT NULL,
    status TEXT DEFAULT 'INFO', -- INFO, SUCCESS, FAULT, CRITICAL
    metadata TEXT, -- JSON payload
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Revenue & Transaction Tranches
CREATE TABLE IF NOT EXISTS SOVRA_APEX_revenue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL, -- GUMROAD, CJ_AFFILIATE, STRIPE
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    transaction_id TEXT UNIQUE,
    metadata TEXT, -- JSON payload
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Mission Control Ledger
CREATE TABLE IF NOT EXISTS SOVRA_APEX_missions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mission_name TEXT NOT NULL,
    objective TEXT,
    status TEXT DEFAULT 'IN_PROGRESS', -- IN_PROGRESS, COMPLETED, ABORTED
    start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_time DATETIME,
    result_summary TEXT
);

-- Institutional Triggers for updated_at
CREATE TRIGGER IF NOT EXISTS update_SOVRA_APEX_products_timestamp 
AFTER UPDATE ON SOVRA_APEX_products
FOR EACH ROW
BEGIN
    UPDATE SOVRA_APEX_products SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;
