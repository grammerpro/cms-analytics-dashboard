import { Tenant } from '../models/Tenant.model';

// In-memory storage (replace with database in production)
const tenantsStore: Tenant[] = [
    new Tenant('tenant-1', 'Demo Tenant', 'demo.example.com', { theme: 'light' }),
];

export class TenantService {
    static async createTenant(tenantData: { name: string; domain?: string; config?: Record<string, any> }): Promise<Tenant> {
        const newTenant = new Tenant(
            Math.random().toString(36).substr(2, 9),
            tenantData.name,
            tenantData.domain,
            tenantData.config
        );
        tenantsStore.push(newTenant);
        return newTenant;
    }

    static async getTenantById(tenantId: string): Promise<Tenant | null> {
        return tenantsStore.find(tenant => tenant.id === tenantId) || null;
    }

    static async getTenants(): Promise<Tenant[]> {
        return tenantsStore;
    }

    static async updateTenant(tenantId: string, updatedData: Partial<Tenant>): Promise<Tenant | null> {
        const tenant = tenantsStore.find(t => t.id === tenantId);
        if (tenant) {
            Object.assign(tenant, updatedData, { updatedAt: new Date() });
            return tenant;
        }
        return null;
    }

    static async deleteTenant(tenantId: string): Promise<boolean> {
        const index = tenantsStore.findIndex(tenant => tenant.id === tenantId);
        if (index !== -1) {
            tenantsStore.splice(index, 1);
            return true;
        }
        return false;
    }
}

export default TenantService;