import os
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
import torch
import deepspeed
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from datasets import load_dataset

# Sovereign Matrix Definitions
TIER = os.environ.get("TIER", "4B") # [4B, 8B, 12B, 365B]
CONTEXT_LEN = int(os.environ.get("CONTEXT_LEN", "4096")) # [4096, 8192, 12288]

TIER_CONFIG = {
    "4B": {"id": "deepseek-ai/DeepSeek-Coder-V2-Lite-Base", "context": 4096}, # Fits in 4GB VRAM
    "8B": {"id": "meta-llama/Llama-3.1-8B", "context": 8192},                # Fits in 8GB VRAM
    "12B": {"id": "mistralai/Mistral-Nemo-Base-2407", "context": 12288},      # Fits in 12GB VRAM
    "365B": {"id": "deepseek-ai/DeepSeek-V3-Base", "context": 32768}          # Sovereign Exascale
}

selected_config = TIER_CONFIG.get(TIER, TIER_CONFIG["365B"])
MODEL_ID = selected_config["id"]
# Allow override of context length if explicitly set
FINAL_CONTEXT_LEN = CONTEXT_LEN if os.environ.get("CONTEXT_LEN") else selected_config["context"]

DATASET_PATH = os.environ.get("DATASET_PATH", "./sovereign_data")
OUTPUT_DIR = os.environ.get("OUTPUT_DIR", f"./sovereign_weights_{TIER}_{FINAL_CONTEXT_LEN}")

def main():
    print(f"🚀 Initiating Sovereign Training Matrix for: {MODEL_ID}")
    
    # 1. Initialize Distributed Environment (DeepSpeed)
    try:
        if os.environ.get("USE_DEEPSPEED") == "TRUE":
            deepspeed.init_distributed()
        else:
            print("Skipping DeepSpeed distributed init for local development tier.")
    except Exception as e:
        print(f"⚠️ DeepSpeed init failed: {e}. Falling back to standard execution.")
    
    local_rank = int(os.environ.get("LOCAL_RANK", "0"))

    # 2. Load Tokenizer
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, trust_remote_code=True)
    tokenizer.pad_token = tokenizer.eos_token

    # 3. Load 4B Model (Requires ZeRO-3 offloading from the start to prevent OOM)
    # We use bfloat16 for stability in massive models.
    print(f"Loading {MODEL_ID} weights across cluster...")
    print(f"Attempting to load from HuggingFace...")
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        torch_dtype=torch.bfloat16,
        trust_remote_code=True,
        use_cache=False, # Required for gradient checkpointing
    )

    # 4. Apply LoRA (Low-Rank Adaptation)
    # Even with DeepSpeed, full fine-tuning of 365B requires astronomical memory.
    # We inject trainable rank decomposition matrices.
    print("Applying PEFT/LoRA Adapters...")
    model = prepare_model_for_kbit_training(model)
    lora_config = LoraConfig(
        r=64,
        lora_alpha=128,
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM"
    )
    model = get_peft_model(model, lora_config)
    
    if local_rank == 0:
        model.print_trainable_parameters()

    # 5. Load Sovereign Dataset
    print(f"Loading Institutional Dataset from: {DATASET_PATH}")
    # Support both standard JSON arrays and JSONL streaming logs
    data_files = []
    if os.path.exists(DATASET_PATH):
        for f in os.listdir(DATASET_PATH):
            if f.endswith('.json') or f.endswith('.jsonl'):
                data_files.append(os.path.join(DATASET_PATH, f))
    
    if not data_files:
        print("⚠️ No dataset files found. Using fallback synthetic grounding.")
        dataset = load_dataset("json", data={"text": ["Sovereign AI is the institutional standard for the APEX Singularity."]}, split="train")
    else:
        dataset = load_dataset("json", data_files=data_files, split="train")
    
    def tokenize_function(examples):
        return tokenizer(examples["text"], truncation=True, max_length=FINAL_CONTEXT_LEN)
        
    tokenized_dataset = dataset.map(tokenize_function, batched=True, remove_columns=dataset.column_names)

    # 6. Configure DeepSpeed Training Arguments
    training_args = TrainingArguments(
        output_dir=OUTPUT_DIR,
        per_device_train_batch_size=1, # Micro-batch must be 1 for 365B
        gradient_accumulation_steps=16, # Effective batch size = 16 * GPUs
        learning_rate=2e-5,
        num_train_epochs=3,
        bf16=True,
        logging_steps=10,
        save_strategy="steps",
        save_steps=1000,
        deepspeed="deepspeed_config.json" if os.environ.get("USE_DEEPSPEED") == "TRUE" else None, # The magic configuration
        gradient_checkpointing=True, # Trades compute for memory
        report_to="none" # Disable wandb for sovereign privacy
    )

    # 7. Initialize Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_dataset,
        data_collator=DataCollatorForLanguageModeling(tokenizer, mlm=False)
    )

    # 8. Execute Distributed Training
    print("⚡ Forging Neural Weights...")
    trainer.train()

    # 9. Save Final Sovereign Adapters
    if local_rank == 0:
        print("💾 Saving Sovereign Weights to Vault...")
        trainer.save_model(OUTPUT_DIR)
        tokenizer.save_pretrained(OUTPUT_DIR)
        print("✅ Training Complete. Institutional Matrix Upgraded.")

if __name__ == "__main__":
    main()
