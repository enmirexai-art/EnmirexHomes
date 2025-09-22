#!/bin/bash

echo "🚀 Starting Enmirex Homes in Production Mode"
echo ""

# Kill any existing development servers
echo "🛑 Stopping development server..."
pkill -f "tsx server/index.ts" 2>/dev/null || true

# Make sure we have a fresh build with import.meta.dirname fixes
echo "🔨 Building latest version with ES module fixes..."
./build-production.sh

# Start production server
echo "🚀 Starting production server..."
echo "✅ Website will be available at: http://localhost:5000"
echo "✅ CSS and JavaScript will work correctly"
echo "✅ All security features enabled"
echo ""

NODE_ENV=production node dist/index.js