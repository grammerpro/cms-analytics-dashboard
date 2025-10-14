export class Analytics {
    id: string;
    tenantId: string;
    contentId: string | null;
    pageViews: number;
    avgTime: number;
    bounceRate: number;
    timestamp: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        tenantId: string,
        contentId: string | null = null,
        pageViews: number = 0,
        avgTime: number = 0,
        bounceRate: number = 0
    ) {
        this.id = id;
        this.tenantId = tenantId;
        this.contentId = contentId;
        this.pageViews = pageViews;
        this.avgTime = avgTime;
        this.bounceRate = bounceRate;
        this.timestamp = new Date();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}