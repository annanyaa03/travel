import notificationService from '../services/notifications.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Controller for Notification routes
 */
export const getMyNotifications = asyncHandler(async (req, res) => {
  const data = await notificationService.getByUser(req.user.id);
  res.status(200).json(ApiResponse.success('Notifications fetched', data));
});

export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await notificationService.markAsRead(req.params.id, req.user.id);
  res.status(200).json(ApiResponse.success('Notification marked as read', notification));
});

export const markAllAsRead = asyncHandler(async (req, res) => {
  await notificationService.markAllAsRead(req.user.id);
  res.status(200).json(ApiResponse.success('All notifications marked as read'));
});

export const deleteNotification = asyncHandler(async (req, res) => {
  await notificationService.delete(req.params.id, req.user.id);
  res.status(200).json(ApiResponse.success('Notification deleted'));
});

export const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await notificationService.getUnreadCount(req.user.id);
  res.status(200).json(ApiResponse.success('Unread count fetched', { count }));
});
