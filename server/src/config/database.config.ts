import pgPromise from 'pg-promise';
import { config } from './env.config';

// Initialize pg-promise
const pgp = pgPromise({
  // Initialization options
  error: (error, e) => {
    console.error('Database error:', error);
    if (e.cn) {
      console.error('Connection details:', e.cn);
    }
    if (e.query) {
      console.error('Query:', e.query);
    }
  }
});

// Database connection configuration
const dbConfig = {
  host: config.DB_HOST || 'localhost',
  port: Number(config.DB_PORT) || 5432,
  database: config.DB_NAME || 'cms_analytics',
  user: config.DB_USER || 'postgres',
  password: config.DB_PASSWORD || 'postgres',
  max: 30, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Create database instance
export const db = pgp(dbConfig);

// Helper function to test connection
export const connectDatabase = async (): Promise<boolean> => {
  try {
    // Test the connection by running a simple query
    const connection = await db.connect();
    await connection.done();
    console.log('✅ Database connected successfully');
    console.log(`📊 Database: ${dbConfig.database} at ${dbConfig.host}:${dbConfig.port}`);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    console.log('⚠️  Server will continue without database connection');
    console.log('💡 Make sure PostgreSQL is running and configured correctly');
    return false;
  }
};

// Helper function to run migrations
export const runMigrations = async (): Promise<void> => {
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    const migrationsDir = path.join(__dirname, '../database/migrations');
    const schemaFile = path.join(__dirname, '../database/schema.sql');
    
    // Check if schema file exists
    if (fs.existsSync(schemaFile)) {
      console.log('🔄 Running database schema...');
      const schemaSql = fs.readFileSync(schemaFile, 'utf-8');
      await db.none(schemaSql);
      console.log('✅ Database schema applied successfully');
    }
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
};

// Helper function to seed database
export const seedDatabase = async (): Promise<void> => {
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    const seedFile = path.join(__dirname, '../database/seed.sql');
    
    if (fs.existsSync(seedFile)) {
      console.log('🌱 Seeding database...');
      const seedSql = fs.readFileSync(seedFile, 'utf-8');
      await db.none(seedSql);
      console.log('✅ Database seeded successfully');
    }
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
};

// Transaction helper
export const transaction = async <T>(
  callback: (tx: pgPromise.ITask<{}>) => Promise<T>
): Promise<T> => {
  return db.tx(callback);
};

// Export pgp for advanced usage
export { pgp };