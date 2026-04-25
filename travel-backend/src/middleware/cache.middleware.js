import { getCache, setCache } from '../config/redis.js';
import ApiResponse from '../utils/apiResponse.js';

/**
 * Middleware to cache GET requests
 */
const cacheMiddleware = (ttl = 600) => async (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  const key = `cache:${req.originalUrl || req.url}`;

  try {
    const cachedData = await getCache(key);

    if (cachedData) {
      return res.json(ApiResponse.success('Fetched from cache', cachedData));
    }

    // Override res.json to cache the response before sending
    const originalJson = res.json;
    res.json = function (body) {
      if (body.success && body.data) {
        setCache(key, body.data, ttl);
      }
      return originalJson.call(this, body);
    };

    next();
  } catch (error) {
    console.error('Cache middleware error:', error);
    next();
  }
};

export default cacheMiddleware;
