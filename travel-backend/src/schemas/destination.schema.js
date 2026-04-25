import { z } from 'zod';
import { DESTINATION_CATEGORIES } from '../utils/constants.js';

export const createDestinationSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    description: z.string().min(50, 'Description must be at least 50 characters'),
    country: z.string().min(2),
    city: z.string().min(2),
    price_per_person: z.number().positive(),
    category: z.enum(DESTINATION_CATEGORIES),
    available_slots: z.number().int().nonnegative(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    tags: z.array(z.string()).optional(),
    image_url: z.string().url().optional(),
  }),
});

export const updateDestinationSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(50).optional(),
    country: z.string().min(2).optional(),
    city: z.string().min(2).optional(),
    price_per_person: z.number().positive().optional(),
    category: z.enum(DESTINATION_CATEGORIES).optional(),
    available_slots: z.number().int().nonnegative().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    tags: z.array(z.string()).optional(),
    image_url: z.string().url().optional(),
    featured: z.boolean().optional(),
  }),
});

export const filterSchema = z.object({
  query: z.object({
    category: z.enum(DESTINATION_CATEGORIES).optional(),
    country: z.string().optional(),
    minPrice: z.string().transform(Number).optional(),
    maxPrice: z.string().transform(Number).optional(),
    minRating: z.string().transform(Number).optional(),
    featured: z.string().transform((v) => v === 'true').optional(),
    page: z.string().transform(Number).default('1'),
    limit: z.string().transform(Number).default('10'),
    sortBy: z.string().default('created_at'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    tags: z.string().optional().transform((v) => v ? v.split(',') : undefined),
  }),
});
