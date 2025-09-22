export const productionConfig = {
  // Server configuration
  port: parseInt(process.env.PORT || process.env.APP_PORT || '3000', 10),
  host: '0.0.0.0',
  
  // Environment
  nodeEnv: process.env.NODE_ENV || 'production',
  
  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || false,
    credentials: true,
    optionsSuccessStatus: 200
  },
  
  // Session configuration
  session: {
    secret: process.env.SESSION_SECRET || 'enmirex-homes-production-secret-2025',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  },
  
  // Trust proxy configuration for Nginx
  trustProxy: process.env.TRUST_PROXY === 'true',
  
  // Google Sheets configuration
  googleSheets: {
    serviceAccountEmail: process.env.GOOGLE_CLIENT_EMAIL || 'enmirexaigooglesheets@wholesaleleadsenmirex.iam.gserviceaccount.com',
    privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGK...\n-----END PRIVATE KEY-----\n',
    sheetId: process.env.GOOGLE_SPREADSHEET_ID || '1s2t9t8rGJwbe1bM5Uj_mQ7FWV5rfqlICG34K6Wo4eWs'
  },
  
  // Logging configuration
  logging: {
    level: 'info',
    enableRequestLogging: true
  }
};

export function validateProductionConfig() {
  const errors: string[] = [];
  
  if (!productionConfig.googleSheets.serviceAccountEmail) {
    errors.push('GOOGLE_CLIENT_EMAIL is required');
  }
  
  if (!productionConfig.googleSheets.privateKey) {
    errors.push('GOOGLE_PRIVATE_KEY is required');
  }
  
  if (!productionConfig.googleSheets.sheetId) {
    errors.push('GOOGLE_SPREADSHEET_ID is required');
  }
  
  // SESSION_SECRET validation removed - using built-in default
  
  if (errors.length > 0) {
    console.error('❌ Production configuration errors:');
    errors.forEach(error => console.error(`  - ${error}`));
    console.error('\nPlease check your .env file and ensure all required environment variables are set.');
    
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
  
  return errors.length === 0;
}