import { z } from 'zod';
import { isFutureDate } from '../utils/dateHelper.js';

export const createBookingSchema = z.object({
  body: z.object({
    destination_id: z.string().uuid(),
    travel_date: z.string().refine(isFutureDate, {
      message: "Travel date must be in the future",
    }),
    num_travelers: z.number().int().min(1).max(20),
    special_requests: z.string().max(500).optional(),
  }),
});

export const updateBookingSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    travel_date: z.string().refine(isFutureDate).optional(),
    num_travelers: z.number().int().min(1).max(20).optional(),
    status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
  }),
});
