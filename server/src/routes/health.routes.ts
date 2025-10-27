import { Router, Request, Response } from 'express';
import { db } from '../config/database.config';
import { config } from '../config/env.config';

const router = Router();

/**
 * Health check endpoint
 * GET /api/health
 * Returns the status of the application and its dependencies
 */
router.get('/', async (req: Request, res: Response) => {
  const startTime = Date.now();
  
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.NODE_ENV,
    version: '1.0.0',
    services: {
      database: 'unknown',
      redis: 'not_configured',
    },
    responseTime: 0,
  };

  // Check database connection
  try {
    await db.query('SELECT 1');
    healthCheck.services.database = 'healthy';
  } catch (error) {
    healthCheck.status = 'degraded';
    healthCheck.services.database = 'unhealthy';
  }

  // Calculate response time
  healthCheck.responseTime = Date.now() - startTime;

  // Return appropriate status code
  const statusCode = healthCheck.status === 'healthy' ? 200 : 503;
  
  res.status(statusCode).json(healthCheck);
});

/**
 * Readiness probe endpoint
 * GET /api/health/ready
 * Returns 200 if the app is ready to accept traffic
 */
router.get('/ready', async (req: Request, res: Response) => {
  try {
    await db.query('SELECT 1');
    res.status(200).json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not_ready', error: 'Database connection failed' });
  }
});

/**
 * Liveness probe endpoint
 * GET /api/health/live
 * Returns 200 if the app is running
 */
router.get('/live', (req: Request, res: Response) => {
  res.status(200).json({ status: 'alive' });
});

export { router as healthRoutes };
