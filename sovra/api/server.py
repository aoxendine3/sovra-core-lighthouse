import logging
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

from jarvis.core.brain import Brain
from jarvis.core.memory import Memory
from jarvis.core.agent import AutonomousAgent
from jarvis.execution.runner import Runner
from jarvis.tools.registry import ToolRegistry
from jarvis.config import settings

# 🏛️ Institutional Logging Ledger
logger = logging.getLogger("SOVRA Sovereign.API")

app = FastAPI(
    title="SOVRA Sovereign Sovereign API",
    version="5.0.0",
    description="Elite Institutional Gateway for Sovereign Intelligence Orchestration."
)

# 🏛️ Institutional Component Initialization
memory = Memory()
brain = Brain()
registry = ToolRegistry()
registry.auto_load(["jarvis/tools_builtin", "plugins"])

# 🛡️ Pydantic Ingress Models
class RunRequest(BaseModel):
    input: str = Field(..., example="Analyze BTC market delta")

class AutonomousRequest(BaseModel):
    mission: str = Field(..., example="Scale affiliate revenue by 20%")

@app.get("/")
async def health_check():
    return {"status": "SOVEREIGN_SINGULARITY_ACTIVE", "version": "5.0.0"}

@app.post("/run")
async def run_jarvis(request: RunRequest):
    """
    Standard Orchestration Ingress: Process intent through the Sovereign Brain.
    """
    try:
        tools = registry.get_all_schemas()
        
        # 🧠 Unified Decision Pulse
        plan = brain.process(request.input, tools, memory, registry=registry)
        
        # 🚀 Elite Sandboxed Runner with Brain-powered Healing
        runner = Runner(
            registry.tools, 
            brain_callback=lambda p: brain.process(p, tools, memory, registry=registry)
        )
        results = runner.run_workflow(plan)

        # ⚓ Memory Anchoring
        memory.add_conversation("user", request.input)
        memory.add_conversation("assistant", str(results))

        return {
            "status": "SUCCESS",
            "plan_depth": len(plan),
            "results": results
        }
    except Exception as e:
        logger.exception("Global Ingress Fault")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/autonomous")
async def run_autonomous(request: AutonomousRequest):
    """
    AUTONOMOUS_INGRESS: Initiates an iterative goal-seeking mission.
    """
    try:
        tools = registry.get_all_schemas()
        runner = Runner(
            registry.tools, 
            brain_callback=lambda p: brain.process(p, tools, memory, registry=registry)
        )
        agent = AutonomousAgent(brain, runner, memory, registry)
        
        # Initiating the mission blitz
        results = agent.run_mission(request.mission)
        
        return {
            "status": "MISSION_COMPLETE",
            "assets_recovered": len(results),
            "results": results
        }
    except Exception as e:
        logger.exception("Autonomous Mission Fault")
        raise HTTPException(status_code=500, detail=str(e))
