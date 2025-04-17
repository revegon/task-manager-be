import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  // Application settings
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '', 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',

  // Database settings
  databaseUrl: process.env.DATABASE_URL,

  // Authentication settings
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '60m',

  // Third-party API keys
  sendgridApiKey: process.env.SENDGRID_API_KEY,
}));
