import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlightResults from '../sections/FlightResults';
import './Flights.css';

const POPULAR_ROUTES = [
  {
    from: 'JFK', to: 'LHR', city: 'London', country: 'United Kingdom',
    img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    price: '$420', tag: 'Popular', tagColor: 'gold'
  },
  {
    from: 'LAX', to: 'HND', city: 'Tokyo', country: 'Japan',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    price: '$850', tag: 'Direct', tagColor: 'teal'
  },
  {
    from: 'CDG', to: 'DXB', city: 'Dubai', country: 'UAE',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    price: '$680', tag: 'Best Deal', tagColor: 'green'
  },
  {
    from: 'SYD', to: 'DPS', city: 'Bali', country: 'Indonesia',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    price: '$340', tag: 'Luxury', tagColor: 'purple'
  }
];

const WHY_ITEMS = [
  { num: '01', title: 'Curated Partner Airlines', desc: 'We only work with top-tier carriers known for exceptional service, safety records, and on-time performance.' },
  { num: '02', title: '500+ Global Destinations', desc: 'From niche city-breaks to iconic capitals — our network spans every corner of the world.' },
  { num: '03', title: 'Flexible Booking Always', desc: 'Change dates, upgrade cabins or cancel with ease. Travel plans change; your booking should adapt.' },
  { num: '04', title: '24/7 Concierge Support', desc: 'Our travel experts are on call around the clock for changes, upgrades, and anything in between.' }
];

export default function Flights() {
  const location = useLocation();
  const navigate = useNavigate();

  const [tripType, setTripType] = useState('round');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [depart, setDepart] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1 Adult');
  const [cabin, setCabin] = useState('Economy');
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dest = params.get('destination');
    if (dest) {
      setTo(dest);
      setFrom('New York (JFK)');
    }
  }, [location.search]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {
      origin: from,
      destination: to,
      departDate: depart,
      returnDate: tripType === 'round' ? returnDate : '',
      passengers: 1,
      travelClass: cabin.toLowerCase(),
      tripType: tripType === 'round' ? 'round-trip' : 'one-way'
    };
    setSearchParams(params);
    setTimeout(() => {
      document.getElementById('flight-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleRouteClick = (route) => {
    setFrom(route.from);
    setTo(route.city);
    setSearchParams({
      origin: route.from,
      destination: route.city,
      departDate: '',
      returnDate: '',
      passengers: 1,
      travelClass: 'economy',
      tripType: 'one-way'
    });
    document.getElementById('search-card')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fl-page">

      {/* ─── HERO ─── */}
      <section className="fl-hero">
        <img
          className="fl-hero-img"
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&q=85"
          alt="Aircraft wing over clouds"
        />
        <div className="fl-hero-gradient" />

        <div className="fl-hero-inner">
          <div className="fl-eyebrow">
            <span className="fl-eyebrow-line" />
            <span>FLIGHTS</span>
            <span className="fl-eyebrow-line" />
          </div>

          <h1 className="fl-hero-h1">
            Book Your<br />
            <em>Next Journey</em>
          </h1>

          <p className="fl-hero-sub">
            Seamless connections to over 500 destinations with our curated partner airlines.
          </p>

          <div className="fl-stats">
            <div className="fl-stat">
              <span className="fl-stat-num">500+</span>
              <span className="fl-stat-lbl">Destinations</span>
            </div>
            <div className="fl-stat-div" />
            <div className="fl-stat">
              <span className="fl-stat-num">80+</span>
              <span className="fl-stat-lbl">Partner Airlines</span>
            </div>
            <div className="fl-stat-div" />
            <div className="fl-stat">
              <span className="fl-stat-num">4.9★</span>
              <span className="fl-stat-lbl">Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SEARCH CARD ─── */}
      <div className="fl-search-wrap" id="search-card">
        <div className="fl-search-card">
          {/* Trip type tabs */}
          <div className="fl-tabs">
            {['round', 'oneway', 'multi'].map((t) => (
              <button
                key={t}
                className={`fl-tab ${tripType === t ? 'active' : ''}`}
                onClick={() => setTripType(t)}
              >
                {t === 'round' ? 'Round Trip' : t === 'oneway' ? 'One Way' : 'Multi-city'}
              </button>
            ))}
          </div>

          <form className="fl-form" onSubmit={handleSearch}>
            {/* Main input row */}
            <div className="fl-form-row">
              <div className="fl-field">
                <label className="fl-label">FROM</label>
                <input
                  className="fl-input"
                  placeholder="City or airport"
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                />
              </div>

              <button type="button" className="fl-swap-btn" onClick={handleSwap} title="Swap">⇄</button>

              <div className="fl-field">
                <label className="fl-label">TO</label>
                <input
                  className="fl-input"
                  placeholder="City or airport"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                />
              </div>

              <div className="fl-field">
                <label className="fl-label">DEPARTURE</label>
                <input
                  className="fl-input"
                  type="date"
                  value={depart}
                  onChange={e => setDepart(e.target.value)}
                />
              </div>

              <div className={`fl-field ${tripType === 'oneway' ? 'fl-field--disabled' : ''}`}>
                <label className="fl-label">RETURN</label>
                <input
                  className="fl-input"
                  type="date"
                  value={returnDate}
                  onChange={e => setReturnDate(e.target.value)}
                  disabled={tripType === 'oneway'}
                />
              </div>
            </div>

            {/* Second row */}
            <div className="fl-form-row2">
              <div className="fl-field fl-field--sm">
                <label className="fl-label">PASSENGERS</label>
                <select className="fl-input fl-select" value={passengers} onChange={e => setPassengers(e.target.value)}>
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>3 Adults</option>
                  <option>4 Adults</option>
                  <option>1 Adult, 1 Child</option>
                  <option>2 Adults, 1 Child</option>
                  <option>2 Adults, 2 Children</option>
                </select>
              </div>

              <div className="fl-field fl-field--sm">
                <label className="fl-label">CABIN CLASS</label>
                <select className="fl-input fl-select" value={cabin} onChange={e => setCabin(e.target.value)}>
                  <option>Economy</option>
                  <option>Premium Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </select>
              </div>

              <button type="submit" className="fl-search-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Search Flights
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ─── RESULTS ─── */}
      {searchParams && (
        <div id="flight-results" className="fl-results-wrap">
          <FlightResults searchParams={searchParams} />
        </div>
      )}

      {/* ─── POPULAR ROUTES ─── */}
      <section className="fl-routes">
        <div className="fl-routes-inner">
          <div className="fl-routes-head">
            <div>
              <div className="fl-section-eyebrow">POPULAR ROUTES</div>
              <h2 className="fl-section-h2">Trending <em>Global Routes</em></h2>
            </div>
            <a href="#" className="fl-view-all">View all routes →</a>
          </div>

          <div className="fl-routes-grid">
            {POPULAR_ROUTES.map((r, i) => (
              <div key={i} className="fl-route-card" onClick={() => handleRouteClick(r)}>
                <img src={r.img} alt={r.city} className="fl-rc-img" />
                <div className="fl-rc-overlay" />
                <div className="fl-rc-content">
                  <span className={`fl-rc-tag fl-rc-tag--${r.tagColor}`}>{r.tag}</span>
                  <div className="fl-rc-route">{r.from} → {r.to}</div>
                  <h3 className="fl-rc-city">{r.city}</h3>
                  <div className="fl-rc-country">{r.country}</div>
                  <div className="fl-rc-price">from <strong>{r.price}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY COMPASS ─── */}
      <section className="fl-why">
        <div className="fl-why-inner">
          <div className="fl-section-eyebrow" style={{ textAlign: 'center' }}>WHY CHOOSE US</div>
          <h2 className="fl-section-h2" style={{ textAlign: 'center', marginBottom: '32px' }}>
            The Compass <em>Advantage</em>
          </h2>

          <div className="fl-why-grid">
            {WHY_ITEMS.map((item) => (
              <div key={item.num} className="fl-why-cell">
                <div className="fl-why-num">{item.num}</div>
                <h4 className="fl-why-title">{item.title}</h4>
                <p className="fl-why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
