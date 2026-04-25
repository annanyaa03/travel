import pinoHttp from 'pino-http';
import { pinoLogger } from '../config/logger.js';
import { nanoid } from 'nanoid';

/**
 * HTTP request logger middleware using Pino
 */
const loggerMiddleware = pinoHttp({
  logger: pinoLogger,
  genReqId: (req) => req.headers['x-request-id'] || nanoid(),
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} completed with ${res.statusCode}`;
  },
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} failed with ${res.statusCode}: ${err.message}`;
  },
});

export default loggerMiddleware;
