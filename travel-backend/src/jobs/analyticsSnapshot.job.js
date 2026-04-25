import cron from 'node-cron';
import { supabase } from '../config/supabase.js';
import { winstonLogger } from '../config/logger.js';
import analyticsService from '../services/analytics.service.js';

/**
 * Job to calculate daily analytics snapshot
 * Schedule: Every day at midnight
 */
const analyticsSnapshotJob = cron.schedule('0 0 * * *', async () => {
  winstonLogger.info('⏰ Running Analytics Snapshot Job');

  try {
    const stats = await analyticsService.getDashboardStats();
    
    await supabase.from('analytics_events').insert({
      event_type: 'daily_snapshot',
      metadata: stats
    });

    winstonLogger.info('✅ Analytics snapshot stored');
  } catch (error) {
    winstonLogger.error(`❌ Analytics Snapshot Job failed: ${error.message}`);
  }
});

export default analyticsSnapshotJob;
