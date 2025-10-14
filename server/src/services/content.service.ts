import { Content } from '../models/Content.model';

// In-memory storage (replace with database in production)
const contentStore: Content[] = [
    new Content('content-1', 'Getting Started Guide', 'Welcome to our CMS...', 'tenant-1', 'published'),
    new Content('content-2', 'API Documentation', 'Our API provides...', 'tenant-1', 'draft'),
];

export class ContentService {
    static async getAllContent(): Promise<Content[]> {
        return contentStore;
    }

    static async getContentById(contentId: string): Promise<Content | null> {
        return contentStore.find(c => c.id === contentId) || null;
    }

    static async createContent(contentData: { title: string; body: string; tenantId: string; status?: 'draft' | 'published' }): Promise<Content> {
        const content = new Content(
            Math.random().toString(36).substr(2, 9),
            contentData.title,
            contentData.body,
            contentData.tenantId,
            contentData.status || 'draft'
        );
        contentStore.push(content);
        return content;
    }

    static async updateContent(contentId: string, contentData: Partial<Content>): Promise<Content | null> {
        const content = contentStore.find(c => c.id === contentId);
        if (content) {
            Object.assign(content, contentData, { updatedAt: new Date() });
            if (contentData.title || contentData.body) {
                content.version += 1;
            }
            return content;
        }
        return null;
    }

    static async deleteContent(contentId: string): Promise<boolean> {
        const index = contentStore.findIndex(c => c.id === contentId);
        if (index !== -1) {
            contentStore.splice(index, 1);
            return true;
        }
        return false;
    }

    static async getContentByTenant(tenantId: string): Promise<Content[]> {
        return contentStore.filter(c => c.tenantId === tenantId);
    }
}

export default ContentService;