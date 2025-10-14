import express from 'express';
import { createServer } from 'http';
import { json } from 'body-parser';
import cors from 'cors';
import { connectDatabase } from './config/database.config';
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

// Connect to the database
connectDatabase();

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
});