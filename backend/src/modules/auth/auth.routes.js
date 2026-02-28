import { Router } from 'express';
import * as authController from './auth.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { registerSchema, forgotPasswordSchema, resetPasswordSchema, loginSchema } from './auth.validation.js';
import { catchAsync } from '../../utils/catchAsync.js';
import rateLimit from 'express-rate-limit';

const router = Router();

const forgotPasswordLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 20, // Limit each IP to 5 forgot password requests per hour
    message: 'Too many password reset attempts, please try again after an hour'
});

// Route composition: Intercept -> Validate -> Execute
router.post('/register', validate(registerSchema), catchAsync(authController.register));
router.post('/login', validate(loginSchema), catchAsync(authController.login));
router.post('/logout', catchAsync(authController.logout));
router.post('/forgot-password', forgotPasswordLimiter, validate(forgotPasswordSchema), catchAsync(authController.forgotPassword));
router.post('/reset-password/:token', validate(resetPasswordSchema), catchAsync(authController.resetPassword));

export default router;