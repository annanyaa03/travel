import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import HotelCard from '../components/hotels/HotelCard';
import HotelSkeleton from '../components/hotels/HotelSkeleton';
import HotelModal from '../components/hotels/HotelModal';
import './Hotels.css';

const DEFAULT_CITY = 'Paris';

// --- Helper Functions (Preserved) ---
// --- Helper Functions (Preserved) ---
const cleanName = (name) => name ? name.replace(/\s*-\s*\d+\s*\*+/g, '').replace(/\s*\d+\s*stars?/gi, '').replace(/\[.*\]/g, '').trim() : "";


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

  const [searchCity, setSearchCity] = useState(DEFAULT_CITY);
  const [cityInfo, setCityInfo] = useState(null);

  const performSearch = useCallback(async (targetCity) => {
    if (!targetCity) return;
    
    const checkIn = '2024-12-01';
    const checkOut = '2024-12-05';
    const guests = 2;

    const sanitizedCity = targetCity.trim().replace(/:\d+$/, '');
    const url = `/api/hotels/search?city=${encodeURIComponent(sanitizedCity)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`;
    
    setLoading(true);
    setHasSearched(true);
    setError(null);
    setHotels([]); 
    
    try {
      const res = await fetch(url);
      
      if (!res.ok) {
        const text = await res.text();
        console.error('API error response:', text);
        setError('Failed to load hotels');
        setLoading(false);
        return;
      }

      const data = await res.json();
      
      setHotels(data.data?.hotels || data.data || []);
      setCityInfo(data.data?.cityInfo || null);
      setSearchCity(sanitizedCity);
      
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to load hotels");
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
      } else if (activeFilter === 'Pool') {
        res = res.filter(h => h.hasPool);
      } else if (activeFilter === 'Spa') {
        res = res.filter(h => h.hasSpa);
      } else if (activeFilter === 'Pet Friendly') {
        res = res.filter(h => h.petFriendly);
      } else if (activeFilter === 'Free Cancellation') {
        res = res.filter(h => h.freeCancellation);
      } else if (activeFilter === 'Breakfast Included') {
        res = res.filter(h => h.breakfastIncluded);
      } else {
        // Filter by type (Boutique, Resort, etc)
        res = res.filter(h => h.type === activeFilter);
      }
    }
    res = res.filter(h => h.pricePerNight >= priceRange[0] && h.pricePerNight <= priceRange[1]);
    
    if (sortBy === 'rating') res.sort((a,b) => b.rating - a.rating);
    else if (sortBy === 'price_low') res.sort((a,b) => a.pricePerNight - b.pricePerNight);
    else if (sortBy === 'price_high') res.sort((a,b) => b.pricePerNight - a.pricePerNight);
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
              {searchCity}
            </span>

            {/* Weather pill */}
            {cityInfo?.temperature && (
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
                {cityInfo.temperature}
              </span>
            )}

            {/* Currency pill */}
            {cityInfo?.currency && (
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
                {cityInfo.currency}
              </span>
            )}

            {/* Country pill */}
            {cityInfo?.country && (
              <span style={{
                fontSize: '12px',
                color: '#6b6b6b',
                marginLeft: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {cityInfo.flag && <span>{cityInfo.flag}</span>} {cityInfo.country}
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


