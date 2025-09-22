#!/bin/bash

# Deployment script for Enmirex Homes on Google Cloud Platform e2 micro VM
# Make this file executable: chmod +x deploy.sh

set -e

echo "🚀 Starting deployment for Enmirex Homes..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2 globally..."
    npm install -g pm2
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p logs
mkdir -p dist

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Creating .env file from template..."
    cp .env.production.example .env
    echo "🔧 Please edit .env file with your production values before running the application"
fi

# Install dependencies (including dev dependencies for build)
echo "📦 Installing dependencies..."
npm ci

# Build the application with import.meta.dirname fix
echo "🔨 Building the application..."
sudo ./build-production.sh

# Check if build was successful
if [ ! -f "dist/index.js" ]; then
    echo "❌ Build failed. dist/index.js not found."
    exit 1
fi

# Prune dev dependencies for production (but keep vite for server imports)
echo "🧹 Pruning dev dependencies..."
npm prune --production
echo "📦 Installing vite for production runtime..."
npm install vite@^5.4.19

# Stop existing PM2 process (if running)
echo "🛑 Stopping existing application..."
pm2 stop enmirex-homes || echo "No existing process to stop"

# Clear PORT environment variable to avoid conflicts with APP_PORT
unset PORT

# Start the application with PM2 (ecosystem.config.cjs sets working directory to dist)
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.cjs --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup

echo "✅ Deployment completed successfully!"
echo ""
echo "📋 Post-deployment checklist:"
echo "1. Configure Nginx reverse proxy (see nginx.conf.example)"
echo "2. Setup SSL certificate"
echo "3. Configure firewall to allow ports 80 and 443"
echo "4. Verify .env file has correct values"
echo "5. Test the application: curl http://localhost:${APP_PORT:-3000}"
echo ""
echo "📊 Monitor application:"
echo "- View logs: pm2 logs enmirex-homes"
echo "- Monitor status: pm2 status"
echo "- Restart: pm2 restart enmirex-homes"
echo ""
echo "🌐 Application should be running on port ${APP_PORT:-3000}"
