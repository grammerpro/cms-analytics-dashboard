import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateLogin, validateRegister } from '../middleware/validation.middleware';

const router = Router();

router.post('/login', validateLogin, AuthController.login);
router.post('/register', validateRegister, AuthController.register);
router.post('/logout', AuthController.logout);

export const authRoutes = router;
export default router;