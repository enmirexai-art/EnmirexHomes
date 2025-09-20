#!/bin/bash

# GCP VM Startup Script for Enmirex Homes
# This script sets up the e2 micro VM instance for hosting

set -e

echo "🚀 Setting up GCP e2 micro VM for Enmirex Homes..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18 LTS
echo "📦 Installing Node.js 18 LTS..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt install nginx -y

# Install PM2 globally
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install Git (if not already installed)
echo "📦 Installing Git..."
sudo apt install git -y

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /var/www/enmirex-homes
sudo chown $USER:$USER /var/www/enmirex-homes

# Configure firewall for GCP
echo "🔥 Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Optimize for e2 micro VM (low memory)
echo "⚡ Optimizing for e2 micro VM..."
# Set swappiness to handle low memory better
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf

# Configure memory overcommit
echo 'vm.overcommit_memory=1' | sudo tee -a /etc/sysctl.conf

# Apply sysctl changes
sudo sysctl -p

# Create swap file for e2 micro (since it has limited RAM)
echo "💾 Creating swap file..."
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

echo "✅ GCP e2 micro VM setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Clone your application repository to /var/www/enmirex-homes"
echo "2. Run the deployment script"
echo "3. Configure Nginx"
echo "4. Set up SSL certificate"
echo "5. Point your Squarespace domain to this VM's static IP"