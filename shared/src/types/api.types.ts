export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
}

export interface TenantApiResponse {
  tenantId: string;
  tenantName: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserApiResponse {
  userId: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsData {
  metric: string;
  value: number;
  timestamp: string;
}