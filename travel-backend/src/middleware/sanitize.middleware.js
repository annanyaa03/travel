import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

/**
 * Middleware collection for sanitizing request data
 */
const sanitizeMiddleware = [
  // Prevent NoSQL injection
  mongoSanitize(),
  // Prevent XSS attacks
  xss(),
  // Prevent HTTP Parameter Pollution
  hpp(),
];

export default sanitizeMiddleware;
