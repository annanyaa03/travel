import { supabase } from '../config/supabase.js';

export const searchHotelsFromDB = async ({
  city,
  checkIn,
  checkOut,
  guests = 2,
  stars,
  type,
  minPrice = 0,
  maxPrice = 10000,
  amenities = []
}) => {

  let query = supabase
    .from('hotels')
    .select('*')
    .ilike('city', `%${city}%`)
    .gte('price_per_night', minPrice)
    .lte('price_per_night', maxPrice)
    .order('rating', { ascending: false });

  if (stars) {
    query = query.eq('stars', stars);
  }

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;

  if (error) throw error;

  // Transform to match existing frontend format
  return data.map(hotel => ({
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug,
    stars: hotel.stars,
    type: hotel.type,
    address: hotel.address,
    rating: hotel.rating,
    ratingLabel: hotel.rating_label,
    reviewCount: hotel.review_count,
    pricePerNight: hotel.price_per_night,
    currency: hotel.currency,
    images: hotel.images,
    amenities: hotel.amenities,
    badges: hotel.badges,
    freeCancellation: hotel.free_cancellation,
    breakfastIncluded: hotel.breakfast_included,
    distanceFromCenter: hotel.distance_from_center,
    coordinates: {
      lat: hotel.latitude,
      lng: hotel.longitude
    },
    description: hotel.description,
    featured: hotel.featured,
    petFriendly: hotel.pet_friendly,
    hasPool: hotel.has_pool,
    hasSpa: hotel.has_spa
  }));
};
