import { supabase } from '../config/supabase.js';
import { getSupabaseRange } from '../utils/pagination.js';

/**
 * Service for search functionality
 */
class SearchService {
  /**
   * Search destinations
   */
  async search(params) {
    const { q, category, country, minPrice, maxPrice, rating, page, limit, sortBy, sortOrder } = params;

    // Supabase full text search
    let query = supabase
      .from('destinations')
      .select('*', { count: 'exact' });

    // Text search on name, description, country, city
    if (q) {
      query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,country.ilike.%${q}%,city.ilike.%${q}%`);
    }

    if (category) query = query.eq('category', category);
    if (country) query = query.ilike('country', `%${country}%`);
    if (minPrice) query = query.gte('price_per_person', minPrice);
    if (maxPrice) query = query.lte('price_per_person', maxPrice);
    if (rating) query = query.gte('rating', rating);

    const { from, to } = getSupabaseRange(page, limit);

    // Sort mapping
    let sortField = sortBy;
    if (sortBy === 'relevance' && q) {
      // Relevance sorting is handled differently in Supabase if using .search()
      // For ilike, we default to created_at or price
      sortField = 'created_at';
    }

    const { data, count, error } = await query
      .order(sortField, { ascending: sortOrder === 'asc' })
      .range(from, to);

    if (error) throw error;
    return { data, total: count };
  }

  /**
   * Get search suggestions
   */
  async getSuggestions(q) {
    if (!q || q.length < 2) return [];

    const { data, error } = await supabase
      .from('destinations')
      .select('name, country, city')
      .or(`name.ilike.%${q}%,country.ilike.%${q}%,city.ilike.%${q}%`)
      .limit(5);

    if (error) throw error;
    
    // Flatten results for unique suggestions
    const suggestions = new Set();
    data.forEach(item => {
      if (item.name.toLowerCase().includes(q.toLowerCase())) suggestions.add(item.name);
      if (item.country.toLowerCase().includes(q.toLowerCase())) suggestions.add(item.country);
      if (item.city.toLowerCase().includes(q.toLowerCase())) suggestions.add(item.city);
    });

    return Array.from(suggestions);
  }

  /**
   * Get trending searches
   */
  async getTrending() {
    const { data, error } = await supabase
      .from('analytics_events')
      .select('metadata->>q')
      .eq('event_type', 'search')
      .not('metadata->>q', 'is', null)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    // Count occurrences
    const counts = {};
    data.forEach(item => {
      const q = item.q;
      counts[q] = (counts[q] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0]);
  }
}

export default new SearchService();
