import logging
import os
import requests
from typing import Dict, Any
from jarvis.tools.base import Tool
from jarvis.core.security import SOVRA_APEXDeepLock
from pydantic import BaseModel, Field

logger = logging.getLogger("SOVRA Sovereign.Gumroad")

class GumroadTool(Tool):
    """
    SOVEREIGN_GUMROAD_TOOL (v3.0)
    Mandate: High-fidelity digital asset management and sales tracking.
    """
    
    class InputModel(BaseModel):
        action: str = Field(..., description="Action to perform: 'get_products', 'get_sales', or 'update_product'.")
        product_id: str = Field(None, description="Optional Product ID for specific maneuvers.")
        data: Dict[str, Any] = Field(None, description="Optional data payload for updates.")

    @property
    def name(self) -> str:
        return "gumroad"

    @property
    def description(self) -> str:
        return "Manages Gumroad digital assets, tracks sales tranches, and optimizes product lifecycle."

    def run(self, action: str, product_id: str = None, data: Dict[str, Any] = None) -> str:
        """
        Executes an institutional Gumroad maneuver.
        """
        token = os.getenv("GUMROAD_TOKEN")
        if not token:
            return "Gumroad Fault: GUMROAD_TOKEN not found in environment."

        logger.info(f"Initiating Gumroad pulse: {action}...")

        # 🛡️ SOVRA_APEX Security Wrap (Internal Auditing)
        SOVRA_APEXDeepLock.wrap_headers()
        
        base_url = "https://api.gumroad.com/v2"
        headers = {"Authorization": f"Bearer {token}"}

        try:
            if action == "get_products":
                response = requests.get(f"{base_url}/products", headers=headers, timeout=10)
            elif action == "get_sales":
                response = requests.get(f"{base_url}/sales", headers=headers, timeout=10)
            elif action == "update_product" and product_id:
                response = requests.put(f"{base_url}/products/{product_id}", headers=headers, json=data, timeout=10)
            else:
                return f"Gumroad Fault: Invalid action or missing product_id for {action}."

            response.raise_for_status()
            res_data = response.json()
            
            if action == "get_products":
                count = len(res_data.get("products", []))
                return f"SUCCESS: Recovered {count} digital assets from Gumroad vault."
            elif action == "get_sales":
                count = len(res_data.get("sales", []))
                return f"SUCCESS: Recovered {count} sales tranches. Institutional revenue audit pending."
            else:
                return f"SUCCESS: Product {product_id} verifiably updated."

        except Exception as e:
            logger.error(f"Gumroad Fault: {e}")
            return f"Gumroad Fault: {str(e)}"
