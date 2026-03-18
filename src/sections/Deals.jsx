import { useState, useEffect } from 'react';
import { FaTag, FaClock, FaPlane, FaHotel, FaSuitcaseRolling, FaArrowRight } from 'react-icons/fa';
import './Deals.css';

const dealsData = [
  {
    id: 1,
    type: 'Package',
    icon: <FaSuitcaseRolling />,
    name: 'Maldives Paradise Escape',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    originalPrice: 2499,
    dealPrice: 1899,
    savings: '24% Off',
    expiresIn: 86400 * 2, // 2 days
    details: '7 Nights, Luxury Villa, Breakfast Incl.'
  },
  {
    id: 2,
    type: 'Flights',
    icon: <FaPlane />,
    name: 'Direct to Tokyo (HND)',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    originalPrice: 1200,
    dealPrice: 799,
    savings: '33% Off',
    expiresIn: 3600 * 5, // 5 hours
    details: 'Return Flight, Premium Economy'
  },
  {
    id: 3,
    type: 'Hotels',
    icon: <FaHotel />,
    name: 'Santorini Cliffside Boutique',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
    originalPrice: 450,
    dealPrice: 290,
    savings: '35% Off',
    expiresIn: 86400 * 1.5, // 1.5 days
    details: 'Per Night, Caldera View'
  }
];

function CountdownTimer({ initialSeconds }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <div className="countdown-timer">
      <FaClock />
      <span>{h}h {m}m {s}s left</span>
    </div>
  );
}

export default function Deals() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <section className="deals-section">
      <div className="container">
        <div className="deals-header">
          <div className="section-title-wrap">
            <FaTag className="title-icon" />
            <h2>Limited Time <span>Travel Deals</span></h2>
          </div>
          <p>Hand-picked offers from our partners. Book before the timer runs out!</p>
        </div>

        <div className="deals-nav">
          {['All', 'Flights', 'Hotels', 'Package'].map(tab => (
            <button 
              key={tab} 
              className={`deals-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="deals-grid">
          {dealsData.filter(d => activeTab === 'All' || d.type === tab).map(deal => (
            <div key={deal.id} className="deal-card glass-panel animate-fade-in">
              <div className="deal-image">
                <img src={deal.image} alt={deal.name} />
                <div className="deal-badge">{deal.savings}</div>
                <CountdownTimer initialSeconds={deal.expiresIn} />
              </div>

              <div className="deal-content">
                <div className="deal-type">
                  {deal.icon} {deal.type}
                </div>
                <h3>{deal.name}</h3>
                <p className="deal-details">{deal.details}</p>
                
                <div className="deal-price-row">
                  <div className="price-stack">
                    <span className="old-price">${deal.originalPrice}</span>
                    <span className="current-price">${deal.dealPrice}</span>
                  </div>
                  <button className="btn btn-primary deal-cta">
                    Book Now <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
