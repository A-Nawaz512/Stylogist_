import { Router } from 'express';
import * as authController from './auth.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { registerSchema, forgotPasswordSchema, resetPasswordSchema } from './auth.validation.js';
import { catchAsync } from '../../utils/catchAsync.js';

const router = Router();

// Route composition: Intercept -> Validate -> Execute
router.post('/register', validate(registerSchema), catchAsync(authController.register));
router.post('/forgot-password', validate(forgotPasswordSchema), catchAsync(authController.forgotPassword));
router.post('/forgot-password/:token', validate(resetPasswordSchema), catchAsync(authController.forgotPassword));

export default router;