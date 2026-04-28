import supabase from '../config/supabase.js';
import * as hotelService from '../services/hotels.service.js';
import { z } from 'zod';

const searchSchema = z.object({
  city: z.string().min(1).default('Paris'),
  stars: z.string().optional(),
  type: z.string().optional(),
  minPrice: z.string().optional().default('0'),
  maxPrice: z.string().optional().default('10000'),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.string().optional()
});

export const searchHotels = async (req, res) => {
  try {
    // Manually sanitize city param before parsing
    let rawCity = (req.query.city || '').trim().replace(/:\d+$/, '');
    if (req.query.city) {
      req.query.city = rawCity;
    }

    const parsed = searchSchema.safeParse(req.query);
    
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters',
        errors: parsed.error.format()
      });
    }

    let { 
      city,
      stars,
      type,
      minPrice,
      maxPrice,
      checkIn,
      checkOut,
      guests
    } = parsed.data;

    if (!city) {
      return res.status(400).json({ success: false, message: 'City is required' });
    }

    // Sanitize further
    city = city.replace(/[^\w\s-]/gi, '').trim();
    if (!city) {
      return res.status(400).json({ success: false, message: 'City parameter contains invalid characters' });
    }

    const hotels = await hotelService.getCachedHotels(city);

    let filteredHotels = [...hotels];
    
    if (stars) {
      filteredHotels = filteredHotels.filter(h => h.stars === parseInt(stars));
    }
    if (type) {
      filteredHotels = filteredHotels.filter(h => h.type === type);
    }
    if (minPrice) {
      filteredHotels = filteredHotels.filter(h => h.pricePerNight >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredHotels = filteredHotels.filter(h => h.pricePerNight <= parseFloat(maxPrice));
    }

    const cityInfo = getCityInfo(city);

    return res.status(200).json({
      success: true,
      data: {
        hotels: filteredHotels,
        total: filteredHotels.length,
        city: city,
        cityInfo: cityInfo
      }
    });

  } catch (error) {
    console.error('Error fetching hotels:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// Hardcoded city info - NO API calls needed
const getCityInfo = (city) => {
  const cityData = {
    'paris': { 
      temperature: '18°C', 
      currency: '€ Euro',
      country: 'France', 
      flag: '🇫🇷',
      timezone: 'CET'
    },
    'london': { 
      temperature: '14°C', 
      currency: '£ GBP',
      country: 'UK', 
      flag: '🇬🇧',
      timezone: 'GMT'
    },
    'rome': { 
      temperature: '22°C', 
      currency: '€ Euro',
      country: 'Italy', 
      flag: '🇮🇹',
      timezone: 'CET'
    },
    'tokyo': { 
      temperature: '20°C', 
      currency: '¥ Yen',
      country: 'Japan', 
      flag: '🇯🇵',
      timezone: 'JST'
    },
    'dubai': { 
      temperature: '35°C', 
      currency: 'AED Dirham',
      country: 'UAE', 
      flag: '🇦🇪',
      timezone: 'GST'
    },
    'new york': { 
      temperature: '16°C', 
      currency: '$ USD',
      country: 'USA', 
      flag: '🇺🇸',
      timezone: 'EST'
    },
    'singapore': { 
      temperature: '30°C', 
      currency: 'S$ SGD',
      country: 'Singapore', 
      flag: '🇸🇬',
      timezone: 'SGT'
    },
    'santorini': { 
      temperature: '24°C', 
      currency: '€ Euro',
      country: 'Greece', 
      flag: '🇬🇷',
      timezone: 'EET'
    },
    'maldives': { 
      temperature: '30°C', 
      currency: 'MVR Rufiyaa',
      country: 'Maldives', 
      flag: '🇲🇻',
      timezone: 'MVT'
    },
    'bangkok': { 
      temperature: '32°C', 
      currency: '฿ Baht',
      country: 'Thailand', 
      flag: '🇹🇭',
      timezone: 'ICT'
    },
    'sydney': { 
      temperature: '18°C', 
      currency: 'A$ AUD',
      country: 'Australia', 
      flag: '🇦🇺',
      timezone: 'AEST'
    },
    'bali': { 
      temperature: '28°C', 
      currency: 'Rp IDR',
      country: 'Indonesia', 
      flag: '🇮🇩',
      timezone: 'WITA'
    },
    'marrakech': { 
      temperature: '26°C', 
      currency: 'MAD Dirham',
      country: 'Morocco', 
      flag: '🇲🇦',
      timezone: 'WET'
    },
    'nairobi': { 
      temperature: '22°C', 
      currency: 'KES Shilling',
      country: 'Kenya', 
      flag: '🇰🇪',
      timezone: 'EAT'
    },
    'serengeti': { 
      temperature: '25°C', 
      currency: 'TZS Shilling',
      country: 'Tanzania', 
      flag: '🇹🇿',
      timezone: 'EAT'
    }
  };

  const key = city.toLowerCase();
  return cityData[key] || {
    temperature: '20°C',
    currency: '$ USD',
    country: city,
    flag: '🌍',
    timezone: 'UTC'
  };
};
