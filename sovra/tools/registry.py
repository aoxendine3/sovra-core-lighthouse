import os
import importlib.util
import logging
from typing import Dict, List, Any
from jarvis.tools.base import Tool

logger = logging.getLogger("SOVRA Sovereign.Registry")

class ToolRegistry:
    """
    SOVEREIGN_TOOL_REGISTRY (v2.0)
    Mandate: Dynamic discovery and absolute availability.
    """
    def __init__(self):
        self.tools: Dict[str, Tool] = {}

    def auto_load(self, directories: list):
        """
        Scans directories and auto-loads Tool classes.
        """
        for directory in directories:
            if not os.path.exists(directory):
                logger.warning(f"Registry Discovery: Directory {directory} not found.")
                continue
                
            for filename in os.listdir(directory):
                if filename.endswith(".py") and filename != "__init__.py":
                    module_name = filename[:-3]
                    file_path = os.path.join(directory, filename)
                    
                    try:
                        # Dynamic Import
                        spec = importlib.util.spec_from_file_location(module_name, file_path)
                        module = importlib.util.module_from_spec(spec)
                        spec.loader.exec_module(module)
                        
                        # Find Tool Classes
                        for item_name in dir(module):
                            item = getattr(module, item_name)
                            if isinstance(item, type) and issubclass(item, Tool) and item is not Tool:
                                tool_instance = item()
                                self.tools[tool_instance.name] = tool_instance
                                logger.info(f"Registry Discovery: Auto-Loaded {tool_instance.name}")
                    except Exception as e:
                        logger.error(f"Registry Fault: Failed to load module {module_name}: {e}")

    def get_tool(self, name: str) -> Tool:
        return self.tools.get(name)

    def get_all_schemas(self) -> List[Dict[str, Any]]:
        return [
            {
                "name": t.name,
                "description": t.description,
                "args": t.args
            } for t in self.tools.values()
        ]

    def validate_tool_args(self, tool_name: str, args: Dict[str, Any]) -> bool:
        """
        Institutional Deep Validation: Verifies arguments against the tool's Pydantic model.
        """
        tool = self.tools.get(tool_name)
        if not tool:
            return False
            
        try:
            tool.InputModel(**args)
            return True
        except Exception as e:
            logger.warning(f"Validation Fault: Arguments for {tool_name} do not match schema. Error: {e}")
            return False
