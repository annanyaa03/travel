import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino-http';
import routes from './routes/index.js';

const app = express();

// 1. Logging
app.use(pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
}));

// 2. Security Headers
app.use(helmet());

// 3. CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

console.log('--- CORS Allowed Origins ---');
console.log(allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 4. Handle preflight OPTIONS requests handled by cors() middleware above

// 5. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 6. Routes
app.use('/api', routes);

// Root route for testing
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Compass & Co. API is running' });
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
  console.error('--- Global Error Handler ---');
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

export default app;
