export interface CreateAnalyticsDTO {
    tenantId: string;
    data: any; // Replace 'any' with a more specific type based on your data structure
}

export interface UpdateAnalyticsDTO {
    id: string;
    data: any; // Replace 'any' with a more specific type based on your data structure
}

export interface GetAnalyticsDTO {
    tenantId: string;
    startDate: Date;
    endDate: Date;
}

export interface DeleteAnalyticsDTO {
    id: string;
}