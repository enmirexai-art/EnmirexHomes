#!/bin/bash
# Simple fix for vite issue on VM

echo "=== Simple vite fix on VM ==="

# Stop existing containers
echo "Stopping existing containers..."
sudo docker rm -f nginx-proxy-acme nginx-proxy enmirex-homes || true

# Create network if it doesn't exist
echo "Creating network..."
sudo docker network create enmirex-net || true

# Create a minimal fixed Dockerfile
echo "Creating minimal fixed Dockerfile..."
cat > Dockerfile.minimal << 'EOF'
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

COPY package*.json ./
RUN npm ci --omit=dev && npm install vite@^5.4.19 && npm cache clean --force

COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/.env.production.example ./
RUN cp .env.production.example .env

WORKDIR /app/dist
RUN mkdir -p logs && chown nextjs:nodejs logs
USER nextjs

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "const http = require('http'); const options = { host: 'localhost', port: process.env.APP_PORT || 3000, path: '/api/health', timeout: 2000 }; const req = http.request(options, (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }); req.on('error', () => { process.exit(1); }); req.end();"

CMD ["sh", "-c", "unset PORT && node index.js"]
EOF

# Build the fixed image
echo "Building fixed image..."
sudo docker build -f Dockerfile.minimal -t enmirexai/enmirex-homes:fixed .

# Start nginx-proxy
echo "Starting nginx-proxy..."
sudo docker run -d --name nginx-proxy --network enmirex-net --restart unless-stopped \
  -p 80:80 -p 443:443 \
  -v /etc/nginx/certs:/etc/nginx/certs \
  -v /etc/nginx/vhost.d:/etc/nginx/vhost.d \
  -v /usr/share/nginx/html:/usr/share/nginx/html \
  -v /var/run/docker.sock:/tmp/docker.sock:ro \
  nginxproxy/nginx-proxy:alpine

# Start ACME companion
echo "Starting ACME companion..."
sudo docker run -d --name nginx-proxy-acme --network enmirex-net --restart unless-stopped \
  -e DEFAULT_EMAIL=admin@enmirex.com \
  -v /etc/nginx/certs:/etc/nginx/certs \
  -v /etc/nginx/vhost.d:/etc/nginx/vhost.d \
  -v /usr/share/nginx/html:/usr/share/nginx/html \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  nginxproxy/acme-companion

# Start app container with fixed image
echo "Starting app container with fixed image..."
sudo docker run -d --name enmirex-homes --network enmirex-net --restart unless-stopped \
  --env-file /home/enmirexai/enmirex-homes/.env \
  -e VIRTUAL_HOST=enmirex.com,www.enmirex.com \
  -e LETSENCRYPT_HOST=enmirex.com,www.enmirex.com \
  -e LETSENCRYPT_EMAIL=admin@enmirex.com \
  --expose 3000 \
  enmirexai/enmirex-homes:fixed

echo "Waiting for containers to start..."
sleep 30

echo "Testing..."
curl -f http://localhost/api/health || echo "Health check failed"
curl -f http://34.61.168.94/api/health || echo "External health check failed"

echo "=== Fix complete ==="
