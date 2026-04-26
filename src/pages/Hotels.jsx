import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import HotelCard from '../components/hotels/HotelCard';
import HotelSkeleton from '../components/hotels/HotelSkeleton';
import HotelModal from '../components/hotels/HotelModal';
import './Hotels.css';

const DEFAULT_CITY = 'Paris';

// --- Helper Functions (Preserved) ---
const mapWeatherEmoji = (code) => {
  if (code === 0) return '☀️';
  if (code >= 1 && code <= 3) return '⛅';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code === 95) return '⛈️';
  return '⛅';
};

const cityImages = {
  paris: [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=520&h=360&fit=crop&q=85',
  ],
  tokyo: [
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=520&h=360&fit=crop&q=85',
  ],
  bali: [
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=520&h=360&fit=crop&q=85',
  ],
  default: [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=520&h=360&fit=crop&q=85',
  ]
};

function getHotelImage(city, index) {
  const key = city.toLowerCase().trim();
  const list = cityImages[key] || cityImages.default;
  return list[index % list.length];
}

function seedPrice(hotelName, stars) {
  let seed = 0;
  for (let i = 0; i < hotelName.length; i++) {
    seed += hotelName.charCodeAt(i) * (i + 1);
  }
  seed = seed % 1000;
  const ranges = { 5: { min: 320, max: 680 }, 4: { min: 160, max: 320 }, 3: { min: 85, max: 180 }, 2: { min: 50, max: 95 }, 1: { min: 30, max: 60 } };
  const { min, max } = ranges[stars] || ranges[3];
  return min + (seed % (max - min));
}

const descTemplates = [
  (name, city, stars) => `${name} offers ${stars === 5 ? 'unrivalled luxury' : 'exceptional comfort'} in the heart of ${city}. A favourite among travellers.`,
  (name, city, stars) => `Nestled in ${city}, ${name} combines ${stars >= 4 ? 'elegant design with world-class service' : 'comfort with convenient city access'}.`,
];

function getHotelDesc(hotelName, city, stars, index) {
  return descTemplates[index % descTemplates.length](hotelName, city, stars || 3);
}

const G_AMENITIES = ["WiFi", "Pool", "Spa", "Gym", "Parking", "Bar", "Restaurant", "Pet Friendly"];

const cleanName = (name) => name ? name.replace(/\s*-\s*\d+\s*\*+/g, '').replace(/\s*\d+\s*stars?/gi, '').replace(/\[.*\]/g, '').trim() : "";

function fetchWithTimeout(url, options = {}, ms = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal }).then(res => { clearTimeout(timer); return res; });
}

async function fetchOverpass(lat, lon, city) {
  const d = 0.25;
  const bbox = `${lat-d},${lon-d},${lat+d},${lon+d}`;
  const query = `[out:json][timeout:12];(node["tourism"="hotel"](${bbox});node["tourism"="hostel"](${bbox});node["tourism"="guest_house"](${bbox});way["tourism"="hotel"](${bbox}););out body center 40;`;
  const res = await fetchWithTimeout('https://overpass-api.de/api/interpreter', { method: 'POST', body: query }, 4000);
  const data = await res.json();
  return (data.elements || []).filter(el => el.tags?.name).map((el, i) => {
    const name = cleanName(el.tags.name);
    const stars = el.tags.stars ? parseInt(el.tags.stars) : 4;
    return {
      id: `osm_${el.id}`,
      name,
      address: [el.tags['addr:housenumber'], el.tags['addr:street']].filter(Boolean).join(' ') || el.tags['addr:city'] || '',
      stars,
      price: seedPrice(name, stars),
      desc: getHotelDesc(name, city, stars, i),
      img: getHotelImage(city, i),
      rating: 8.0 + (Math.random() * 1.8),
      amenities: G_AMENITIES.slice(0, 4),
      badge: ["Popular", "Great Deal", "New", "Editor's Choice", "Trending"][i % 5],
      point: { lat: el.lat || el.center?.lat || lat, lon: el.lon || el.center?.lon || lon }
    };
  });
}

const fallbackHotels = {
  paris: [
    { name:'Hôtel Bourg Tibourg', address:'19 Rue du Bourg Tibourg, Paris', stars:4, price:220 },
    { name:'Four Seasons George V', address:'31 Avenue George V, 75008 Paris', stars:5, price:980 },
    { name:'Hôtel de Crillon', address:'10 Place de la Concorde, 75008 Paris', stars:5, price:850 },
    { name:'Le Bristol Paris', address:'112 Rue du Faubourg Saint-Honoré', stars:5, price:920 }
  ]
};

function getStaticFallback(city) {
  const key = city.toLowerCase().trim();
  const list = fallbackHotels[key] || [];
  return list.map((h, i) => ({
    ...h,
    id: `fb-${key}-${i}`,
    desc: getHotelDesc(h.name, city, h.stars, i),
    img: getHotelImage(key, i),
    rating: 9.0 + (Math.random() * 0.8),
    amenities: G_AMENITIES.slice(0, 4),
    badge: i === 0 ? "Popular" : "Great Deal"
  }));
}

const Hotels = () => {
  const location = useLocation();
  const [inputValue, setInputValue] = useState(DEFAULT_CITY);
  const [city, setCity] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [country, setCountry] = useState(null);
  const [sortBy, setSortBy] = useState('rating');
  const [activeFilter, setActiveFilter] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showMap, setShowMap] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = useCallback(async (searchCity) => {
    if (!searchCity) return;
    setCity(searchCity);
    setLoading(true);
    setHasSearched(true);
    setError(null);
    setHotels([]);

    // Curated fallback
    const curatedFb = getStaticFallback(searchCity);
    if (curatedFb.length > 0) setHotels(curatedFb);

    try {
      const geoRes = await fetchWithTimeout(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchCity)}&format=json&limit=1`, { headers: { 'Accept-Language': 'en' } }, 1500);
      const geoData = await geoRes.json();
      if (!geoData.length) throw new Error('City not found');
      
      const { lat, lon, display_name } = geoData[0];
      const countryParts = display_name.split(', ');
      const countryName = countryParts[countryParts.length - 1];

      const [osm, weatherRes, countryRes] = await Promise.allSettled([
        fetchOverpass(parseFloat(lat), parseFloat(lon), searchCity),
        fetchWithTimeout(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`, {}, 2500),
        fetchWithTimeout(`https://restcountries.com/v3.1/name/${countryName}?fields=name,currencies,languages,flags`, {}, 2500)
      ]);

      if (osm.status === 'fulfilled' && osm.value.length > 0) setHotels(osm.value);
      if (weatherRes.status === 'fulfilled') {
        const wData = await weatherRes.value.json();
        setWeather({ temp: wData.current_weather.temperature, emoji: mapWeatherEmoji(wData.current_weather.weathercode) });
      }
      if (countryRes.status === 'fulfilled') {
        const cData = (await countryRes.value.json())[0];
        setCountry({ name: cData.name.common, flag: cData.flags.png, currency: Object.values(cData.currencies)[0].name, symbol: Object.values(cData.currencies)[0].symbol, language: Object.values(cData.languages)[0] });
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city');
    const initialCity = cityParam || DEFAULT_CITY;
    setInputValue(initialCity);
    performSearch(initialCity);
  }, [location.search, performSearch]);

  const filteredHotels = useMemo(() => {
    let res = [...hotels];
    if (activeFilter !== 'All') {
      if (activeFilter.includes('Stars')) {
        const s = parseInt(activeFilter[0]);
        res = res.filter(h => h.stars === s);
      }
    }
    res = res.filter(h => h.price >= priceRange[0] && h.price <= priceRange[1]);
    if (sortBy === 'rating') res.sort((a,b) => b.rating - a.rating);
    else if (sortBy === 'price_low') res.sort((a,b) => a.price - b.price);
    else if (sortBy === 'price_high') res.sort((a,b) => b.price - a.price);
    return res;
  }, [hotels, activeFilter, priceRange, sortBy]);

  const handleSearch = () => performSearch(inputValue);

  // Mock dates for snippet requirements
  const checkIn = '2024-05-10';
  const checkOut = '2024-05-14';

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#FAF9F6',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>

      {/* HERO SECTION */}
      <div style={{
        background: '#121212',
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%,
            rgba(201,168,76,0.05) 0%,
            transparent 60%),
          radial-gradient(ellipse at 80% 20%,
            rgba(255,255,255,0.02) 0%,
            transparent 50%)
        `,
        minHeight: '450px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 48px',
        textAlign: 'center'
      }}>

        {/* Small label */}
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#C9A84C',
          fontWeight: '300',
          marginBottom: '20px'
        }}>
          ✦ Hotels Worldwide
        </p>

        {/* Main heading */}
        <h1 style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontSize: '56px',
          fontWeight: '300',
          color: 'white',
          lineHeight: '1.1',
          marginBottom: '16px'
        }}>
          Find Your Perfect{' '}
          <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Stay</em>
        </h1>

        {/* Subtitle */}
        <p style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '16px',
          fontWeight: '300',
          marginBottom: '32px',
          maxWidth: '480px'
        }}>
          Discover handpicked luxury hotels across
          190+ destinations worldwide
        </p>

        {/* SEARCH BAR */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '0',
          maxWidth: '450px',
          width: '100%',
          display: 'flex',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        }}>
          {/* Destination input section */}
          <div style={{
            flex: 1,
            padding: '4px 14px',
            borderRight: '1px solid rgba(0,0,0,0.05)'
          }}>
            <p style={{
              fontSize: '8px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#9e9e9e',
              marginBottom: '1px',
              fontWeight: '400'
            }}>
              Destination
            </p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              placeholder="Where are you going?"
              style={{
                fontSize: '12px',
                color: '#1a1a1a',
                fontWeight: '300',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                width: '100%'
              }}
            />
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            style={{
              background: '#C9A84C',
              color: 'white',
              border: 'none',
              padding: '0 16px',
              fontSize: '11px',
              letterSpacing: '0.08em',
              fontWeight: '400',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={e => 
              e.target.style.background = '#b8963e'
            }
            onMouseLeave={e => 
              e.target.style.background = '#C9A84C'
            }
          >
            Search Hotels →
          </button>
        </div>
      </div>

      {/* RESULTS BAR */}
      {hasSearched && (
        <div style={{
          background: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
          padding: '8px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Left: results count + city info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: '13px',
              color: '#9e9e9e',
              fontWeight: '300'
            }}>
              {hotels.length} hotels found near
            </span>
            <span style={{
              fontFamily: 
                'Fraunces, Georgia, serif',
              fontStyle: 'italic',
              fontSize: '15px',
              color: '#1a1a1a'
            }}>
              {city}
            </span>

            {/* Weather pill */}
            {weather?.temp && (
              <span style={{
                background: '#f7f5f0',
                borderRadius: '0',
                padding: '4px 12px',
                fontSize: '11px',
                color: '#6b6b6b',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {weather.temp}°C
              </span>
            )}

            {/* Currency pill */}
            {country?.currency && (
              <span style={{
                background: '#f7f5f0',
                borderRadius: '0',
                padding: '4px 12px',
                fontSize: '11px',
                color: '#6b6b6b',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {country.symbol} {country.currency}
              </span>
            )}

            {/* Country pill */}
            {country?.name && (
              <span style={{
                fontSize: '12px',
                color: '#6b6b6b',
                marginLeft: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {country.flag && <img src={country.flag} alt="" style={{ width: '16px', height: '12px', borderRadius: '2px' }} />} {country.name}
              </span>
            )}
          </div>

          {/* Right: sort + show map */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: '0',
                padding: '8px 16px',
                fontSize: '12px',
                color: '#4a4a4a',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="rating">
                Sort: Top Rated
              </option>
              <option value="price_low">
                Price: Low → High
              </option>
              <option value="price_high">
                Price: High → Low
              </option>
            </select>

            {/* Show map button */}
            <button 
              onClick={() => setShowMap(!showMap)}
              style={{
              background: showMap ? '#1a1a1a' : 'transparent',
              border: '1px solid #e0e0e0',
              borderRadius: '0',
              padding: '8px 20px',
              fontSize: '12px',
              color: showMap ? 'white' : '#4a4a4a',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              if (!showMap) {
                e.target.style.borderColor = '#C9A84C';
                e.target.style.color = '#C9A84C';
              }
            }}
            onMouseLeave={e => {
              if (!showMap) {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.color = '#4a4a4a';
              }
            }}>
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>
          </div>
        </div>
      )}

      {/* FILTER PILLS */}
      {hasSearched && (
        <div style={{
          background: '#FAF9F6',
          padding: '12px 48px',
          borderBottom: '1px solid rgba(0,0,0,0.06)'
        }}>

          {/* Filter pills row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '16px'
          }}>
            {['All','5 Stars','4 Stars','Boutique',
              'Resort','Pool','Spa','Pet Friendly',
              'Free Cancellation',
              'Breakfast Included'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  background: activeFilter === filter
                    ? '#1a1a1a' : 'transparent',
                  color: activeFilter === filter
                    ? 'white' : '#6b6b6b',
                  border: activeFilter === filter
                    ? '1px solid #1a1a1a'
                    : '1px solid #e0e0e0',
                  borderRadius: '0',
                  padding: '6px 16px',
                  fontSize: '11px',
                  fontWeight: '300',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Price range */}
          <div>
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#9e9e9e',
              marginBottom: '10px',
              fontWeight: '400'
            }}>
              Range: ${priceRange[0]} — ${priceRange[1]}
            </p>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange(
                [priceRange[0], parseInt(e.target.value)]
              )}
              style={{
                width: '250px',
                accentColor: '#C9A84C',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 48px 60px'
      }}>

        {/* LOADING */}
        {loading && hotels.length === 0 && (
          <div>
            {[1,2,3,4].map(i => (
              <HotelSkeleton key={i} />
            ))}
          </div>
        )}

        {/* INITIAL STATE */}
        {!loading && !hasSearched && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px'
          }}>
            <h3 style={{
              fontFamily:
                'Fraunces, Georgia, serif',
              fontSize: '26px',
              color: '#3a3a3a',
              fontWeight: '400',
              marginBottom: '10px'
            }}>
              Find Your Perfect Stay
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#9e9e9e',
              fontWeight: '300',
              maxWidth: '320px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Enter a destination above to discover
              the world's finest hotels
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && hasSearched && 
         filteredHotels.length === 0 && !error && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px'
          }}>
            <h3 style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: '24px',
              color: '#3a3a3a',
              fontWeight: '400',
              marginBottom: '8px'
            }}>
              No hotels found
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#9e9e9e',
              fontWeight: '300',
              marginBottom: '24px'
            }}>
              Try a different destination or 
              adjust your filters
            </p>
            <button
              onClick={() => {
                setHasSearched(false);
                setInputValue('');
                setHotels([]);
              }}
              style={{
                background: '#1a1a1a',
                color: 'white',
                border: 'none',
                borderRadius: '0',
                padding: '12px 32px',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Search Again
            </button>
          </div>
        )}

        {/* HOTEL CARDS */}
        {!loading && hasSearched && 
         filteredHotels.length > 0 && (
          <div>
            {filteredHotels.map((hotel, index) => (
              <HotelCard
                key={hotel.id || index}
                hotel={hotel}
                index={index}
                checkIn={checkIn}
                checkOut={checkOut}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;


