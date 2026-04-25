import { supabase } from '../config/supabase.js';

/**
 * Service for user management
 */
class UserService {
  /**
   * Get user profile
   */
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update user profile
   */
  async updateProfile(userId, updateData) {
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Delete user account
   */
  async deleteAccount(userId) {
    // Supabase will handle cascade deletes if configured in DB
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) throw error;

    await supabase.from('users').delete().eq('id', userId);
    return true;
  }

  /**
   * Get user statistics
   */
  async getStats(userId) {
    const { data: bookings } = await supabase
      .from('bookings')
      .select('total_price, status')
      .eq('user_id', userId);

    const { count: reviewsCount } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    const { count: wishlistCount } = await supabase
      .from('wishlist')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    const stats = {
      totalBookings: bookings.length,
      confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
      totalSpent: bookings.filter(b => b.status === 'confirmed').reduce((acc, b) => acc + Number(b.total_price), 0),
      reviewsWritten: reviewsCount || 0,
      wishlistItems: wishlistCount || 0,
    };

    return stats;
  }

  /**
   * Get all users (Admin)
   */
  async getAllUsers(page = 1, limit = 10) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { data, total: count };
  }
}

export default new UserService();
