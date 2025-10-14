import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ensure to set this in your .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example API call to fetch analytics data
export const fetchAnalyticsData = async (tenantId: string) => {
  try {
    const response = await apiClient.get(`/analytics/${tenantId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching analytics data');
  }
};

// Example API call to fetch tenant-specific settings
export const fetchTenantSettings = async (tenantId: string) => {
  try {
    const response = await apiClient.get(`/tenants/${tenantId}/settings`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching tenant settings');
  }
};

// Add more API functions as needed
