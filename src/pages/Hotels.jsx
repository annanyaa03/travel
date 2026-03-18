import React, { useState, useEffect, useCallback } from 'react';
import './Hotels.css';

const DEFAULT_CITY = 'Paris';
// Note: OpenTripMap usually requires a key, but we'll try the public demo or a fallback
const OTM_API_KEY = '5ae2e3f221c38a28845f05b6301389e81b67f10b809fa79245f7f347'; // Common trial/demo key

export default function Hotels() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [inputValue, setInputValue] = useState(DEFAULT_CITY);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchHotels = useCallback(async (searchCity) => {
    setLoading(true);
    setHotels([]);
    setError(null);

    try {
      // 1. Get city coordinates via Nominatim
      const coordUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchCity)}&format=json&limit=1`;
      const coordRes = await fetch(coordUrl);
      const coords = await coordRes.json();
      
      if (!coords[0]) throw new Error('City not found');
      
      const { lat, lon } = coords[0];

      // 2. Get hotels via OpenTripMap
      // Documentation points to v0.1 for the radius endpoint
      const hotelsUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${lon}&lat=${lat}&kinds=hotels&limit=30&apikey=${OTM_API_KEY}`;
      const hotelsRes = await fetch(hotelsUrl);
      const hotelsData = await hotelsRes.json();
      
      if (!hotelsData.features || hotelsData.features.length === 0) {
        setHotels([]);
      } else {
        setHotels(hotelsData.features);
      }
      setCity(searchCity);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchHotels(DEFAULT_CITY);
  }, [searchHotels]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      searchHotels(inputValue.trim());
    }
  };

  return (
    <div className="hotels-page">
      <section className="hotels-hero">
        <div className="hotels-hero-content">
          <h1 className="hotels-title">🏨 Find Your Perfect <span>Stay</span></h1>
          <p className="hotels-subtitle">Search over 1M+ hotels with local insights</p>
          
          <form className="hotels-search-box" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Where are you going? (e.g. Paris, Tokyo...)" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search Hotels'}
            </button>
          </form>
        </div>
      </section>

      <div className="container">
        <div className="results-toolbar">
          <div className="results-info">
            {loading ? (
              <span>Looking for hotels...</span>
            ) : (
              <span>{hotels.length} hotels found near <strong>{city}</strong></span>
            )}
          </div>
          <div className="results-filters">
            <select className="filter-select">
              <option>All Ratings</option>
              <option>⭐ 4+ Stars</option>
            </select>
            <select className="filter-select">
              <option>All Distances</option>
              <option>Within 2km</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="hotels-loader">
            <div className="spinner"></div>
            <p>Syncing with hotel providers...</p>
          </div>
        )}

        {error && (
          <div className="hotels-error">
            <h2>😔 No hotels found</h2>
            <p>We couldn't find any results for "{inputValue}". Try another city.</p>
          </div>
        )}

        {!loading && !error && hotels.length > 0 && (
          <div className="hotels-grid">
            {hotels.map((hotel, i) => {
              const props = hotel.properties;
              // OpenTripMap doesn't always provide price/rating in the basic radius call
              // We'll generate consistent-ish random data for the UI as per the user's snippet
              const distance = Math.round((props.dist || (i * 500 + 1000)) / 1000);
              const price = Math.round(Math.random() * 200 + 80);
              const rating = (props.rate || (Math.random() * (5 - 3.5) + 3.5)).toFixed(1);

              return (
                <div key={props.xid || i} className="hotel-card">
                  <div className="hotel-card-img">
                    <span className="hotel-emoji">🏨</span>
                    <div className="hotel-tag">Featured</div>
                  </div>
                  <div className="hotel-card-body">
                    <div className="hotel-header">
                      <h3 className="hotel-name">{props.name || `Heritage Stay ${i+1}`}</h3>
                      <div className="hotel-rating">⭐ {rating}</div>
                    </div>
                    <div className="hotel-location">
                      📍 {distance}km from {city} center
                    </div>
                    <div className="hotel-perks">
                      <span>Free WiFi</span>
                      <span>Breakfast</span>
                      <span>Cancellation</span>
                    </div>
                    <div className="hotel-footer">
                      <div className="hotel-price">
                        <span className="currency">$</span>
                        <span className="amount">{price}</span>
                        <span className="period">/night</span>
                      </div>
                      <button className="hotel-btn" onClick={() => alert(`Booking ${props.name}...`)}>
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
