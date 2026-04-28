import logging
from jarvis.core.brain import Brain
from jarvis.core.memory import Memory
from jarvis.execution.runner import Runner
from jarvis.tools.registry import ToolRegistry
from jarvis.interface.cli import CLI

# 🏛️ Institutional Logging Ledger
logging.basicConfig(level=logging.INFO, format='[%(levelname)s] %(name)s - %(message)s')
logger = logging.getLogger("SOVRA Sovereign.Main")

def main():
    """
    SOVEREIGN_MAIN (v5.0)
    Entry point for the SOVRA Sovereign Intelligence Core.
    """
    # 1. Initialize Institutional Components
    memory = Memory()
    brain = Brain()
    
    # 2. Dynamic Tool Discovery
    registry = ToolRegistry()
    registry.auto_load(["jarvis/tools_builtin", "plugins"])
    
    # 3. Elite Sandboxed Runner with Brain-powered Healing
    # We pass the brain's process method as a callback for autonomous repair
    tools_schema = registry.get_all_schemas()
    runner = Runner(
        registry.tools, 
        brain_callback=lambda p: brain.process(p, tools_schema, memory, registry=registry)
    )
    
    # 4. captured Ingress Pulse
    user_input = CLI.get_input()
    if not user_input or user_input.lower() in ["exit", "quit"]:
        return

    # 5. Strategic Plan Formulation (Unified Brain Pulse)
    plan = brain.process(user_input, tools_schema, memory, registry=registry)
    CLI.display_plan(plan)
    
    if not plan:
        logger.warning("Strategic Stall: Brain produced no plan for current ingress.")
        return

    # 6. Elite Execution & Result Archival
    results = runner.run_workflow(plan)
    
    for res in results:
        CLI.display_result(res)
        # ⚓ Archive results in conversational ledger
        memory.add_conversation("assistant", f"Executed {res.get('tool')}: {res.get('output')}")
    
    # ⚓ Archive user intent
    memory.add_conversation("user", user_input)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 [Sovereign Core]: Shutdown pulse received. Terminating...")
    except Exception as e:
        logger.exception(f"CRITICAL_CORE_FAULT: {e}")
