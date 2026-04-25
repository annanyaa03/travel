import bookingReminderJob from '../jobs/bookingReminder.job.js';
import expiredBookingsJob from '../jobs/expiredBookings.job.js';
import analyticsSnapshotJob from '../jobs/analyticsSnapshot.job.js';
import cleanupUploadsJob from '../jobs/cleanupUploads.job.js';
import { winstonLogger } from '../config/logger.js';

/**
 * Initialize all cron jobs
 */
export const initCronJobs = () => {
  winstonLogger.info('⏰ Initializing Cron Jobs');
  
  bookingReminderJob.start();
  expiredBookingsJob.start();
  analyticsSnapshotJob.start();
  cleanupUploadsJob.start();
};


export default initCronJobs;
