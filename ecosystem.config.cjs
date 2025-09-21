module.exports = {
  apps: [{
    name: 'enmirex-homes',
    script: 'dist/index.js',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
      PORT: process.env.APP_PORT || 3000,
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: process.env.APP_PORT || 3000,
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    restart_delay: 4000
  }]
};