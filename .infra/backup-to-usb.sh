#!/bin/bash
# ─────────────────────────────────────────────────────────────
# ANTIGRAVITY USB BACKUP DAEMON
# Syncs critical AntiGravity data to any connected USB drive
# Add to cron: 0 2 * * * /path/to/backup-to-usb.sh
# ─────────────────────────────────────────────────────────────

USB_MOUNT="/Volumes/USB"
BACKUP_DIR="${USB_MOUNT}/antigravity_backups"
SRC_ROOT="/Users/ajoxendine68/Documents/GitHub/AntiGravity"
TIMESTAMP=$(date +%Y-%m-%d_%H-%M)
LOG="${BACKUP_DIR}/backup_log.txt"

# Confirm USB is mounted
if [ ! -d "$USB_MOUNT" ]; then
  echo "[$(date)] USB not mounted. Backup skipped." >> /tmp/ag_backup.log
  exit 0
fi

mkdir -p "${BACKUP_DIR}/data"
mkdir -p "${BACKUP_DIR}/infra"
mkdir -p "${BACKUP_DIR}/ledger_snapshots"

echo "═══════════════════════════════════════" >> $LOG
echo "[${TIMESTAMP}] BACKUP INITIATED" >> $LOG

# 1. Sync critical data (ledger, audience, pseo targets, etc.)
rsync -a --delete \
  "${SRC_ROOT}/src/data/" \
  "${BACKUP_DIR}/data/" \
  >> $LOG 2>&1

# 2. Snapshot the ledger with a timestamp
cp "${SRC_ROOT}/src/data/ledger.json" \
   "${BACKUP_DIR}/ledger_snapshots/ledger_${TIMESTAMP}.json" 2>/dev/null || true

# 3. Sync infra scripts
rsync -a --delete \
  "${SRC_ROOT}/.infra/" \
  "${BACKUP_DIR}/infra/" \
  >> $LOG 2>&1

echo "[${TIMESTAMP}] BACKUP COMPLETE ✅" >> $LOG
echo "═══════════════════════════════════════" >> $LOG

# Keep only last 30 ledger snapshots
ls -t "${BACKUP_DIR}/ledger_snapshots/"*.json 2>/dev/null | tail -n +31 | xargs rm -f

echo "Backup complete → ${BACKUP_DIR}"
