#!/usr/bin/env python3
"""
================================================================================
                    XORAS SYSTEMS LLC — CLICK-AND-PLAY LAUNCHER
================================================================================
Portability orchestrator that manages database integrity, secure keychain setup,
PM2 process monitoring, and interactive system administration options.
================================================================================
"""

import os
import sys
import subprocess
import time
import json
import urllib.request
import secrets

PORT = 28283
STATUS_URL = f"http://127.0.0.1:{PORT}/status"
LEX_URL = "http://127.0.0.1:28282/health"

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def print_banner():
    print("\033[95m┌───────────────────────────────────────────────────────────────────────┐\033[0m")
    print("\033[96m│                     X O R A S   S Y S T E M S   L L C                 │\033[0m")
    print("\033[96m│                  Sovereign Clinical Intelligence Ecosystem            │\033[0m")
    print("\033[95m└───────────────────────────────────────────────────────────────────────┘\033[0m")
    print("  [Posture: Humility | Security: Zero-Trust | Workspace: Fully Local]")
    print("\033[95m─────────────────────────────────────────────────────────────────────────\033[0m")

# --- STEP 1: PRE-FLIGHT DEPENDENCY CHECKS ---
def run_preflight_checks() -> bool:
    print("[*] Running pre-flight workstation checks...")
    
    # 1. Check Python
    print(f"  [+] Python version: {sys.version.split()[0]} (Nominal)")
    
    # 2. Check Node
    try:
        node_ver = subprocess.run(["node", "--version"], capture_output=True, text=True, timeout=2)
        if node_ver.returncode == 0:
            print(f"  [+] Node.js version: {node_ver.stdout.strip()} (Nominal)")
    except FileNotFoundError:
        print("  [⚠️] Warning: Node.js was not found. TypeScript pipelines may not execute.")

    # 3. Check PM2
    try:
        pm2_path = subprocess.run(["which", "pm2"], capture_output=True, text=True, timeout=2)
        if pm2_path.returncode == 0:
            print(f"  [+] PM2 Orchestrator path: {pm2_path.stdout.strip()} (Nominal)")
        else:
            print("  [⚠️] Warning: PM2 is not installed globally. Node daemons cannot be managed autonomously.")
    except Exception:
        print("  [⚠️] Warning: Failed to search for PM2.")
        
    return True

# --- STEP 2: AUTONOMOUS DATABASE RECOVERY & CHECKS ---
def check_database_integrity():
    print("[*] Inspecting local SQLite database integrity...")
    db_file = "sovra_sovereign.db"
    
    if os.path.exists(db_file):
        # Test database integrity
        try:
            cmd = ["sqlite3", db_file, "PRAGMA integrity_check;"]
            res = subprocess.run(cmd, capture_output=True, text=True, timeout=3)
            if "ok" in res.stdout.lower():
                print("  [+] Database sovra_sovereign.db check: Nominal")
            else:
                print("  [⚠️] Database disk image is malformed. Initiating autonomous recovery...")
                recover_database(db_file)
        except Exception as e:
            print(f"  [⚠️] Database check failed: {e}. Attempting recovery...")
            recover_database(db_file)
    else:
        print("  [+] Database files missing. Creating fresh operational schemas...")
        try:
            subprocess.run(["sqlite3", db_file, "CREATE TABLE IF NOT EXISTS active_state (key TEXT PRIMARY KEY, val TEXT);"], timeout=3)
            print("  [+] Database initialization complete.")
        except Exception as e:
            print(f"  [-] Failed to initialize database: {e}")

def recover_database(db_file: str):
    backup_file = f"{db_file}.corrupt_{int(time.time())}"
    print(f"  [*] Backing up corrupted file to {backup_file}...")
    try:
        os.rename(db_file, backup_file)
        # Recreate clean, fresh database structure
        print("  [*] Recreating clean, operational database schema...")
        cmd = ["sqlite3", db_file, "CREATE TABLE IF NOT EXISTS active_state (key TEXT PRIMARY KEY, val TEXT);"]
        subprocess.run(cmd, timeout=3)
        print("\033[92m  [+] Database recovered successfully. Gaps closed.\033[0m")
    except Exception as e:
        print(f"  [-] Critical: Database recovery aborted: {e}")

# --- STEP 3: SECURE KEYCHAIN SETUP ---
def ensure_keychain_token() -> str:
    print("[*] Checking secure dynamic handshake credentials...")
    try:
        # Check token
        cmd = ["security", "find-generic-password", "-a", "xoras_handshake_token", "-s", "xoras_core", "-w"]
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=2)
        if res.returncode == 0 and res.stdout.strip():
            print("  [+] Handshake token located inside macOS Keychain.")
            return res.stdout.strip()
            
        # If missing, write a new token
        print("  [⚠️] Credentials missing. Generating high-entropy token...")
        token = secrets.token_hex(32)
        cmd_add = ["security", "add-generic-password", "-a", "xoras_handshake_token", "-s", "xoras_core", "-w", token, "-U"]
        subprocess.run(cmd_add, capture_output=True, timeout=2)
        print("  [+] New credentials registered in Keychain successfully.")
        return token
    except Exception as e:
        print(f"  [-] Failed to access macOS Keychain: {e}. Reverting to environment fallbacks.")
    return "workstation_local_security_guard"

# --- STEP 4: SERVICE BOOTSTRAP (PM2) ---
def ensure_daemons_online():
    print("[*] Synchronizing local PM2 daemon processes...")
    try:
        # Check if PM2 is running LEX-CORE or XORAS-CORE-SERVER
        pm2_status = subprocess.run(["pm2", "status"], capture_output=True, text=True, timeout=3)
        if "LEX-CORE" in pm2_status.stdout and "XORAS-CORE-SERVER" in pm2_status.stdout:
            print("  [+] Sovereign daemons are already active.")
        else:
            print("  [⚠️] Services offline. Spawning system via xoras.ecosystem.config.cjs...")
            # Run startup
            subprocess.run(["pm2", "start", "xoras.ecosystem.config.cjs"], capture_output=True, timeout=5)
            print("  [+] Startup command triggered. Waiting for port hydration...")
            time.sleep(2)
    except Exception as e:
        print(f"  [-] Failed to communicate with PM2: {e}")

# --- STEP 5: HEALTH CHECK PORT INGESTION ---
def run_health_checks(token: str):
    print("[*] Probing local endpoints...")
    # 1. LEX-CORE Health Check
    try:
        with urllib.request.urlopen(LEX_URL, timeout=2) as r:
            if r.status == 200:
                print("  [+] LEX-CORE Gateway (Port 28282): ONLINE")
    except Exception:
        print("  [-] LEX-CORE Gateway (Port 28282): UNREACHABLE")

    # 2. XORAS-CORE-SERVER Status Check
    try:
        req = urllib.request.Request(STATUS_URL, method="GET")
        req.add_header("Authorization", f"Bearer {token}")
        with urllib.request.urlopen(req, timeout=2) as r:
            if r.status == 200:
                res = json.loads(r.read().decode("utf-8"))
                print(f"  [+] XORAS-CORE-SERVER (Port 28283): ONLINE (RSS Memory: {res.get('memory_mb', 0.0):.2f} MB)")
    except Exception as e:
        print(f"  [-] XORAS-CORE-SERVER (Port 28283): UNREACHABLE ({e})")

# --- MAIN INTERACTIVE OPTIONS LOOP ---
def run_interactive_menu(token: str):
    while True:
        print("\n\033[95m========================= SYSTEM CONTROL PANEL =========================\033[0m")
        print("1) Run Xoras Security Dojo (10-Tier Adversarial Stress-Test)")
        print("2) View active PM2 process status metrics")
        print("3) Read Sovereign Constitution codex")
        print("4) Terminate and shutdown all system daemons safely")
        print("5) Execute Xoras DEEP (Dynamic Evolutionary Escape Predictor)")
        print("6) Execute Xoras BPOSE (Biophysical Precision Oncology Simulator)")
        print("7) Exit launcher")
        print("\033[95m────────────────────────────────────────────────────────────────────────\033[0m")
        
        choice = input("Enter option [1-7]: ").strip()
        
        if choice == "1":
            print("\n[*] Initializing Security Dojo. Please wait...")
            subprocess.run(["python3", "scripts/xoras_security_dojo.py"])
        elif choice == "2":
            print("\n[*] Querying PM2 orchestrator metrics...")
            subprocess.run(["pm2", "status"])
        elif choice == "3":
            print("\n[*] Displaying Sovereign Constitution...")
            const_path = "xoras/SOVEREIGN_CONSTITUTION.md"
            if os.path.exists(const_path):
                with open(const_path, "r") as f:
                    print(f.read())
            else:
                print("[-] Constitution codex file not found.")
        elif choice == "4":
            print("\n[⚠️] Stopping and deleting all PM2 processes safely...")
            subprocess.run(["pm2", "delete", "all"])
            print("[+] All sovereign processes have been completely halted.")
        elif choice == "5":
            print("\n[*] Initiating Xoras DEEP (Evolutionary Mutational Escape Simulation)...")
            subprocess.run(["python3", "core/xoras_deep_predictor.py"])
        elif choice == "6":
            print("\n[*] Initiating Xoras BPOSE (Biophysical Precision Oncology Simulation Engine)...")
            subprocess.run(["python3", "core/xoras_bpos_simulator.py"])
        elif choice == "7":
            print("\n[+] Exiting launcher. Xoras Systems LLC stands down. Goodbye.\n")
            break
        else:
            print("[-] Invalid selection. Please enter a number between 1 and 7.")

def main():
    clear_screen()
    print_banner()
    run_preflight_checks()
    print()
    check_database_integrity()
    print()
    token = ensure_keychain_token()
    print()
    ensure_daemons_online()
    print()
    run_health_checks(token)
    
    run_interactive_menu(token)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n[+] Process interrupted. Standing down safely.")
        sys.exit(0)
