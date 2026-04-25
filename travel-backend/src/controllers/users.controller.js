import userService from '../services/users.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Controller for User routes
 */
export const getProfile = asyncHandler(async (req, res) => {
  const profile = await userService.getProfile(req.user.id);
  res.status(200).json(ApiResponse.success('Profile fetched successfully', profile));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await userService.updateProfile(req.user.id, req.body);
  res.status(200).json(ApiResponse.success('Profile updated successfully', profile));
});

export const getMyStats = asyncHandler(async (req, res) => {
  const stats = await userService.getStats(req.user.id);
  res.status(200).json(ApiResponse.success('Statistics fetched', stats));
});

export const deleteAccount = asyncHandler(async (req, res) => {
  await userService.deleteAccount(req.user.id);
  res.status(200).json(ApiResponse.success('Account deleted successfully'));
});
