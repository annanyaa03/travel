import authService from '../services/auth.service.js';
import emailService from '../services/email.service.js';
import analyticsService from '../services/analytics.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ANALYTICS_EVENTS } from '../utils/constants.js';

/**
 * Controller for Auth routes
 */
export const register = asyncHandler(async (req, res) => {
  const { email, password, full_name } = req.body;
  const { user, session } = await authService.register(email, password, full_name);

  // Send welcome email (non-blocking)
  emailService.sendWelcome(email, full_name);

  // Track event
  analyticsService.trackEvent(ANALYTICS_EVENTS.USER_REGISTERED, user.id, null, {}, req);

  res.status(201).json(ApiResponse.success('User registered successfully', { user, session }));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, session } = await authService.login(email, password);

  // Track event
  analyticsService.trackEvent(ANALYTICS_EVENTS.USER_LOGIN, user.id, null, {}, req);

  res.status(200).json(ApiResponse.success('Logged in successfully', { user, session }));
});

export const logout = asyncHandler(async (req, res) => {
  await authService.logout();
  res.status(200).json(ApiResponse.success('Logged out successfully'));
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refresh_token } = req.body;
  const data = await authService.refreshToken(refresh_token);
  res.status(200).json(ApiResponse.success('Token refreshed successfully', data));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await authService.forgotPassword(email);
  res.status(200).json(ApiResponse.success('Password reset link sent to your email'));
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  await authService.resetPassword(token, password);
  res.status(200).json(ApiResponse.success('Password has been reset successfully'));
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(ApiResponse.success('User profile fetched', req.user));
});
