import threading
import logging
import time
import os
import signal
from typing import List, Dict, Any, Optional, Callable
from jarvis.tools.base import Tool
from jarvis.config import settings

from jarvis.core.self_healing import SelfHealingPulse

logger = logging.getLogger("SOVRA Sovereign.Runner")

class Runner:
    """
    SOVEREIGN_RUNNER (v5.6)
    Mandate: Elite execution safety through resource-limited Aegis Sandboxing (Threading Hybrid).
    """

    def __init__(self, tools: Dict[str, Tool], brain_callback: Optional[Callable] = None):
        self.tools = tools
        self.timeout = settings.SAFETY_TIMEOUT
        self.brain_callback = brain_callback

    def self_heal(self, tool_name: str, args: Dict[str, Any], error: str) -> Optional[Dict[str, Any]]:
        """
        AUTONOMOUS_HEALING (v5.1): Utilizes the Brain to repair faults with high-fidelity diagnostics.
        """
        if not self.brain_callback:
            logger.warning("[Self-Heal] No Brain callback available. Basic repair engaged.")
            return {k: v for k, v in args.items() if v is not None}

        fault_type = SelfHealingPulse.diagnose(tool_name, error)
        logger.warning(f"[Self-Heal] Tool {tool_name} failed with {fault_type}. Initiating Brain-powered repair pulse...")
        
        repair_request = SelfHealingPulse.get_repair_stratagem(fault_type, tool_name, args)
        
        try:
            repaired_plan = self.brain_callback(repair_request)
            if repaired_plan and isinstance(repaired_plan, list):
                repaired_step = repaired_plan[0]
                if repaired_step.get("tool") == tool_name:
                    return repaired_step.get("args")
        except Exception as e:
            logger.error(f"[Self-Heal] Brain-powered repair failed: {e}")
            
        return None

    def run_workflow(self, plan: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Executes a sequence of actions derived from the Brain with Aegis Thread Isolation.
        """
        results = []

        for step in plan:
            tool_name = step.get("tool")
            args = step.get("args", {})

            if tool_name in ["direct_response", "chat"]:
                results.append({
                    "tool": tool_name,
                    "status": "success",
                    "output": args.get("message", "Direct response initiated.")
                })
                continue

            tool = self.tools.get(tool_name)
            if not tool:
                results.append({"tool": tool_name, "status": "error", "output": "Tool not found."})
                continue

            # 🛡️ Aegis Thread Isolation
            execution_context = {"status": "RUNNING", "result": None, "error": None}

            def worker():
                try:
                    logger.info(f"[Aegis] Initializing Elite execution: {tool.name}")
                    execution_context["result"] = tool.validate_and_run(**args)
                    execution_context["status"] = "SUCCESS"
                except Exception as e:
                    execution_context["error"] = str(e)
                    execution_context["status"] = "FAULT"

            thread = threading.Thread(target=worker, name=f"AegisWorker-{tool_name}")
            thread.start()
            thread.join(timeout=self.timeout)

            if thread.is_alive():
                logger.error(f"[Aegis] Elite Timeout: Thread {tool_name} exceeded {self.timeout}s.")
                results.append({
                    "tool": tool_name,
                    "status": "error",
                    "output": f"CRITICAL_TIMEOUT: Execution exceeded {self.timeout}s."
                })
            elif execution_context["status"] == "SUCCESS":
                results.append({
                    "tool": tool_name,
                    "status": "success",
                    "output": execution_context["result"]
                })
            elif execution_context["status"] == "FAULT":
                # 🩹 Autonomous Healing Pulse
                repaired_args = self.self_heal(tool_name, args, execution_context["error"])
                if repaired_args and repaired_args != args:
                    logger.info(f"[Self-Heal] Retrying {tool_name} with Brain-repaired arguments...")
                    try:
                        repaired_result = tool.validate_and_run(**repaired_args)
                        results.append({
                            "tool": tool_name,
                            "status": "success",
                            "output": repaired_result
                        })
                    except Exception as e:
                        results.append({"tool": tool_name, "status": "error", "output": str(e)})
                else:
                    results.append({
                        "tool": tool_name,
                        "status": "error",
                        "output": execution_context["error"]
                    })
            else:
                results.append({
                    "tool": tool_name,
                    "status": "error",
                    "output": "Elite thread fault: Unknown state."
                })

        return results
