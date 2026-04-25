import { supabase, supabaseAnon } from '../config/supabase.js';
import { winstonLogger } from '../config/logger.js';
import { ANALYTICS_EVENTS } from '../utils/constants.js';

/**
 * Service for authentication logic
 */
class AuthService {
  /**
   * Register a new user
   */
  async register(email, password, fullName) {
    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAnon.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (authError) throw authError;

    // 2. Insert into our users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
      })
      .select()
      .single();

    if (userError) {
      // Cleanup auth user if database insert fails
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw userError;
    }

    return { user: userData, session: authData.session };
  }

  /**
   * Login user
   */
  async login(email, password) {
    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.user.id);

    // Fetch full user record
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    return { user, session: data.session };
  }

  /**
   * Logout user
   */
  async logout() {
    const { error } = await supabaseAnon.auth.signOut();
    if (error) throw error;
  }

  /**
   * Refresh token
   */
  async refreshToken(refreshToken) {
    const { data, error } = await supabaseAnon.auth.refreshSession({ refresh_token: refreshToken });
    if (error) throw error;
    return data;
  }

  /**
   * Forgot password
   */
  async forgotPassword(email) {
    const { error } = await supabaseAnon.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }

  /**
   * Reset password
   */
  async resetPassword(token, newPassword) {
    const { error } = await supabaseAnon.auth.updateUser({ password: newPassword });
    if (error) throw error;
  }

  /**
   * Verify email
   */
  async verifyEmail(otp, email) {
    const { error } = await supabaseAnon.auth.verifyOTP({
      email,
      token: otp,
      type: 'signup'
    });
    if (error) throw error;

    await supabase
      .from('users')
      .update({ is_verified: true })
      .eq('email', email);
  }
}

export default new AuthService();
