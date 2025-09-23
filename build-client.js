#!/usr/bin/env node
import { build } from 'esbuild';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the HTML template
const htmlTemplate = readFileSync(join(__dirname, 'client', 'index.html'), 'utf-8');

// Build the React app
await build({
  entryPoints: [join(__dirname, 'client', 'src', 'main.tsx')],
  bundle: true,
  outfile: join(__dirname, 'dist', 'public', 'index.js'),
  format: 'iife',
  globalName: 'App',
  minify: true,
  sourcemap: false,
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.js': 'js',
    '.jsx': 'jsx',
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.gif': 'file',
    '.svg': 'file'
  },
  resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
  alias: {
    '@': join(__dirname, 'client', 'src'),
    '@shared': join(__dirname, 'shared'),
    '@assets': join(__dirname, 'attached_assets')
  }
});

// Create the production HTML file
const productionHtml = htmlTemplate
  .replace('<script type="module" src="/src/main.tsx"></script>', '<script src="/index.js"></script>');

// Write the production HTML
import { writeFileSync, mkdirSync } from 'fs';
mkdirSync(join(__dirname, 'dist', 'public'), { recursive: true });
writeFileSync(join(__dirname, 'dist', 'public', 'index.html'), productionHtml);

console.log('✅ Client built successfully!');
