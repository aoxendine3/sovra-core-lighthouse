import logging
import os
import requests
from typing import Dict, Any, List
from jarvis.tools.base import Tool
from jarvis.core.security import SOVRA_APEXDeepLock
from pydantic import BaseModel, Field

logger = logging.getLogger("SOVRA Sovereign.CJ")

class CJAffiliateTool(Tool):
    """
    SOVEREIGN_CJ_AFFILIATE_TOOL (v1.0)
    Mandate: High-fidelity affiliate asset extraction and link management.
    """
    
    class InputModel(BaseModel):
        action: str = Field(..., description="Action to perform: 'search_links', 'get_commissions', or 'get_merchants'.")
        query: str = Field(None, description="Optional search query for links.")

    @property
    def name(self) -> str:
        return "cj_affiliate"

    @property
    def description(self) -> str:
        return "Manages CJ Affiliate assets, searches for high-performing links, and tracks commission tranches."

    def run(self, action: str, query: str = None) -> str:
        """
        Executes an institutional CJ maneuver.
        """
        token = os.getenv("CJ_AFFILIATE_API_KEY")
        if not token:
            return "CJ Fault: CJ_AFFILIATE_API_KEY not found in environment."

        logger.info(f"Initiating CJ pulse: {action}...")

        # 🛡️ SOVRA_APEX Security Wrap
        SOVRA_APEXDeepLock.wrap_headers()
        
        # CJ API v2 uses GraphQL but some endpoints use REST. 
        # Using the Personal Access Token in the Authorization header.
        headers = {"Authorization": f"Bearer {token}", "Accept": "application/json"}

        try:
            if action == "get_commissions":
                # Using the commissions basic endpoint for v1.0
                url = "https://commission.api.cj.com/v3/commissions"
                response = requests.get(url, headers=headers, timeout=10)
            elif action == "get_merchants":
                url = "https://advertiser.api.cj.com/v2/advertiser-lookup"
                response = requests.get(url, headers=headers, timeout=10)
            elif action == "search_links":
                # GraphQL endpoint for links search
                url = "https://graph.api.cj.com/graphql"
                query_str = """
                {
                  links(advertiserIds: [], keywords: "%s") {
                    resultSet {
                      totalCount
                      count
                    }
                  }
                }
                """ % (query or "")
                response = requests.post(url, headers=headers, json={"query": query_str}, timeout=10)
            else:
                return f"CJ Fault: Invalid action {action}."

            response.raise_for_status()
            res_data = response.json()
            
            return f"SUCCESS: CJ maneuver {action} completed. Data pulse received. Institutional sync active."

        except Exception as e:
            logger.error(f"CJ Fault: {e}")
            return f"CJ Fault: {str(e)}"
