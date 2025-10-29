#!/bin/bash

# CapCut Maker - Ubuntu/Linux Installation Script
# Author: Nanda Gunawan

echo "🎬 CapCut Maker - Ubuntu Installation Script"
echo "=============================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "⚠️  Please run as root or with sudo"
    echo "Usage: sudo bash install-ubuntu.sh"
    exit 1
fi

echo "📦 Updating system packages..."
apt-get update -qq

echo "📦 Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
    echo "✅ Node.js installed: $(node -v)"
else
    echo "✅ Node.js already installed: $(node -v)"
fi

echo ""
echo "📦 Installing Puppeteer dependencies..."
apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils \
    --no-install-recommends -qq

echo "✅ System dependencies installed!"
echo ""

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    echo "⚠️  Warning: package.json not found!"
    echo "Please run this script from the capcut-bot-main directory"
    exit 1
fi

echo "📦 Installing NPM dependencies..."
npm install

echo ""
echo "=============================================="
echo "✅ Installation completed successfully!"
echo ""
echo "🚀 To start the server, run:"
echo "   npm start"
echo ""
echo "🌐 Then open your browser and visit:"
echo "   http://localhost:3000"
echo ""
echo "=============================================="

