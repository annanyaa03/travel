import { resizeImage, uploadToSupabase, deleteFromSupabase } from '../utils/imageHelper.js';

/**
 * Service for file uploads
 */
class UploadService {
  /**
   * Upload destination image
   */
  async uploadDestinationImage(file) {
    const resized = await resizeImage(file.buffer, 1200, 800);
    return uploadToSupabase(resized, 'destinations', file.originalname, file.mimetype);
  }

  /**
   * Upload user avatar
   */
  async uploadAvatar(file) {
    const resized = await resizeImage(file.buffer, 400, 400);
    return uploadToSupabase(resized, 'avatars', file.originalname, file.mimetype);
  }

  /**
   * Upload review images
   */
  async uploadReviewImage(file) {
    const resized = await resizeImage(file.buffer, 800, 600);
    return uploadToSupabase(resized, 'reviews', file.originalname, file.mimetype);
  }

  /**
   * Delete image
   */
  async deleteImage(fileUrl) {
    return deleteFromSupabase(fileUrl);
  }
}

export default new UploadService();
