import requests
import logging
from typing import Dict, Any
from urllib3.util.retry import Retry
from requests.adapters import HTTPAdapter
from jarvis.config import settings

logger = logging.getLogger("SOVRA Sovereign.Client")

class SovereignClient:
    """
    SOVEREIGN_CLIENT (v3.0)
    Mandate: Absolute network resilience through connection pooling and institutional retries.
    """
    
    def __init__(self, timeout: int = None):
        self.timeout = timeout or settings.SAFETY_TIMEOUT
        self.session = self._build_session()

    def _build_session(self) -> requests.Session:
        """
        Constructs a hardened session with institutional retry logic.
        """
        session = requests.Session()
        
        # Institutional Retry Strategy: 3 retries on transient errors
        retry_strategy = Retry(
            total=3,
            backoff_factor=1,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["POST"]
        )
        
        adapter = HTTPAdapter(max_retries=retry_strategy)
        session.mount("http://", adapter)
        session.mount("https://", adapter)
        
        return session

    def post(self, url: str, payload: Dict[str, Any], stream: bool = False) -> requests.Response:
        """
        Institutional POST Ingress: Shielded execution with absolute timeout enforcement.
        """
        try:
            response = self.session.post(
                url, 
                json=payload, 
                timeout=self.timeout,
                stream=stream
            )
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            logger.error(f"Network Ingress Fault: {str(e)}")
            raise e
