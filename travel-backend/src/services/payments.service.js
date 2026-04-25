import { stripe } from '../config/stripe.js';
import { supabase } from '../config/supabase.js';
import { env } from '../config/env.js';
import { PAYMENT_STATUS, BOOKING_STATUS } from '../utils/constants.js';

/**
 * Service for payment processing
 */
class PaymentService {
  /**
   * Create a Stripe Checkout Session
   */
  async createCheckoutSession(bookingId, userId) {
    // 1. Get booking and destination details
    const { data: booking, error: bookError } = await supabase
      .from('bookings')
      .select('*, destinations(*), users(email)')
      .eq('id', bookingId)
      .eq('user_id', userId)
      .single();

    if (bookError || !booking) throw new Error('Booking not found');
    if (booking.payment_status === PAYMENT_STATUS.PAID) throw new Error('Booking already paid');

    // 2. Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: env.STRIPE_CURRENCY,
          product_data: {
            name: booking.destinations.name,
            images: booking.destinations.image_url ? [booking.destinations.image_url] : [],
            description: `Booking for ${booking.num_travelers} travelers on ${booking.travel_date}`,
          },
          unit_amount: Math.round(booking.total_price * 100), // Stripe expects cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${env.FRONTEND_URL}/payment/cancel?booking_id=${bookingId}`,
      customer_email: booking.users.email,
      client_reference_id: bookingId,
      metadata: {
        booking_id: bookingId,
        user_id: userId,
      }
    });

    // 3. Update booking with session ID
    await supabase
      .from('bookings')
      .update({ stripe_session_id: session.id })
      .eq('id', bookingId);

    return session;
  }

  /**
   * Handle Stripe Webhook
   */
  async handleWebhook(event) {
    const session = event.data.object;

    switch (event.type) {
      case 'checkout.session.completed':
        await this.fulfillOrder(session);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailure(session);
        break;
    }
  }

  /**
   * Fulfill order after successful payment
   */
  async fulfillOrder(session) {
    const bookingId = session.metadata.booking_id;
    const userId = session.metadata.user_id;

    // 1. Update Payment table
    await supabase.from('payments').insert({
      booking_id: bookingId,
      user_id: userId,
      stripe_payment_intent_id: session.payment_intent,
      stripe_session_id: session.id,
      amount: session.amount_total / 100,
      status: PAYMENT_STATUS.PAID,
      metadata: session.metadata
    });

    // 2. Update Booking table
    await supabase.from('bookings').update({
      payment_status: PAYMENT_STATUS.PAID,
      status: BOOKING_STATUS.CONFIRMED,
      updated_at: new Date().toISOString()
    }).eq('id', bookingId);
  }

  /**
   * Handle payment failure
   */
  async handlePaymentFailure(session) {
    const bookingId = session.metadata?.booking_id;
    if (!bookingId) return;

    await supabase.from('bookings').update({
      payment_status: PAYMENT_STATUS.FAILED,
    }).eq('id', bookingId);
  }

  /**
   * Process refund
   */
  async refund(bookingId, reason, amount = null) {
    const { data: payment, error } = await supabase
      .from('payments')
      .select('*')
      .eq('booking_id', bookingId)
      .eq('status', PAYMENT_STATUS.PAID)
      .single();

    if (error || !payment) throw new Error('Payment not found for refund');

    const refund = await stripe.refunds.create({
      payment_intent: payment.stripe_payment_intent_id,
      amount: amount ? Math.round(amount * 100) : undefined,
      reason: 'requested_by_customer',
      metadata: { reason }
    });

    await supabase.from('payments').update({
      status: PAYMENT_STATUS.REFUNDED,
      metadata: { ...payment.metadata, refund_id: refund.id, refund_reason: reason }
    }).eq('id', payment.id);

    await supabase.from('bookings').update({
      payment_status: PAYMENT_STATUS.REFUNDED,
      status: BOOKING_STATUS.CANCELLED
    }).eq('id', bookingId);

    return refund;
  }
}

export default new PaymentService();
