import express from 'express';
import * as adminController from '../controllers/admin.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { adminLimiter } from '../middleware/rateLimiter.middleware.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.use(protect, authorize(ROLES.ADMIN), adminLimiter);

router.get('/dashboard', adminController.getAdminDashboard);
router.get('/users', adminController.getAllUsers);
router.get('/bookings', adminController.getAllBookings);
router.post('/notifications/broadcast', adminController.broadcastNotification);
router.post('/destinations/bulk', adminController.bulkCreateDestinations);

export default router;
