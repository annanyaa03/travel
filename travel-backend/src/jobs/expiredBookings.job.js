import cron from 'node-cron';
import { supabase } from '../config/supabase.js';
import { winstonLogger } from '../config/logger.js';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../utils/constants.js';
import dayjs from 'dayjs';

/**
 * Job to cancel pending bookings older than 24h
 * Schedule: Every hour
 */
const expiredBookingsJob = cron.schedule('0 * * * *', async () => {
  winstonLogger.info('⏰ Running Expired Bookings Job');

  try {
    const cutoff = dayjs().subtract(24, 'hours').toISOString();

    // Find pending bookings older than 24h with no payment
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('id, num_travelers, destination_id')
      .eq('status', BOOKING_STATUS.PENDING)
      .eq('payment_status', PAYMENT_STATUS.PENDING)
      .lt('created_at', cutoff);

    if (error) throw error;

    for (const booking of bookings) {
      // 1. Cancel booking
      await supabase
        .from('bookings')
        .update({ status: BOOKING_STATUS.CANCELLED })
        .eq('id', booking.id);

      // 2. Restore slots
      const { data: dest } = await supabase
        .from('destinations')
        .select('available_slots')
        .eq('id', booking.destination_id)
        .single();

      if (dest) {
        await supabase
          .from('destinations')
          .update({ available_slots: dest.available_slots + booking.num_travelers })
          .eq('id', booking.destination_id);
      }
    }

    winstonLogger.info(`✅ Cancelled ${bookings.length} expired bookings`);
  } catch (error) {
    winstonLogger.error(`❌ Expired Bookings Job failed: ${error.message}`);
  }
});

export default expiredBookingsJob;
