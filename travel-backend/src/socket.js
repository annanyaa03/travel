import { Server } from 'socket.io';
import { verifyToken } from './utils/tokenHelper.js';
import { winstonLogger } from './config/logger.js';
import { supabase } from './config/supabase.js';

/**
 * Socket.io initialization and event handlers
 */
export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Authentication Middleware
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error: No token provided'));

    const supabaseUser = await verifyToken(token);
    if (!supabaseUser) return next(new Error('Authentication error: Invalid token'));

    // Fetch user role
    const { data: user } = await supabase
      .from('users')
      .select('id, role')
      .eq('email', supabaseUser.email)
      .single();

    if (!user) return next(new Error('Authentication error: User not found'));

    socket.user = user;
    next();
  });

  io.on('connection', (socket) => {
    winstonLogger.info(`🔌 Socket connected: ${socket.id} (User: ${socket.user.id})`);

    // Join private room
    socket.join(`user:${socket.user.id}`);

    // Join admin room if applicable
    if (socket.user.role === 'admin') {
      socket.join('admin');
    }

    socket.on('join:destination', (destinationId) => {
      socket.join(`destination:${destinationId}`);
    });

    socket.on('leave:destination', (destinationId) => {
      socket.leave(`destination:${destinationId}`);
    });

    socket.on('disconnect', () => {
      winstonLogger.info(`🔌 Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

/**
 * Helper to emit notification to a specific user
 */
export const emitNotification = (io, userId, notification) => {
  io.to(`user:${userId}`).emit('notification:new', notification);
};

/**
 * Helper to emit booking update to a destination room
 */
export const emitBookingUpdate = (io, destinationId, event, data) => {
  io.to(`destination:${destinationId}`).emit(event, data);
};

export default initSocket;
