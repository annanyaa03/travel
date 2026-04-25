import reviewService from '../services/reviews.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { getPaginationMeta } from '../utils/pagination.js';

/**
 * Controller for Review routes
 */
export const createReview = asyncHandler(async (req, res) => {
  const review = await reviewService.create(req.user.id, req.body);
  res.status(201).json(ApiResponse.success('Review posted successfully', review));
});

export const getDestinationReviews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { page, limit } = req.query;
  const { data, total } = await reviewService.getByDestination(id, page, limit);
  const meta = getPaginationMeta(total, page, limit);
  res.status(200).json(ApiResponse.success('Reviews fetched', data, meta));
});

export const markReviewHelpful = asyncHandler(async (req, res) => {
  await reviewService.markHelpful(req.params.id);
  res.status(200).json(ApiResponse.success('Review marked as helpful'));
});

export const deleteReview = asyncHandler(async (req, res) => {
  await reviewService.delete(req.params.id, req.user.id, req.user.role === 'admin');
  res.status(200).json(ApiResponse.success('Review deleted successfully'));
});
