import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../services/mock-auth.service';

// Check if we should use mock auth (when database is unavailable)
const USE_MOCK_AUTH = process.env.USE_MOCK_AUTH === 'true';
const authService = USE_MOCK_AUTH ? MockAuthService : AuthService;

export class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, name, role, tenantId } = req.body;
            
            // Validate required fields
            if (!email || !password) {
                res.status(400).json({ 
                    message: 'Email and password are required' 
                });
                return;
            }

            // Use default tenant if not provided (for mock mode)
            const finalTenantId = tenantId || 'default-tenant';

            const result = await authService.register({ 
                email, 
                password, 
                name, 
                role, 
                tenantId: finalTenantId 
            });
            
            res.status(201).json({
                message: 'Registration successful',
                user: {
                    id: result.user.id,
                    email: result.user.email,
                    role: result.user.role,
                    tenantId: result.user.tenantId
                },
                token: result.token
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Registration failed';
            res.status(400).json({ message: errorMessage });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            
            // Validate required fields
            if (!email || !password) {
                res.status(400).json({ 
                    message: 'Email and password are required' 
                });
                return;
            }

            const result = await authService.login({ email, password });
            
            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: result.user.id,
                    email: result.user.email,
                    role: result.user.role,
                    tenantId: result.user.tenantId
                },
                token: result.token
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            res.status(401).json({ message: errorMessage });
        }
    }

    static async logout(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;
            const token = req.headers.authorization?.replace('Bearer ', '');
            
            if (userId && token) {
                await authService.logout(userId, token);
            }
            
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Logout failed';
            res.status(500).json({ message: errorMessage });
        }
    }

    static async me(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const user = await authService.getUserById(req.user.id);
            
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(200).json({
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    tenantId: user.tenantId
                }
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to get user';
            res.status(500).json({ message: errorMessage });
        }
    }
}

export default AuthController;