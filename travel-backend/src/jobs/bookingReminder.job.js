import cron from 'node-cron';
import { supabase } from '../config/supabase.js';
import emailService from '../services/email.service.js';
import notificationService from '../services/notifications.service.js';
import { winstonLogger } from '../config/logger.js';
import dayjs from 'dayjs';

/**
 * Job to send reminders 24h before travel
 * Schedule: Every day at 9:00 AM
 */
const bookingReminderJob = cron.schedule('0 9 * * *', async () => {
  winstonLogger.info('⏰ Running Booking Reminder Job');
  
  try {
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*, users(email, full_name), destinations(name)')
      .eq('travel_date', tomorrow)
      .eq('status', 'confirmed');

    if (error) throw error;

    for (const booking of bookings) {
      // Send email
      await emailService.sendEmail(
        booking.users.email,
        'Travel Reminder: Your adventure starts tomorrow!',
        'booking-reminder',
        { 
          fullName: booking.users.full_name,
          destinationName: booking.destinations.name,
          bookingId: booking.id
        }
      );

      // Create notification
      await notificationService.create(
        booking.user_id,
        'Travel Reminder',
        `Your trip to ${booking.destinations.name} starts tomorrow!`,
        'booking'
      );
    }

    winstonLogger.info(`✅ Sent ${bookings.length} reminders`);
  } catch (error) {
    winstonLogger.error(`❌ Booking Reminder Job failed: ${error.message}`);
  }
});

export default bookingReminderJob;
