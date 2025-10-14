import { Analytics } from '../models/Analytics.model';

// In-memory storage with sample data
const analyticsStore: Analytics[] = [
    new Analytics('1', 'tenant-1', 'content-1', 1250, 45, 32),
    new Analytics('2', 'tenant-1', 'content-2', 890, 38, 28),
];

export class AnalyticsService {
    static async fetchAnalytics(tenantId: string): Promise<Analytics[]> {
        return analyticsStore.filter(a => a.tenantId === tenantId);
    }

    static async getAnalyticsData(tenantId: string): Promise<Analytics[]> {
        return this.fetchAnalytics(tenantId);
    }

    static async createAnalyticsData(data: {
        tenantId: string;
        contentId?: string | null;
        pageViews?: number;
        avgTime?: number;
        bounceRate?: number;
    }): Promise<Analytics> {
        const analytics = new Analytics(
            Math.random().toString(36).substr(2, 9),
            data.tenantId,
            data.contentId || null,
            data.pageViews || 0,
            data.avgTime || 0,
            data.bounceRate || 0
        );
        analyticsStore.push(analytics);
        return analytics;
    }

    static async updateAnalyticsData(id: string, data: Partial<Analytics>): Promise<Analytics | null> {
        const analytics = analyticsStore.find(a => a.id === id);
        if (analytics) {
            Object.assign(analytics, data, { updatedAt: new Date() });
            return analytics;
        }
        return null;
    }

    static async deleteAnalyticsData(id: string): Promise<boolean> {
        const index = analyticsStore.findIndex(a => a.id === id);
        if (index !== -1) {
            analyticsStore.splice(index, 1);
            return true;
        }
        return false;
    }
}

export default AnalyticsService;