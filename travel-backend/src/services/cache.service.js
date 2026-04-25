import { delCache, flushCache } from '../config/redis.js';

/**
 * Service for cache management and invalidation
 */
class CacheService {
  /**
   * Invalidate destination related caches
   */
  async invalidateDestinationCache(id = null, slug = null) {
    const keys = ['cache:/api/destinations', 'cache:/api/destinations/featured', 'cache:/api/destinations/popular'];
    
    if (id) keys.push(`cache:/api/destinations/${id}`);
    if (slug) keys.push(`cache:/api/destinations/slug/${slug}`);
    
    for (const key of keys) {
      await delCache(key);
    }
  }

  /**
   * Invalidate search cache
   */
  async invalidateSearchCache() {
    // Search cache keys are dynamic, so we might need a pattern delete or just flush
    // ioredis doesn't support wildcard delete easily without scripts, 
    // so we'll just invalidate the common ones or flush if needed.
    await delCache('cache:/api/search/trending');
  }

  /**
   * Clear everything
   */
  async clearAll() {
    await flushCache();
  }
}

export default new CacheService();
