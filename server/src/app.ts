import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { json, urlencoded } from 'express';
import { authRoutes } from './routes/auth.routes';
import { tenantRoutes } from './routes/tenant.routes';
import { contentRoutes } from './routes/content.routes';
import { analyticsRoutes } from './routes/analytics.routes';
import errorHandler from './middleware/errorHandler.middleware';
import { config } from './config/env.config';

const app = express();

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tenant', tenantRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;