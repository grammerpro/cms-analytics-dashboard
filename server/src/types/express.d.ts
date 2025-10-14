// This file extends the Express types for custom request properties.

import { User } from '../models/User.model';
import { Tenant } from '../models/Tenant.model';

declare global {
  namespace Express {
    interface Request {
      user?: User;        // Custom property to hold authenticated user
      tenant?: Tenant;    // Custom property to hold current tenant
      tenantId?: string;  // Custom property to hold tenant ID
      userId?: string;    // Custom property to hold user ID
    }
  }
}