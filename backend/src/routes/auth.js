import express from 'express';
import { authController } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Registro
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Perfil de usuario (protegido)
router.get('/profile', authenticateToken, authController.getProfile);

export default router;