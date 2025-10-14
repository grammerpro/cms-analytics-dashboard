import { Request, Response, NextFunction } from 'express';
import TenantService from '../services/tenant.service';

export const tenantMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = req.headers['x-tenant-id'] as string || req.tenantId;

    if (!tenantId) {
        return res.status(400).json({ message: 'Tenant ID is required' });
    }

    try {
        const tenant = await TenantService.getTenantById(tenantId);
        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        req.tenant = tenant;
        req.tenantId = tenantId;
        next();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        return res.status(500).json({ message: 'Internal server error', error: errorMessage });
    }
};

export default tenantMiddleware;