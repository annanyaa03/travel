import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const getAmenityIcon = () => '—';

const BookNowButton = () => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        background: hover ? '#b8963e' : '#C9A84C',
        color: 'white',
        border: 'none',
        borderRadius: '0',
        padding: '18px 0',
        fontSize: '11px',
        fontFamily: 'Inter, system-ui, sans-serif',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: hover
          ? '0 8px 32px rgba(201,168,76,0.4)'
          : '0 4px 16px rgba(201,168,76,0.2)',
        transform: hover
          ? 'translateY(-1px)'
          : 'translateY(0)'
      }}
    >
      Book Now
    </button>
  );
};

const HotelDetail = () => {
  const { hotelId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(state?.hotel || null);
  const [mainImage, setMainImage] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [loading, setLoading] = useState(!state?.hotel);

  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

  useEffect(() => {
    setCheckIn(today);
    setCheckOut(nextWeek);

    if (!hotel) {
      // Mock fetch if arriving directly to the URL
      setLoading(true);
      setTimeout(() => {
        setHotel({
          id: hotelId,
          name: hotelId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          address: '112 Rue du Faubourg Saint-Honoré',
          stars: 5,
          rating: 9.6,
          reviewCount: 1247,
          pricePerNight: 920,
          description: 'Experience luxury and comfort in this world-class establishment. Every detail has been curated to provide an unforgettable stay, from the premium bedding to the personalized concierge service.',
          images: [
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=520&h=360&fit=crop&q=85',
            'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=520&h=360&fit=crop&q=85',
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=520&h=360&fit=crop&q=85',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=520&h=360&fit=crop&q=85'
          ],
          amenities: ['WiFi', 'Pool', 'Spa', 'Gym'],
          freeCancellation: true,
          breakfastIncluded: true,
          distanceFromCenter: '0.8 km'
        });
        setLoading(false);
      }, 500);
    }
    window.scrollTo(0, 0);
  }, []);

  const nights = checkIn && checkOut
    ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
    : 1;

  const subtotal = (hotel?.pricePerNight || hotel?.price || 0) * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const getRatingLabel = (score) => {
    if (score >= 9.5) return 'Exceptional';
    if (score >= 9.0) return 'Excellent';
    if (score >= 8.5) return 'Very Good';
    if (score >= 8.0) return 'Good';
    return 'Pleasant';
  };

  const renderStars = (stars) =>
    [1,2,3,4,5].map(i => (
      <span key={i} style={{
        color: i <= (stars || 5) ? '#C9A84C' : '#e0e0e0',
        fontSize: '16px'
      }}>★</span>
    ));

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAF9F6',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>

      {/* BACK BUTTON BAR */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        padding: '14px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: '#6b6b6b',
            fontWeight: '300',
            padding: 0,
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#C9A84C'}
          onMouseLeave={e => e.currentTarget.style.color = '#6b6b6b'}
        >
          ← Back to Hotels
        </button>

        <div style={{
          fontSize: '12px',
          color: '#9e9e9e',
          fontWeight: '300',
          letterSpacing: '0.05em'
        }}>
          Hotels / {hotel?.name}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '48px 48px 80px'
      }}>

        {/* TWO COLUMN LAYOUT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '48px',
          alignItems: 'start'
        }}>

          {/* LEFT COLUMN */}
          <div>

            {/* ── IMAGE GALLERY ── */}
            {/* Main image */}
            <div style={{
              width: '100%',
              height: '480px',
              borderRadius: '0',
              overflow: 'hidden',
              marginBottom: '12px',
              position: 'relative'
            }}>
              <img
                src={hotel?.images?.[mainImage] || hotel?.img || 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg'}
                alt={hotel?.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.3s ease'
                }}
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg';
                }}
              />

              {/* Image counter */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.55)',
                color: 'white',
                fontSize: '11px',
                padding: '4px 12px',
                borderRadius: '0',
                letterSpacing: '0.05em'
              }}>
                {mainImage + 1} / {hotel?.images?.length || 1}
              </div>

              {/* Left arrow */}
              {hotel?.images?.length > 1 && (
                <button
                  onClick={() => setMainImage(i => i > 0 ? i - 1 : hotel.images.length - 1)}
                  onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = 'black'; }}
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.9)',
                    color: 'black',
                    border: 'none',
                    borderRadius: '0',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ‹
                </button>
              )}

              {/* Right arrow */}
              {hotel?.images?.length > 1 && (
                <button
                  onClick={() => setMainImage(i => i < hotel.images.length - 1 ? i + 1 : 0)}
                  onMouseEnter={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = 'black'; }}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.9)',
                    color: 'black',
                    border: 'none',
                    borderRadius: '0',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  ›
                </button>
              )}
            </div>

            {/* Thumbnail row */}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '40px',
              overflowX: 'auto'
            }}>
              {hotel?.images?.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(i)}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => { if(mainImage !== i) e.currentTarget.style.opacity = '0.65'; }}
                  style={{
                    width: '90px',
                    height: '65px',
                    borderRadius: '0',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    flexShrink: 0,
                    border: mainImage === i ? '2px solid #C9A84C' : '2px solid transparent',
                    opacity: mainImage === i ? 1 : 0.65,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img
                    src={img}
                    alt={`View ${i + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg';
                    }}
                  />
                </div>
              ))}
            </div>

            {/* ── HOTEL INFO ── */}
            {/* Stars + type */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {renderStars(hotel?.stars)}
              </div>
              {hotel?.type && (
                <span style={{
                  border: '1px solid #e5e5e5',
                  borderRadius: '0',
                  padding: '4px 14px',
                  fontSize: '10px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#9e9e9e'
                }}>
                  {hotel.type}
                </span>
              )}
            </div>

            {/* Hotel name */}
            <h1 style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: '42px',
              fontWeight: '400',
              color: '#1a1a1a',
              lineHeight: '1.15',
              marginBottom: '8px'
            }}>
              {hotel?.name}
            </h1>

            {/* Address */}
            <p style={{
              fontSize: '14px',
              color: '#9e9e9e',
              fontWeight: '300',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {hotel?.address}
              <a
                href={`https://maps.google.com/?q=${hotel?.address}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#C9A84C',
                  fontSize: '12px',
                  textDecoration: 'none',
                  marginLeft: '4px'
                }}
              >
                View on map →
              </a>
            </p>

            {/* Divider */}
            <div style={{
              borderTop: '1px solid rgba(0,0,0,0.07)',
              marginBottom: '28px'
            }}/>

            {/* ── DESCRIPTION ── */}
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontSize: '22px',
                fontWeight: '400',
                color: '#1a1a1a',
                marginBottom: '14px'
              }}>
                About This Hotel
              </h2>
              <p style={{
                fontSize: '15px',
                color: '#5a5a5a',
                lineHeight: '1.8',
                fontWeight: '300'
              }}>
                {hotel?.desc || hotel?.description}
              </p>
            </div>

            {/* Divider */}
            <div style={{
              borderTop: '1px solid rgba(0,0,0,0.07)',
              marginBottom: '28px'
            }}/>

            {/* ── AMENITIES GRID ── */}
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontSize: '22px',
                fontWeight: '400',
                color: '#1a1a1a',
                marginBottom: '20px'
              }}>
                Amenities
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px'
              }}>
                {hotel?.amenities?.map((amenity, i) => (
                  <div key={i} 
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                      e.currentTarget.style.borderColor = '#C9A84C';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#f0f0f0';
                    }}
                    style={{
                    border: '1px solid #f0f0f0',
                    borderRadius: '0',
                    padding: '14px 16px',
                    fontSize: '13px',
                    color: '#4a4a4a',
                    fontWeight: '300',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'white',
                    transition: 'all 0.2s ease',
                    cursor: 'default'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      background: '#C9A84C',
                      borderRadius: '0',
                      flexShrink: 0,
                      display: 'inline-block'
                    }} />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{
              borderTop: '1px solid rgba(0,0,0,0.07)',
              marginBottom: '28px'
            }}/>

            {/* ── HIGHLIGHTS ── */}
            <div style={{ marginBottom: '36px' }}>
              <h2 style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontSize: '22px',
                fontWeight: '400',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                Hotel Highlights
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px'
              }}>
                {hotel?.freeCancellation !== false && (
                  <div 
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    style={{
                      background: '#f0fdf4',
                      border: '1px solid #dcfce7',
                      borderRadius: '0',
                      padding: '16px',
                      fontSize: '13px',
                      color: '#16a34a',
                      transition: 'all 0.2s ease',
                      cursor: 'default'
                    }}>
                    ✓ Free Cancellation
                    <p style={{
                      fontSize: '11px',
                      color: '#86efac',
                      marginTop: '4px',
                      fontWeight: '300'
                    }}>
                      Cancel anytime for free
                    </p>
                  </div>
                )}
                {hotel?.breakfastIncluded !== false && (
                  <div 
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    style={{
                      background: '#fff7ed',
                      border: '1px solid #fed7aa',
                      borderRadius: '0',
                      padding: '16px',
                      fontSize: '13px',
                      color: '#92400e',
                      transition: 'all 0.2s ease',
                      cursor: 'default'
                    }}>
                    Breakfast Included
                    <p style={{
                      fontSize: '11px',
                      color: '#fdba74',
                      marginTop: '4px',
                      fontWeight: '300'
                    }}>
                      Complimentary daily breakfast
                    </p>
                  </div>
                )}
                {hotel?.distanceFromCenter && (
                  <div 
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0',
                      padding: '16px',
                      fontSize: '13px',
                      color: '#475569',
                      transition: 'all 0.2s ease',
                      cursor: 'default'
                    }}>
                    {hotel.distanceFromCenter} from centre
                    <p style={{
                      fontSize: '11px',
                      color: '#94a3b8',
                      marginTop: '4px',
                      fontWeight: '300'
                    }}>
                      Central location
                    </p>
                  </div>
                )}
                <div 
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  style={{
                    background: '#faf9f6',
                    border: '1px solid #e5e5e5',
                    borderRadius: '0',
                    padding: '16px',
                    fontSize: '13px',
                    color: '#4a4a4a',
                    transition: 'all 0.2s ease',
                    cursor: 'default'
                  }}>
                  {(hotel?.reviewCount || 1247).toLocaleString()} Reviews
                  <p style={{
                    fontSize: '11px',
                    color: '#C9A84C',
                    marginTop: '4px',
                    fontWeight: '300'
                  }}>
                    {getRatingLabel(hotel?.rating)} rated
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN - STICKY BOOKING CARD */}
          <div style={{ position: 'sticky', top: '24px' }}>
            <div style={{
              background: 'white',
              borderRadius: '0',
              border: '1px solid rgba(0,0,0,0.08)',
              padding: '36px 32px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.08)'
            }}>

              {/* Rating score */}
              <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '64px',
                  fontWeight: '300',
                  letterSpacing: '-0.04em',
                  fontVariantNumeric: 'tabular-nums',
                  color: '#1a1a1a',
                  lineHeight: '1',
                  marginBottom: '6px'
                }}>
                  {hotel?.rating?.toFixed(1)}
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  fontWeight: '500',
                  marginBottom: '4px'
                }}>
                  {getRatingLabel(hotel?.rating)} Rating
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#b0b0b0',
                  fontWeight: '300'
                }}>
                  from {(hotel?.reviewCount || 1247).toLocaleString()} reviews
                </p>
              </div>

              {/* Divider */}
              <div style={{
                borderTop: '1px solid #f0f0f0',
                marginBottom: '28px'
              }}/>

              {/* Price per night */}
              <div style={{
                textAlign: 'center',
                marginBottom: '28px'
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '52px',
                  fontWeight: '300',
                  letterSpacing: '-0.03em',
                  fontVariantNumeric: 'tabular-nums',
                  color: '#1a1a1a',
                  lineHeight: '1',
                  marginBottom: '4px'
                }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '22px',
                    fontWeight: '300',
                    verticalAlign: 'super',
                    color: '#C9A84C'
                  }}>$</span>
                  {hotel?.pricePerNight || hotel?.price}
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: '#9e9e9e',
                  fontWeight: '300',
                  letterSpacing: '0.04em'
                }}>
                  per night
                </p>
              </div>

              {/* Divider */}
              <div style={{
                borderTop: '1px solid #f0f0f0',
                marginBottom: '24px'
              }}/>

              {/* Date pickers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div>
                  <p style={{
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#b0b0b0',
                    marginBottom: '6px'
                  }}>
                    Check-In
                  </p>
                  <input
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={e => setCheckIn(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0',
                      padding: '10px 12px',
                      fontSize: '13px',
                      color: '#1a1a1a',
                      outline: 'none',
                      cursor: 'pointer',
                      background: '#fafafa',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <p style={{
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#b0b0b0',
                    marginBottom: '6px'
                  }}>
                    Check-Out
                  </p>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || today}
                    onChange={e => setCheckOut(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0',
                      padding: '10px 12px',
                      fontSize: '13px',
                      color: '#1a1a1a',
                      outline: 'none',
                      cursor: 'pointer',
                      background: '#fafafa',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Guests selector */}
              <div style={{
                border: '1px solid #e5e5e5',
                borderRadius: '0',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                background: '#fafafa'
              }}>
                <div>
                  <p style={{
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#b0b0b0',
                    marginBottom: '2px'
                  }}>
                    Guests
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: '#1a1a1a',
                    fontWeight: '300'
                  }}>
                    {guests} {guests === 1 ? 'guest' : 'guests'}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <button
                    onClick={() => setGuests(g => Math.max(1, g - 1))}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fafafa'; e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = '#4a4a4a'; }}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '0',
                      border: '1px solid #e0e0e0',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4a4a4a',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    −
                  </button>
                  <span style={{
                    fontSize: '15px',
                    color: '#1a1a1a',
                    minWidth: '20px',
                    textAlign: 'center'
                  }}>
                    {guests}
                  </span>
                  <button
                    onClick={() => setGuests(g => Math.min(20, g + 1))}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fafafa'; e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.color = '#C9A84C'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = '#4a4a4a'; }}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '0',
                      border: '1px solid #e0e0e0',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4a4a4a',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price breakdown */}
              <div style={{
                background: '#FAF9F6',
                borderRadius: '0',
                padding: '16px',
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontSize: '13px',
                    color: '#6b6b6b',
                    fontWeight: '300'
                  }}>
                    {nights} night{nights !== 1 ? 's' : ''} × 
                    ${hotel?.pricePerNight || hotel?.price}
                  </span>
                  <span style={{
                    fontSize: '13px',
                    color: '#1a1a1a',
                    fontWeight: '400'
                  }}>
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    fontSize: '13px',
                    color: '#6b6b6b',
                    fontWeight: '300'
                  }}>
                    Luxury tax & fees
                  </span>
                  <span style={{
                    fontSize: '13px',
                    color: '#1a1a1a',
                    fontWeight: '400'
                  }}>
                    ${taxes}
                  </span>
                </div>
                <div style={{
                  borderTop: '1px solid #e5e5e5',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{
                    fontSize: '14px',
                    color: '#1a1a1a',
                    fontWeight: '600'
                  }}>
                    Total
                  </span>
                  <span style={{
                    fontSize: '14px',
                    color: '#1a1a1a',
                    fontWeight: '600'
                  }}>
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* BOOK NOW button */}
              <BookNowButton />

              {/* No payment note */}
              <p style={{
                textAlign: 'center',
                fontSize: '11px',
                color: '#b0b0b0',
                fontWeight: '300',
                marginTop: '12px',
                letterSpacing: '0.03em'
              }}>
                No payment required to reserve today
              </p>

              {/* Divider */}
              <div style={{
                borderTop: '1px solid #f0f0f0',
                margin: '20px 0'
              }}/>

              {/* Trust badges */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '24px'
              }}>
                {['Secure Booking', 'Verified Property', '24/7 Support'].map((badge, i) => (
                  <span key={i} style={{
                    fontSize: '11px',
                    color: '#9e9e9e',
                    fontWeight: '300',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;




