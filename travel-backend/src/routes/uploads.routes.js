import express from 'express';
import * as uploadController from '../controllers/uploads.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadLimiter } from '../middleware/rateLimiter.middleware.js';
import { upload, handleUploadError } from '../middleware/upload.middleware.js';
import { ROLES } from '../utils/constants.js';

const router = express.Router();

router.use(protect, uploadLimiter);

router.post('/destination', authorize(ROLES.ADMIN), upload.single('image'), handleUploadError, uploadController.uploadDestinationImage);
router.post('/avatar', upload.single('image'), handleUploadError, uploadController.uploadAvatar);
router.post('/review', upload.single('image'), handleUploadError, uploadController.uploadReviewImage);
router.delete('/', uploadController.deleteImage);

export default router;
