import paymentService from '../services/payments.service.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { env } from '../config/env.js';
import stripe from '../config/stripe.js';

/**
 * Controller for Payment routes
 */
export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { booking_id } = req.body;
  const session = await paymentService.createCheckoutSession(booking_id, req.user.id);
  res.status(200).json(ApiResponse.success('Checkout session created', { url: session.url }));
});

export const handleWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  await paymentService.handleWebhook(event);
  res.json({ received: true });
});

export const requestRefund = asyncHandler(async (req, res) => {
  const { booking_id, reason } = req.body;
  const refund = await paymentService.refund(booking_id, reason);
  res.status(200).json(ApiResponse.success('Refund processed successfully', refund));
});
