import { supabase } from '../config/supabase.js';
import { generateSlug } from '../utils/slugify.js';
import { getSupabaseRange } from '../utils/pagination.js';

/**
 * Service for destination management
 */
class DestinationService {
  /**
   * Get all destinations with filters and pagination
   */
  async getAll(filters) {
    const { 
      page, limit, sortBy, sortOrder, category, country, 
      minPrice, maxPrice, minRating, featured, tags 
    } = filters;

    let query = supabase
      .from('destinations')
      .select('*', { count: 'exact' });

    if (category) query = query.eq('category', category);
    if (country) query = query.ilike('country', `%${country}%`);
    if (minPrice) query = query.gte('price_per_person', minPrice);
    if (maxPrice) query = query.lte('price_per_person', maxPrice);
    if (minRating) query = query.gte('rating', minRating);
    if (featured !== undefined) query = query.eq('featured', featured);
    if (tags && tags.length > 0) query = query.contains('tags', tags);

    const { from, to } = getSupabaseRange(page, limit);
    
    const { data, count, error } = await query
      .order(sortBy, { ascending: sortOrder === 'asc' })
      .range(from, to);

    if (error) throw error;
    return { data, total: count };
  }

  /**
   * Get single destination by ID
   */
  async getById(id) {
    const { data, error } = await supabase
      .from('destinations')
      .select('*, reviews(count)')
      .eq('id', id)
      .single();

    if (error) throw error;

    // Increment views
    await this.incrementViews(id);

    return data;
  }

  /**
   * Get single destination by slug
   */
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    // Increment views
    await this.incrementViews(data.id);

    return data;
  }

  /**
   * Increment view count
   */
  async incrementViews(id) {
    await supabase.rpc('increment_destination_views', { destination_id: id });
  }

  /**
   * Create destination
   */
  async create(destinationData) {
    const slug = generateSlug(destinationData.name);
    const { data, error } = await supabase
      .from('destinations')
      .insert({ ...destinationData, slug })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update destination
   */
  async update(id, updateData) {
    if (updateData.name) {
      updateData.slug = generateSlug(updateData.name);
    }

    const { data, error } = await supabase
      .from('destinations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Delete destination
   */
  async delete(id) {
    const { error } = await supabase
      .from('destinations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  /**
   * Get featured destinations
   */
  async getFeatured() {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('featured', true)
      .limit(6);

    if (error) throw error;
    return data;
  }

  /**
   * Get popular destinations
   */
  async getPopular() {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('views', { ascending: false })
      .limit(6);

    if (error) throw error;
    return data;
  }
}

export default new DestinationService();
