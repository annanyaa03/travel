import { supabase } from '../config/supabase.js';

/**
 * Service for analytics and dashboard data
 */
class AnalyticsService {
  /**
   * Track event
   */
  async trackEvent(eventType, userId = null, destinationId = null, metadata = {}, req = null) {
    const event = {
      event_type: eventType,
      user_id: userId,
      destination_id: destinationId,
      metadata,
      ip_address: req?.ip,
      user_agent: req?.headers['user-agent'],
    };

    const { error } = await supabase.from('analytics_events').insert(event);
    if (error) console.error('Failed to track analytics event:', error.message);
  }

  /**
   * Get dashboard stats (Admin)
   */
  async getDashboardStats() {
    // 1. Total Revenue
    const { data: payments } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'succeeded');
    
    const totalRevenue = payments?.reduce((acc, p) => acc + Number(p.amount), 0) || 0;

    // 2. Bookings count by status
    const { data: bookings } = await supabase
      .from('bookings')
      .select('status');
    
    const bookingStats = {
      total: bookings?.length || 0,
      confirmed: bookings?.filter(b => b.status === 'confirmed').length || 0,
      pending: bookings?.filter(b => b.status === 'pending').length || 0,
      cancelled: bookings?.filter(b => b.status === 'cancelled').length || 0,
    };

    // 3. User growth (total + new this month)
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // 4. Top destinations
    const { data: topDestinations } = await supabase
      .from('destinations')
      .select('id, name, views, image_url')
      .order('views', { ascending: false })
      .limit(5);

    return {
      totalRevenue,
      bookingStats,
      totalUsers,
      topDestinations,
    };
  }
}

export default new AnalyticsService();
