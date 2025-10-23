import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../services/mock-auth.service';
import { User } from '../models/User.model';

// Check if we should use mock auth
const USE_MOCK_AUTH = process.env.USE_MOCK_AUTH === 'true';
const authService = USE_MOCK_AUTH ? MockAuthService : AuthService;

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify token validity
        const decoded = await authService.verifyToken(token);
        const isValid = await authService.isTokenValid(token);
        
        if (!isValid) {
            return res.status(403).json({ message: 'Token expired or invalid' });
        }
        
        // Create a User instance from decoded token data
        if (decoded && typeof decoded === 'object' && 'id' in decoded) {
            req.user = new User(
                decoded.id as string,
                decoded.email as string,
                '',
                decoded.tenantId as string,
                decoded.role as 'admin' | 'editor' | 'viewer'
            );
            req.userId = decoded.id as string;
            req.tenantId = decoded.tenantId as string;
        }
        
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
    }
};

// Middleware to check if user has required role
export const requireRole = (...roles: ('admin' | 'editor' | 'viewer')[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: 'Insufficient permissions' 
            });
        }

        next();
    };
};

// Default export for backward compatibility
const authMiddleware = authenticateToken;
export default authMiddleware;