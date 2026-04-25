import express from 'express';
import * as notifyController from '../controllers/notifications.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/', notifyController.getMyNotifications);
router.put('/:id/read', notifyController.markAsRead);
router.put('/read-all', notifyController.markAllAsRead);
router.delete('/:id', notifyController.deleteNotification);
router.get('/unread-count', notifyController.getUnreadCount);

export default router;
