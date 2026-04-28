import os

api_dir = 'src/app/api'
marker = "export const dynamic = 'force-static';"

for root, dirs, files in os.walk(api_dir):
    for file in files:
        if file == 'route.ts':
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            if 'force-static' not in content:
                print(f"Applying fix to {path}...")
                new_content = f"{marker}\n{content}"
                with open(path, 'w') as f:
                    f.write(new_content)
            else:
                print(f"Skipping {path} (already fixed).")
