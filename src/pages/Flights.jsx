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

const AIRPORTS = [
  { code: 'JFK', city: 'New York', country: 'United States', label: 'New York (JFK)' },
  { code: 'LAX', city: 'Los Angeles', country: 'United States', label: 'Los Angeles (LAX)' },
  { code: 'LHR', city: 'London', country: 'United Kingdom', label: 'London (LHR)' },
  { code: 'CDG', city: 'Paris', country: 'France', label: 'Paris (CDG)' },
  { code: 'DXB', city: 'Dubai', country: 'UAE', label: 'Dubai (DXB)' },
  { code: 'HND', city: 'Tokyo', country: 'Japan', label: 'Tokyo (HND)' },
  { code: 'SYD', city: 'Sydney', country: 'Australia', label: 'Sydney (SYD)' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore', label: 'Singapore (SIN)' },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', label: 'Amsterdam (AMS)' },
  { code: 'FCO', city: 'Rome', country: 'Italy', label: 'Rome (FCO)' },
  { code: 'BCN', city: 'Barcelona', country: 'Spain', label: 'Barcelona (BCN)' },
  { code: 'MXP', city: 'Milan', country: 'Italy', label: 'Milan (MXP)' },
  { code: 'VCE', city: 'Venice', country: 'Italy', label: 'Venice (VCE)' },
  { code: 'ATH', city: 'Athens', country: 'Greece', label: 'Athens (ATH)' },
  { code: 'IST', city: 'Istanbul', country: 'Turkey', label: 'Istanbul (IST)' },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand', label: 'Bangkok (BKK)' },
  { code: 'DPS', city: 'Bali', country: 'Indonesia', label: 'Bali (DPS)' },
  { code: 'NRT', city: 'Tokyo Narita', country: 'Japan', label: 'Tokyo Narita (NRT)' },
  { code: 'ICN', city: 'Seoul', country: 'South Korea', label: 'Seoul (ICN)' },
  { code: 'PVG', city: 'Shanghai', country: 'China', label: 'Shanghai (PVG)' },
  { code: 'DEL', city: 'New Delhi', country: 'India', label: 'New Delhi (DEL)' },
  { code: 'BOM', city: 'Mumbai', country: 'India', label: 'Mumbai (BOM)' },
  { code: 'GRU', city: 'São Paulo', country: 'Brazil', label: 'São Paulo (GRU)' },
  { code: 'MEX', city: 'Mexico City', country: 'Mexico', label: 'Mexico City (MEX)' },
  { code: 'YYZ', city: 'Toronto', country: 'Canada', label: 'Toronto (YYZ)' },
  { code: 'ORD', city: 'Chicago', country: 'United States', label: 'Chicago (ORD)' },
  { code: 'MIA', city: 'Miami', country: 'United States', label: 'Miami (MIA)' },
  { code: 'SFO', city: 'San Francisco', country: 'United States', label: 'San Francisco (SFO)' },
  { code: 'CPT', city: 'Cape Town', country: 'South Africa', label: 'Cape Town (CPT)' },
  { code: 'NBO', city: 'Nairobi', country: 'Kenya', label: 'Nairobi (NBO)' },
  { code: 'MAD', city: 'Madrid', country: 'Spain', label: 'Madrid (MAD)' },
  { code: 'ZRH', city: 'Zurich', country: 'Switzerland', label: 'Zurich (ZRH)' },
  { code: 'DOH', city: 'Doha', country: 'Qatar', label: 'Doha (DOH)' },
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
  const [activeDropdown, setActiveDropdown] = useState(null); // 'from' | 'to' | null

  const filterAirports = (query) => {
    if (!query || query.length < 1) return [];
    const q = query.toLowerCase();
    return AIRPORTS.filter(
      (a) =>
        a.city.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q) ||
        a.label.toLowerCase().includes(q)
    ).slice(0, 6);
  };

  const fromSuggestions = filterAirports(from);
  const toSuggestions = filterAirports(to);

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
              <div className="fl-field fl-field--autocomplete">
                <label className="fl-label">FROM</label>
                <input
                  className="fl-input"
                  placeholder="City or airport"
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                  onFocus={() => setActiveDropdown('from')}
                  onBlur={() => setTimeout(() => setActiveDropdown(null), 150)}
                  autoComplete="off"
                />
                {activeDropdown === 'from' && fromSuggestions.length > 0 && (
                  <ul className="fl-autocomplete-dropdown">
                    {fromSuggestions.map((a) => (
                      <li
                        key={a.code}
                        className="fl-autocomplete-item"
                        onMouseDown={() => { setFrom(a.label); setActiveDropdown(null); }}
                      >
                        <span className="fl-ac-code">{a.code}</span>
                        <span className="fl-ac-info">
                          <span className="fl-ac-city">{a.city}</span>
                          <span className="fl-ac-country">{a.country}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button type="button" className="fl-swap-btn" onClick={handleSwap} title="Swap">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m7 16-4-4 4-4"/><path d="m17 8 4 4-4 4"/><path d="M3 12h18"/>
                </svg>
              </button>

              <div className="fl-field fl-field--autocomplete">
                <label className="fl-label">TO</label>
                <input
                  className="fl-input"
                  placeholder="City or airport"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                  onFocus={() => setActiveDropdown('to')}
                  onBlur={() => setTimeout(() => setActiveDropdown(null), 150)}
                  autoComplete="off"
                />
                {activeDropdown === 'to' && toSuggestions.length > 0 && (
                  <ul className="fl-autocomplete-dropdown">
                    {toSuggestions.map((a) => (
                      <li
                        key={a.code}
                        className="fl-autocomplete-item"
                        onMouseDown={() => { setTo(a.label); setActiveDropdown(null); }}
                      >
                        <span className="fl-ac-code">{a.code}</span>
                        <span className="fl-ac-info">
                          <span className="fl-ac-city">{a.city}</span>
                          <span className="fl-ac-country">{a.country}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
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
