import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FlightSearchWidget from '../sections/FlightSearchWidget';
import FlightResults from '../sections/FlightResults';
import { FaCrown, FaGlassMartiniAlt, FaCouch, FaHeadset } from 'react-icons/fa';
import './Flights.css';

export default function Flights() {
  const location = useLocation();
  const [prefilledDest, setPrefilledDest] = useState('');
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dest = params.get('destination');
    if (dest) {
      setPrefilledDest(dest);
      setSearchParams({
        origin: 'New York (JFK)',
        destination: dest,
        departDate: '2026-05-15',
        returnDate: '2026-05-22',
        passengers: 2,
        travelClass: 'premium',
        tripType: 'round-trip'
      });
    }
  }, [location.search]);

  const handleSearch = (params) => {
    setSearchParams(params);
    // Scroll to results slightly
    window.scrollTo({ top: window.innerHeight * 0.6, behavior: 'smooth' });
  };

  const featuredRoutes = [
    { from: 'JFK', to: 'LHR', city: 'London', img: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', price: '$420' },
    { from: 'LAX', to: 'HND', city: 'Tokyo', img: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800', price: '$850' },
    { from: 'CDG', to: 'DXB', city: 'Dubai', img: 'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=800', price: '$680' },
    { from: 'SYD', to: 'DPS', city: 'Bali', img: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800', price: '$340' }
  ];

  return (
    <div className="flights-page">
      {/* Hero Section */}
      <div className="flights-hero">
        <div className="flights-hero-bg"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="eyebrow animate-slide-left">Aviation Intelligence</span>
          <h1 className="animate-fly-in delay-1">Book Your <em>Next Journey</em></h1>
          <p className="animate-fade-up delay-2">Experience unparalleled comfort and seamless travel with our curated partner airlines and luxury cabin selections.</p>
        </div>
      </div>
      
      {/* Search & Results */}
      <div className="flights-content container">
        <div className="search-widget-wrapper">
          <FlightSearchWidget 
            prefillDestination={prefilledDest} 
            onSearch={handleSearch} 
          />
        </div>

        {searchParams && (
          <div className="results-wrapper animate-slide-up">
            <FlightResults searchParams={searchParams} />
          </div>
        )}
      </div>

      {/* Featured Routes Section - Only visible when not searching */}
      {!searchParams && (
        <section className="flights-featured container animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="ff-header">
            <span className="eyebrow">Curated Connections</span>
            <h2>Trending <em>Global Routes</em></h2>
            <p>Direct flights to the world's most sought-after destinations, handpicked for you.</p>
          </div>
          
          <div className="ff-grid">
            {featuredRoutes.map((route, i) => (
              <div 
                key={i} 
                className="ff-card"
                onClick={() => handleSearch({
                   origin: route.from, destination: route.city, departDate: '', returnDate: '', passengers: 1, travelClass: 'economy', tripType: 'one-way'
                })}
              >
                <img src={route.img} alt={route.city} className="ff-bg" />
                <div className="ff-overlay"></div>
                <div className="ff-content">
                  <div className="ff-route">
                    <span>{route.from}</span>
                    <div className="ff-line"></div>
                    <span>{route.to}</span>
                  </div>
                  <h3 className="ff-city">{route.city}</h3>
                  <div className="ff-price">from <strong>{route.price}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* The Aviation Experience - Always visible */}
      <section className="flights-experience">
        <div className="container">
          <div className="fe-header">
            <h2>The Compass <em>Advantage</em></h2>
            <p>Elevating your journey before you even leave the ground.</p>
          </div>
          <div className="fe-grid">
            <div className="fe-item">
              <FaCouch className="fe-icon" />
              <h4>Global Lounge Access</h4>
              <p>Complimentary access to over 1,000 premium airport lounges worldwide when booking business or first class.</p>
            </div>
            <div className="fe-item">
              <FaCrown className="fe-icon" />
              <h4>Curated Airlines</h4>
              <p>We only partner with top-tier airlines renowned for their exceptional service and safety records.</p>
            </div>
            <div className="fe-item">
              <FaGlassMartiniAlt className="fe-icon" />
              <h4>In-Flight Luxury</h4>
              <p>Experience fine dining, extensive wine lists, and lay-flat beds on our recommended long-haul routes.</p>
            </div>
            <div className="fe-item">
              <FaHeadset className="fe-icon" />
              <h4>24/7 Concierge</h4>
              <p>Our travel experts are available around the clock to assist with flight changes, upgrades, and requests.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
