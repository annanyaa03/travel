import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlane, FaSuitcase, FaWifi, FaUtensils, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import './FlightResults.css';

const MOCK_FLIGHTS = [
  // ... (keep MOCK_FLIGHTS intact) ...
  {
    id: 1,
    airline: 'Compass Airways',
    logo: 'compass',
    departTime: '08:30 AM',
    arriveTime: '11:45 AM',
    duration: '3h 15m',
    type: 'Non-stop',
    price: 345,
    amenities: ['wifi', 'meal', 'baggage'],
    tags: ['Best Value', 'Fastest']
  },
  {
    id: 2,
    airline: 'LuxeJet',
    logo: 'luxe',
    departTime: '01:15 PM',
    arriveTime: '05:00 PM',
    duration: '3h 45m',
    type: '1 Stop',
    price: 280,
    amenities: ['baggage'],
    tags: ['Cheapest']
  },
  {
    id: 3,
    airline: 'AeroPremium',
    logo: 'aero',
    departTime: '06:00 PM',
    arriveTime: '09:10 PM',
    duration: '3h 10m',
    type: 'Non-stop',
    price: 490,
    amenities: ['wifi', 'meal', 'baggage', 'lounge'],
    tags: []
  }
];

export default function FlightResults({ searchParams }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleBookingRedirect = (flight) => {
    navigate('/book-flight', { state: { flight, searchParams } });
  };

  if (loading) {
    return (
      <div className="flight-loading-state">
        <FaSpinner className="spin" />
        <p>Searching the globe for the finest routes...</p>
      </div>
    );
  }

  return (
    <div className="flight-results-container animate-fade-in">
      <div className="fl-results-header">
        <div className="fl-results-meta">
          <h3>
            Available Flights: <span>{searchParams.origin || 'Anywhere'}</span> to <span>{searchParams.destination || 'Anywhere'}</span>
          </h3>
          <p>{MOCK_FLIGHTS.length} flights found • {searchParams.passengers} Passenger(s) • {searchParams.travelClass}</p>
        </div>
        <div className="fl-results-sort">
          <select>
            <option>Sort by: Recommended</option>
            <option>Price (Lowest)</option>
            <option>Duration (Shortest)</option>
            <option>Departure (Earliest)</option>
          </select>
        </div>
      </div>

      <div className="flight-list">
        {MOCK_FLIGHTS.map((flight) => (
          <div key={flight.id} className="flight-card">
            <div className="flight-main-info">
              
              {/* Airline Col */}
              <div className="fc-airline">
                <div className={`airline-logo logo-${flight.logo}`}></div>
                <span className="airline-name">{flight.airline}</span>
              </div>

              {/* Time Col */}
              <div className="fc-timing">
                <div className="fc-time-block">
                  <span className="time">{flight.departTime}</span>
                  <span className="airport">{searchParams.origin ? searchParams.origin.substring(0,3).toUpperCase() : 'JFK'}</span>
                </div>
                
                <div className="fc-duration">
                  <span className="dur-text">{flight.duration}</span>
                  <div className="dur-line">
                    <div className="line" />
                    <FaPlane className="plane-icon" />
                    <div className="line" />
                  </div>
                  <span className="stop-text">{flight.type}</span>
                </div>

                <div className="fc-time-block text-right">
                  <span className="time">{flight.arriveTime}</span>
                  <span className="airport">{searchParams.destination ? searchParams.destination.substring(0,3).toUpperCase() : 'LHR'}</span>
                </div>
              </div>

              {/* Price & Action Col */}
              <div className="fc-action">
                <div className="price-block">
                  <span className="price-label">from</span>
                  <span className="price-val">${flight.price}</span>
                </div>
                <button className="book-btn" onClick={() => handleBookingRedirect(flight)}>Select Flight</button>
              </div>
            </div>

            <div className="flight-footer">
              <div className="amenities">
                {flight.amenities.includes('baggage') && <span title="Included Checked Bag"><FaSuitcase /></span>}
                {flight.amenities.includes('wifi') && <span title="In-flight Wi-Fi"><FaWifi /></span>}
                {flight.amenities.includes('meal') && <span title="Complimentary Meal"><FaUtensils /></span>}
                {flight.amenities.includes('lounge') && <span title="Lounge Access"><FaCheckCircle /> Lounge</span>}
              </div>
              <div className="tags">
                {flight.tags.map(t => <span key={t} className={`fc-tag tag-${t.replace(/\s+/g, '-').toLowerCase()}`}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
