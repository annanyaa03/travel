import adminService from '../services/admin.service.js';
import analyticsService from '../services/analytics.service.js';
import userService from '../services/users.service.js';
import destinationService from '../services/destinations.service.js';
import bookingService from '../services/bookings.service.js';
import reviewService from '../services/reviews.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Controller for Admin routes
 */
export const getAdminDashboard = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getDashboardStats();
  res.status(200).json(ApiResponse.success('Admin dashboard stats fetched', stats));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const { data, total } = await userService.getAllUsers(page, limit);
  res.status(200).json(ApiResponse.success('All users fetched', data, { total, page, limit }));
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const { data, total } = await adminService.getAllBookings(req.query);
  res.status(200).json(ApiResponse.success('All bookings fetched', data, { total }));
});

export const broadcastNotification = asyncHandler(async (req, res) => {
  const { title, message, type } = req.body;
  await adminService.broadcastNotification(title, message, type);
  res.status(200).json(ApiResponse.success('Broadcast notification sent'));
});

export const bulkCreateDestinations = asyncHandler(async (req, res) => {
  const data = await adminService.bulkCreateDestinations(req.body.destinations);
  res.status(201).json(ApiResponse.success('Destinations created in bulk', data));
});
