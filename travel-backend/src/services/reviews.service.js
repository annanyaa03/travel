import { supabase } from '../config/supabase.js';
import { getSupabaseRange } from '../utils/pagination.js';

/**
 * Service for review management
 */
class ReviewService {
  /**
   * Create a review
   */
  async create(userId, reviewData) {
    const { destination_id, rating, comment, images } = reviewData;

    // 1. Check if user has a confirmed booking for this destination
    const { data: booking, error: bookError } = await supabase
      .from('bookings')
      .select('id')
      .eq('user_id', userId)
      .eq('destination_id', destination_id)
      .eq('status', 'confirmed')
      .limit(1)
      .single();

    if (bookError || !booking) {
      throw new Error('You can only review destinations you have a confirmed booking for');
    }

    // 2. Check if already reviewed
    const { data: existing } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', userId)
      .eq('destination_id', destination_id)
      .single();

    if (existing) throw new Error('You have already reviewed this destination');

    // 3. Insert review
    const { data: review, error: revError } = await supabase
      .from('reviews')
      .insert({
        user_id: userId,
        destination_id,
        rating,
        comment,
        images: images || [],
      })
      .select('*, users(full_name)')
      .single();

    if (revError) throw revError;

    // 4. Update destination average rating
    await this.updateDestinationRating(destination_id);

    return review;
  }

  /**
   * Update destination average rating
   */
  async updateDestinationRating(destinationId) {
    const { data: reviews } = await supabase
      .from('reviews')
      .select('rating')
      .eq('destination_id', destinationId);

    if (reviews && reviews.length > 0) {
      const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
      await supabase
        .from('destinations')
        .update({ rating: Number(avgRating.toFixed(1)) })
        .eq('id', destinationId);
    }
  }

  /**
   * Get reviews for a destination
   */
  async getByDestination(destinationId, page = 1, limit = 10) {
    const { from, to } = getSupabaseRange(page, limit);
    const { data, count, error } = await supabase
      .from('reviews')
      .select('*, users(full_name, bio)', { count: 'exact' })
      .eq('destination_id', destinationId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { data, total: count };
  }

  /**
   * Mark review as helpful
   */
  async markHelpful(reviewId) {
    const { data, error } = await supabase.rpc('increment_review_helpful_votes', { review_id: reviewId });
    if (error) throw error;
    return data;
  }

  /**
   * Delete review
   */
  async delete(id, userId, isAdmin = false) {
    let query = supabase.from('reviews').delete().eq('id', id);
    if (!isAdmin) query = query.eq('user_id', userId);

    const { error } = await query;
    if (error) throw error;
    return true;
  }
}

export default new ReviewService();
