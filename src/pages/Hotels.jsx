import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Hotels.css';

const DEFAULT_CITY = 'Paris';
const PERKS_LIST = ["Free WiFi", "Pool", "Spa", "Breakfast", "Gym", "Parking", "Restaurant", "Bar", "Room Service", "Airport Shuttle"];

// Simple seeded random to keep values stable across re-renders
const seededRandom = (seed) => {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export default function Hotels() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [inputValue, setInputValue] = useState(DEFAULT_CITY);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [sortBy, setSortBy] = useState('rating');
  const [filterStars, setFilterStars] = useState('all');

  const searchHotels = useCallback(async (searchCity) => {
    setLoading(true);
    setHotels([]);
    setError(null);

    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

    try {
      // STEP 1: Get city coordinates using Nominatim
      const nomUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchCity)}&format=json&limit=1`;
      const nomRes = await fetch(nomUrl);
      const coordsData = await nomRes.json();
      
      if (!coordsData || coordsData.length === 0) {
        throw new Error('City not found');
      }
      
      const { lat, lon } = coordsData[0];

      // STEP 2: Fetch hotels using Geoapify
      const geoUrl = `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${lon},${lat},10000&limit=20&apiKey=${apiKey}`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData.features || geoData.features.length === 0) {
        setHotels([]);
        setCity(searchCity);
        setLoading(false);
        return;
      }

      // STEP 3: Generate display data
      const processedHotels = geoData.features
        .filter(f => f.properties.name) // skip if name is null/undefined
        .map((feature, index) => {
          const props = feature.properties;
          const distKm = (props.distance / 1000).toFixed(1);
          
          // Seeded randoms
          const seed = index + 1;
          const rating = parseFloat((3.5 + seededRandom(seed) * 1.5).toFixed(1));
          const price = Math.floor(80 + seededRandom(seed * 2) * 270);
          const stars = Math.floor(3 + seededRandom(seed * 3) * 3); // 3, 4, or 5
          
          // Pick 3 unique random perks
          const shuffledPerks = [...PERKS_LIST].sort(() => 0.5 - seededRandom(seed * 4));
          const perks = shuffledPerks.slice(0, 3);
          
          let emoji = "🏩"; // 3 stars
          if (stars === 4) emoji = "🏨";
          if (stars === 5) emoji = "🏰";

          return {
            id: props.place_id || index,
            name: props.name,
            address: props.formatted,
            distance: distKm,
            lat: feature.geometry.coordinates[1],
            lon: feature.geometry.coordinates[0],
            rating,
            price,
            stars,
            perks,
            emoji
          };
        });

      setHotels(processedHotels);
      setCity(searchCity);
    } catch (err) {
      console.error(err);
      setError(err.message === 'City not found' ? 'empty' : 'api');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchHotels(DEFAULT_CITY);
  }, [searchHotels]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      searchHotels(inputValue.trim());
    }
  };

  const handlePillClick = (cityName) => {
    setInputValue(cityName);
    searchHotels(cityName);
  };

  // FILTER & SORT LOGIC
  const displayedHotels = useMemo(() => {
    let result = [...hotels];

    // Filter
    if (filterStars !== 'all') {
      const starVal = parseInt(filterStars, 10);
      result = result.filter(h => h.stars === starVal);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

    return result;
  }, [hotels, sortBy, filterStars]);

  // Star gradient backgrounds
  const getGradient = (stars) => {
    if (stars === 5) return 'linear-gradient(135deg, #f59e0b, #d97706)';
    if (stars === 4) return 'linear-gradient(135deg, #3b82f6, #2563eb)';
    return 'var(--brand-grad)';
  };

  const quickCities = ["Paris", "Tokyo", "Bali", "New York", "Dubai", "Rome"];

  return (
    <div className="hotels-page">
      {/* ═══════════════════════════════
          HERO SECTION
      ═══════════════════════════════ */}
      <section className="hotels-hero">
        <div className="hotels-hero-overlay"></div>
        <div className="hotels-hero-content">
          <h1 className="hotels-title">Find Your Perfect <span className="shimmer-text">Stay</span></h1>
          <p className="hotels-subtitle">Search over 1M+ hotels with local insights</p>
          
          <form className="hotels-search-box glass-box" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Where are you going? (e.g. Paris, Tokyo...)" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="search-btn">Search Hotels</button>
          </form>

          <div className="quick-cities">
            {quickCities.map(c => (
              <React.Fragment key={c}>
                <span className="city-pill" onClick={() => handlePillClick(c)}>{c}</span>
                {c !== quickCities[quickCities.length - 1] && <span className="city-dot">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        {/* ═══════════════════════════════
            RESULTS TOOLBAR
        ═══════════════════════════════ */}
        {!error && (
          <div className="results-toolbar">
            <div className="results-info">
              {loading ? (
                <span>Finding hotels...</span>
              ) : (
                <span>{displayedHotels.length} hotels found near <span className="green-text">{city}</span></span>
              )}
            </div>
            
            <div className="results-filters">
              <select 
                className="filter-select" 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
                disabled={loading}
              >
                <option value="rating">Sort by: Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="distance">Distance</option>
              </select>

              <select 
                className="filter-select" 
                value={filterStars} 
                onChange={e => setFilterStars(e.target.value)}
                disabled={loading}
              >
                <option value="all">All Stars</option>
                <option value="5">5★ Hotels</option>
                <option value="4">4★ Hotels</option>
                <option value="3">3★ Hotels</option>
              </select>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════
            LOADING STATE
        ═══════════════════════════════ */}
        {loading && (
          <div className="loading-state">
             <div className="green-spinner"></div>
             <p>Finding the best hotels in {inputValue}...</p>
             
             <div className="hotels-grid skeletons-grid">
               {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="skeleton-card">
                   <div className="skeleton-img pulse"></div>
                   <div className="skeleton-body">
                     <div className="skeleton-title pulse"></div>
                     <div className="skeleton-text pulse w-70"></div>
                     <div className="skeleton-text pulse w-50"></div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* ═══════════════════════════════
            ERROR / EMPTY STATE
        ═══════════════════════════════ */}
        {!loading && (error === 'empty' || (hotels.length === 0 && !error)) && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No hotels found in {city}.</h3>
            <p>Try another city or adjust your search.</p>
          </div>
        )}

        {!loading && error === 'api' && (
          <div className="empty-state">
            <div className="empty-icon">⚠️</div>
            <h3>Something went wrong.</h3>
            <p>Please try again later.</p>
          </div>
        )}

        {/* ═══════════════════════════════
            HOTEL CARDS GRID
        ═══════════════════════════════ */}
        {!loading && !error && displayedHotels.length > 0 && (
          <div className="hotels-grid">
            {displayedHotels.map(hotel => (
              <div key={hotel.id} className="new-hotel-card">
                
                <div className="card-top-colored" style={{ background: getGradient(hotel.stars) }}>
                  <div className="featured-pill">Featured</div>
                  <div className="star-badge">{hotel.stars}★</div>
                  <div className="big-emoji">{hotel.emoji}</div>
                </div>

                <div className="card-body">
                  <h3 className="new-hotel-name">{hotel.name}</h3>
                  <div className="rating-row">
                    <span className="stars-visual">
                      {"★".repeat(Math.round(hotel.rating))}{"☆".repeat(5 - Math.round(hotel.rating))}
                    </span>
                    <span className="rating-num">{hotel.rating.toFixed(1)}</span>
                  </div>

                  <div className="location-text">
                    📍 {hotel.address || city}
                  </div>
                  <div className="distance-text">
                    {hotel.distance} km from city center
                  </div>

                  <div className="perks-row">
                    {hotel.perks.map((p, idx) => (
                      <span key={idx} className="perk-pill">{p}</span>
                    ))}
                  </div>

                  <div className="card-bottom">
                    <div className="price-block">
                      <span className="dollar">$</span>
                      <span className="price-val">{hotel.price}</span>
                      <span className="night">/night</span>
                    </div>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
