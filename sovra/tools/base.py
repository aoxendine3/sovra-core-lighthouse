from abc import ABC, abstractmethod
from typing import Dict, Any, Type
from pydantic import BaseModel, ValidationError

class Tool(ABC):
    """
    SOVEREIGN_TOOL_BASE (v4.0)
    Mandate: Absolute type-safety and institutional schema enforcement.
    """

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        # 🛡️ Institutional Definition Enforcement (Elite Standard)
        if cls is not Tool and cls.InputModel is Tool.InputModel:
            raise TypeError(f"INSTITUTIONAL_FAULT: Class {cls.__name__} must override 'InputModel' for verifiably safe execution.")

    # 🏛️ Institutional Schema Base
    class InputModel(BaseModel):
        pass

    @property
    @abstractmethod
    def name(self) -> str:
        pass

    @property
    @abstractmethod
    def description(self) -> str:
        pass

    @property
    def args(self) -> Dict[str, Any]:
        """Returns the JSON schema of the InputModel."""
        return self.InputModel.model_json_schema()

    @abstractmethod
    def run(self, **kwargs) -> Any:
        pass

    def validate_and_run(self, **kwargs) -> Any:
        """
        AEGIS_VALIDATION: Verifies arguments against the InputModel before execution.
        """
        try:
            validated_data = self.InputModel(**kwargs)
            return self.run(**validated_data.model_dump())
        except ValidationError as e:
            raise Exception(f"SCHEMA_VALIDATION_FAULT: {str(e)}")
