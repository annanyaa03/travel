import cron from 'node-cron';
import { supabase } from '../config/supabase.js';
import { winstonLogger } from '../config/logger.js';
import { env } from '../config/env.js';

/**
 * Job to cleanup orphaned uploads
 * Schedule: Every Sunday at 2:00 AM
 */
const cleanupUploadsJob = cron.schedule('0 2 * * 0', async () => {
  winstonLogger.info('⏰ Running Cleanup Uploads Job');

  try {
    // 1. List files in storage
    const { data: files, error } = await supabase.storage
      .from(env.SUPABASE_STORAGE_BUCKET)
      .list('destinations', { limit: 100 });

    if (error) throw error;

    let deletedCount = 0;
    for (const file of files) {
      // 2. Check if file is referenced in DB
      const { data: destination } = await supabase
        .from('destinations')
        .select('id')
        .ilike('image_url', `%${file.name}%`)
        .single();

      if (!destination) {
        // 3. Delete orphaned file
        await supabase.storage
          .from(env.SUPABASE_STORAGE_BUCKET)
          .remove([`destinations/${file.name}`]);
        deletedCount++;
      }
    }

    winstonLogger.info(`✅ Cleanup complete. Deleted ${deletedCount} orphaned files.`);
  } catch (error) {
    winstonLogger.error(`❌ Cleanup Uploads Job failed: ${error.message}`);
  }
});

export default cleanupUploadsJob;
