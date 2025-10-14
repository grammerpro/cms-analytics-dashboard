import { Router } from 'express';
import tenantController from '../controllers/tenant.controller';
import { validateTenant } from '../middleware/validation.middleware';

const router = Router();

// Route to create a new tenant
router.post('/', validateTenant, (req, res) => tenantController.createTenant(req, res));

// Route to get all tenants
router.get('/', (req, res) => tenantController.getTenants(req, res));

// Route to update a tenant by ID
router.put('/:id', validateTenant, (req, res) => tenantController.updateTenant(req, res));

// Route to delete a tenant by ID
router.delete('/:id', (req, res) => tenantController.deleteTenant(req, res));

export const tenantRoutes = router;
export default router;