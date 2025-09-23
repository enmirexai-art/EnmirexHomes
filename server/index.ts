import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";
import { serveStatic } from "./vite";
import { log } from "./logger";
import { setupSecurityMiddleware } from "./middleware/security";
import { productionConfig, validateProductionConfig } from "./config/production";

const app = express();

// Validate production configuration
if (process.env.NODE_ENV === 'production') {
  validateProductionConfig();
}

// Trust proxy configuration for reverse proxy (Nginx)
if (productionConfig.trustProxy) {
  app.set('trust proxy', 1);
}

// Security middleware for production
if (process.env.NODE_ENV === 'production') {
  setupSecurityMiddleware(app);
}

// CORS configuration
if (productionConfig.cors.origin) {
  app.use(cors(productionConfig.cors));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.status(200).json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "development") {
    // Serve built static assets even in development mode for production builds
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const distPath = path.resolve(__dirname, "public");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
    }
    const { setupVite } = await import("./vite");
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Use production configuration for port and host
  const port = process.env.NODE_ENV === 'production' ? productionConfig.port : parseInt(process.env.PORT || '5000', 10);
  const host = process.env.NODE_ENV === 'production' ? productionConfig.host : "0.0.0.0";
  
  server.listen({
    port,
    host,
    reusePort: true,
  }, () => {
    log(`🚀 Enmirex Homes server running in ${process.env.NODE_ENV || 'development'} mode`);
    log(`📍 Server listening on ${host}:${port}`);
    
    if (process.env.NODE_ENV === 'production') {
      log(`🔒 Security middleware enabled`);
      log(`📊 Health check available at /api/health`);
    }
  });
})();
