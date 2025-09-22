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

echo "🔧 Fixing static path resolution for ES modules..."
# Fix path resolution using import.meta.url (more reliable than import.meta.dirname)
node -e "
const fs = require('fs');
let content = fs.readFileSync('dist/index.js', 'utf8');

// Replace the path resolution with import.meta.url approach
content = content.replace(
  /path2\.resolve\(\"\.\", \"public\"\)/g, 
  'path2.resolve(path2.dirname(new URL(import.meta.url).pathname), \"public\")'
);

fs.writeFileSync('dist/index.js', content);
console.log('✅ ES module path resolution fixed with import.meta.url');
"

echo "✅ Production build completed successfully!"