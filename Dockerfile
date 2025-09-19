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

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist

# Copy necessary config files
COPY --chown=nextjs:nodejs ecosystem.config.js ./

# Create logs directory
RUN mkdir -p logs && chown nextjs:nodejs logs

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "const http = require('http'); const options = { host: 'localhost', port: 3000, path: '/api/health', timeout: 2000 }; const req = http.request(options, (res) => { console.log('Health check passed'); process.exit(0); }); req.on('error', () => { console.log('Health check failed'); process.exit(1); }); req.end();"

# Start command
CMD ["node", "dist/index.js"]