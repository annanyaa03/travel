import uploadService from '../services/uploads.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Controller for File Upload routes
 */
export const uploadDestinationImage = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json(ApiResponse.error('No file uploaded'));
  const data = await uploadService.uploadDestinationImage(req.file);
  res.status(200).json(ApiResponse.success('Image uploaded successfully', data));
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json(ApiResponse.error('No file uploaded'));
  const data = await uploadService.uploadAvatar(req.file);
  res.status(200).json(ApiResponse.success('Avatar uploaded successfully', data));
});

export const uploadReviewImage = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json(ApiResponse.error('No file uploaded'));
  const data = await uploadService.uploadReviewImage(req.file);
  res.status(200).json(ApiResponse.success('Review image uploaded successfully', data));
});

export const deleteImage = asyncHandler(async (req, res) => {
  const { url } = req.body;
  await uploadService.deleteImage(url);
  res.status(200).json(ApiResponse.success('Image deleted successfully'));
});
