import searchService from '../services/search.service.js';
import analyticsService from '../services/analytics.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { getPaginationMeta } from '../utils/pagination.js';
import { ANALYTICS_EVENTS } from '../utils/constants.js';

/**
 * Controller for Search routes
 */
export const search = asyncHandler(async (req, res) => {
  const { data, total } = await searchService.search(req.query);
  const meta = getPaginationMeta(total, req.query.page, req.query.limit);

  // Track search query
  analyticsService.trackEvent(ANALYTICS_EVENTS.SEARCH, req.user?.id, null, { q: req.query.q }, req);

  res.status(200).json(ApiResponse.success('Search results fetched', data, meta));
});

export const getSuggestions = asyncHandler(async (req, res) => {
  const suggestions = await searchService.getSuggestions(req.query.q);
  res.status(200).json(ApiResponse.success('Suggestions fetched', suggestions));
});

export const getTrendingSearches = asyncHandler(async (req, res) => {
  const trending = await searchService.getTrending();
  res.status(200).json(ApiResponse.success('Trending searches fetched', trending));
});
