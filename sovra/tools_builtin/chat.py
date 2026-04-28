from jarvis.tools.base import Tool
from pydantic import BaseModel, Field

class ChatTool(Tool):
    """
    Sovereign Chat Tool (v3.0)
    Mandate: Absolute conversational passthrough for non-orchestrated intent.
    """
    
    class InputModel(BaseModel):
        message: str = Field(..., description="The conversational message to transmit to the user.")

    @property
    def name(self) -> str:
        return "chat"

    @property
    def description(self) -> str:
        return "Used for direct conversational responses when no specific tool maneuver is required."

    def run(self, message: str) -> str:
        """
        Transmits the conversational pulse directly to the interface.
        """
        return message
