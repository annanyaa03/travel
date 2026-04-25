import { supabase } from '../config/supabase.js';
import { calculateTotalPrice } from '../utils/priceCalculator.js';
import { getSupabaseRange } from '../utils/pagination.js';
import { BOOKING_STATUS } from '../utils/constants.js';

/**
 * Service for booking management
 */
class BookingService {
  /**
   * Create a new booking
   */
  async create(userId, bookingData) {
    const { destination_id, travel_date, num_travelers, special_requests } = bookingData;

    // 1. Get destination details
    const { data: destination, error: destError } = await supabase
      .from('destinations')
      .select('price_per_person, available_slots, name')
      .eq('id', destination_id)
      .single();

    if (destError || !destination) throw new Error('Destination not found');

    // 2. Check slots
    if (destination.available_slots < num_travelers) {
      throw new Error(`Not enough slots available. Remaining: ${destination.available_slots}`);
    }

    // 3. Calculate total price
    const total_price = calculateTotalPrice(destination.price_per_person, num_travelers);

    // 4. Create booking record
    const { data: booking, error: bookError } = await supabase
      .from('bookings')
      .insert({
        user_id: userId,
        destination_id,
        travel_date,
        num_travelers,
        total_price,
        special_requests,
        status: BOOKING_STATUS.PENDING
      })
      .select('*, destinations(name, image_url)')
      .single();

    if (bookError) throw bookError;

    // 5. Update destination slots
    await supabase
      .from('destinations')
      .update({ available_slots: destination.available_slots - num_travelers })
      .eq('id', destination_id);

    return booking;
  }

  /**
   * Get user bookings
   */
  async getUserBookings(userId, page = 1, limit = 10) {
    const { from, to } = getSupabaseRange(page, limit);
    const { data, count, error } = await supabase
      .from('bookings')
      .select('*, destinations(name, country, city, image_url)', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { data, total: count };
  }

  /**
   * Get single booking by ID
   */
  async getById(id, userId, isAdmin = false) {
    let query = supabase
      .from('bookings')
      .select('*, destinations(*), users(full_name, email)')
      .eq('id', id);

    if (!isAdmin) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  }

  /**
   * Cancel booking
   */
  async cancel(id, userId, isAdmin = false) {
    // 1. Get booking details
    const { data: booking, error: getError } = await supabase
      .from('bookings')
      .select('*, destinations(id, available_slots)')
      .eq('id', id)
      .single();

    if (getError || !booking) throw new Error('Booking not found');
    if (!isAdmin && booking.user_id !== userId) throw new Error('Unauthorized');
    if (booking.status === BOOKING_STATUS.CANCELLED) throw new Error('Booking already cancelled');

    // 2. Update booking status
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ status: BOOKING_STATUS.CANCELLED })
      .eq('id', id);

    if (updateError) throw updateError;

    // 3. Restore destination slots
    await supabase
      .from('destinations')
      .update({ available_slots: booking.destinations.available_slots + booking.num_travelers })
      .eq('id', booking.destinations.id);

    return true;
  }

  /**
   * Update booking status (Admin)
   */
  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export default new BookingService();
