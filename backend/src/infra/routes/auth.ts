import { Router } from 'express';
import { AuthController } from '../../controllers/auth.js';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', (req, res) => {
  return authController.register(req, res);
});

authRoutes.post('/login', (req, res) => {
 return authController.login(req, res);
});

export { authRoutes };