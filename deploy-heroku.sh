#!/bin/bash

# CapCut Maker - Quick Deploy to Heroku Script
# Author: Nanda Gunawan

echo "🎬 CapCut Maker - Heroku Deployment Script"
echo "==========================================="
echo ""

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found!"
    echo "Please install: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

echo "✅ Heroku CLI detected"
echo ""

# Login to Heroku
echo "🔐 Logging in to Heroku..."
heroku login

# Get app name
echo ""
read -p "Enter your Heroku app name (or press Enter for auto-generated): " APP_NAME

# Create Heroku app
echo ""
echo "🚀 Creating Heroku app..."
if [ -z "$APP_NAME" ]; then
    heroku create
else
    heroku create "$APP_NAME"
fi

# Get the app name from Heroku
APP_NAME=$(heroku apps:info --json | grep -o '"name":"[^"]*' | grep -o '[^"]*$')

echo "✅ App created: $APP_NAME"
echo ""

# Add buildpacks
echo "📦 Adding buildpacks..."
heroku buildpacks:clear --app "$APP_NAME"
heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-google-chrome --app "$APP_NAME"
heroku buildpacks:add --index 2 heroku/nodejs --app "$APP_NAME"

echo "✅ Buildpacks added"
echo ""

# Set environment variables
echo "⚙️  Setting environment variables..."
heroku config:set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true --app "$APP_NAME"
heroku config:set PUPPETEER_SKIP_DOWNLOAD=true --app "$APP_NAME"
heroku config:set NODE_ENV=production --app "$APP_NAME"

echo "✅ Environment variables set"
echo ""

# Initialize git if needed
if [ ! -d .git ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Add Heroku remote
echo "🔗 Adding Heroku remote..."
heroku git:remote --app "$APP_NAME"

# Deploy
echo ""
echo "🚀 Deploying to Heroku..."
git push heroku master 2>/dev/null || git push heroku main

echo ""
echo "==========================================="
echo "✅ Deployment completed!"
echo ""
echo "🌐 Your app URL:"
echo "   https://$APP_NAME.herokuapp.com"
echo ""
echo "📊 View logs:"
echo "   heroku logs --tail --app $APP_NAME"
echo ""
echo "🔧 Open app:"
echo "   heroku open --app $APP_NAME"
echo "==========================================="

