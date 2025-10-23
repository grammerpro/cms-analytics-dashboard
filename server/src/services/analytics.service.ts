import { Analytics } from '../models/Analytics.model';
import { db } from '../config/database.config';

interface AnalyticsRow {
    id: string;
    tenant_id: string;
    content_id: string | null;
    page_views: number;
    unique_visitors: number;
    avg_time_on_page: number;
    bounce_rate: number;
    date: Date;
    created_at: Date;
    updated_at: Date;
}

export class AnalyticsService {
    static async fetchAnalytics(tenantId: string, days: number = 7): Promise<Analytics[]> {
        try {
            const analyticsRows = await db.manyOrNone<AnalyticsRow>(
                `SELECT * FROM analytics 
                 WHERE tenant_id = $1 AND date >= CURRENT_DATE - INTERVAL '${days} days'
                 ORDER BY date DESC`,
                [tenantId]
            );

            return analyticsRows.map(row => new Analytics(
                row.id,
                row.tenant_id,
                row.content_id,
                row.page_views,
                row.avg_time_on_page,
                row.bounce_rate
            ));
        } catch (error) {
            console.error('Fetch analytics error:', error);
            return [];
        }
    }

    static async getAnalyticsData(tenantId: string, days: number = 7): Promise<Analytics[]> {
        return this.fetchAnalytics(tenantId, days);
    }

    static async getAnalyticsByDate(tenantId: string, date: Date): Promise<Analytics | null> {
        try {
            const analyticsRow = await db.oneOrNone<AnalyticsRow>(
                'SELECT * FROM analytics WHERE tenant_id = $1 AND date = $2',
                [tenantId, date]
            );

            if (!analyticsRow) {
                return null;
            }

            return new Analytics(
                analyticsRow.id,
                analyticsRow.tenant_id,
                analyticsRow.content_id,
                analyticsRow.page_views,
                analyticsRow.avg_time_on_page,
                analyticsRow.bounce_rate
            );
        } catch (error) {
            console.error('Get analytics by date error:', error);
            return null;
        }
    }

    static async getAnalyticsByContent(tenantId: string, contentId: string): Promise<Analytics[]> {
        try {
            const analyticsRows = await db.manyOrNone<AnalyticsRow>(
                'SELECT * FROM analytics WHERE tenant_id = $1 AND content_id = $2 ORDER BY date DESC',
                [tenantId, contentId]
            );

            return analyticsRows.map(row => new Analytics(
                row.id,
                row.tenant_id,
                row.content_id,
                row.page_views,
                row.avg_time_on_page,
                row.bounce_rate
            ));
        } catch (error) {
            console.error('Get analytics by content error:', error);
            return [];
        }
    }

    static async createAnalyticsData(data: {
        tenantId: string;
        contentId?: string | null;
        pageViews?: number;
        uniqueVisitors?: number;
        avgTime?: number;
        bounceRate?: number;
        date?: Date;
    }): Promise<Analytics> {
        try {
            const analyticsRow = await db.one<AnalyticsRow>(
                `INSERT INTO analytics 
                 (tenant_id, content_id, page_views, unique_visitors, avg_time_on_page, bounce_rate, date) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) 
                 ON CONFLICT (tenant_id, date) 
                 DO UPDATE SET 
                     page_views = analytics.page_views + EXCLUDED.page_views,
                     unique_visitors = analytics.unique_visitors + EXCLUDED.unique_visitors,
                     avg_time_on_page = (analytics.avg_time_on_page + EXCLUDED.avg_time_on_page) / 2,
                     bounce_rate = (analytics.bounce_rate + EXCLUDED.bounce_rate) / 2,
                     updated_at = CURRENT_TIMESTAMP
                 RETURNING *`,
                [
                    data.tenantId,
                    data.contentId || null,
                    data.pageViews || 0,
                    data.uniqueVisitors || 0,
                    data.avgTime || 0,
                    data.bounceRate || 0,
                    data.date || new Date()
                ]
            );

            return new Analytics(
                analyticsRow.id,
                analyticsRow.tenant_id,
                analyticsRow.content_id,
                analyticsRow.page_views,
                analyticsRow.avg_time_on_page,
                analyticsRow.bounce_rate
            );
        } catch (error) {
            console.error('Create analytics error:', error);
            throw error;
        }
    }

    static async updateAnalyticsData(
        id: string, 
        data: Partial<{
            pageViews: number;
            uniqueVisitors: number;
            avgTime: number;
            bounceRate: number;
        }>
    ): Promise<Analytics | null> {
        try {
            const updates: string[] = [];
            const values: any[] = [];
            let paramIndex = 1;

            if (data.pageViews !== undefined) {
                updates.push(`page_views = $${paramIndex++}`);
                values.push(data.pageViews);
            }

            if (data.uniqueVisitors !== undefined) {
                updates.push(`unique_visitors = $${paramIndex++}`);
                values.push(data.uniqueVisitors);
            }

            if (data.avgTime !== undefined) {
                updates.push(`avg_time_on_page = $${paramIndex++}`);
                values.push(data.avgTime);
            }

            if (data.bounceRate !== undefined) {
                updates.push(`bounce_rate = $${paramIndex++}`);
                values.push(data.bounceRate);
            }

            if (updates.length === 0) {
                const row = await db.oneOrNone<AnalyticsRow>(
                    'SELECT * FROM analytics WHERE id = $1',
                    [id]
                );
                return row ? new Analytics(
                    row.id,
                    row.tenant_id,
                    row.content_id,
                    row.page_views,
                    row.avg_time_on_page,
                    row.bounce_rate
                ) : null;
            }

            updates.push(`updated_at = CURRENT_TIMESTAMP`);
            values.push(id);

            const analyticsRow = await db.oneOrNone<AnalyticsRow>(
                `UPDATE analytics 
                 SET ${updates.join(', ')} 
                 WHERE id = $${paramIndex} 
                 RETURNING *`,
                values
            );

            if (!analyticsRow) {
                return null;
            }

            return new Analytics(
                analyticsRow.id,
                analyticsRow.tenant_id,
                analyticsRow.content_id,
                analyticsRow.page_views,
                analyticsRow.avg_time_on_page,
                analyticsRow.bounce_rate
            );
        } catch (error) {
            console.error('Update analytics error:', error);
            throw error;
        }
    }

    static async deleteAnalyticsData(id: string): Promise<boolean> {
        try {
            const result = await db.result(
                'DELETE FROM analytics WHERE id = $1',
                [id]
            );

            return result.rowCount > 0;
        } catch (error) {
            console.error('Delete analytics error:', error);
            return false;
        }
    }

    static async getAnalyticsSummary(tenantId: string, days: number = 7): Promise<{
        totalPageViews: number;
        totalUniqueVisitors: number;
        avgTimeOnPage: number;
        avgBounceRate: number;
    }> {
        try {
            const result = await db.oneOrNone<{
                total_page_views: string;
                total_unique_visitors: string;
                avg_time_on_page: string;
                avg_bounce_rate: string;
            }>(
                `SELECT 
                    SUM(page_views)::INTEGER as total_page_views,
                    SUM(unique_visitors)::INTEGER as total_unique_visitors,
                    AVG(avg_time_on_page)::INTEGER as avg_time_on_page,
                    AVG(bounce_rate)::NUMERIC(5,2) as avg_bounce_rate
                 FROM analytics 
                 WHERE tenant_id = $1 AND date >= CURRENT_DATE - INTERVAL '${days} days'`,
                [tenantId]
            );

            return {
                totalPageViews: parseInt(result?.total_page_views || '0'),
                totalUniqueVisitors: parseInt(result?.total_unique_visitors || '0'),
                avgTimeOnPage: parseInt(result?.avg_time_on_page || '0'),
                avgBounceRate: parseFloat(result?.avg_bounce_rate || '0')
            };
        } catch (error) {
            console.error('Get analytics summary error:', error);
            return {
                totalPageViews: 0,
                totalUniqueVisitors: 0,
                avgTimeOnPage: 0,
                avgBounceRate: 0
            };
        }
    }
}

export default AnalyticsService;