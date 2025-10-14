import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User.model';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = await AuthService.verifyToken(token);
        
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

export default authMiddleware;