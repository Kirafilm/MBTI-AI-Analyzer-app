#!/usr/bin/env bash
# First-time VPS setup (Ubuntu 22.04 / 24.04). Run on the server as root or with sudo.
set -euo pipefail

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "Run with sudo: sudo bash scripts/vps-bootstrap.sh"
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get upgrade -y
apt-get install -y curl git nginx certbot python3-certbot-nginx ufw

# Node.js 22 LTS
if ! command -v node >/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

# PM2
if ! command -v pm2 >/dev/null; then
  npm install -g pm2
  pm2 startup systemd -u "${SUDO_USER:-ubuntu}" --hp "/home/${SUDO_USER:-ubuntu}" || true
fi

# Firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# App directories
mkdir -p /var/www/mbti-app
mkdir -p /opt/mbti-api
chown -R "${SUDO_USER:-ubuntu}:${SUDO_USER:-ubuntu}" /var/www/mbti-app /opt/mbti-api

systemctl enable nginx
systemctl restart nginx

echo ""
echo "Bootstrap done."
echo "  Node: $(node -v)"
echo "  npm:  $(npm -v)"
echo "Next: deploy app with scripts/vps-deploy.sh (from your Mac) or manually."
