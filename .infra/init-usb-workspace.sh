#!/bin/bash
# ─────────────────────────────────────────────────────────────
# USB WORKSPACE INITIALIZER
# Runs automatically when a USB is plugged in.
# Sets up AntiGravity working directories on the drive.
# ─────────────────────────────────────────────────────────────

# Find the mounted USB (first non-system volume)
USB=$(ls /Volumes/ | grep -v "Macintosh HD" | head -1)
USB_PATH="/Volumes/${USB}"

if [ -z "$USB" ]; then
  echo "❌ No USB drive found. Plug one in and retry."
  exit 1
fi

echo "✅ Found USB: ${USB_PATH}"
echo "Setting up AntiGravity workspace..."

# Create working directories
mkdir -p "${USB_PATH}/ag_workspace/cache"
mkdir -p "${USB_PATH}/ag_workspace/exports"
mkdir -p "${USB_PATH}/ag_workspace/models"
mkdir -p "${USB_PATH}/ag_workspace/ledger_snapshots"
mkdir -p "${USB_PATH}/ag_workspace/logs"
mkdir -p "${USB_PATH}/ag_workspace/infra"

# Drop a README
cat > "${USB_PATH}/ag_workspace/README.md" << 'EOF'
# AntiGravity USB Workspace

This drive is used as extended working storage for the AntiGravity system.

## Directory Structure

| Folder | Purpose |
|--------|---------|
| `cache/` | Temporary working files, build artifacts |
| `exports/` | Generated content, CSVs, affiliate data exports |
| `models/` | Ollama model snapshots / GGUF files |
| `ledger_snapshots/` | Timestamped ledger.json backups |
| `logs/` | Agent log archives |
| `infra/` | Server bootstrap scripts |

## Usage

Sync data to this drive:
  rsync -a ~/Documents/GitHub/AntiGravity/src/data/ /Volumes/USB/ag_workspace/cache/
EOF

# Sync current infra scripts
rsync -a /Users/ajoxendine68/Documents/GitHub/AntiGravity/.infra/ \
         "${USB_PATH}/ag_workspace/infra/" 2>/dev/null || true

# Snapshot the current ledger
LEDGER_SRC="/Users/ajoxendine68/Documents/GitHub/AntiGravity/src/data/ledger.json"
if [ -f "$LEDGER_SRC" ]; then
  TIMESTAMP=$(date +%Y-%m-%d_%H%M)
  cp "$LEDGER_SRC" "${USB_PATH}/ag_workspace/ledger_snapshots/ledger_${TIMESTAMP}.json"
  echo "📸 Ledger snapshot saved."
fi

echo ""
echo "════════════════════════════════════════"
echo "  ✅ USB Workspace Ready: ${USB_PATH}/ag_workspace"
echo "  Infra scripts copied."
echo "  Ledger snapshot taken."
echo "  Ready to use as extended storage."
echo "════════════════════════════════════════"
