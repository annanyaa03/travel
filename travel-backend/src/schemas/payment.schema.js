import { z } from 'zod';

export const createCheckoutSchema = z.object({
  body: z.object({
    booking_id: z.string().uuid(),
  }),
});

export const refundSchema = z.object({
  body: z.object({
    booking_id: z.string().uuid(),
    reason: z.string().min(10).max(500),
    amount: z.number().positive().optional(), // Optional for partial refunds
  }),
});
