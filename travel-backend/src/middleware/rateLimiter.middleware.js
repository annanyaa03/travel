import rateLimit from 'express-rate-limit';
import ApiResponse from '../utils/apiResponse.js';

const createLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: ApiResponse.error(message),
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export const globalLimiter = createLimiter(
  15 * 60 * 1000,
  100,
  'Too many requests from this IP, please try again after 15 minutes'
);

export const authLimiter = createLimiter(
  15 * 60 * 1000,
  10,
  'Too many login attempts from this IP, please try again after 15 minutes'
);

export const searchLimiter = createLimiter(
  1 * 60 * 1000,
  30,
  'Too many search requests, please slow down'
);

export const uploadLimiter = createLimiter(
  60 * 60 * 1000,
  5,
  'Too many uploads, please try again after an hour'
);

export const paymentLimiter = createLimiter(
  60 * 60 * 1000,
  20,
  'Too many payment attempts, please try again later'
);

export const adminLimiter = createLimiter(
  15 * 60 * 1000,
  200,
  'Too many admin requests'
);
