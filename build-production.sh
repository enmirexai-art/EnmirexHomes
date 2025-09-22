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

echo "✅ Production build completed successfully!"