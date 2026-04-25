import { z } from 'zod';
import { DESTINATION_CATEGORIES } from '../utils/constants.js';

export const searchSchema = z.object({
  query: z.object({
    q: z.string().min(2, 'Search query must be at least 2 characters'),
    category: z.enum(DESTINATION_CATEGORIES).optional(),
    country: z.string().optional(),
    minPrice: z.string().transform(Number).optional(),
    maxPrice: z.string().transform(Number).optional(),
    rating: z.string().transform(Number).optional(),
    page: z.string().transform(Number).default('1'),
    limit: z.string().transform(Number).default('10'),
    sortBy: z.enum(['relevance', 'price_per_person', 'rating', 'views']).default('relevance'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }),
});
