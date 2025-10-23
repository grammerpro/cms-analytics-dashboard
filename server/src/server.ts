import express from 'express';
import { createServer } from 'http';
import { json } from 'body-parser';
import cors from 'cors';
import { connectDatabase, runMigrations, seedDatabase } from './config/database.config';
import { initializeWebSocket } from './config/websocket.config';
import { authRoutes } from './routes/auth.routes';
import { tenantRoutes } from './routes/tenant.routes';
import { contentRoutes } from './routes/content.routes';
import { analyticsRoutes } from './routes/analytics.routes';
import errorHandler from './middleware/errorHandler.middleware';
import { env } from './config/env.config';

const app = express();
const httpServer = createServer(app);

// Initialize WebSocket
const io = initializeWebSocket(httpServer);
console.log('🔌 WebSocket server initialized');

// Middleware
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(json());

// Initialize database
const initializeDatabase = async () => {
  const isConnected = await connectDatabase();
  
  if (isConnected) {
    try {
      // Run migrations
      await runMigrations();
      
      // Seed database if in development
      if (env.NODE_ENV === 'development') {
        await seedDatabase();
      }
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      console.log('⚠️  Server will continue but database operations may fail');
    }
  } else {
    console.log('⚠️  Server starting without database connection');
    console.log('💡 Configure your PostgreSQL database and update .env file');
  }
};

// Initialize database connection
initializeDatabase();

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`🔌 WebSocket is available at ws://localhost:${PORT}`);
    console.log(`📝 Environment: ${env.NODE_ENV}`);
});