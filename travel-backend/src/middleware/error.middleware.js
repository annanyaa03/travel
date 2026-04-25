import ApiResponse from '../utils/apiResponse.js';
import { winstonLogger } from '../config/logger.js';
import { env } from '../config/env.js';

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (!statusCode) statusCode = 500;

  const response = {
    ...ApiResponse.error(message || 'Something went wrong'),
    ...(env.NODE_ENV === 'development' && { 
      error: err.message,
      stack: err.stack 
    }),
  };

  if (statusCode === 500) {
    winstonLogger.error(`${err.message} - ${req.method} ${req.url} - ${req.ip}`, {
      stack: err.stack,
      body: req.body,
      user: req.user?.id,
    });
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
