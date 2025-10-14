import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';
import { validateCreateAnalytics } from '../middleware/validation.middleware';

const router = Router();
const analyticsController = new AnalyticsController();

// Route to get analytics data
router.get('/', (req, res) => analyticsController.getAnalytics(req, res));

// Route to create a new analytics entry
router.post('/', validateCreateAnalytics, (req, res) => analyticsController.createAnalytics(req, res));

// Route to update an existing analytics entry
router.put('/:id', (req, res) => analyticsController.updateAnalytics(req, res));

// Route to delete an analytics entry
router.delete('/:id', (req, res) => analyticsController.deleteAnalytics(req, res));

export const analyticsRoutes = router;
export default router;