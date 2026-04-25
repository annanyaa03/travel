import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import validate from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import { authLimiter } from '../middleware/rateLimiter.middleware.js';
import * as authSchema from '../schemas/auth.schema.js';

const router = express.Router();

router.post('/register', authLimiter, validate(authSchema.registerSchema), authController.register);
router.post('/login', authLimiter, validate(authSchema.loginSchema), authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', validate(authSchema.forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(authSchema.resetPasswordSchema), authController.resetPassword);

router.get('/me', protect, authController.getMe);

export default router;
