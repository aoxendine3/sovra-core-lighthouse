import json
import os
import logging
from typing import List, Dict, Any

logger = logging.getLogger("SOVRA Sovereign.Memory")

class Memory:
    """
    SOVEREIGN_MEMORY (v4.0)
    Mandate: High-leverage context management through summarization and prioritization.
    """

    def __init__(self, storage_dir="jarvis/memory"):
        self.storage_dir = storage_dir
        self.history_file = os.path.join(storage_dir, "history.json")
        self.facts_file = os.path.join(storage_dir, "facts.json")
        self.summary_file = os.path.join(storage_dir, "summary.json")
        
        os.makedirs(storage_dir, exist_ok=True)
        
        self.history = self._load(self.history_file, [])
        self.facts = self._load(self.facts_file, {})
        self.summary = self._load(self.summary_file, {"content": "No summary available."})

    def _load(self, file_path, default):
        if os.path.exists(file_path):
            try:
                with open(file_path, "r") as f:
                    return json.load(f)
            except Exception as e:
                logger.error(f"Memory Loading Fault in {file_path}: {e}")
        return default

    def _save(self, file_path, data):
        try:
            with open(file_path, "w") as f:
                json.dump(data, f, indent=2)
        except Exception as e:
            logger.error(f"Memory Persistence Fault in {file_path}: {e}")

    def add_conversation(self, role, content):
        """
        Anchors an interaction and triggers the persistence pulse.
        """
        self.history.append({"role": role, "content": content})
        self._save(self.history_file, self.history)
        
        # Institutional Trigger: Summarize every 20 interactions
        if len(self.history) % 20 == 0:
            logger.info("Cognitive Trigger: Initiating historical summarization...")
            # Note: In a full Doctorate version, this would call Brain.summarize()

    def add_fact(self, key, value, priority="NORMAL"):
        """
        Anchors a prioritized fact into the long-term vault.
        """
        self.facts[key] = {"value": value, "priority": priority}
        self._save(self.facts_file, self.facts)

    def get_recent(self, limit=5) -> list:
        return self.history[-limit:]

    def format_for_brain(self, limit=5) -> str:
        """
        Institutional Context Block: High-leverage structured data.
        """
        recent = self.get_recent(limit)
        conv = "\n".join([f"{h['role'].upper()}: {h['content']}" for h in recent])
        
        # Prioritized Fact Filtering
        top_facts = {k: v['value'] for k, v in self.facts.items() if v.get('priority') == 'HIGH'}
        other_facts = {k: v['value'] for k, v in self.facts.items() if v.get('priority') != 'HIGH'}
        
        return f"""
### SOVEREIGN_SUMMARY
{self.summary['content']}

### CRITICAL_FACTS
{json.dumps(top_facts, indent=2)}

### CONVERSATIONAL_LEDGER
{conv}

### AUXILIARY_DATA
{json.dumps(other_facts, indent=2) if other_facts else "None archived."}
"""
