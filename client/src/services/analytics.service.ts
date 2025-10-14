import { api } from './api';
import { AnalyticsData } from '../types/analytics.types';

export const fetchAnalyticsData = async (tenantId: string): Promise<AnalyticsData> => {
    const response = await api.get(`/analytics/${tenantId}`);
    return response.data;
};

export const updateAnalyticsData = async (tenantId: string, data: AnalyticsData): Promise<void> => {
    await api.put(`/analytics/${tenantId}`, data);
};