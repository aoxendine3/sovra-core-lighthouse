import sys
import os

class CLI:
    """
    SOVEREIGN_INTERFACE_CLI (v2.0)
    Mandate: Elite aesthetic and absolute clarity for Sovereign Intelligence orchestration.
    """

    @staticmethod
    def get_input() -> str:
        """
        Ingress Pulse: Captured from CLI arguments or interactive prompt.
        """
        if len(sys.argv) > 1:
            return " ".join(sys.argv[1:])
        
        # 🏛️ Institutional Branding
        print("\n" + "═" * 60)
        print("  ANTI_GRAVITY SOVEREIGN INTELLIGENCE (v5.0)")
        print("═" * 60)
        return input("\n[IN]: ")

    @staticmethod
    def display_result(result: dict):
        """
        Result Archival: Formats the standard {"tool", "status", "output"} schema.
        """
        tool = result.get("tool", "UNKNOWN")
        status = result.get("status", "error").upper()
        output = result.get("output", "No output captured.")
        
        icon = "✅" if status == "SUCCESS" else "❌"
        
        print(f"\n{icon} [{tool}] -> {status}")
        print(f"   {output}")

    @staticmethod
    def display_plan(plan: list):
        """
        Strategic Visualization: Displays the orchestrated plan depth.
        """
        if not plan:
            print("\n⚠️ [Strategic Pulse]: No maneuvers formulated.")
            return

        print(f"\n🧠 [Strategic Plan]: Orchestrated {len(plan)} maneuvers.")
        for i, step in enumerate(plan):
            tool = step.get("tool")
            args = step.get("args")
            print(f"   {i+1}. ⚡ {tool} -> {args}")
        print("\n" + "─" * 40)
