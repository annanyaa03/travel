import { ROLES } from '../utils/constants.js';
import ApiResponse from '../utils/apiResponse.js';

/**
 * Middleware to check if user is an admin
 */
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== ROLES.ADMIN) {
    return res.status(403).json(ApiResponse.error('Access denied. Admin rights required.'));
  }
  next();
};

export default adminOnly;
