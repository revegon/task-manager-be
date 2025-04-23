import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  // Application settings
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '', 10) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
}));
