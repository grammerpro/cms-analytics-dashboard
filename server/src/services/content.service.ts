import { Content } from '../models/Content.model';
import { db } from '../config/database.config';

interface ContentRow {
    id: string;
    title: string;
    body: string;
    status: 'draft' | 'published' | 'archived';
    tenant_id: string;
    created_by: string;
    metadata: Record<string, any>;
    version: number;
    published_at: Date | null;
    created_at: Date;
    updated_at: Date;
}

export class ContentService {
    static async getAllContent(limit: number = 100, offset: number = 0): Promise<Content[]> {
        try {
            const contentRows = await db.manyOrNone<ContentRow>(
                'SELECT * FROM content ORDER BY created_at DESC LIMIT $1 OFFSET $2',
                [limit, offset]
            );

            return contentRows.map(row => new Content(
                row.id,
                row.title,
                row.body,
                row.tenant_id,
                row.status
            ));
        } catch (error) {
            console.error('Get all content error:', error);
            return [];
        }
    }

    static async getContentById(contentId: string): Promise<Content | null> {
        try {
            const contentRow = await db.oneOrNone<ContentRow>(
                'SELECT * FROM content WHERE id = $1',
                [contentId]
            );

            if (!contentRow) {
                return null;
            }

            return new Content(
                contentRow.id,
                contentRow.title,
                contentRow.body,
                contentRow.tenant_id,
                contentRow.status
            );
        } catch (error) {
            console.error('Get content by ID error:', error);
            return null;
        }
    }

    static async createContent(contentData: { 
        title: string; 
        body: string; 
        tenantId: string; 
        createdBy: string;
        status?: 'draft' | 'published' | 'archived';
        metadata?: Record<string, any>;
    }): Promise<Content> {
        try {
            const status = contentData.status || 'draft';
            const publishedAt = status === 'published' ? new Date() : null;

            const contentRow = await db.one<ContentRow>(
                `INSERT INTO content (title, body, tenant_id, created_by, status, metadata, published_at, version) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, 1) 
                 RETURNING *`,
                [
                    contentData.title,
                    contentData.body,
                    contentData.tenantId,
                    contentData.createdBy,
                    status,
                    JSON.stringify(contentData.metadata || {}),
                    publishedAt
                ]
            );

            return new Content(
                contentRow.id,
                contentRow.title,
                contentRow.body,
                contentRow.tenant_id,
                contentRow.status
            );
        } catch (error) {
            console.error('Create content error:', error);
            throw error;
        }
    }

    static async updateContent(
        contentId: string, 
        contentData: Partial<{
            title: string;
            body: string;
            status: 'draft' | 'published' | 'archived';
            metadata: Record<string, any>;
        }>
    ): Promise<Content | null> {
        try {
            // Build dynamic update query
            const updates: string[] = [];
            const values: any[] = [];
            let paramIndex = 1;

            if (contentData.title !== undefined) {
                updates.push(`title = $${paramIndex++}`);
                values.push(contentData.title);
            }

            if (contentData.body !== undefined) {
                updates.push(`body = $${paramIndex++}`);
                values.push(contentData.body);
            }

            if (contentData.status !== undefined) {
                updates.push(`status = $${paramIndex++}`);
                values.push(contentData.status);
                
                // Set published_at if publishing
                if (contentData.status === 'published') {
                    updates.push(`published_at = CURRENT_TIMESTAMP`);
                }
            }

            if (contentData.metadata !== undefined) {
                updates.push(`metadata = $${paramIndex++}`);
                values.push(JSON.stringify(contentData.metadata));
            }

            if (updates.length === 0) {
                return this.getContentById(contentId);
            }

            // Increment version if title or body changed
            if (contentData.title !== undefined || contentData.body !== undefined) {
                updates.push(`version = version + 1`);
            }

            updates.push(`updated_at = CURRENT_TIMESTAMP`);
            values.push(contentId);

            const contentRow = await db.oneOrNone<ContentRow>(
                `UPDATE content 
                 SET ${updates.join(', ')} 
                 WHERE id = $${paramIndex} 
                 RETURNING *`,
                values
            );

            if (!contentRow) {
                return null;
            }

            return new Content(
                contentRow.id,
                contentRow.title,
                contentRow.body,
                contentRow.tenant_id,
                contentRow.status
            );
        } catch (error) {
            console.error('Update content error:', error);
            throw error;
        }
    }

    static async deleteContent(contentId: string): Promise<boolean> {
        try {
            const result = await db.result(
                'DELETE FROM content WHERE id = $1',
                [contentId]
            );

            return result.rowCount > 0;
        } catch (error) {
            console.error('Delete content error:', error);
            return false;
        }
    }

    static async getContentByTenant(tenantId: string, limit: number = 100, offset: number = 0): Promise<Content[]> {
        try {
            const contentRows = await db.manyOrNone<ContentRow>(
                'SELECT * FROM content WHERE tenant_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
                [tenantId, limit, offset]
            );

            return contentRows.map(row => new Content(
                row.id,
                row.title,
                row.body,
                row.tenant_id,
                row.status
            ));
        } catch (error) {
            console.error('Get content by tenant error:', error);
            return [];
        }
    }

    static async getContentByStatus(
        tenantId: string, 
        status: 'draft' | 'published' | 'archived'
    ): Promise<Content[]> {
        try {
            const contentRows = await db.manyOrNone<ContentRow>(
                'SELECT * FROM content WHERE tenant_id = $1 AND status = $2 ORDER BY created_at DESC',
                [tenantId, status]
            );

            return contentRows.map(row => new Content(
                row.id,
                row.title,
                row.body,
                row.tenant_id,
                row.status
            ));
        } catch (error) {
            console.error('Get content by status error:', error);
            return [];
        }
    }

    static async searchContent(tenantId: string, searchTerm: string): Promise<Content[]> {
        try {
            const contentRows = await db.manyOrNone<ContentRow>(
                `SELECT * FROM content 
                 WHERE tenant_id = $1 AND (title ILIKE $2 OR body ILIKE $2)
                 ORDER BY created_at DESC`,
                [tenantId, `%${searchTerm}%`]
            );

            return contentRows.map(row => new Content(
                row.id,
                row.title,
                row.body,
                row.tenant_id,
                row.status
            ));
        } catch (error) {
            console.error('Search content error:', error);
            return [];
        }
    }
}

export default ContentService;