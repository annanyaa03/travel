import destinationService from '../services/destinations.service.js';
import analyticsService from '../services/analytics.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { getPaginationMeta } from '../utils/pagination.js';
import { ANALYTICS_EVENTS } from '../utils/constants.js';

/**
 * Controller for Destination routes
 */
export const getAllDestinations = asyncHandler(async (req, res) => {
  const { data, total } = await destinationService.getAll(req.query);
  const meta = getPaginationMeta(total, req.query.page, req.query.limit);
  res.status(200).json(ApiResponse.success('Destinations fetched successfully', data, meta));
});

export const getDestinationById = asyncHandler(async (req, res) => {
  const destination = await destinationService.getById(req.params.id);
  
  // Track view
  analyticsService.trackEvent(ANALYTICS_EVENTS.VIEW_DESTINATION, req.user?.id, destination.id, {}, req);

  res.status(200).json(ApiResponse.success('Destination details fetched', destination));
});

export const getDestinationBySlug = asyncHandler(async (req, res) => {
  const destination = await destinationService.getBySlug(req.params.slug);

  // Track view
  analyticsService.trackEvent(ANALYTICS_EVENTS.VIEW_DESTINATION, req.user?.id, destination.id, {}, req);

  res.status(200).json(ApiResponse.success('Destination details fetched', destination));
});

export const createDestination = asyncHandler(async (req, res) => {
  const destination = await destinationService.create(req.body);
  res.status(201).json(ApiResponse.success('Destination created successfully', destination));
});

export const updateDestination = asyncHandler(async (req, res) => {
  const destination = await destinationService.update(req.params.id, req.body);
  res.status(200).json(ApiResponse.success('Destination updated successfully', destination));
});

export const deleteDestination = asyncHandler(async (req, res) => {
  await destinationService.delete(req.params.id);
  res.status(200).json(ApiResponse.success('Destination deleted successfully'));
});

export const getFeaturedDestinations = asyncHandler(async (req, res) => {
  const data = await destinationService.getFeatured();
  res.status(200).json(ApiResponse.success('Featured destinations fetched', data));
});

export const getPopularDestinations = asyncHandler(async (req, res) => {
  const data = await destinationService.getPopular();
  res.status(200).json(ApiResponse.success('Popular destinations fetched', data));
});
