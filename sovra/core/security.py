import hmac
import hashlib
import time
import jwt
import logging
from jarvis.config import settings
import os

logger = logging.getLogger("SOVRA Sovereign.Security")

class SOVRA_APEXDeepLock:
    """
    APEX_SOVEREIGN_SOVRA_APEX_PROTOCOL (v18.0)
    Mandate: Unitary Handshake Enforcement for Sovereign Ingress.
    """
    
    SECRET = os.getenv("HANDSHAKE_SECRET", "996d03efcde823428553aed2b094c067c3ae39046b7916862cee477b38b7747e63e03bf7c1f1f41604739142af6f6a37b4115b56da1b03f206b3f0f0bf54beab")

    @classmethod
    def generate_handshake(cls) -> str:
        """
        Generates a Unitary Signature pulse for secure egress.
        Matches the HandshakeEdge (v1.0_SOVRA) standard.
        """
        payload = {
            "sovereign": "SOVRA_CORE",
            "iat": int(time.time()),
            "exp": int(time.time()) + 60,
            "jti": hashlib.sha256(str(time.time()).encode()).hexdigest()[:16]
        }
        return jwt.encode(payload, cls.SECRET, algorithm="HS256")

    @classmethod
    def validate_handshake(cls, token: str) -> bool:
        """
        Verifies the depth and validity of an incoming handshake pulse.
        """
        try:
            payload = jwt.decode(token, cls.SECRET, algorithms=["HS256"])
            
            # Sovereign Identity Validation
            if payload.get("sovereign") != "SOVRA_CORE":
                logger.warning("Security Fault: Invalid sovereign identity in handshake.")
                return False

            # Expiration Validation
            if payload.get("exp", 0) < time.time():
                logger.warning("Security Fault: Handshake pulse expired.")
                return False

            return True
        except Exception as e:
            logger.error(f"Security Fault: Handshake validation failed: {e}")
            return False

    @classmethod
    def wrap_headers(cls, headers: dict = None) -> dict:
        """
        Injects the X-SOVRA_APEX-DEEP-LOCK header into an institutional egress.
        """
        if headers is None:
            headers = {}
        headers["X-SOVRA_APEX-DEEP-LOCK"] = cls.generate_handshake()
        return headers
