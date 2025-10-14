export interface AnalyticsData {
    id: string;
    tenantId: string;
    metric: string;
    value: number;
    timestamp: Date;
}

export interface AnalyticsSummary {
    totalMetrics: number;
    averageValue: number;
    metrics: AnalyticsData[];
}

export interface Metric {
    name: string;
    value: number;
    change: number; // Change in percentage
}