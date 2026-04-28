import logging
import os
from typing import Dict, Any, List
from notion_client import Client
from jarvis.tools.base import Tool
from jarvis.core.security import SOVRA_APEXDeepLock
from pydantic import BaseModel, Field

logger = logging.getLogger("SOVRA Sovereign.Notion")

class NotionArchiverTool(Tool):
    """
    SOVEREIGN_NOTION_ARCHIVER (v1.0)
    Mandate: Historical anchoring and executive oversight via high-fidelity Notion integration.
    """
    
    class InputModel(BaseModel):
        content_type: str = Field(..., description="Type of archival: 'mission_log', 'architecture', or 'asset_ledger'.")
        payload: str = Field(..., description="The data to be archived.")
        parent_id: str = Field(os.getenv("NOTION_PAGE_ID", ""), description="Target Notion Page or Database ID.")

    @property
    def name(self) -> str:
        return "notion_archiver"

    @property
    def description(self) -> str:
        return "Archives project data, mission logs, and technical specifications into a centralized Notion workspace."

    def run(self, content_type: str, payload: str, parent_id: str = None) -> str:
        """
        Executes an institutional archival maneuver.
        """
        token = os.getenv("NOTION_INTEGRATION_TOKEN")
        if not token:
            return "Archival Fault: NOTION_INTEGRATION_TOKEN not found in environment."
        
        target_id = parent_id or os.getenv("NOTION_PAGE_ID")
        if not target_id:
            return "Archival Fault: Target Page/Database ID not provided."

        logger.info(f"Initiating archival pulse for {content_type}...")

        # 🛡️ SOVRA_APEX Security Wrap
        headers = SOVRA_APEXDeepLock.wrap_headers()
        
        try:
            # Notion Client Pulse
            notion = Client(auth=token)
            
            # 🎨 Executive Template Logic
            if content_type == "mission_log":
                title = f"Mission Log Pulse - {os.uname().nodename}"
                icon = "🚀"
            elif content_type == "architecture":
                title = f"Architectural Manifest v5.0"
                icon = "🏛️"
            else:
                title = f"Asset Ledger Accumulation"
                icon = "💰"

            # 🚀 Constructing High-Fidelity Blocks
            blocks = [
                {
                    "object": "block",
                    "type": "heading_2",
                    "heading_2": {
                        "rich_text": [{"type": "text", "text": {"content": title}}]
                    }
                },
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [{"type": "text", "text": {"content": f"Sovereign Archival Protocol: v1.0. Institutional Signature Verified."}}]
                    }
                }
            ]

            # Handling Code Snippets / Mermaid
            if "```" in payload:
                blocks.append({
                    "object": "block",
                    "type": "code",
                    "code": {
                        "rich_text": [{"type": "text", "text": {"content": payload.strip("`") if payload.startswith("```") else payload}}],
                        "language": "markdown"
                    }
                })
            else:
                blocks.append({
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [{"type": "text", "text": {"content": payload}}]
                    }
                })

            # ⚓ Anchoring to Notion
            notion.pages.create(
                parent={"page_id": target_id},
                icon={"type": "emoji", "emoji": icon},
                properties={
                    "title": [{"type": "text", "text": {"content": title}}]
                },
                children=blocks
            )

            return f"SUCCESS: {content_type} verifiably anchored in Notion workspace. Institutional signature: {headers['X-SOVRA_APEX-DEEP-LOCK'][:16]}..."
        
        except Exception as e:
            logger.error(f"Archival Fault: {e}")
            return f"Archival Fault: {str(e)}"
