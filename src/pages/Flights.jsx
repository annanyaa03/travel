import FlightTracker from '../sections/FlightTracker';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Flights.css';

export default function Flights() {
  const location = useLocation();
  const [prefilledFlight, setPrefilledFlight] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dest = params.get('destination');
    if (dest) {
      setPrefilledFlight(dest);
    }
  }, [location.search]);

  return (
    <div className="flights-page">
      <div className="flights-hero">
        <div className="container">
          <span className="eyebrow">Aviation Intelligence</span>
          <h1>Precision <em>Flight Tracking</em></h1>
          <p>Real-time global position and status for thousands of active routes.</p>
        </div>
      </div>
      
      <div className="flights-content">
        <FlightTracker prefill={prefilledFlight} />
        
        <div className="container popular-routes-section">
          <div className="section-header">
            <h3>Popular Global <em>Routes</em></h3>
            <p>Trending direct connections curated for the discerning traveler.</p>
          </div>
          
          <div className="routes-grid">
            {[
              { from: 'LHR', to: 'JFK', price: '$420', airline: 'British Airways' },
              { from: 'DXB', to: 'SYD', price: '$890', airline: 'Emirates' },
              { from: 'HND', to: 'LAX', price: '$650', airline: 'Japan Airlines' },
              { from: 'CDG', to: 'SFO', price: '$580', airline: 'Air France' }
            ].map((route, i) => (
              <div key={i} className="route-card glass-panel">
                <div className="route-main">
                  <span className="airport-code">{route.from}</span>
                  <div className="route-line"></div>
                  <span className="airport-code">{route.to}</span>
                </div>
                <div className="route-footer">
                  <span className="airline">{route.airline}</span>
                  <span className="price">from <strong>{route.price}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
