import { Router } from 'express';
import * as userController from './user.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { updateProfileSchema } from './user.validation.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();
router.use(authMiddleware);

router.get('/me', catchAsync(userController.getProfile));
router.patch('/me', validate(updateProfileSchema), catchAsync(userController.updateProfile));

export default router;