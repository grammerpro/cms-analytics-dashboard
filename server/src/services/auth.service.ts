import { User } from '../models/User.model';
import { sign, verify } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../config/env.config';

export class AuthService {
    static async register(userData: { email: string; password: string; name?: string; role?: 'admin' | 'editor' | 'viewer' }): Promise<{ user: User; token: string }> {
        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const userRole: 'admin' | 'editor' | 'viewer' = (userData.role && ['admin', 'editor', 'viewer'].includes(userData.role)) 
            ? userData.role 
            : 'viewer';
        
        // Create user (mock implementation)
        const user = new User(
            Math.random().toString(36).substr(2, 9),
            userData.email,
            hashedPassword,
            'default-tenant',
            userRole
        );
        
        // Generate token
        const token = this.generateToken(user);
        
        return { user, token };
    }

    static async login(credentials: { email: string; password: string }): Promise<string> {
        // Mock user lookup
        const mockUser = new User(
            'user-123',
            credentials.email,
            await bcrypt.hash(credentials.password, 10),
            'default-tenant',
            'admin'
        );
        
        // Verify password (in real app, compare with stored hash)
        // const isValid = await bcrypt.compare(credentials.password, mockUser.password);
        
        // Generate and return token
        return this.generateToken(mockUser);
    }

    static async logout(user: any): Promise<void> {
        // In a real app, invalidate token or remove from session store
        console.log(`User ${user?.email} logged out`);
    }

    static generateToken(user: User): string {
        return sign(
            { 
                id: user.id, 
                email: user.email, 
                role: user.role,
                tenantId: user.tenantId 
            },
            env.JWT_SECRET,
            { expiresIn: '24h' }
        );
    }

    static verifyToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            verify(token, env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });
    }
}