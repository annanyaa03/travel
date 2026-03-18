import { useParams, Link, useNavigate } from 'react-router-dom';
import { destinations } from '../data';
import './DestinationDetail.css';

function Stars({ rating }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={`fas fa-star ${i < Math.round(rating) ? 'filled' : ''}`}></i>
      ))}
    </div>
  );
}

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dest = destinations.find(d => d.id === id);

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
            <i className="fas fa-arrow-left"></i> Back
          </button>
          <div className="detail-location">
            <i className="fas fa-map-marker-alt"></i> {dest.country}
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
              {dest.longDescription.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Highlights */}
            <div className="detail-card">
              <h2>Highlights</h2>
              <div className="highlights-grid">
                {dest.highlights.map(h => (
                  <div key={h} className="highlight-item">
                    <i className="fas fa-check-circle"></i>
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
                  <i className="far fa-clock"></i>
                  <div>
                    <div className="bi-label">Duration</div>
                    <div className="bi-val">{dest.duration}</div>
                  </div>
                </div>
                <div className="bi-item">
                  <i className="fas fa-calendar-alt"></i>
                  <div>
                    <div className="bi-label">Best Time</div>
                    <div className="bi-val">{dest.bestTime}</div>
                  </div>
                </div>
                <div className="bi-item">
                  <i className="fas fa-cloud-sun"></i>
                  <div>
                    <div className="bi-label">Weather</div>
                    <div className="bi-val">{dest.weather}</div>
                  </div>
                </div>
                <div className="bi-item">
                  <i className="fas fa-star"></i>
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
                  <i className="fas fa-paper-plane"></i> Book This Trip
                </button>
                <button type="button" className="btn-wishlist">
                  <i className="far fa-heart"></i> Add to Wishlist
                </button>
              </form>

              <div className="booking-trust">
                <div className="trust-item"><i className="fas fa-shield-alt"></i> Secure booking</div>
                <div className="trust-item"><i className="fas fa-undo"></i> Free cancellation</div>
                <div className="trust-item"><i className="fas fa-headset"></i> 24/7 support</div>
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
                  <div className="rc-location"><i className="fas fa-map-marker-alt"></i>{d.country}</div>
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
