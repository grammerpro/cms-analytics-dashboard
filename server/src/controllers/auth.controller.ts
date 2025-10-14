import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Registration failed';
            res.status(400).json({ message: errorMessage });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const token = await AuthService.login(req.body);
            res.status(200).json({ token });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            res.status(401).json({ message: errorMessage });
        }
    }

    static async logout(req: Request, res: Response): Promise<void> {
        try {
            if (req.user) {
                await AuthService.logout(req.user);
            }
            res.status(204).send();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Logout failed';
            res.status(500).json({ message: errorMessage });
        }
    }
}

export default AuthController;