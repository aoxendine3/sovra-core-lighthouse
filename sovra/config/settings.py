import os
from dotenv import load_dotenv

# 🏛️ Institutional Configuration Ledger
load_dotenv()

MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:latest")
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
ENDPOINT = f"{OLLAMA_HOST}/api/generate"
SAFETY_TIMEOUT = 120  # Increased for exascale maneuvers
