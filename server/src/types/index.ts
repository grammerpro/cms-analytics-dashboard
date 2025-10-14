export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tenant = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Content = {
  id: string;
  title: string;
  body: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AnalyticsData = {
  metric: string;
  value: number;
  timestamp: Date;
};