import bookingService from '../services/bookings.service.js';
import emailService from '../services/email.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { getPaginationMeta } from '../utils/pagination.js';

/**
 * Controller for Booking routes
 */
export const createBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.create(req.user.id, req.body);
  
  // Send confirmation email (non-blocking)
  emailService.sendBookingConfirmation(req.user.email, booking);

  res.status(201).json(ApiResponse.success('Booking created successfully', booking));
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const { data, total } = await bookingService.getUserBookings(req.user.id, page, limit);
  const meta = getPaginationMeta(total, page, limit);
  res.status(200).json(ApiResponse.success('My bookings fetched', data, meta));
});

export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await bookingService.getById(req.params.id, req.user.id, req.user.role === 'admin');
  res.status(200).json(ApiResponse.success('Booking details fetched', booking));
});

export const cancelBooking = asyncHandler(async (req, res) => {
  await bookingService.cancel(req.params.id, req.user.id, req.user.role === 'admin');
  
  // Send cancellation email (non-blocking)
  emailService.sendBookingCancellation(req.user.email, { id: req.params.id });

  res.status(200).json(ApiResponse.success('Booking cancelled successfully'));
});

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await bookingService.updateStatus(req.params.id, req.body.status);
  res.status(200).json(ApiResponse.success('Booking status updated', booking));
});
