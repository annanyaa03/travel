import wishlistService from '../services/wishlist.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Controller for Wishlist routes
 */
export const getMyWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.getByUser(req.user.id);
  res.status(200).json(ApiResponse.success('Wishlist fetched', wishlist));
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const { destination_id } = req.body;
  const item = await wishlistService.add(req.user.id, destination_id);
  res.status(201).json(ApiResponse.success('Added to wishlist', item));
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const { destinationId } = req.params;
  await wishlistService.remove(req.user.id, destinationId);
  res.status(200).json(ApiResponse.success('Removed from wishlist'));
});

export const checkWishlistStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isWishlisted = await wishlistService.check(req.user.id, id);
  res.status(200).json(ApiResponse.success('Wishlist status checked', { isWishlisted }));
});
