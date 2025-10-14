export interface Tenant {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantSettings {
  tenantId: string;
  settings: Record<string, any>;
}