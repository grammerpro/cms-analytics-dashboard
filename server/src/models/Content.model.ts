export class Content {
    id: string;
    title: string;
    body: string;
    tenantId: string;
    status: 'draft' | 'published';
    metadata?: Record<string, any>;
    createdBy?: string;
    version: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string, 
        title: string, 
        body: string, 
        tenantId: string,
        status: 'draft' | 'published' = 'draft',
        metadata?: Record<string, any>,
        createdBy?: string
    ) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.tenantId = tenantId;
        this.status = status;
        this.metadata = metadata || {};
        this.createdBy = createdBy;
        this.version = 1;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    updateContent(title: string, body: string) {
        this.title = title;
        this.body = body;
        this.version += 1;
        this.updatedAt = new Date();
    }

    publish() {
        this.status = 'published';
        this.updatedAt = new Date();
    }
}