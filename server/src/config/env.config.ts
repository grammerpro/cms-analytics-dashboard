import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

// Parse DATABASE_URL if provided, otherwise use individual env vars
const parseDatabaseUrl = (url: string) => {
  if (!url) return {};
  try {
    const urlObj = new URL(url);
    return {
      user: urlObj.username,
      host: urlObj.hostname,
      database: urlObj.pathname.slice(1),
      password: urlObj.password,
      port: urlObj.port || '5432',
    };
  } catch {
    return {};
  }
};

const dbConfig = parseDatabaseUrl(process.env.DATABASE_URL || '');

export const env = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  REDIS_URL: process.env.REDIS_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || 'development-secret-key',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_USER: dbConfig.user || process.env.DB_USER || 'user',
  DB_HOST: dbConfig.host || process.env.DB_HOST || 'localhost',
  DB_NAME: dbConfig.database || process.env.DB_NAME || 'cms_analytics_db',
  DB_PASSWORD: dbConfig.password || process.env.DB_PASSWORD || 'password',
  DB_PORT: dbConfig.port || process.env.DB_PORT || '5432',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};

export const config = env;

export default env;