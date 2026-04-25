/**
 * Pagination helper to format pagination metadata
 */
export const getPaginationMeta = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  return {
    page: Number(page),
    limit: Number(limit),
    total: Number(total),
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

/**
 * Get Supabase range for pagination
 */
export const getSupabaseRange = (page, limit) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  return { from, to };
};
