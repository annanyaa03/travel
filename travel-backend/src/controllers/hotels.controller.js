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
    // 1. Sanitize and validate inputs
    let city = (req.query.city || '').trim();
    const checkIn = req.query.checkIn;
    const checkOut = req.query.checkOut;
    let guests = parseInt(req.query.guests, 10);

    // 2. Fix malformed parts: only allow letters and spaces in city
    city = city.replace(/[^a-zA-Z\s]/g, '').trim();
    guests = isNaN(guests) ? 2 : guests;

    // 3. Return 400 if required parameters are missing
    if (!city || !checkIn || !checkOut) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required search parameters. Please provide city, checkIn, and checkOut.' 
      });
    }

    // 4. Fetch hotels from service
    const hotels = await hotelService.getCachedHotels(city);

    // 5. Apply additional filters if present
    let filteredHotels = [...hotels];
    
    if (req.query.stars) {
      filteredHotels = filteredHotels.filter(h => h.stars === parseInt(req.query.stars));
    }
    if (req.query.type) {
      filteredHotels = filteredHotels.filter(h => h.type === req.query.type);
    }
    if (req.query.minPrice) {
      filteredHotels = filteredHotels.filter(h => h.pricePerNight >= parseFloat(req.query.minPrice));
    }
    if (req.query.maxPrice) {
      filteredHotels = filteredHotels.filter(h => h.pricePerNight <= parseFloat(req.query.maxPrice));
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
    console.error('Hotels search failed:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal Server Error' 
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
