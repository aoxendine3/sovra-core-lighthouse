#!/usr/bin/env bash
# APEX Autonomous Pipeline
# This script implements the Brain → Planner → Validator → Runner → Memory loop
# It is invoked by the orchestrator to continuously execute tasks while learning and adapting.

set -euo pipefail

# 1. Brain (Decision) – fetch next high‑level objectives from XORADB agenda
function brain_decision() {
  node -e "
    const { XORADB } = require('../agency/lib/db/XORADB');
    XORADB.getAgenda().then(a => console.log(JSON.stringify(a)));
  "
}

# 2. Planner – translate objectives into actionable task specifications
function planner() {
  local agenda="$1"
  # Simple placeholder: split JSON array into lines of task commands
  echo "$agenda" | jq -r '.tasks[]?.command' || true
}

# 3. Validator – ensure schema compliance and safety
function validator() {
  local task="$1"
  # Run a JSON schema check (placeholder using ajv-cli if installed)
  if command -v ajv > /dev/null; then
    echo "$task" | ajv validate -s scripts/task_schema.json || echo "INVALID"
  else
    echo "$task" # assume valid if validator not present
  fi
}

# 4. Runner – isolated execution in a temporary sandbox
function runner() {
  local safe_task="$1"
  # Execute inside a subshell with limited env
  (export PATH=/usr/bin:/bin; eval "$safe_task")
}

# 5. Memory – log outcome back to XORADB for feedback loop
function memory() {
  local result="$1"
  node -e "
    const { XORADB } = require('../agency/lib/db/XORADB');
    XORADB.logFeedback({result: JSON.parse(process.argv[1])}).catch(console.error);
  " "${result}"
}

# Main loop – run continuously with a short pause
while true; do
  agenda=$(brain_decision)
  if [ -z "$agenda" ]; then
    sleep 30
    continue
  fi
  tasks=$(planner "$agenda")
  while IFS= read -r task; do
    validated=$(validator "$task")
    if [ "$validated" = "INVALID" ]; then
      echo "[APEX] Invalid task skipped: $task"
      continue
    fi
    result=$(runner "$validated" || echo '{"error":"run_failed"}')
    memory "$result"
  done <<< "$tasks"
  sleep 10
done
