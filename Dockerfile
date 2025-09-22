# Multi-stage Dockerfile for Enmirex Homes
# This provides an alternative deployment option to the shell script

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Make build script executable and build
RUN chmod +x build-production.sh && ./build-production.sh

# Production stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy package files
COPY package*.json ./

# Install production dependencies and add vite (needed by server/vite.ts imports)
RUN npm ci --omit=dev && npm install vite@^5.4.19 && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist

# Copy vite config needed by server imports  
COPY --from=builder --chown=nextjs:nodejs /app/vite.config.ts ./

# Copy necessary config files to dist directory
COPY --chown=nextjs:nodejs ecosystem.config.cjs ./dist/

# Copy environment template 
COPY --from=builder --chown=nextjs:nodejs /app/.env.production.example ./
RUN cp .env.production.example .env

# Change working directory to dist so import.meta.dirname resolves correctly
WORKDIR /app/dist

# Create logs directory
RUN mkdir -p logs && chown nextjs:nodejs logs

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE ${APP_PORT:-3000}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "const http = require('http'); const options = { host: 'localhost', port: process.env.APP_PORT || 3000, path: '/api/health', timeout: 2000 }; const req = http.request(options, (res) => { console.log('Health check passed'); process.exit(0); }); req.on('error', () => { console.log('Health check failed'); process.exit(1); }); req.end();"

# Start command (from /app/dist directory) 
# Unset PORT to avoid conflicts with APP_PORT
CMD ["sh", "-c", "unset PORT && node index.js"]