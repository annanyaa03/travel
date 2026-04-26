import React, { useState } from 'react';

const HotelModal = ({ hotel, onClose, checkIn, checkOut, nights }) => {
  const [mainImage, setMainImage] = useState(hotel.img || (hotel.images && hotel.images[0]));

  if (!hotel) return null;

  const thumbnails = [
    hotel.img || (hotel.images && hotel.images[0]),
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80'
  ].filter(Boolean);

  const price = hotel.price || hotel.pricePerNight || 0;
  const total = price * (nights || 4);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          cursor: 'pointer'
        }}
      ></div>

      {/* Modal Content */}
      <div style={{
        position: 'relative',
        background: 'white',
        width: '100%',
        maxHeight: '90vh',
        borderRadius: '0',
        overflowY: 'auto',
        zIndex: 10,
        animation: 'fadeInUp 0.4s ease-out forwards',
        padding: '40px 48px 60px'
      }}>
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '36px',
            height: '36px',
            borderRadius: '0',
            background: '#f5f5f5',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1a1a1a',
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.target.style.background = '#e5e5e5'}
          onMouseLeave={e => e.target.style.background = '#f5f5f5'}
        >
          ×
        </button>

        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          {/* Left Column: Images and Info */}
          <div style={{ flex: '1.5', minWidth: '300px' }}>
            <div style={{
              width: '100%',
              height: '400px',
              borderRadius: '0',
              overflow: 'hidden',
              marginBottom: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}>
              <img src={mainImage} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              {thumbnails.map((thumb, i) => (
                <div 
                  key={i}
                  onClick={() => setMainImage(thumb)}
                  style={{
                    width: '80px',
                    height: '60px',
                    borderRadius: '0',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: mainImage === thumb ? '2px solid #C9A84C' : '2px solid transparent',
                    opacity: mainImage === thumb ? 1 : 0.7,
                    transition: 'all 0.2s'
                  }}
                >
                  <img src={thumb} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            <h2 style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '32px',
              color: '#1a1a1a',
              marginBottom: '8px'
            }}>{hotel.name}</h2>
            
            <p style={{ color: '#9e9e9e', fontSize: '14px', marginBottom: '24px' }}>
              {hotel.address}
            </p>

            <p style={{ 
              fontSize: '15px', 
              lineHeight: '1.8', 
              color: '#555', 
              fontWeight: '300',
              marginBottom: '32px'
            }}>
              {hotel.desc || hotel.description}
              <br /><br />
              Experience luxury and comfort in this world-class establishment. Every detail has been curated to provide an unforgettable stay, from the premium bedding to the personalized concierge service.
            </p>

            <h4 style={{ 
              fontSize: '12px', 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase', 
              color: '#1a1a1a',
              borderBottom: '1px solid #f0f0f0',
              paddingBottom: '8px',
              marginBottom: '16px'
            }}>Popular Amenities</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
              {(hotel.amenities || ['WiFi', 'Pool', 'Spa', 'Gym']).map((amenity, i) => (
                <div key={i} style={{
                  padding: '12px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '0',
                  fontSize: '13px',
                  color: '#6b6b6b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Booking Card */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{
              background: '#FAF9F6',
              borderRadius: '0',
              padding: '32px',
              border: '1px solid rgba(0,0,0,0.08)',
              position: 'sticky',
              top: '0'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '48px', fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                  {hotel.rating?.toFixed(1)}
                </div>
                <div style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Excellent Rating
                </div>
                <div style={{ fontSize: '12px', color: '#b0b0b0', marginTop: '4px' }}>
                  from {(hotel.reviewCount || 1247).toLocaleString()} reviews
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '24px', textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '32px', fontFamily: 'Playfair Display, serif' }}>
                  ${price}
                </div>
                <div style={{ fontSize: '12px', color: '#9e9e9e' }}>per night</div>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', color: '#9e9e9e', display: 'block', marginBottom: '4px' }}>Check-in</label>
                    <input type="date" defaultValue={checkIn} style={{ width: '100%', padding: '10px', borderRadius: '0', border: '1px solid #ddd' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10px', textTransform: 'uppercase', color: '#9e9e9e', display: 'block', marginBottom: '4px' }}>Check-out</label>
                    <input type="date" defaultValue={checkOut} style={{ width: '100%', padding: '10px', borderRadius: '0', border: '1px solid #ddd' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#6b6b6b' }}>
                <span>{nights || 4} nights × ${price}</span>
                <span>${total}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px', color: '#6b6b6b' }}>
                <span>Luxury tax & fees</span>
                <span>$45</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '16px', fontWeight: 'bold', borderTop: '1px solid #eee', paddingTop: '12px' }}>
                <span>Total</span>
                <span>${total + 45}</span>
              </div>

              <button style={{
                width: '100%',
                background: '#C9A84C',
                color: 'white',
                border: 'none',
                borderRadius: '0',
                padding: '16px',
                fontSize: '14px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(201,168,76,0.2)'
              }}>
                Book Now
              </button>
              
              <p style={{ textAlign: 'center', fontSize: '11px', color: '#b0b0b0', marginTop: '12px' }}>
                No payment required to reserve today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelModal;
