import express from 'express';
import * as searchController from '../controllers/search.controller.js';
import validate from '../middleware/validate.middleware.js';
import { searchLimiter } from '../middleware/rateLimiter.middleware.js';
import cacheMiddleware from '../middleware/cache.middleware.js';
import * as searchSchema from '../schemas/search.schema.js';

const router = express.Router();

router.get('/', searchLimiter, validate(searchSchema.searchSchema), cacheMiddleware(300), searchController.search);
router.get('/suggestions', searchController.getSuggestions);
router.get('/trending', cacheMiddleware(3600), searchController.getTrendingSearches);

export default router;
