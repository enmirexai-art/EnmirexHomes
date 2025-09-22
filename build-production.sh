#!/bin/bash

# Production build script with import.meta.dirname fix
# This replaces import.meta.dirname with process.cwd() during bundling

set -e

echo "🔨 Building frontend..."
npx vite build

echo "🔨 Building backend with import.meta.dirname fix..."
npx esbuild server/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outdir=dist \
  --define:import.meta.dirname='"."'

echo "🔧 Fixing static path resolution..."
# Replace the relative path resolution with absolute path using Node.js
node -e "
const fs = require('fs');
let content = fs.readFileSync('dist/index.js', 'utf8');
content = content.replace(
  /path2\.resolve\(\"\.\", \"public\"\)/g, 
  'path2.resolve(process.cwd(), \"public\")'
);
fs.writeFileSync('dist/index.js', content);
console.log('✅ Path resolution fixed');
"

echo "✅ Production build completed successfully!"