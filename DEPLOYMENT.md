# Enmirex Homes - Production Deployment Guide

This guide covers deploying the Enmirex Homes website to Hostinger VPS for production use.

## Prerequisites

- **Hostinger VPS hosting** (minimum KVM1 plan at $4.99/month)
- **Domain name** configured to point to your VPS IP
- **SSL certificate** for HTTPS
- **Google Sheets API credentials** for lead capture

## Server Requirements

- **OS**: Ubuntu 22.04 or 24.04 LTS
- **Node.js**: Version 18 or higher
- **RAM**: Minimum 1GB (2GB recommended)
- **Storage**: Minimum 20GB
- **Network**: 1Gbps port speed

## Quick Deployment (Recommended)

### 1. Server Setup

```bash
# Connect to your VPS via SSH
ssh root@your-server-ip

# Update system packages
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install Nginx
apt install nginx -y

# Install PM2 globally
npm install -g pm2

# Create application directory
mkdir -p /var/www/enmirex-homes
cd /var/www/enmirex-homes
```

### 2. Deploy Application

```bash
# Clone or upload your application files to /var/www/enmirex-homes
# Then run the deployment script:

chmod +x deploy.sh
./deploy.sh
```

### 3. Configure Environment Variables

```bash
# Copy and edit the environment file
cp .env.production.example .env
nano .env
```

Set the following required variables:
```env
NODE_ENV=production
PORT=3000
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_sheet_id_here
SESSION_SECRET=your-secure-random-string-here
CORS_ORIGIN=https://yourdomain.com
TRUST_PROXY=true
```

### 4. Configure Nginx

```bash
# Copy Nginx configuration
cp nginx.conf.example /etc/nginx/sites-available/enmirex-homes

# Edit the configuration with your domain
nano /etc/nginx/sites-available/enmirex-homes

# Enable the site
ln -s /etc/nginx/sites-available/enmirex-homes /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t
systemctl reload nginx
```

### 5. SSL Certificate Setup

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal test
certbot renew --dry-run
```

### 6. Firewall Configuration

```bash
# Configure UFW firewall
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
```

## Manual Deployment Steps

If you prefer manual setup instead of using the deployment script:

### 1. Build Application

```bash
# Install dependencies (including dev dependencies for build)
npm ci

# Build for production
NODE_ENV=production npm run build

# Prune dev dependencies after build
npm prune --production
```

### 2. Start with PM2

```bash
# Start application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
# Follow the instructions to complete startup configuration
```

## Docker Deployment (Alternative)

For containerized deployment:

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t enmirex-homes .
docker run -d -p 3000:3000 --env-file .env --name enmirex-homes enmirex-homes
```

## Google Sheets API Setup

### 1. Create Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Create Service Account credentials
5. Download the JSON key file

### 2. Configure Google Sheet

1. Create a Google Sheet for leads
2. Share the sheet with your service account email (with edit permissions)
3. Copy the sheet ID from the URL
4. Set the sheet ID in your .env file

### 3. Set Environment Variables

From the service account JSON file, extract:
- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY`
- Google Sheet ID → `GOOGLE_SHEET_ID`

## Monitoring and Maintenance

### Application Monitoring

```bash
# Check application status
pm2 status

# View logs
pm2 logs enmirex-homes

# Restart application
pm2 restart enmirex-homes

# Monitor in real-time
pm2 monit
```

### Health Checks

```bash
# Test application health
curl http://localhost:3000/api/health

# Test from external
curl https://yourdomain.com/api/health
```

### Log Management

```bash
# View application logs
tail -f logs/combined.log

# View Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Security Considerations

### 1. Server Security
- Keep system packages updated
- Configure proper firewall rules
- Use SSH keys instead of passwords
- Regular security audits

### 2. Application Security
- Secure environment variables
- Regular dependency updates
- Monitor for vulnerabilities
- Backup Google Sheets data

### 3. SSL/TLS
- Use strong SSL configuration
- Regular certificate renewal
- HTTP to HTTPS redirects
- Security headers implemented

## Performance Optimization

### 1. Nginx Optimization
- Gzip compression enabled
- Static file caching
- Proper proxy settings
- Rate limiting configured

### 2. Application Optimization
- Production build minification
- Security middleware
- Request rate limiting
- Health check endpoints

## Troubleshooting

### Common Issues

1. **Application won't start**
   ```bash
   # Check logs
   pm2 logs enmirex-homes
   
   # Verify environment variables
   cat .env
   
   # Test Google Sheets connection
   curl -X POST http://localhost:3000/api/leads -H "Content-Type: application/json" -d '{"test": "data"}'
   ```

2. **502 Bad Gateway**
   ```bash
   # Check if application is running
   pm2 status
   
   # Check Nginx configuration
   nginx -t
   
   # Restart services
   pm2 restart enmirex-homes
   systemctl restart nginx
   ```

3. **SSL Certificate Issues**
   ```bash
   # Renew certificate
   certbot renew
   
   # Check certificate status
   certbot certificates
   ```

### Contact Support

For Hostinger VPS specific issues:
- Use Hostinger's 24/7 support chat
- Check VPS management panel
- Review server logs via control panel

## Cost Breakdown

### Hostinger VPS Pricing
- **KVM1**: $4.99/month (1GB RAM, 1 vCPU, 20GB storage) - Minimum
- **KVM2**: $7-9/month (2GB RAM, 1 vCPU, 40GB storage) - Recommended
- **KVM4**: $14-17/month (4GB RAM, 2 vCPUs, 80GB storage) - High traffic

### Additional Costs
- Domain name: $10-15/year
- SSL certificate: Free with Let's Encrypt
- Backup services: Optional

## Conclusion

This deployment setup provides a robust, secure, and scalable solution for hosting the Enmirex Homes website on Hostinger VPS. The configuration includes production-grade security, monitoring, and performance optimizations suitable for a real estate lead generation business.