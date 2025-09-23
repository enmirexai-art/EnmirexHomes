#!/bin/bash
# Script to deploy the Vite-free version to VM

echo "=== Deploying Vite-free version to VM ==="

# Stop existing containers
echo "Stopping existing containers..."
sudo docker rm -f nginx-proxy-acme nginx-proxy enmirex-homes || true

# Create network
echo "Creating network..."
sudo docker network create enmirex-net || true

# Pull the latest image (this will be built by GitHub Actions)
echo "Pulling latest image from Docker Hub..."
sudo docker pull enmirexai/enmirex-homes:latest

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

# Start app container with latest image
echo "Starting app container with latest image..."
sudo docker run -d --name enmirex-homes --network enmirex-net --restart unless-stopped \
  --env-file /home/enmirexai/enmirex-homes/.env \
  -e VIRTUAL_HOST=enmirex.com,www.enmirex.com \
  -e LETSENCRYPT_HOST=enmirex.com,www.enmirex.com \
  -e LETSENCRYPT_EMAIL=admin@enmirex.com \
  --expose 3000 \
  enmirexai/enmirex-homes:latest

# Wait and test
echo "Waiting for containers to start..."
sleep 30

echo "Testing health endpoint..."
curl http://34.61.168.94/api/health

echo "Checking container status..."
sudo docker ps

echo "=== Deployment complete ==="
