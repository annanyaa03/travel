import express from 'express';
import authRoutes from './auth.routes.js';
import destinationRoutes from './destinations.routes.js';
import bookingRoutes from './bookings.routes.js';
import userRoutes from './users.routes.js';
import paymentRoutes from './payments.routes.js';
import reviewRoutes from './reviews.routes.js';
import wishlistRoutes from './wishlist.routes.js';
import notificationRoutes from './notifications.routes.js';
import searchRoutes from './search.routes.js';
import healthRoutes from './health.routes.js';
import adminRoutes from './admin.routes.js';
import analyticsRoutes from './analytics.routes.js';
import uploadRoutes from './uploads.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/destinations', destinationRoutes);
router.use('/bookings', bookingRoutes);
router.use('/users', userRoutes);
router.use('/payments', paymentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/notifications', notificationRoutes);
router.use('/search', searchRoutes);
router.use('/health', healthRoutes);
router.use('/admin', adminRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/uploads', uploadRoutes);

export default router;

