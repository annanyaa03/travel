import analyticsService from '../services/analytics.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Controller for Analytics routes (Admin only)
 */
export const getFullAnalytics = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getDashboardStats();
  // In a real app, this would be much more detailed with time-series data
  res.status(200).json(ApiResponse.success('Full analytics fetched', stats));
});

export const getRevenueStats = asyncHandler(async (req, res) => {
  // Logic for revenue over time
  res.status(200).json(ApiResponse.success('Revenue stats fetched', { total: 50000, currency: 'USD' }));
});
