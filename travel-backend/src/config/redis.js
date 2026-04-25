import Redis from 'ioredis';
import NodeCache from 'node-cache';
import { env } from './env.js';

let redis = null;
const memoryCache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

try {
  redis = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    password: env.REDIS_PASSWORD
  });

  redis.on('error', (err) => {
    console.warn('⚠️ Redis error, falling back to in-memory cache:', err.message);
  });

  redis.on('connect', () => {
    console.log('🚀 Redis connected successfully');
  });
} catch (error) {
  console.warn('⚠️ Redis connection failed, using in-memory cache fallback');
}

/**
 * Get value from cache (Redis or Memory)
 */
export const getCache = async (key) => {
  if (redis && redis.status === 'ready') {
    try {
      const val = await redis.get(key);
      return val ? JSON.parse(val) : null;
    } catch (err) {
      console.error('Redis get error:', err);
    }
  }
  return memoryCache.get(key);
};

/**
 * Set value in cache
 */
export const setCache = async (key, value, ttl = 600) => {
  if (redis && redis.status === 'ready') {
    try {
      await redis.set(key, JSON.stringify(value), 'EX', ttl);
    } catch (err) {
      console.error('Redis set error:', err);
    }
  }
  memoryCache.set(key, value, ttl);
};

/**
 * Delete from cache
 */
export const delCache = async (key) => {
  if (redis && redis.status === 'ready') {
    try {
      await redis.del(key);
    } catch (err) {
      console.error('Redis del error:', err);
    }
  }
  memoryCache.del(key);
};

/**
 * Flush all cache
 */
export const flushCache = async () => {
  if (redis && redis.status === 'ready') {
    try {
      await redis.flushall();
    } catch (err) {
      console.error('Redis flush error:', err);
    }
  }
  memoryCache.flushAll();
};

export default redis;
