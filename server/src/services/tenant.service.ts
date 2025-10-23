import { Tenant } from '../models/Tenant.model';
import { db } from '../config/database.config';

interface TenantRow {
    id: string;
    name: string;
    domain: string;
    config: Record<string, any>;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export class TenantService {
    static async createTenant(tenantData: { 
        name: string; 
        domain?: string; 
        config?: Record<string, any> 
    }): Promise<Tenant> {
        try {
            const tenantRow = await db.one<TenantRow>(
                `INSERT INTO tenants (name, domain, config, is_active) 
                 VALUES ($1, $2, $3, true) 
                 RETURNING *`,
                [
                    tenantData.name, 
                    tenantData.domain || null, 
                    JSON.stringify(tenantData.config || {})
                ]
            );

            return new Tenant(
                tenantRow.id,
                tenantRow.name,
                tenantRow.domain,
                tenantRow.config
            );
        } catch (error) {
            console.error('Create tenant error:', error);
            throw error;
        }
    }

    static async getTenantById(tenantId: string): Promise<Tenant | null> {
        try {
            const tenantRow = await db.oneOrNone<TenantRow>(
                'SELECT * FROM tenants WHERE id = $1 AND is_active = true',
                [tenantId]
            );

            if (!tenantRow) {
                return null;
            }

            return new Tenant(
                tenantRow.id,
                tenantRow.name,
                tenantRow.domain,
                tenantRow.config
            );
        } catch (error) {
            console.error('Get tenant error:', error);
            return null;
        }
    }

    static async getTenantByDomain(domain: string): Promise<Tenant | null> {
        try {
            const tenantRow = await db.oneOrNone<TenantRow>(
                'SELECT * FROM tenants WHERE domain = $1 AND is_active = true',
                [domain]
            );

            if (!tenantRow) {
                return null;
            }

            return new Tenant(
                tenantRow.id,
                tenantRow.name,
                tenantRow.domain,
                tenantRow.config
            );
        } catch (error) {
            console.error('Get tenant by domain error:', error);
            return null;
        }
    }

    static async getTenants(): Promise<Tenant[]> {
        try {
            const tenantRows = await db.manyOrNone<TenantRow>(
                'SELECT * FROM tenants WHERE is_active = true ORDER BY created_at DESC'
            );

            return tenantRows.map(row => new Tenant(
                row.id,
                row.name,
                row.domain,
                row.config
            ));
        } catch (error) {
            console.error('Get tenants error:', error);
            return [];
        }
    }

    static async updateTenant(
        tenantId: string, 
        updatedData: Partial<{ name: string; domain: string; config: Record<string, any> }>
    ): Promise<Tenant | null> {
        try {
            // Build dynamic update query
            const updates: string[] = [];
            const values: any[] = [];
            let paramIndex = 1;

            if (updatedData.name !== undefined) {
                updates.push(`name = $${paramIndex++}`);
                values.push(updatedData.name);
            }

            if (updatedData.domain !== undefined) {
                updates.push(`domain = $${paramIndex++}`);
                values.push(updatedData.domain);
            }

            if (updatedData.config !== undefined) {
                updates.push(`config = $${paramIndex++}`);
                values.push(JSON.stringify(updatedData.config));
            }

            if (updates.length === 0) {
                return this.getTenantById(tenantId);
            }

            updates.push(`updated_at = CURRENT_TIMESTAMP`);
            values.push(tenantId);

            const tenantRow = await db.oneOrNone<TenantRow>(
                `UPDATE tenants 
                 SET ${updates.join(', ')} 
                 WHERE id = $${paramIndex} AND is_active = true 
                 RETURNING *`,
                values
            );

            if (!tenantRow) {
                return null;
            }

            return new Tenant(
                tenantRow.id,
                tenantRow.name,
                tenantRow.domain,
                tenantRow.config
            );
        } catch (error) {
            console.error('Update tenant error:', error);
            throw error;
        }
    }

    static async deleteTenant(tenantId: string): Promise<boolean> {
        try {
            // Soft delete by setting is_active to false
            const result = await db.result(
                'UPDATE tenants SET is_active = false WHERE id = $1',
                [tenantId]
            );

            return result.rowCount > 0;
        } catch (error) {
            console.error('Delete tenant error:', error);
            return false;
        }
    }

    static async hardDeleteTenant(tenantId: string): Promise<boolean> {
        try {
            // Hard delete (this will cascade to users, content, analytics)
            const result = await db.result(
                'DELETE FROM tenants WHERE id = $1',
                [tenantId]
            );

            return result.rowCount > 0;
        } catch (error) {
            console.error('Hard delete tenant error:', error);
            return false;
        }
    }
}

export default TenantService;