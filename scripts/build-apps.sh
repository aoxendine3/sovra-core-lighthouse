#!/usr/bin/env bash
set -euo pipefail

# ------------------------------------------------------------
# Build all productivity PWAs (notes, todo, calendar)
# ------------------------------------------------------------

APP_DIRS=("apps/notes" "apps/todo" "apps/calendar")
OUT_DIR="dist"

mkdir -p "$OUT_DIR"

for APP in "${APP_DIRS[@]}"; do
  echo "\n=== Building $APP ==="
  pushd "$APP" > /dev/null
  # Install deps (if any) and build with Vite
  if [ -f package.json ]; then
    npm ci
    npm run build
    # Vite outputs to dist by default; move to top-level dist folder with app name
    cp -r dist "../../$OUT_DIR/$(basename $APP)"
  else
    echo "⚠️ No package.json in $APP – skipping"
  fi
  popd > /dev/null
done

echo "\n✅ All apps built. Artifacts are in $OUT_DIR/"
