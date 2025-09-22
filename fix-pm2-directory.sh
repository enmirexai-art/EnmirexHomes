#!/bin/bash
echo "🔄 Fixing PM2 working directory issue..."

# Stop current PM2 process
pm2 stop enmirex-homes
pm2 delete enmirex-homes

# Clear PM2 cache and saved processes
pm2 kill

# Rebuild the application
./build-production.sh

# Start with new configuration that sets correct working directory
pm2 start ecosystem.config.cjs --env production

# Save the new configuration
pm2 save

echo "✅ PM2 restarted with correct working directory"
echo "🧪 Testing the fix..."
sleep 3
pm2 logs enmirex-homes --lines 5
