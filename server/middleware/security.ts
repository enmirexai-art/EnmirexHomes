import { type Express } from "express";

export function setupSecurityMiddleware(app: Express) {
  // Security headers middleware
  app.use((req, res, next) => {
    // Remove X-Powered-By header
    res.removeHeader('X-Powered-By');
    
    // Security headers
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Content Security Policy (optimized for React/Vite production)
    res.setHeader('Content-Security-Policy', [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "frame-ancestors 'none'"
    ].join('; '));
    
    next();
  });

  // Rate limiting is handled by Nginx in production
  // This is a fallback rate limiter for development only
  if (process.env.NODE_ENV !== 'production') {
    const requestCounts = new Map<string, { count: number; resetTime: number }>();
    const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
    const RATE_LIMIT_MAX_REQUESTS = 100; // requests per window

    app.use('/api', (req, res, next) => {
      const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
      const now = Date.now();
      
      const clientData = requestCounts.get(clientIP);
      
      if (!clientData || now > clientData.resetTime) {
        requestCounts.set(clientIP, {
          count: 1,
          resetTime: now + RATE_LIMIT_WINDOW
        });
        next();
        return;
      }
      
      if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
        res.status(429).json({
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.'
        });
        return;
      }
      
      clientData.count++;
      next();
    });
  }
}