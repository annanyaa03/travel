import express from 'express';
import * as destController from '../controllers/destinations.controller.js';
import validate from '../middleware/validate.middleware.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import cacheMiddleware from '../middleware/cache.middleware.js';
import * as destSchema from '../schemas/destination.schema.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.get('/', validate(destSchema.filterSchema), cacheMiddleware(600), destController.getAllDestinations);
router.get('/featured', cacheMiddleware(1800), destController.getFeaturedDestinations);
router.get('/popular', cacheMiddleware(1800), destController.getPopularDestinations);
router.get('/:id', destController.getDestinationById);
router.get('/slug/:slug', cacheMiddleware(900), destController.getDestinationBySlug);

// Admin only routes
router.post('/', protect, authorize(ROLES.ADMIN), validate(destSchema.createDestinationSchema), destController.createDestination);
router.put('/:id', protect, authorize(ROLES.ADMIN), validate(destSchema.updateDestinationSchema), destController.updateDestination);
router.delete('/:id', protect, authorize(ROLES.ADMIN), destController.deleteDestination);

export default router;
