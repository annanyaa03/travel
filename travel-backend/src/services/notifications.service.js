import { supabase } from '../config/supabase.js';
import { NOTIFICATION_TYPES } from '../utils/constants.js';

/**
 * Service for notifications
 */
class NotificationService {
  /**
   * Create notification
   */
  async create(userId, title, message, type = NOTIFICATION_TYPES.SYSTEM, data = {}) {
    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        title,
        message,
        type,
        data
      })
      .select()
      .single();

    if (error) throw error;
    return notification;
  }

  /**
   * Get user notifications
   */
  async getByUser(userId) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Mark notification as read
   */
  async markAsRead(id, userId) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Mark all as read
   */
  async markAllAsRead(userId) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) throw error;
    return true;
  }

  /**
   * Delete notification
   */
  async delete(id, userId) {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
    return true;
  }

  /**
   * Get unread count
   */
  async getUnreadCount(userId) {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) throw error;
    return count;
  }
}

export default new NotificationService();
