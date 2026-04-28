import functools
import time
import logging
from typing import Any, Callable, Dict

logger = logging.getLogger("SOVRA Sovereign.Resilience")

class CircuitBreaker:
    """
    AEGIS_CIRCUIT_BREAKER (v3.0)
    Mandate: Absolute prevention of cascading system failures.
    """
    def __init__(self, failure_threshold=3, recovery_timeout=60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failures = 0
        self.last_failure_time = 0
        self.state = "CLOSED" # CLOSED, OPEN, HALF_OPEN

    def __call__(self, func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            if self.state == "OPEN":
                if time.time() - self.last_failure_time > self.recovery_timeout:
                    logger.info("[CircuitBreaker] Transitioning to HALF_OPEN for recovery test...")
                    self.state = "HALF_OPEN"
                else:
                    logger.error("[CircuitBreaker] Circuit is OPEN. Blocking request to prevent cascade.")
                    raise Exception("CIRCUIT_OPEN: The intelligence node is currently offline for recovery.")

            try:
                result = func(*args, **kwargs)
                if self.state == "HALF_OPEN":
                    logger.info("[CircuitBreaker] Recovery successful. Closing circuit.")
                    self.state = "CLOSED"
                    self.failures = 0
                return result
            except Exception as e:
                self.failures += 1
                self.last_failure_time = time.time()
                logger.warning(f"[CircuitBreaker] Failure recorded ({self.failures}/{self.failure_threshold}): {str(e)}")
                
                if self.failures >= self.failure_threshold:
                    logger.error("[CircuitBreaker] Failure threshold reached. Opening circuit.")
                    self.state = "OPEN"
                raise e
        return wrapper

class SovereignResilience:
    """
    SOVEREIGN_RESILIENCE_LAYER (v3.0)
    Mandate: 100/100 Stability through exponential backoff and circuit breaking.
    """
    
    @staticmethod
    def retry_with_backoff(retries: int = 3, backoff_in_seconds: int = 1):
        """
        Decorator that retries a function with exponential backoff.
        """
        def decorator(func: Callable):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                x = 0
                while True:
                    try:
                        return func(*args, **kwargs)
                    except Exception as e:
                        if x >= retries:
                            logger.error(f"MAX_RETRIES_EXCEEDED: {func.__name__} failed after {retries} attempts.")
                            raise e
                        
                        sleep = (backoff_in_seconds * (2 ** x))
                        logger.warning(f"[Resilience] Fault Detected: {str(e)}. Retrying in {sleep}s... ({x+1}/{retries})")
                        time.sleep(sleep)
                        x += 1
            return wrapper
        return decorator
