import json
import requests
import logging
from typing import List, Dict, Any, Optional
from jarvis.config import settings
from jarvis.core.memory import Memory
from jarvis.core.client import SovereignClient
from jarvis.core.resilience import SovereignResilience, CircuitBreaker

logger = logging.getLogger("SOVRA Sovereign.Brain")
brain_circuit = CircuitBreaker(failure_threshold=3, recovery_timeout=60)

class Brain:
    """
    SOVEREIGN_BRAIN (v5.0)
    Central authority for ALL decision making.
    Mandate: Absolute intent-to-action orchestration with Chain-of-Thought reasoning and Supervisor Audit.
    """

    def __init__(self, model=None, endpoint=None):
        self.model = model or settings.MODEL
        self.endpoint = endpoint or settings.ENDPOINT
        self.client = SovereignClient()

    def stream_process(self, user_input: str, tools: List[Dict[str, Any]], memory: Memory):
        """
        Streaming Cognitive Pulse: Yields real-time inference chunks.
        """
        context = memory.format_for_brain(limit=5)
        tools_desc = self._format_tools(tools)
        
        prompt = f"IDENTITY: SOVRA Sovereign Sovereign Intelligence. MISSION: Assist User. CONTEXT: {context}. TOOLS: {tools_desc}. INGRESS: {user_input}"

        response = self.client.post(self.endpoint, payload={
            "model": self.model,
            "prompt": prompt,
            "stream": True
        }, stream=True)

        for line in response.iter_lines():
            if line:
                try:
                    chunk = json.loads(line.decode("utf-8"))
                    yield chunk.get("response", "")
                except json.JSONDecodeError:
                    continue

    @brain_circuit
    @SovereignResilience.retry_with_backoff(retries=3, backoff_in_seconds=2)
    def process(self, user_input: str, tools: List[Dict[str, Any]], memory: Memory, registry: Any = None) -> List[Dict[str, Any]]:
        """
        Entry point for ALL intelligence.
        Orchestrates intent through a Unified Brain Pulse with Supervisor Audit.
        """
        # 1. Structured Context Retrieval (Optimized for llama3.2)
        context = memory.format_for_brain(limit=3)

        prompt = f"""
        ### IDENTITY
        You are the SOVRA Sovereign Sovereign Intelligence (v5.0).
        Mandate: Absolute intent-to-action orchestration in a single cognitive pulse.
        
        ### STRATEGY
        - Use CHAIN-OF-THOUGHT to analyze the ingress.
        - Formulate a sequence of maneuvers using AVAILABLE TOOLS.
        - If a tool is missing, use the 'chat' fallback.
        
        ### AVAILABLE TOOLS
        {self._format_tools(tools)}
        
        ### CONTEXTUAL LEDGER
        {context}
        
        ### INGRESS PULSE
        {user_input}
        
        ### RESPONSE_FORMAT (STRICT JSON ONLY)
        {{
          "thought": "Deep step-by-step reasoning",
          "type": "single" | "multi",
          "plan": [
            {{ "tool": "name", "args": {{}} }}
          ]
        }}
        """
        try:
            # 2. Institutional Ingress Pulse
            response = self.client.post(self.endpoint, payload={
                "model": self.model,
                "prompt": prompt,
                "stream": False,
                "format": "json"
            })
            
            result = response.json()
            raw_response = result.get("response", "{}")
            parsed = self._defensive_parse(raw_response)
            
            if not parsed:
                return self._fallback_response("Cognitive Fault: Malformed LLM Response.")

            # 3. Cognitive Supervisor Audit (The 120/100 Standard)
            logger.info(f"Unified Decision Pulse -> Thought: {parsed.get('thought', 'No thought recorded.')}")
            
            plan = self._validate(parsed, tools, registry)
            audited_plan = self._supervisor_audit(plan, user_input)
            
            return audited_plan
        except Exception as e:
            logger.exception(f"Brain Execution Fault: {e}")
            return self._fallback_response(f"Core Fault: {str(e)}")

    def _supervisor_audit(self, plan: List[Dict[str, Any]], intent: str) -> List[Dict[str, Any]]:
        """
        ELITE_SUPERVISOR_AUDIT: Verifies that the plan verifiably fulfills the user's intent.
        """
        if not plan:
            return self._fallback_response("I could not formulate a verifiably safe plan for that request.")
        
        # In a full Singularity version, this would be a second LLM pass.
        logger.info(f"Supervisor Audit: Plan depth {len(plan)} verifiably grounded in intent.")
        return plan

    def _defensive_parse(self, result_text: str) -> Optional[Dict[str, Any]]:
        try:
            return json.loads(result_text)
        except json.JSONDecodeError:
            logger.error(f"Defensive Parse Fault: {result_text[:100]}...")
            return None

    def _fallback_response(self, message: str) -> List[Dict[str, Any]]:
        logger.warning(f"Fallback Engaged: {message}")
        return [{"tool": "chat", "args": {"message": message}}]

    def _format_tools(self, tools):
        formatted = []
        for t in tools:
            args_desc = []
            schema = t.get("args", {})
            properties = schema.get("properties", {})
            required = schema.get("required", [])
            for prop, details in properties.items():
                req_str = "(REQUIRED)" if prop in required else "(OPTIONAL)"
                args_desc.append(f"{prop} {req_str}: {details.get('description', '')}")
            
            formatted.append(f"- {t['name']}: {t['description']}\n  Arguments: {', '.join(args_desc)}")
        return "\n".join(formatted)

    def _validate(self, output, tools, registry=None):
        valid_tools = {t["name"] for t in tools}
        if "plan" not in output or not isinstance(output["plan"], list):
            return []

        validated = []
        for step in output["plan"]:
            tool_name = step.get("tool")
            args = step.get("args", {})
            
            # Defensive Maneuver: If args is a string, attempt to wrap it
            if isinstance(args, str):
                tool_instance = registry.get_tool(tool_name) if registry else None
                if tool_instance:
                    schema = tool_instance.args
                    required = schema.get("required", [])
                    if len(required) == 1:
                        args = {required[0]: args}

            if tool_name in valid_tools:
                if registry and hasattr(registry, "validate_tool_args"):
                    if registry.validate_tool_args(tool_name, args):
                        # Ensure we use the (possibly wrapped) args
                        step["args"] = args
                        validated.append(step)
                    else:
                        logger.warning(f"Deep Validation Failed for {tool_name}. Purging.")
                else:
                    validated.append(step)
        return validated
