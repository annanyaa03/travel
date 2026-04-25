import { verifyToken, extractToken } from '../utils/tokenHelper.js';
import ApiResponse from '../utils/apiResponse.js';
import { supabase } from '../config/supabase.js';

/**
 * Middleware to authenticate requests using JWT
 */
export const protect = async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json(ApiResponse.error('Not authorized, no token provided'));
  }

  const supabaseUser = await verifyToken(token);

  if (!supabaseUser) {
    return res.status(401).json(ApiResponse.error('Not authorized, invalid token'));
  }

  // Fetch user details from our database
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', supabaseUser.email)
    .single();

  if (error || !user) {
    return res.status(401).json(ApiResponse.error('User not found in database'));
  }

  req.user = user;
  req.supabaseUser = supabaseUser;
  next();
};

/**
 * Middleware to authorize roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json(ApiResponse.error(`Role ${req.user?.role} is not authorized to access this route`));
    }
    next();
  };
};
