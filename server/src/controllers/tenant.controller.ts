import { Request, Response } from 'express';
import TenantService from '../services/tenant.service';

class TenantController {
    async createTenant(req: Request, res: Response): Promise<void> {
        try {
            const tenantData = req.body;
            const newTenant = await TenantService.createTenant(tenantData);
            res.status(201).json(newTenant);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error creating tenant';
            res.status(500).json({ message: 'Error creating tenant', error: errorMessage });
        }
    }

    async getTenants(req: Request, res: Response): Promise<void> {
        try {
            const tenants = await TenantService.getTenants();
            res.status(200).json(tenants);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error fetching tenants';
            res.status(500).json({ message: 'Error fetching tenants', error: errorMessage });
        }
    }

    async getTenantById(req: Request, res: Response): Promise<void> {
        try {
            const tenantId = req.params.id;
            const tenant = await TenantService.getTenantById(tenantId);
            if (!tenant) {
                res.status(404).json({ message: 'Tenant not found' });
                return;
            }
            res.status(200).json(tenant);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error fetching tenant';
            res.status(500).json({ message: 'Error fetching tenant', error: errorMessage });
        }
    }

    async updateTenant(req: Request, res: Response): Promise<void> {
        try {
            const tenantId = req.params.id;
            const tenantData = req.body;
            const updatedTenant = await TenantService.updateTenant(tenantId, tenantData);
            if (!updatedTenant) {
                res.status(404).json({ message: 'Tenant not found' });
                return;
            }
            res.status(200).json(updatedTenant);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error updating tenant';
            res.status(500).json({ message: 'Error updating tenant', error: errorMessage });
        }
    }

    async deleteTenant(req: Request, res: Response): Promise<void> {
        try {
            const tenantId = req.params.id;
            const deletedTenant = await TenantService.deleteTenant(tenantId);
            if (!deletedTenant) {
                res.status(404).json({ message: 'Tenant not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error deleting tenant';
            res.status(500).json({ message: 'Error deleting tenant', error: errorMessage });
        }
    }
}

export { TenantController };
export const tenantController = new TenantController();
export default tenantController;