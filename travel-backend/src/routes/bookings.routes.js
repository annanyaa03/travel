import express from 'express';
import * as bookController from '../controllers/bookings.controller.js';
import validate from '../middleware/validate.middleware.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import * as bookSchema from '../schemas/booking.schema.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.use(protect); // All booking routes require auth

router.post('/', validate(bookSchema.createBookingSchema), bookController.createBooking);
router.get('/', bookController.getMyBookings);
router.get('/:id', bookController.getBookingById);
router.delete('/:id', bookController.cancelBooking);

// Admin only
router.put('/:id/status', authorize(ROLES.ADMIN), validate(bookSchema.updateBookingSchema), bookController.updateBookingStatus);

export default router;
