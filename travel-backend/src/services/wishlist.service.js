import { supabase } from '../config/supabase.js';

/**
 * Service for wishlist management
 */
class WishlistService {
  /**
   * Add to wishlist
   */
  async add(userId, destinationId) {
    const { data, error } = await supabase
      .from('wishlist')
      .insert({ user_id: userId, destination_id: destinationId })
      .select('*, destinations(*)')
      .single();

    if (error) {
      if (error.code === '23505') throw new Error('Already in wishlist');
      throw error;
    }
    return data;
  }

  /**
   * Remove from wishlist
   */
  async remove(userId, destinationId) {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', userId)
      .eq('destination_id', destinationId);

    if (error) throw error;
    return true;
  }

  /**
   * Get user wishlist
   */
  async getByUser(userId) {
    const { data, error } = await supabase
      .from('wishlist')
      .select('*, destinations(*)')
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  }

  /**
   * Check if destination is in user wishlist
   */
  async check(userId, destinationId) {
    const { data, error } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', userId)
      .eq('destination_id', destinationId)
      .single();

    return !!data;
  }
}

export default new WishlistService();
