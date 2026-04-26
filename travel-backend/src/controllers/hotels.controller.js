import supabase from '../config/supabase.js';
import * as hotelService from '../services/hotels.service.js';

export const searchHotels = async (req, res) => {
  try {
    const { 
      city = 'Paris',
      stars,
      type,
      minPrice = 0,
      maxPrice = 10000
    } = req.query;

    // Use the cached service logic instead of inline query for better performance and consistency
    const hotels = await hotelService.getCachedHotels(city);

    // Filter by other params if needed (since cache is only by city)
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

    // Hardcode city info - NO external API calls
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
    console.error('Hotel search error:', error);
    return res.status(500).json({
      success: false,
      message: error.message
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
