import { z } from 'zod';

export const createReviewSchema = z.object({
  body: z.object({
    destination_id: z.string().uuid(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(20).max(1000),
    images: z.array(z.string().url()).optional(),
  }),
});

export const updateReviewSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().min(20).max(1000).optional(),
    images: z.array(z.string().url()).optional(),
  }),
});
