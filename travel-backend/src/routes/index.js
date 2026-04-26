import express from 'express';
import authRoutes from './auth.routes.js';
import destinationsRouter from './destinations.routes.js';
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
import hotelRoutes from './hotels.routes.js';


const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/destinations', destinationsRouter);
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
router.use('/hotels', hotelRoutes);


console.log('--- API Routes Registered ---');
console.log('✅ /api/auth');
console.log('✅ /api/destinations');
console.log('✅ /api/bookings');
console.log('✅ /api/users');
console.log('✅ /api/payments');
console.log('✅ /api/reviews');
console.log('✅ /api/wishlist');
console.log('✅ /api/notifications');
console.log('✅ /api/search');
console.log('✅ /api/health');
console.log('✅ /api/admin');
console.log('✅ /api/analytics');
console.log('✅ /api/uploads');

export default router;
