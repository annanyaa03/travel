import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { env } from './config/env.js';
import routes from './routes/index.js';
import errorHandler from './middleware/error.middleware.js';
import loggerMiddleware from './middleware/logger.middleware.js';
import sanitizeMiddleware from './middleware/sanitize.middleware.js';
import { globalLimiter } from './middleware/rateLimiter.middleware.js';

const app = express();

// --- Security & Middleware ---
app.use(helmet());
app.use(cors({
  origin: env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
}));

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Sanitize request data
app.use(...sanitizeMiddleware);

// Gzip compression
app.use(compression());

// HTTP Request Logging
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(loggerMiddleware);
}

// Rate Limiting
app.use('/api', globalLimiter);

// --- Routes ---
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Travel App API' });
});

app.use('/api', routes);

// --- Error Handling ---
app.use(errorHandler);

export default app;
