import { supabase } from '../config/supabase.js';

// Simple in-memory cache (no Redis needed)
const hotelCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Get hotels with in-memory caching
 */
export const getCachedHotels = async (city) => {
  const cacheKey = city.toLowerCase().trim();
  const cached = hotelCache.get(cacheKey);
  
  // Return cached if fresh
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log(`Cache HIT for: ${city}`);
    return cached.data;
  }
  
  // Fetch fresh data
  console.log(`Cache MISS for: ${city}`);
  const data = await fetchHotelsFromDB(city);
  
  // Store in cache
  hotelCache.set(cacheKey, {
    data: data,
    timestamp: Date.now()
  });
  
  return data;
};

/**
 * Fetch hotels from database with optimizations
 */
export const fetchHotelsFromDB = async (city) => {
  const { data, error } = await supabase
    .from('hotels')
    .select(
      'id, name, slug, stars, type, city, ' +
      'country, address, description, rating, ' +
      'rating_label, review_count, ' +
      'price_per_night, currency, images, ' +
      'amenities, badges, free_cancellation, ' +
      'breakfast_included, distance_from_center, ' +
      'latitude, longitude, featured, ' +
      'has_pool, has_spa, pet_friendly'
    )
    .ilike('city', `%${city}%`)
    .order('rating', { ascending: false })
    .limit(20);

  if (error) throw error;

  // Transform data
  return data.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug,
    stars: hotel.stars,
    type: hotel.type,
    address: hotel.address,
    rating: parseFloat(hotel.rating),
    ratingLabel: hotel.rating_label,
    reviewCount: hotel.review_count,
    pricePerNight: parseFloat(hotel.price_per_night),
    currency: hotel.currency,
    images: hotel.images || [],
    amenities: hotel.amenities || [],
    badges: hotel.badges || [],
    freeCancellation: hotel.free_cancellation,
    breakfastIncluded: hotel.breakfast_included,
    distanceFromCenter: hotel.distance_from_center,
    coordinates: {
      lat: hotel.latitude,
      lng: hotel.longitude
    },
    description: hotel.description,
    featured: hotel.featured,
    hasPool: hotel.has_pool,
    hasSpa: hotel.has_spa,
    petFriendly: hotel.pet_friendly
  }));
};

// Keep existing export for compatibility if needed, but point to the new logic
export const searchHotelsFromDB = async (params) => {
  return fetchHotelsFromDB(params.city);
};

