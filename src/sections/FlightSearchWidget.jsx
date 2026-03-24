import { useState, useEffect } from 'react';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUser, FaSearch } from 'react-icons/fa';
import './FlightSearchWidget.css';

const POPULAR_AIRPORTS = [
  "New York (JFK)", "New York (EWR)", "London (LHR)", "London (LGW)", 
  "Paris (CDG)", "Paris (ORY)", "Tokyo (HND)", "Tokyo (NRT)", 
  "Dubai (DXB)", "Los Angeles (LAX)", "Singapore (SIN)", "Hong Kong (HKG)",
  "Frankfurt (FRA)", "Amsterdam (AMS)", "Sydney (SYD)", "Toronto (YYZ)", 
  "San Francisco (SFO)", "Chicago (ORD)", "Miami (MIA)", "Rome (FCO)", 
  "Madrid (MAD)", "Barcelona (BCN)", "Istanbul (IST)", "Seoul (ICN)", 
  "Bangkok (BKK)", "Munich (MUC)", "Zurich (ZRH)", "Doha (DOH)"
];

export default function FlightSearchWidget({ prefillDestination, onSearch }) {
  const [tripType, setTripType] = useState('round-trip');
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('economy');
  
  const [origin, setOrigin] = useState('New York (JFK)');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [showOriginDrop, setShowOriginDrop] = useState(false);
  const [showDestDrop, setShowDestDrop] = useState(false);

  // Handle prefilled destination from AI Planner
  useEffect(() => {
    if (prefillDestination) {
      setDestination(prefillDestination);
    }
  }, [prefillDestination]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ origin, destination, departDate, returnDate, passengers, travelClass, tripType });
  };

  const filteredOrigin = POPULAR_AIRPORTS.filter(a => a.toLowerCase().includes(origin.toLowerCase()));
  const filteredDest = POPULAR_AIRPORTS.filter(a => a.toLowerCase().includes(destination.toLowerCase()));

  return (
    <div className="flight-search-widget glass-panel animate-slide-up">
      <div className="fsw-tabs">
        <button 
          type="button" 
          className={`fsw-tab ${tripType === 'round-trip' ? 'active' : ''}`}
          onClick={() => setTripType('round-trip')}
        >
          Round Trip
        </button>
        <button 
          type="button" 
          className={`fsw-tab ${tripType === 'one-way' ? 'active' : ''}`}
          onClick={() => setTripType('one-way')}
        >
          One Way
        </button>
        <button 
          type="button" 
          className={`fsw-tab ${tripType === 'multi-city' ? 'active' : ''}`}
          onClick={() => setTripType('multi-city')}
        >
          Multi-city
        </button>

        <div className="fsw-options">
          <div className="fsw-option-select">
            <FaUser className="fsw-icon" />
            <select value={passengers} onChange={(e) => setPassengers(e.target.value)}>
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>
              ))}
            </select>
          </div>
          <div className="fsw-option-select">
            <select value={travelClass} onChange={(e) => setTravelClass(e.target.value)}>
              <option value="economy">Economy</option>
              <option value="premium">Premium Economy</option>
              <option value="business">Business Class</option>
              <option value="first">First Class</option>
            </select>
          </div>
        </div>
      </div>

      <form className="fsw-form" onSubmit={handleSearch}>
        <div className="fsw-grid">
          {/* Origin */}
          <div className="fsw-input-group" style={{ position: 'relative' }}>
            <label>From</label>
            <div className="fsw-input-wrapper">
              <FaPlaneDeparture className="fsw-input-icon" />
              <input 
                type="text" 
                placeholder="City or Airport" 
                value={origin}
                onChange={(e) => {
                  setOrigin(e.target.value);
                  setShowOriginDrop(true);
                }}
                onFocus={() => setShowOriginDrop(true)}
                onBlur={() => setTimeout(() => setShowOriginDrop(false), 200)}
                required
              />
            </div>
            {showOriginDrop && origin && filteredOrigin.length > 0 && (
              <ul className="fsw-autocomplete">
                {filteredOrigin.map(a => (
                  <li key={a} onClick={() => { setOrigin(a); setShowOriginDrop(false); }}>
                    <FaPlaneDeparture style={{marginRight: '8px', opacity: 0.5}}/> {a}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Destination */}
          <div className="fsw-input-group" style={{ position: 'relative' }}>
            <label>To</label>
            <div className="fsw-input-wrapper">
              <FaPlaneArrival className="fsw-input-icon" />
              <input 
                type="text" 
                placeholder="City or Airport" 
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setShowDestDrop(true);
                }}
                onFocus={() => setShowDestDrop(true)}
                onBlur={() => setTimeout(() => setShowDestDrop(false), 200)}
                required
              />
            </div>
            {showDestDrop && destination && filteredDest.length > 0 && (
              <ul className="fsw-autocomplete">
                {filteredDest.map(a => (
                  <li key={a} onClick={() => { setDestination(a); setShowDestDrop(false); }}>
                    <FaPlaneArrival style={{marginRight: '8px', opacity: 0.5}}/> {a}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Departure Date */}
          <div className="fsw-input-group">
            <label>Departure</label>
            <div className="fsw-input-wrapper">
              <FaCalendarAlt className="fsw-input-icon" />
              <input 
                type="date" 
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Return Date - Disabled if One Way */}
          <div className={`fsw-input-group ${tripType === 'one-way' ? 'disabled' : ''}`}>
            <label>Return</label>
            <div className="fsw-input-wrapper">
              <FaCalendarAlt className="fsw-input-icon" />
              <input 
                type="date" 
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                disabled={tripType === 'one-way'}
                required={tripType === 'round-trip'}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="fsw-submit-btn">
          <FaSearch /> Search Flights
        </button>
      </form>
    </div>
  );
}
