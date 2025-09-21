# Enmirex Homes - Google Cloud Platform Deployment Guide

This guide covers deploying the Enmirex Homes website to Google Cloud Platform e2 micro VM instance with your static IP and Squarespace domain.

## Prerequisites

- **Google Cloud Platform account** with billing enabled
- **e2 micro VM instance** created with static IP
- **Squarespace domain** (enmirex.com) to be pointed to GCP static IP
- **SSH access** to your GCP VM instance
- **Google Sheets API credentials** for lead capture

## GCP e2 Micro VM Specifications

- **CPU**: 1 vCPU (shared)
- **RAM**: 1 GB
- **Storage**: 10 GB persistent disk
- **Network**: Static external IP address
- **OS**: Ubuntu 22.04 LTS (recommended)

## Deployment Methods

This guide covers three deployment methods for the Enmirex Homes application:

1. **Automated Script Deployment** (Recommended for production)
2. **Manual Deployment** (For development and testing)
3. **Docker Deployment** (For containerized environments)

Choose the method that best fits your environment and requirements.

---

## Method 1: Automated Script Deployment (Recommended)

This is the recommended approach for production deployments on GCP e2 micro VMs.

### Quick Deployment Process

### 1. GCP VM Instance Setup

#### Create and Configure VM Instance

```bash
# Connect to your GCP VM via SSH from GCP Console or:
gcloud compute ssh your-vm-instance-name --zone=your-zone

# Or use SSH directly with your static IP:
ssh username@YOUR_STATIC_IP
```

#### Run Initial Setup Script

```bash
# Download and run the GCP setup script (replace with your actual repo URL)
# wget https://raw.githubusercontent.com/your-username/enmirex-homes/main/gcp-startup-script.sh
# For now, copy the script content from your project
chmod +x gcp-startup-script.sh
./gcp-startup-script.sh
```

### 2. Deploy Application

#### Clone and Setup Application

```bash
# Navigate to application directory
cd /var/www/enmirex-homes

# Clone your repository (replace with your actual repo URL)
git clone https://github.com/your-username/enmirex-homes.git .

# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

#### Configure Environment Variables

```bash
# Copy and edit environment file
cp .env.production.example .env
nano .env
```

Set the following required variables:
```env
NODE_ENV=production
PORT=3000
GOOGLE_CLIENT_EMAIL=enmirexaigooglesheets@wholesaleleadsenmirex.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=1s2t9t8rGJwbe1bM5Uj_mQ7FWV5rfqlICG34K6Wo4eWs
SESSION_SECRET=your-secure-random-string-here
CORS_ORIGIN=https://enmirex.com
TRUST_PROXY=true
```

### 3. Configure Nginx

#### Install and Configure Nginx

```bash
# Copy Nginx configuration
sudo cp nginx.conf.example /etc/nginx/sites-available/enmirex-homes

# Edit with your static IP and domain
sudo nano /etc/nginx/sites-available/enmirex-homes

# Enable the site
sudo ln -s /etc/nginx/sites-available/enmirex-homes /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Add rate limiting to main nginx.conf
sudo nano /etc/nginx/nginx.conf
```

Add this line inside the `http {}` block in `/etc/nginx/nginx.conf`:
```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
```

```bash
# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

### 4. SSL Certificate Setup

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate for your domain
sudo certbot --nginx -d enmirex.com -d www.enmirex.com

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## Method 2: Manual Deployment

For development environments or when you need more control over the deployment process.

### Prerequisites
- Node.js 18+ installed
- PM2 installed globally: `npm install -g pm2`
- Nginx installed and configured

### Step-by-Step Manual Deployment

#### 1. Clone Repository
```bash
git clone https://github.com/your-username/enmirex-homes.git
cd enmirex-homes
```

#### 2. Install Dependencies
```bash
# Install all dependencies (including dev dependencies for build)
npm ci
```

#### 3. Configure Environment
```bash
# Copy environment template
cp .env.production.example .env

# Edit environment variables
nano .env
```

Set the following required variables:
```env
NODE_ENV=production
APP_PORT=3000
GOOGLE_CLIENT_EMAIL=your-email@yourproject.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
SESSION_SECRET=your-secure-random-string-here
CORS_ORIGIN=https://yourdomain.com
TRUST_PROXY=true
```

#### 4. Build Application
```bash
npm run build
```

#### 5. Install Production Dependencies Only
```bash
# Remove dev dependencies for production
npm prune --production
```

#### 6. Start with PM2
```bash
# Start application
pm2 start ecosystem.config.cjs --env production

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

#### 7. Verify Deployment
```bash
# Check application status
pm2 status

# Test health endpoint
curl http://localhost:${APP_PORT:-3000}/api/health
```

---

### 5. GCP Firewall Configuration

#### Configure GCP Firewall Rules

```bash
# Allow HTTP traffic (if not already enabled)
gcloud compute firewall-rules create allow-http \
    --allow tcp:80 \
    --source-ranges 0.0.0.0/0 \
    --description "Allow HTTP traffic"

# Allow HTTPS traffic (if not already enabled)
gcloud compute firewall-rules create allow-https \
    --allow tcp:443 \
    --source-ranges 0.0.0.0/0 \
    --description "Allow HTTPS traffic"
```

Or configure via GCP Console:
1. Go to VPC Network → Firewall
2. Ensure rules exist for ports 80 and 443
3. Apply to your VM instance

### 6. Squarespace Domain Configuration

#### Point Domain to GCP Static IP

1. **Log into Squarespace**:
   - Go to Settings → Domains
   - Click on enmirex.com

2. **Configure DNS Settings**:
   - Click "Use Custom DNS"
   - Add these A records:
     ```
     @ (root) → YOUR_GCP_STATIC_IP
     www → YOUR_GCP_STATIC_IP
     ```

3. **Wait for DNS Propagation** (can take 24-48 hours)

4. **Verify DNS**:
   ```bash
   # Check if domain points to your IP
   nslookup enmirex.com
   nslookup www.enmirex.com
   ```

---

## Method 3: Docker Deployment (Containerized)

Best for containerized environments and consistent deployments across different systems. Memory optimized for e2 micro VMs.

For containerized deployment on GCP with proper memory limits:

### 1. Install Docker

```bash
# Install Docker
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
sudo apt install docker-ce docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
```

### 2. Deploy with Docker

#### Prepare Environment
```bash
# Clone repository (if not already done)
git clone https://github.com/your-username/enmirex-homes.git
cd enmirex-homes

# Create environment file
cp .env.production.example .env
```

#### Configure Environment Variables
Edit `.env` file with your production values:
```env
NODE_ENV=production
APP_PORT=3000
GOOGLE_CLIENT_EMAIL=your-email@yourproject.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id
SESSION_SECRET=your-secure-random-string-here
CORS_ORIGIN=https://yourdomain.com
TRUST_PROXY=true
```

#### Build and Start with Docker Compose
```bash
# Build and start all services
docker compose up -d

# View logs
docker compose logs -f

# Check container status
docker compose ps
```

#### Health Check and Verification
```bash
# Test application health
curl http://localhost:${APP_PORT:-3000}/api/health

# Test via nginx proxy
curl http://localhost:80
```

#### Docker Management Commands
```bash
# Stop services
docker compose down

# Rebuild after changes
docker compose up -d --build

# View application logs only
docker compose logs enmirex-homes

# Access container shell
docker compose exec enmirex-homes sh
```

### Docker Production Notes
- The application runs as a non-root user (nextjs) for security
- Memory is limited to 512MB with 256MB reservation
- Health checks are configured with 30-second intervals
- Logs are persistent via volume mounts
- Nginx proxy is included for production-ready setup

## Monitoring and Maintenance

### Application Monitoring

```bash
# Check PM2 status
pm2 status

# View application logs
pm2 logs enmirex-homes

# Restart application
pm2 restart enmirex-homes

# Monitor system resources (important for e2 micro)
top
free -h
df -h
```

### Health Checks

```bash
# Test application locally
curl http://localhost:3000/api/health

# Test from external
curl https://enmirex.com/api/health

# Check if domain resolves correctly
dig enmirex.com
```

### Log Management

```bash
# View application logs
tail -f /var/www/enmirex-homes/logs/combined.log

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Check PM2 logs
pm2 logs --lines 100
```

## e2 Micro VM Optimizations

### Memory Management

The e2 micro VM has limited memory (1GB). These optimizations help:

```bash
# Monitor memory usage
free -h
htop

# Check swap usage
swapon --show

# Clear system cache if needed (emergency only)
sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches
```

### Performance Optimizations

1. **PM2 Configuration**: Already optimized for 512MB max memory
2. **Nginx Optimization**: Configured with efficient worker settings
3. **Swap File**: 1GB swap file created during setup
4. **System Tuning**: Optimized vm.swappiness and overcommit settings

### Troubleshooting Common Issues

#### 1. Out of Memory Errors

```bash
# Check memory usage
free -h
ps aux --sort=-%mem | head

# Restart application if needed
pm2 restart enmirex-homes

# Check for memory leaks in logs
pm2 logs enmirex-homes | grep -i memory
```

#### 2. Application Won't Start

```bash
# Check PM2 status
pm2 status

# View detailed logs
pm2 logs enmirex-homes --lines 50

# Test environment variables
node -e "console.log(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)"
```

#### 3. Nginx Configuration Issues

```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx
```

#### 4. SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificates manually
sudo certbot renew

# Check certificate expiry
openssl x509 -in /etc/letsencrypt/live/enmirex.com/cert.pem -text -noout
```

## Security Considerations

### GCP Security Best Practices

1. **Firewall Rules**: Only allow necessary ports (80, 443, SSH)
2. **SSH Security**: Use SSH keys instead of passwords
3. **Regular Updates**: Keep system packages updated
4. **Environment Variables**: Secure API keys and secrets
5. **Nginx Security**: Security headers and rate limiting configured

### Application Security

1. **HTTPS Only**: Force HTTPS redirects
2. **Security Headers**: CSP, HSTS, X-Frame-Options configured
3. **Rate Limiting**: API endpoints protected
4. **Input Validation**: Form inputs validated with Zod
5. **Secret Management**: Environment variables for sensitive data

## Cost Optimization

### GCP e2 Micro Instance Costs

- **e2 micro**: ~$6-7/month (with sustained use discounts)
- **Static IP**: ~$3-4/month (when attached to running instance)
- **Storage**: ~$0.40/month for 10GB standard persistent disk
- **Network**: Minimal costs for normal website traffic

### Cost Monitoring

```bash
# Monitor resource usage
gcloud compute instances describe your-vm-name --zone=your-zone

# Check billing in GCP Console
# Billing → Reports → View your costs
```

## Backup and Recovery

### Application Backup

```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/home/$USER/backups"
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/enmirex-app-$DATE.tar.gz /var/www/enmirex-homes

# Backup environment file
cp /var/www/enmirex-homes/.env $BACKUP_DIR/env-$DATE.backup

# Keep only last 5 backups
cd $BACKUP_DIR && ls -t *.tar.gz | tail -n +6 | xargs -r rm
EOF

chmod +x backup.sh
```

### VM Snapshot

Create regular snapshots via GCP Console:
1. Compute Engine → Snapshots
2. Create Snapshot
3. Select your VM disk
4. Schedule regular snapshots

## Conclusion

Your Enmirex Homes website is now deployed on Google Cloud Platform e2 micro VM with:

- ✅ **Production-ready configuration** for e2 micro VM constraints
- ✅ **Static IP** assigned and configured
- ✅ **Squarespace domain** pointing to GCP infrastructure
- ✅ **SSL certificate** with automatic renewal
- ✅ **Google Sheets integration** for lead capture
- ✅ **Performance optimization** for limited resources
- ✅ **Security hardening** with proper headers and rate limiting
- ✅ **Monitoring and logging** setup
- ✅ **Cost-effective hosting** solution

The application maintains all original functionality while being optimized for GCP's e2 micro VM instance limitations. Your lead generation forms will continue to work seamlessly with Google Sheets integration.