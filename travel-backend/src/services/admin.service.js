import { supabase } from '../config/supabase.js';

/**
 * Service for administrative tasks
 */
class AdminService {
  /**
   * Get all bookings with filters
   */
  async getAllBookings(filters) {
    let query = supabase
      .from('bookings')
      .select('*, users(full_name, email), destinations(name)');

    if (filters.status) query = query.eq('status', filters.status);
    
    const { data, count, error } = await query
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, total: count };
  }

  /**
   * Bulk update destinations
   */
  async bulkCreateDestinations(destinations) {
    const { data, error } = await supabase
      .from('destinations')
      .insert(destinations);

    if (error) throw error;
    return data;
  }

  /**
   * Send broadcast notification
   */
  async broadcastNotification(title, message, type = 'system') {
    const { data: users } = await supabase.from('users').select('id');
    
    const notifications = users.map(user => ({
      user_id: user.id,
      title,
      message,
      type
    }));

    const { error } = await supabase.from('notifications').insert(notifications);
    if (error) throw error;
    return true;
  }
}

export default new AdminService();
