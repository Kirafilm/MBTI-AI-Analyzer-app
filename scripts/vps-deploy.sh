#!/usr/bin/env bash
# Deploy MBTI app to VPS from your Mac.
# Prerequisites: SSH access, .env.production on server at /opt/mbti-api/.env
#
# Usage:
#   export VPS_HOST=ubuntu@YOUR_PUBLIC_IP
#   export VPS_DOMAIN=mbti.example.com   # optional, for reminder only
#   ./scripts/vps-deploy.sh

set -euo pipefail

: "${VPS_HOST:?Set VPS_HOST, e.g. ubuntu@123.45.67.89}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Building API..."
npm run build:api
API_BUNDLE="$(mktemp)"
cp dist/index.js "$API_BUNDLE"

echo "==> Building web (needs EXPO_PUBLIC_* in environment)..."
if [[ -f .env.production ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.production
  set +a
fi
npm run build:web
WEB_DIST="$(mktemp -d)"
cp -R dist/. "$WEB_DIST/"

echo "==> Uploading API..."
ssh "$VPS_HOST" "mkdir -p /opt/mbti-api/dist"
rsync -avz \
  "$API_BUNDLE" \
  "$VPS_HOST:/opt/mbti-api/dist/index.js"
rsync -avz \
  package.json package-lock.json \
  deploy/ecosystem.config.cjs \
  "$VPS_HOST:/opt/mbti-api/"
ssh "$VPS_HOST" "cd /opt/mbti-api && npm ci --omit=dev"

echo "==> Uploading web..."
rsync -avz --delete "$WEB_DIST/" "$VPS_HOST:/var/www/mbti-app/"

echo "==> Restarting API..."
ssh "$VPS_HOST" "cd /opt/mbti-api && pm2 startOrReload ecosystem.config.cjs && pm2 save"

echo ""
echo "Deploy complete."
echo "  Web: /var/www/mbti-app"
echo "  API: pm2 process mbti-api on port 3000"
if [[ -n "${VPS_DOMAIN:-}" ]]; then
  echo "  URL: https://${VPS_DOMAIN}"
fi
