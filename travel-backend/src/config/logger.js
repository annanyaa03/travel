import winston from 'winston';
import 'winston-daily-rotate-file';
import pino from 'pino';
import { env } from './env.js';
import path from 'path';

// --- Winston Configuration (File Logging) ---
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

const errorFileTransport = new winston.transports.DailyRotateFile({
  filename: path.join(env.LOG_DIR, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxFiles: '14d',
});

const combinedFileTransport = new winston.transports.DailyRotateFile({
  filename: path.join(env.LOG_DIR, 'combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

export const winstonLogger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: logFormat,
  transports: [
    errorFileTransport,
    combinedFileTransport,
  ],
});

if (env.NODE_ENV !== 'production') {
  winstonLogger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

// --- Pino Configuration (HTTP Logging) ---
export const pinoLogger = pino({
  level: env.LOG_LEVEL,
  transport: env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
      translateTime: 'SYS:standard',
    },
  } : undefined,
  redact: {
    paths: ['req.headers.authorization', 'req.body.password', 'req.body.token'],
    remove: true,
  },
});

export default { winstonLogger, pinoLogger };
