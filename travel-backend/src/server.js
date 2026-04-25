import http from 'http';
import app from './app.js';
import { env } from './config/env.js';
import { winstonLogger } from './config/logger.js';
import { initSocket } from './socket.js';
import { initCronJobs } from './services/cron.service.js';
import { verifyEmailConnection } from './config/nodemailer.js';

const PORT = env.PORT || 5000;

/**
 * Start the server
 */
async function startServer() {
  try {
    const server = http.createServer(app);

    // Initialize Socket.io
    const io = initSocket(server);
    app.set('io', io); // Make io accessible in controllers via req.app.get('io')

    // Initialize Cron Jobs
    initCronJobs();

    // Verify Email Connection
    await verifyEmailConnection();

    server.listen(PORT, () => {
      winstonLogger.info(`
🚀 Server is running in ${env.NODE_ENV} mode
🔊 Port: ${PORT)
🔗 URL: http://localhost:${PORT}
      `);
    });

    // Handle Unhandled Rejections
    process.on('unhandledRejection', (err) => {
      winstonLogger.error('UNHANDLED REJECTION! 💥 Shutting down...', err);
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle Uncaught Exceptions
    process.on('uncaughtException', (err) => {
      winstonLogger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', err);
      process.exit(1);
    });

  } catch (error) {
    winstonLogger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
