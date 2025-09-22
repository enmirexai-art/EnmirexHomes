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

// Fix all path resolution issues with import.meta.dirname and vite config paths
// Replace path2.resolve(\".\",...) with proper path resolution
content = content.replace(
  /path2\.resolve\(\"\.\", \"public\"\)/g, 
  'path2.resolve(path2.dirname(new URL(import.meta.url).pathname), \"public\")'
);

// Fix path.resolve(import.meta.dirname, \"public\") pattern
content = content.replace(
  /path2\.resolve\(import\.meta\.dirname, \"public\"\)/g,
  'path2.resolve(path2.dirname(new URL(import.meta.url).pathname), \"public\")'
);

// Fix path.resolve(import.meta.dirname, \"..\", \"client\", \"index.html\") pattern  
content = content.replace(
  /path2\.resolve\(\s*import\.meta\.dirname,\s*\"\.\.\",\s*\"client\",\s*\"index\.html\"\s*\)/g,
  'path2.resolve(path2.dirname(new URL(import.meta.url).pathname), \"..\", \"client\", \"index.html\")'
);

// Fix vite.config path.resolve patterns that got bundled (causing the Docker error)
// Fix path.resolve(\".\", \"client\", \"src\") pattern from vite config
content = content.replace(
  /path\.resolve\(\"\.\", \"client\", \"src\"\)/g,
  'path.resolve(path.dirname(new URL(import.meta.url).pathname), \"client\", \"src\")'
);

// Fix path.resolve(\".\", \"shared\") pattern from vite config
content = content.replace(
  /path\.resolve\(\"\.\", \"shared\"\)/g,
  'path.resolve(path.dirname(new URL(import.meta.url).pathname), \"shared\")'
);

// Fix path.resolve(\".\", \"attached_assets\") pattern from vite config
content = content.replace(
  /path\.resolve\(\"\.\", \"attached_assets\"\)/g,
  'path.resolve(path.dirname(new URL(import.meta.url).pathname), \"attached_assets\")'
);

// Fix path.resolve(\".\", \"client\") pattern from vite config
content = content.replace(
  /path\.resolve\(\"\.\", \"client\"\)/g,
  'path.resolve(path.dirname(new URL(import.meta.url).pathname), \"client\")'
);

// Fix path.resolve(\".\", \"dist/public\") pattern from vite config
content = content.replace(
  /path\.resolve\(\"\.\", \"dist\/public\"\)/g,
  'path.resolve(path.dirname(new URL(import.meta.url).pathname), \"dist/public\")'
);

// Fix any remaining import.meta.dirname references
content = content.replace(
  /import\.meta\.dirname/g,
  'path2.dirname(new URL(import.meta.url).pathname)'
);

fs.writeFileSync('dist/index.js', content);
console.log('✅ ES module path resolution fixed with import.meta.url');
"

echo "✅ Production build completed successfully!"