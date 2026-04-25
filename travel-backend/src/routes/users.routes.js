import express from 'express';
import * as userController from '../controllers/users.controller.js';
import validate from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import * as userSchema from '../schemas/user.schema.js';

const router = express.Router();

router.use(protect);

router.get('/profile', userController.getProfile);
router.put('/profile', validate(userSchema.updateProfileSchema), userController.updateProfile);
router.get('/profile/stats', userController.getMyStats);
router.delete('/profile', userController.deleteAccount);

export default router;
