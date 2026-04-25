import express from 'express';
import * as analyticsController from '../controllers/analytics.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.use(protect, authorize(ROLES.ADMIN));

router.get('/dashboard', analyticsController.getFullAnalytics);
router.get('/revenue', analyticsController.getRevenueStats);

export default router;
