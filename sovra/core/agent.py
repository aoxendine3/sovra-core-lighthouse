import logging
import time
from typing import List, Dict, Any
from jarvis.core.brain import Brain
from jarvis.core.memory import Memory
from jarvis.execution.runner import Runner
from jarvis.tools.registry import ToolRegistry

logger = logging.getLogger("SOVRA Sovereign.Agent")

class AutonomousAgent:
    """
    SOVEREIGN_AGENT (v2.0)
    Mandate: High-leverage iterative orchestration for 'Live Fire' missions.
    """
    
    def __init__(self, brain: Brain, runner: Runner, memory: Memory, registry: ToolRegistry):
        self.brain = brain
        self.runner = runner
        self.memory = memory
        self.registry = registry
        self.max_iterations = 10
        self.asset_ledger = [] # Institutional tracking of mined assets

    def run_mission(self, mission_statement: str):
        """
        ELITE_MISSION_LOOP: Goal -> Stratagem -> Execution -> Review -> Accumulation.
        """
        logger.info(f"🚀 MISSION_LAUNCHED: {mission_statement}")
        self.memory.add_conversation("user", f"INITIATE_MISSION: {mission_statement}")
        
        iteration = 0
        while iteration < self.max_iterations:
            iteration += 1
            logger.info(f"Mission Pulse {iteration}/{self.max_iterations} - Analyzing Stratagem...")
            
            # 1. Cognitive Stratagem Pulse
            tool_schemas = self.registry.get_all_schemas()
            plan = self.brain.process(
                f"MISSION_OBJECTIVE: {mission_statement}. Iteration: {iteration}. Asset Ledger Depth: {len(self.asset_ledger)}. Review history and formulate the next maneuver.", 
                tool_schemas, 
                self.memory,
                registry=self.registry
            )
            
            if not plan:
                logger.warning("Cognitive Stall: Brain produced no plan. Mission recalibrating...")
                break
                
            # 2. Execution Pulse
            logger.info(f"Orchestrating Stratagem ({len(plan)} steps)...")
            results = self.runner.run_workflow(plan)
            
            # 3. Asset Accumulation & Review
            for res in results:
                if res.get("status") == "success":
                    self.asset_ledger.append(res["output"])
                    # ⚓ High-Leverage Fact Anchoring
                    self.memory.add_fact(f"mission_asset_{iteration}", res["output"], priority="HIGH")

            # 4. Observation Archival
            observation = f"Pulse {iteration} Report: {str(results)}"
            self.memory.add_conversation("assistant", observation)
            
            # 🛡️ Elite Backoff: Prevent runaway resource consumption
            time.sleep(2)
            
        logger.info(f"🏆 MISSION_COMPLETE: Assets recovered: {len(self.asset_ledger)}")
        return self.asset_ledger
