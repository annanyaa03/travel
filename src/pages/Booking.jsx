import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Booking.css';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, city, country, weather } = location.state || {};

  const [dates, setDates] = useState({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  });

  const [roomType, setRoomType] = useState('Deluxe King Room');
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Price calculation
  const getNights = () => {
    const start = new Date(dates.checkIn);
    const end = new Date(dates.checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const roomMultipliers = {
    'Standard Queen Room': 1,
    'Deluxe King Room': 1.4,
    'Executive Suite': 2.2,
    'Presidential Suite': 4.5
  };

  const nights = getNights();
  const basePrice = hotel?.price || 250;
  const multiplier = roomMultipliers[roomType] || 1;
  const subtotal = basePrice * multiplier * nights;
  const tax = subtotal * 0.12;
  const serviceFee = 45;
  const total = subtotal + tax + serviceFee;

  useEffect(() => {
    if (!hotel) {
      navigate('/hotels');
    }
    window.scrollTo(0, 0);
  }, [hotel, navigate]);

  const handleBooking = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!hotel) return null;

  if (isSuccess) {
    return (
      <div className="booking-success-page">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h1>Reservation Confirmed</h1>
          <p>Your stay at <strong>{hotel.name}</strong> has been booked successfully.</p>
          <div className="booking-ref">Booking Ref: #CP-{Math.floor(Math.random() * 900000) + 100000}</div>
          <button className="back-home-btn" onClick={() => navigate('/')}>Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-hero" style={{ backgroundImage: `linear-gradient(to bottom, rgba(249,245,240,0.2), #F9F5F0), url(${hotel.img})` }}>
        <div className="booking-hero-content">
          <div className="booking-badge animate-mask-reveal">{hotel.badge || 'Premium Selection'}</div>
          <h1 className="booking-hotel-name animate-zoom-out delay-1">{hotel.name}</h1>
          <div className="booking-hotel-meta animate-fade-up delay-2">
            <span>{'★'.repeat(hotel.stars)}</span>
            <span>{hotel.address || city}</span>
            {country && <span><img src={country.flag} alt="flag" className="inline-flag" /> {country.name}</span>}
          </div>
        </div>
      </div>

      <div className="booking-container">
        <form className="booking-form" onSubmit={handleBooking}>
          <div className="form-section">
            <h2 className="section-title">1. Your Stay Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Check-in Date</label>
                <input 
                  type="date" 
                  value={dates.checkIn} 
                  onChange={e => setDates({...dates, checkIn: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Check-out Date</label>
                <input 
                  type="date" 
                  value={dates.checkOut} 
                  onChange={e => setDates({...dates, checkOut: e.target.value})}
                  required 
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">2. Select Your Experience</h2>
            <div className="room-selector">
              {Object.keys(roomMultipliers).map(type => (
                <div 
                  key={type} 
                  className={`room-option ${roomType === type ? 'active' : ''}`}
                  onClick={() => setRoomType(type)}
                >
                  <div className="room-checkbox"></div>
                  <div className="room-info">
                    <span className="room-name">{type}</span>
                    <span className="room-perks">
                      {type.includes('Suite') ? 'Includes Lounge Access & Spa' : 'Complimentary High-speed WiFi'}
                    </span>
                  </div>
                  <div className="room-price-offset">
                    {multiplier > 1 ? `+$${(basePrice * (multiplier - 1)).toFixed(0)}` : 'Base Rate'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">3. Guest Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Adults</label>
                <select value={guests.adults} onChange={e => setGuests({...guests, adults: parseInt(e.target.value)})}>
                  {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Children</label>
                <select value={guests.children} onChange={e => setGuests({...guests, children: parseInt(e.target.value)})}>
                  {[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">4. Payment Information</h2>
            <div className="card-input-wrap">
              <input type="text" placeholder="Cardholder Name" required />
              <div className="card-number-row">
                <input type="text" placeholder="Card Number" style={{flex: 2}} required />
                <input type="text" placeholder="MM/YY" required />
                <input type="text" placeholder="CVC" required />
              </div>
            </div>
          </div>

          <button className="confirm-booking-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Securing reservation...' : `Confirm Reservation — $${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
          </button>
          <p className="booking-disclaimer">Zero cancellation fees if cancelled 48 hours prior to arrival.</p>
        </form>

        <aside className="booking-summary">
          <div className="summary-card">
            <h3>Summary of Charges</h3>
            <div className="summary-line">
              <span>{hotel.name} ({nights} {nights === 1 ? 'night' : 'nights'})</span>
              <span>${(basePrice * multiplier * nights).toLocaleString()}</span>
            </div>
            <div className="summary-line">
              <span>Taxes & Fees (12%)</span>
              <span>${tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div className="summary-line">
              <span>Compass Concierge Fee</span>
              <span>${serviceFee.toLocaleString()}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total Amount</span>
              <span>${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            
            <div className="summary-hotel-preview">
              <img src={hotel.img} alt={hotel.name} />
              <div className="preview-overlay">
                <div>{weather?.temp}°C {weather?.emoji} in {city}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
