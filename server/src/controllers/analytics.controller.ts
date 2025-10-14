import { Request, Response } from 'express';
import AnalyticsService from '../services/analytics.service';

export class AnalyticsController {
    public async getAnalytics(req: Request, res: Response): Promise<void> {
        try {
            const analyticsData = await AnalyticsService.fetchAnalytics(req.params.tenantId);
            res.status(200).json(analyticsData);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: 'Error fetching analytics data', error: errorMessage });
        }
    }

    public async createAnalytics(req: Request, res: Response): Promise<void> {
        try {
            const newAnalytics = await AnalyticsService.createAnalyticsData(req.body);
            res.status(201).json(newAnalytics);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: 'Error creating analytics data', error: errorMessage });
        }
    }

    public async updateAnalytics(req: Request, res: Response): Promise<void> {
        try {
            const updatedAnalytics = await AnalyticsService.updateAnalyticsData(req.params.id, req.body);
            if (!updatedAnalytics) {
                res.status(404).json({ message: 'Analytics not found' });
                return;
            }
            res.status(200).json(updatedAnalytics);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: 'Error updating analytics data', error: errorMessage });
        }
    }

    public async deleteAnalytics(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await AnalyticsService.deleteAnalyticsData(req.params.id);
            if (!deleted) {
                res.status(404).json({ message: 'Analytics not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: 'Error deleting analytics data', error: errorMessage });
        }
    }
}

export default new AnalyticsController();