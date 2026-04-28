import os
import sys
from dotenv import load_dotenv
from notion_client import Client

sys.path.append(os.getcwd())

def test_notion():
    load_dotenv(".env.local")
    token = os.getenv("NOTION_INTEGRATION_TOKEN")
    page_id = os.getenv("NOTION_PAGE_ID")
    
    print(f"Testing Notion with Token: {token[:10]}... and Page ID: {page_id}")
    
    try:
        notion = Client(auth=token)
        page = notion.pages.retrieve(page_id=page_id)
        # Handle the property structure correctly for different page types
        print("SUCCESS: Successfully connected to Notion.")
    except Exception as e:
        print(f"FAULT: Notion connection failed: {e}")

if __name__ == "__main__":
    test_notion()
