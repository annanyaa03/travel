import { supabase } from '../config/supabase.js';

/**
 * Verify JWT token using Supabase Auth
 */
export const verifyToken = async (token) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Token verification error:', error.message);
    return null;
  }
};

/**
 * Extract token from Authorization header
 */
export const extractToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};
