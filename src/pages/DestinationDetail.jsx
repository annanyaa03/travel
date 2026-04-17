import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaStar, FaCheckCircle, FaClock, FaCalendarAlt, FaCloudSun, FaShieldAlt, FaUndo, FaHeadset, FaPaperPlane, FaHeart, FaGlobe, FaUsers, FaCoins, FaInfoCircle, FaTemperatureHigh } from 'react-icons/fa';
import { destinations } from '../data';
import './DestinationDetail.css';

function Stars({ rating }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className={`star-icon ${i < Math.round(rating) ? 'filled' : ''}`} />
      ))}
    </div>
  );
}

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liveData, setLiveData] = useState(null);
  const [wikiData, setWikiData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const dest = destinations.find(d => d.id === id);

  useEffect(() => {
    if (!dest) return;
    
    setLoading(true);
    
    // Fetch Country Info (REST Countries)
    const fetchCountry = fetch(`https://restcountries.com/v3.1/name/${dest.country}?fullText=true`)
      .then(res => res.json())
      .then(data => data[0])
      .catch(() => null);

    // Fetch Wiki Summary
    const citySlug = dest.name.replace(/\s+/g, '_');
    const fetchWiki = fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${citySlug}`)
      .then(res => res.json())
      .catch(() => null);

    // Fetch Geolocation & Weather (Nominatim + Open-Meteo)
    const fetchWeather = fetch(`https://nominatim.openstreetmap.org/search?q=${dest.name}&format=json&limit=1`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
            .then(res => res.json());
        }
        return null;
      })
      .catch(() => null);

    Promise.all([fetchCountry, fetchWiki, fetchWeather]).then(([country, wiki, weatherData]) => {
      setLiveData(country);
      setWikiData(wiki);
      setWeather(weatherData);
      setLoading(false);
    });
  }, [dest]);

  if (!dest) {
    return (
      <div className="detail-not-found">
        <h2>Destination not found</h2>
        <Link to="/destinations" className="btn btn-primary">Back to Destinations</Link>
      </div>
    );
  }

  const related = destinations.filter(d => d.id !== id).slice(0, 3);

  return (
    <div className="detail-page">
      {/* Hero */}
      <div className="detail-hero" style={{ backgroundImage: `url(${dest.image})` }}>
        <div className="detail-hero-overlay" />
        <div className="container detail-hero-content">
          <button onClick={() => navigate(-1)} className="back-btn">
            <FaArrowLeft /> Back
          </button>
          <div className="detail-location">
            <FaMapMarkerAlt /> {dest.country}
          </div>
          <h1 className="detail-title">{dest.name}</h1>
          <p className="detail-tagline">{dest.tagline}</p>
          <div className="detail-meta-row">
            <div className="detail-rating-row">
              <Stars rating={dest.rating} />
              <span className="detail-rating-num">{dest.rating}</span>
              <span className="detail-reviews">({dest.reviews.toLocaleString()} reviews)</span>
            </div>
            <span className="detail-cat-pill">{dest.category}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container detail-body">
        <div className="detail-main">
          {/* Left column */}
          <div className="detail-left">
            <div className="detail-card">
              <h2>About {dest.name}</h2>
              {loading ? (
                <div className="skeleton-text">
                  <div className="skeleton-line" style={{ width: '100%' }}></div>
                  <div className="skeleton-line" style={{ width: '90%' }}></div>
                  <div className="skeleton-line" style={{ width: '95%' }}></div>
                </div>
              ) : (
                <>
                  <p className="wiki-desc">
                    {wikiData?.extract || dest.longDescription.split('\n\n')[0]}
                  </p>
                  {dest.longDescription.split('\n\n').slice(1).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </>
              )}
            </div>

            {/* Live Insights */}
            <div className="detail-card live-insights">
              <h2><FaGlobe /> Traveler Insights</h2>
              <div className="insights-grid">
                <div className="insight-stat">
                  <FaTemperatureHigh />
                  <div>
                    <span>Live Temp</span>
                    <strong>{weather?.current_weather?.temperature || '...'}°C</strong>
                  </div>
                </div>
                <div className="insight-stat">
                  <FaUsers />
                  <div>
                    <span>Population</span>
                    <strong>{liveData ? (liveData.population / 1000000).toFixed(1) + 'M' : '...'}</strong>
                  </div>
                </div>
                <div className="insight-stat">
                  <FaCoins />
                  <div>
                    <span>Currency</span>
                    <strong>{liveData ? `${Object.values(liveData.currencies)[0].name} (${Object.values(liveData.currencies)[0].symbol})` : '...'}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="detail-card">
              <h2>Highlights</h2>
              <div className="highlights-grid">
                {dest.highlights.map(h => (
                  <div key={h} className="highlight-item">
                    <FaCheckCircle />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {dest.gallery && (
              <div className="detail-card">
                <h2>Gallery</h2>
                <div className="gallery-grid">
                  {dest.gallery.map((img, i) => (
                    <div key={i} className="gallery-img-wrap">
                      <img src={img} alt={`${dest.name} ${i + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Booking Panel */}
          <div className="detail-right">
            <div className="booking-panel">
              <div className="booking-price">
                <span className="bp-from">from</span>
                <span className="bp-amount">${dest.price.toLocaleString()}</span>
                <span className="bp-per">per person</span>
              </div>

               <div className="booking-info-grid">
                <div className="bi-item">
                  <FaClock />
                  <div>
                    <div className="bi-label">Duration</div>
                    <div className="bi-val">{dest.duration}</div>
                  </div>
                </div>
                <div className="bi-item">
                  <FaCalendarAlt />
                  <div>
                    <div className="bi-label">Best Time</div>
                    <div className="bi-val">{dest.bestTime}</div>
                  </div>
                </div>
                <div className="bi-item">
                  <FaCloudSun />
                  <div>
                    <div className="bi-label">Weather</div>
                    <div className="bi-val">{weather?.current_weather ? (weather.current_weather.temperature > 20 ? '☀️ Sunny' : '⛅ Mild') : dest.weather}</div>
                  </div>
                </div>
                <div className="bi-item">
                  <FaStar />
                  <div>
                    <div className="bi-label">Rating</div>
                    <div className="bi-val">{dest.rating} / 5.0</div>
                  </div>
                </div>
              </div>

              <form className="booking-form" onSubmit={e => e.preventDefault()}>
                <div className="bf-field">
                  <label>Travel Date</label>
                  <input type="date" />
                </div>
                <div className="bf-field">
                  <label>Guests</label>
                  <select>
                    <option>1 Traveller</option>
                    <option>2 Travellers</option>
                    <option>3 Travellers</option>
                    <option>4+ Travellers</option>
                  </select>
                </div>
                 <button type="submit" className="btn btn-primary booking-cta">
                  <FaPaperPlane /> Book This Trip
                </button>
                <button type="button" className="btn-wishlist">
                  <FaHeart /> Add to Wishlist
                </button>
              </form>

              <div className="booking-trust">
                <div className="trust-item"><FaShieldAlt /> Secure booking</div>
                <div className="trust-item"><FaUndo /> Free cancellation</div>
                <div className="trust-item"><FaHeadset /> 24/7 support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="related-section">
          <h2 className="section-title">You May Also <span>Love</span></h2>
          <div className="related-grid">
            {related.map(d => (
              <Link key={d.id} to={`/destinations/${d.id}`} className="related-card">
                <div className="rc-img-wrap">
                  <img src={d.image} alt={d.name} loading="lazy" />
                </div>
                <div className="rc-body">
                  <div className="rc-location"><FaMapMarkerAlt />{d.country}</div>
                  <div className="rc-name">{d.name}</div>
                  <div className="rc-price">from <strong>${d.price.toLocaleString()}</strong></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
