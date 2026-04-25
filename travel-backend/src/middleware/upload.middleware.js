import multer from 'multer';
import ApiResponse from '../utils/apiResponse.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, PNG and WEBP are allowed.'), false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // Default 5MB
};

export const upload = multer({
  storage,
  fileFilter,
  limits,
});

/**
 * Middleware to handle Multer errors
 */
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json(ApiResponse.error('File size is too large. Max limit is 5MB.'));
    }
    return res.status(400).json(ApiResponse.error(err.message));
  } else if (err) {
    return res.status(400).json(ApiResponse.error(err.message));
  }
  next();
};

export default upload;
