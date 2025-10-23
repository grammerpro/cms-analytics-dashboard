import { User } from '../models/User.model';
import { sign, verify } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../config/env.config';
import { db } from '../config/database.config';
import crypto from 'crypto';

interface UserRow {
    id: string;
    email: string;
    password_hash: string;
    name: string;
    role: 'admin' | 'editor' | 'viewer';
    tenant_id: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export class AuthService {
    static async register(userData: { 
        email: string; 
        password: string; 
        name?: string; 
        role?: 'admin' | 'editor' | 'viewer';
        tenantId: string;
    }): Promise<{ user: User; token: string }> {
        try {
            // Check if user already exists
            const existingUser = await db.oneOrNone<UserRow>(
                'SELECT * FROM users WHERE email = $1',
                [userData.email]
            );

            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            
            const userRole: 'admin' | 'editor' | 'viewer' = (userData.role && ['admin', 'editor', 'viewer'].includes(userData.role)) 
                ? userData.role 
                : 'viewer';
            
            // Insert new user into database
            const userRow = await db.one<UserRow>(
                `INSERT INTO users (email, password_hash, name, role, tenant_id, is_active) 
                 VALUES ($1, $2, $3, $4, $5, true) 
                 RETURNING *`,
                [userData.email, hashedPassword, userData.name || '', userRole, userData.tenantId]
            );
            
            // Create User model instance
            const user = new User(
                userRow.id,
                userRow.email,
                userRow.password_hash,
                userRow.tenant_id,
                userRow.role
            );
            
            // Generate token
            const token = this.generateToken(user);

            // Store session in database
            await this.storeSession(user.id, token);
            
            return { user, token };
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    static async login(credentials: { email: string; password: string }): Promise<{ user: User; token: string }> {
        try {
            // Find user by email
            const userRow = await db.oneOrNone<UserRow>(
                'SELECT * FROM users WHERE email = $1 AND is_active = true',
                [credentials.email]
            );
            
            if (!userRow) {
                throw new Error('Invalid email or password');
            }
            
            // Verify password
            const isValid = await bcrypt.compare(credentials.password, userRow.password_hash);
            
            if (!isValid) {
                throw new Error('Invalid email or password');
            }

            // Update last login
            await db.none(
                'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
                [userRow.id]
            );
            
            // Create User model instance
            const user = new User(
                userRow.id,
                userRow.email,
                userRow.password_hash,
                userRow.tenant_id,
                userRow.role
            );
            
            // Generate token
            const token = this.generateToken(user);

            // Store session
            await this.storeSession(user.id, token);
            
            return { user, token };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static async logout(userId: string, token: string): Promise<void> {
        try {
            // Remove session from database
            const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
            await db.none(
                'DELETE FROM sessions WHERE user_id = $1 AND token_hash = $2',
                [userId, tokenHash]
            );
            console.log(`User ${userId} logged out successfully`);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    static async getUserById(userId: string): Promise<User | null> {
        try {
            const userRow = await db.oneOrNone<UserRow>(
                'SELECT * FROM users WHERE id = $1 AND is_active = true',
                [userId]
            );

            if (!userRow) {
                return null;
            }

            return new User(
                userRow.id,
                userRow.email,
                userRow.password_hash,
                userRow.tenant_id,
                userRow.role
            );
        } catch (error) {
            console.error('Get user error:', error);
            return null;
        }
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

    private static async storeSession(userId: string, token: string): Promise<void> {
        try {
            const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now

            await db.none(
                `INSERT INTO sessions (user_id, token_hash, expires_at) 
                 VALUES ($1, $2, $3)`,
                [userId, tokenHash, expiresAt]
            );

            // Clean up expired sessions
            await db.none(
                'DELETE FROM sessions WHERE expires_at < CURRENT_TIMESTAMP'
            );
        } catch (error) {
            console.error('Store session error:', error);
            // Don't throw error, session storage is not critical
        }
    }

    static async isTokenValid(token: string): Promise<boolean> {
        try {
            const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
            const session = await db.oneOrNone(
                'SELECT * FROM sessions WHERE token_hash = $1 AND expires_at > CURRENT_TIMESTAMP',
                [tokenHash]
            );
            return !!session;
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    }
}