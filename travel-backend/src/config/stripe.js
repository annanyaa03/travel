import Stripe from 'stripe';
import { env } from './env.js';

if (!env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10', // Latest stable API version
});

export default stripe;
