import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    full_name: z.string().min(2).optional(),
    bio: z.string().max(500).optional(),
    phone: z.string().optional(),
    preferences: z.record(z.any()).optional(),
  }),
});

export const adminUpdateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    role: z.enum(['user', 'admin']).optional(),
    is_verified: z.boolean().optional(),
  }),
});
