import { supabase } from '../config/supabase.js';
import redis from '../config/redis.js';
import { verifyEmailConnection } from '../config/nodemailer.js';
import stripe from '../config/stripe.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import os from 'os';

/**
 * Basic health check
 */
export const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

/**
 * Detailed health check
 */
export const detailedHealthCheck = asyncHandler(async (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime() / 86400)}d ${Math.floor((process.uptime() % 86400) / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m`,
    services: {},
    memory: {
      used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
      total: `${Math.round(os.totalmem() / 1024 / 1024)}MB`,
      percentage: `${Math.round((process.memoryUsage().heapUsed / os.totalmem()) * 100)}%`,
    },
    system: {
      platform: process.platform,
      nodeVersion: process.version,
    }
  };

  // 1. Database check
  const startDb = Date.now();
  const { error: dbError } = await supabase.from('users').select('id').limit(1);
  healthData.services.database = {
    status: dbError ? 'down' : 'up',
    latency: `${Date.now() - startDb}ms`,
  };
  if (dbError) healthData.status = 'degraded';

  // 2. Redis check
  const startRedis = Date.now();
  try {
    if (redis && redis.status === 'ready') {
      await redis.ping();
      healthData.services.redis = { status: 'up', latency: `${Date.now() - startRedis}ms` };
    } else {
      healthData.services.redis = { status: 'down' };
    }
  } catch (err) {
    healthData.services.redis = { status: 'down' };
  }

  // 3. Email check
  const emailUp = await verifyEmailConnection();
  healthData.services.email = { status: emailUp ? 'up' : 'down' };

  // 4. Stripe check
  try {
    await stripe.balance.retrieve();
    healthData.services.stripe = { status: 'up' };
  } catch (err) {
    healthData.services.stripe = { status: 'down' };
  }

  res.status(healthData.status === 'unhealthy' ? 503 : 200).json(healthData);
});
