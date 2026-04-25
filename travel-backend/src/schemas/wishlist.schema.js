import { z } from 'zod';

export const addToWishlistSchema = z.object({
  body: z.object({
    destination_id: z.string().uuid(),
  }),
});

export const removeFromWishlistSchema = z.object({
  params: z.object({
    destinationId: z.string().uuid(),
  }),
});
