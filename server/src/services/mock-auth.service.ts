import { User } from '../models/User.model';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../config/env.config';

// In-memory user storage for mock mode
const mockUsers: Map<string, User> = new Map();

// Add a default demo user
const demoUserPassword = 'password123';
bcrypt.hash(demoUserPassword, 10).then(hashedPassword => {
    const demoUser = new User(
        'demo-user-id',
        'demo@example.com',
        hashedPassword,
        'demo-tenant-id',
        'admin'
    );
    mockUsers.set(demoUser.email, demoUser);
});

export class MockAuthService {
    static async register(userData: { 
        email: string; 
        password: string; 
        name?: string; 
        role?: 'admin' | 'editor' | 'viewer';
        tenantId: string;
    }): Promise<{ user: User; token: string }> {
        // Check if user already exists
        if (mockUsers.has(userData.email)) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const userRole: 'admin' | 'editor' | 'viewer' = (userData.role && ['admin', 'editor', 'viewer'].includes(userData.role)) 
            ? userData.role 
            : 'viewer';
        
        // Create user
        const user = new User(
            `user-${Date.now()}`,
            userData.email,
            hashedPassword,
            userData.tenantId,
            userRole
        );
        
        // Store user
        mockUsers.set(user.email, user);
        
        // Generate token
        const token = this.generateToken(user);
        
        return { user, token };
    }

    static async login(credentials: { email: string; password: string }): Promise<{ user: User; token: string }> {
        // Find user by email
        const user = mockUsers.get(credentials.email);
        
        if (!user) {
            throw new Error('Invalid email or password');
        }
        
        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isValid) {
            throw new Error('Invalid email or password');
        }
        
        // Generate token
        const token = this.generateToken(user);
        
        return { user, token };
    }

    static async logout(userId: string, token: string): Promise<void> {
        // In mock mode, just log it
        console.log(`Mock logout for user ${userId}`);
    }

    static async getUserById(userId: string): Promise<User | null> {
        // Find user by ID
        for (const user of mockUsers.values()) {
            if (user.id === userId) {
                return user;
            }
        }
        return null;
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
            const jwt = require('jsonwebtoken');
            jwt.verify(token, env.JWT_SECRET, (err: any, decoded: any) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });
    }

    static async isTokenValid(token: string): Promise<boolean> {
        try {
            await this.verifyToken(token);
            return true;
        } catch (error) {
            return false;
        }
    }
}
