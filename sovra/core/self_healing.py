import logging
import json
from typing import Dict, Any, Optional

logger = logging.getLogger("SOVRA Sovereign.SelfHealing")

class SelfHealingPulse:
    """
    SOVEREIGN_SELF_HEALING (v1.0)
    Mandate: Autonomous recovery from structural and cognitive faults.
    """

    @staticmethod
    def diagnose(tool_name: str, error: str) -> str:
        """
        Classifies the fault for targeted repair.
        """
        if "401" in error or "Unauthorized" in error:
            return "CREDENTIAL_FAULT"
        if "schema" in error.lower() or "missing" in error.lower():
            return "SCHEMA_FAULT"
        if "timeout" in error.lower():
            return "RESOURCE_FAULT"
        return "UNKNOWN_FAULT"

    @staticmethod
    def get_repair_stratagem(fault_type: str, tool_name: str, args: Dict[str, Any]) -> str:
        """
        Formulates a repair prompt for the Brain.
        """
        if fault_type == "CREDENTIAL_FAULT":
            return f"The tool '{tool_name}' failed due to a credential mismatch. Verify if the institutional tokens in .env.local are active. If not, fallback to a 'chat' notification to the user."
        if fault_type == "SCHEMA_FAULT":
            return f"The tool '{tool_name}' received malformed arguments: {args}. Re-examine the tool schema and provide a corrected JSON payload."
        if fault_type == "RESOURCE_FAULT":
            return f"The tool '{tool_name}' timed out. Consider simplifying the request or increasing the SAFETY_TIMEOUT."
        return f"The tool '{tool_name}' failed with an unknown fault. Original arguments: {args}. Formulate a safe recovery maneuver."
