import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlane, FaSuitcase, FaCreditCard, FaLock, FaCheckCircle, FaUser, FaEnvelope, FaPassport } from 'react-icons/fa';
import './FlightBooking.css';

export default function FlightBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // If component mounts without state, redirect back to flights search
  useEffect(() => {
    if (!state || !state.flight) {
      navigate('/flights');
    }
  }, [state, navigate]);

  if (!state || !state.flight) return null;

  const { flight, searchParams } = state;
  const passengersCount = searchParams?.passengers || 1;
  const basePrice = flight.price * passengersCount;
  const taxesFees = Math.round(basePrice * 0.18);
  const totalAmount = basePrice + taxesFees;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="booking-success-page">
        <div className="bs-card glass-panel animate-fade-in">
          <div className="bs-icon-wrap">
            <FaCheckCircle className="bs-success-icon" />
          </div>
          <h2>Booking Confirmed!</h2>
          <p>Your flight from <strong>{searchParams.origin || 'New York'}</strong> to <strong>{searchParams.destination || 'London'}</strong> is secured.</p>
          <div className="bs-details">
            <div className="bs-row">
              <span>Booking Reference</span>
              <strong>CMP-{Math.floor(Math.random() * 900000) + 100000}</strong>
            </div>
            <div className="bs-row">
              <span>Amount Paid</span>
              <strong>${totalAmount}</strong>
            </div>
          </div>
          <p className="bs-email">A confirmation email has been sent to your registered address.</p>
          <button className="bs-btn" onClick={() => navigate('/')}>Return to Homepage</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flight-booking-page">
      <div className="container">
        <div className="fb-header">
          <h1>Secure Checkout</h1>
          <p>Complete your booking to secure your seats on {flight.airline}.</p>
        </div>

        <div className="fb-layout">
          
          {/* Main Form Column */}
          <div className="fb-main">
            <form onSubmit={handlePayment}>
              
              {/* Passenger Details */}
              <div className="fb-section glass-panel">
                <h3><FaUser /> Lead Passenger Details</h3>
                <div className="fb-form-grid">
                  <div className="fb-input-group">
                    <label>First Name</label>
                    <input type="text" placeholder="John" required />
                  </div>
                  <div className="fb-input-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" required />
                  </div>
                  <div className="fb-input-group full-width">
                    <label>Email Address</label>
                    <div className="fb-input-with-icon">
                      <FaEnvelope className="input-icon" />
                      <input type="email" placeholder="john.doe@example.com" required />
                    </div>
                  </div>
                  <div className="fb-input-group full-width">
                    <label>Passport Number (Optional)</label>
                    <div className="fb-input-with-icon">
                      <FaPassport className="input-icon" />
                      <input type="text" placeholder="A12345678" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="fb-section glass-panel">
                <h3><FaCreditCard /> Payment Information</h3>
                <div className="fb-secure-badge">
                  <FaLock /> <span>256-bit Secure Encryption</span>
                </div>
                
                <div className="fb-form-grid">
                  <div className="fb-input-group full-width">
                    <label>Cardholder Name</label>
                    <input type="text" placeholder="Name on Card" required />
                  </div>
                  <div className="fb-input-group full-width">
                    <label>Card Number</label>
                    <div className="fb-input-with-icon">
                      <FaCreditCard className="input-icon" />
                      <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required />
                    </div>
                  </div>
                  <div className="fb-input-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" maxLength="5" required />
                  </div>
                  <div className="fb-input-group">
                    <label>CVC / CVV</label>
                    <input type="text" placeholder="123" maxLength="4" required />
                  </div>
                </div>
              </div>

              <div className="fb-actions">
                <p className="terms-text">By clicking 'Confirm payment', you agree to our Terms & Conditions and Privacy Policy.</p>
                <button type="submit" className="fb-submit-btn" disabled={isProcessing}>
                  {isProcessing ? 'Processing Payment...' : `Confirm Payment • $${totalAmount}`}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Summary */}
          <div className="fb-sidebar">
            <div className="fb-summary glass-panel sticky">
              <h3>Booking Summary</h3>
              
              <div className="fbs-flight">
                <div className="fbs-airline">
                  <div className={`airline-logo logo-${flight.logo}`}></div>
                  <span>{flight.airline}</span>
                </div>
                
                <div className="fbs-route">
                  <div className="fbs-city">
                    <strong>{searchParams.origin ? searchParams.origin.substring(0,3).toUpperCase() : 'JFK'}</strong>
                    <span>{flight.departTime}</span>
                  </div>
                  <div className="fbs-path">
                    <FaPlane className="fbs-plane" />
                    <span>{flight.duration}</span>
                  </div>
                  <div className="fbs-city">
                    <strong>{searchParams.destination ? searchParams.destination.substring(0,3).toUpperCase() : 'LHR'}</strong>
                    <span>{flight.arriveTime}</span>
                  </div>
                </div>
                
                <div className="fbs-date">
                  <p><strong>Departure:</strong> {searchParams.departDate || 'Not specified'}</p>
                </div>
              </div>

              <hr className="fbs-divider" />

              <div className="fbs-price-breakdown">
                <div className="fbs-row">
                  <span>Flight Ticket ({passengersCount}x)</span>
                  <span>${basePrice}</span>
                </div>
                <div className="fbs-row">
                  <span>Taxes & Fees</span>
                  <span>${taxesFees}</span>
                </div>
                <div className="fbs-row">
                  <span>Lounge Access</span>
                  <span className="free">Included</span>
                </div>
                <hr className="fbs-divider" />
                <div className="fbs-row total">
                  <span>Total (USD)</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
              
              <div className="fbs-amenities">
                 <h4>Included Amenities</h4>
                 <div className="fba-list">
                    <div className="fba-item"><FaSuitcase /> 2x Checked Bags</div>
                    {flight.amenities.includes('wifi') && <div className="fba-item"><FaPlane /> In-Flight Wi-Fi</div>}
                    <div className="fba-item"><FaCheckCircle /> Priority Boarding</div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
