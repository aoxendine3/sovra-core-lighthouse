import os
import sys
import logging
from dotenv import load_dotenv

# Ensure we can import from the root
sys.path.append(os.getcwd())

from jarvis.core.brain import Brain
from jarvis.core.memory import Memory
from jarvis.execution.runner import Runner
from jarvis.tools.registry import ToolRegistry
from jarvis.core.agent import AutonomousAgent

# 🏛️ Institutional Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SOVRA Sovereign.Mission.Revenue")

def main():
    load_dotenv(".env.local")
    
    logger.info("Initiating Sovereign Revenue Pulse (v1.0)...")
    
    # 1. Initialize Institutional Components
    memory = Memory()
    brain = Brain()
    registry = ToolRegistry()
    registry.auto_load(["jarvis/tools_builtin", "plugins"])
    
    runner = Runner(
        registry.tools,
        brain_callback=lambda p: brain.process(p, registry.get_all_schemas(), memory, registry=registry)
    )
    
    agent = AutonomousAgent(brain, runner, memory, registry)
    
    # 2. Formulate the Mission Statement
    mission = (
        "Audit all revenue tranches from Gumroad and CJ Affiliate. "
        "Retrieve the total sales from Gumroad and commissions from CJ Affiliate. "
        "Summarize the findings and archive a detailed 'Revenue Ops Report' into the "
        "centralized Notion Workspace (79c225a75cf743a7bcff305714ecb903). "
        "This is a high-priority institutional audit."
    )
    
    # 3. Launch the Mission Blitz
    logger.info("🚀 Launching Mission: REVENUE_SINGULARITY")
    results = agent.run_mission(mission)
    
    logger.info(f"🏆 Revenue Mission Complete. Assets Archived: {len(results)}")

if __name__ == "__main__":
    main()
