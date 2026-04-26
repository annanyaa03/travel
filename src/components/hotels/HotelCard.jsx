import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel, index, checkIn, checkOut }) => {
  const [hovered, setHovered] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

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
        fontSize: '14px'
      }}>★</span>
    ));

  const nights = checkIn && checkOut
    ? Math.ceil(
        (new Date(checkOut) - new Date(checkIn))
        / (1000 * 60 * 60 * 24)
      )
    : 4;

  const totalPrice = (hotel.price || hotel.pricePerNight || 0) * nights;

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
        fontFamily: 'Inter, system-ui, sans-serif',
          background: 'white',
          borderRadius: '0',
          border: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
          marginBottom: '20px',
          display: 'flex',
          transition: 'all 0.35s ease',
          opacity: hovered ? 1 : 0,
          boxShadow: hovered
            ? '0 12px 48px rgba(0,0,0,0.10)'
            : 'none',
          transform: hovered
            ? 'translateY(-3px)'
            : 'translateY(0)',
          animation: `fadeInUp 0.4s ease ${index * 0.08}s both`
        }}
      >

        {/* IMAGE SECTION */}
        <div style={{
          width: '300px',
          flexShrink: 0,
          position: 'relative',
          padding: '12px',
          paddingRight: '0'
        }}>
          <div style={{
            width: '100%',
            height: '220px',
            borderRadius: '0',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img
              src={hotel.images?.[0] || hotel.img || 
                'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg'}
              alt={hotel.name}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                transform: hovered
                  ? 'scale(1.06)'
                  : 'scale(1.0)'
              }}
              onError={(e) => {
                e.target.src =
                  'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg';
              }}
            />

          </div>

          {/* Badge */}
          {(hotel.badge || hotel.badges?.[0]) && (
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: (hotel.badge || hotel.badges?.[0]) === 'POPULAR'
                ? '#C9A84C'
                : (hotel.badge || hotel.badges?.[0]) === 'GREAT DEAL'
                ? '#22c55e'
                : '#3b82f6',
              color: 'white',
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              borderRadius: '0',
              padding: '4px 10px',
              fontWeight: '400'
            }}>
              {hotel.badge || hotel.badges[0]}
            </div>
          )}

          {/* Heart button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSaved(!saved);
            }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '8px',
              width: '34px',
              height: '34px',
              borderRadius: '0',
              background: 'rgba(255,255,255,0.92)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              transition: 'all 0.2s ease',
              transform: saved ? 'scale(1.15)' : 'scale(1)',
              color: saved ? '#C9A84C' : '#b0b0b0'
            }}
          >
            {saved ? 'SAVED' : 'SAVE'}
          </button>
        </div>

        {/* CONTENT SECTION */}
        <div style={{
          flex: 1,
          padding: '24px 28px'
        }}>

          {/* Stars + type */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px'
          }}>
            <div style={{ display: 'flex', gap: '1px' }}>
              {renderStars(hotel.stars || 5)}
            </div>
            {(hotel.type || hotel.stars >= 4) && (
              <span style={{
                border: '1px solid #e5e5e5',
                borderRadius: '0',
                padding: '3px 12px',
                fontSize: '10px',
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#9e9e9e'
              }}>
                {hotel.type || (hotel.stars === 5 ? 'Luxury' : 'Boutique')}
              </span>
            )}
          </div>

          {/* Hotel name */}
          <h3
            style={{
              fontFamily:
                'Fraunces, Georgia, serif',
              fontSize: '22px',
              fontWeight: '400',
              color: hovered ? '#C9A84C' : '#1a1a1a',
              marginBottom: '6px',
              transition: 'color 0.2s ease',
              cursor: 'pointer',
              lineHeight: '1.3'
            }}
            onClick={() => navigate(`/hotels/${hotel.id || hotel.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, { state: { hotel } })}
          >
            {hotel.name}
          </h3>

          {/* Address */}
          <p style={{
            fontSize: '12px',
            fontFamily: 'Inter, system-ui, sans-serif',
            color: '#9e9e9e',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {hotel.address}
          </p>

          {/* Description */}
          <p style={{
            fontSize: '13px',
            fontFamily: 'Inter, system-ui, sans-serif',
            color: '#777',
            lineHeight: '1.65',
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {hotel.desc || hotel.description}
          </p>

          {/* Amenity chips */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '14px'
          }}>
            {hotel.amenities?.slice(0, 5)
              .map((amenity, i) => (
              <span key={i} style={{
                border: '1px solid #ebebeb',
                borderRadius: '0',
                padding: '4px 12px',
                fontSize: '11px',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#6b6b6b',
                background: '#fafafa',
                fontWeight: '300'
              }}>
                {amenity}
              </span>
            ))}
          </div>

          {/* Badges row */}
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            {(hotel.freeCancellation ?? true) && (
              <span style={{
                fontSize: '12px',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#16a34a',
                fontWeight: '300',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Free Cancellation
              </span>
            )}
            {(hotel.breakfastIncluded ?? true) && (
              <span style={{
                fontSize: '12px',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#92400e',
                fontWeight: '300',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Breakfast Included
              </span>
            )}
            <span style={{
              fontSize: '11px',
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#b0b0b0',
              fontWeight: '300'
            }}>
              {hotel.distanceFromCenter || "0.8 km"} 
              from centre
            </span>
          </div>
        </div>

        {/* PRICING SECTION */}
        <div style={{
          width: '180px',
          flexShrink: 0,
          padding: '24px 24px',
          borderLeft: '1px solid rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between'
        }}>
          <div style={{ textAlign: 'right' }}>
            {/* Rating score box */}
            <div style={{
              background: '#1a1a1a',
              color: 'white',
              borderRadius: '0',
              padding: '8px 14px',
              fontSize: '22px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
              lineHeight: '1',
              display: 'inline-block',
              marginBottom: '6px'
            }}>
              {hotel.rating?.toFixed(1)}
            </div>

            {/* Rating label */}
            <p style={{
              fontSize: '10px',
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              marginBottom: '4px'
            }}>
              {getRatingLabel(hotel.rating)}
            </p>

            {/* Review count */}
            <p style={{
              fontSize: '11px',
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#b0b0b0',
              marginBottom: '20px'
            }}>
              {(hotel.reviewCount || 1247).toLocaleString()} 
              reviews
            </p>

            {/* Price */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '30px',
              fontWeight: '300',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
              color: '#1a1a1a',
              lineHeight: '1',
              textAlign: 'right'
            }}>
              ${hotel.price || hotel.pricePerNight}
            </p>
            <p style={{
              fontSize: '12px',
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#9e9e9e',
              fontWeight: '300',
              marginBottom: '4px',
              textAlign: 'right'
            }}>
              per night
            </p>
            <p style={{
              fontSize: '11px',
              fontFamily: 'Inter, system-ui, sans-serif',
              color: '#b0b0b0',
              marginBottom: '20px',
              textAlign: 'right'
            }}>
              Total ${totalPrice} · {nights} nights
            </p>
          </div>

          {/* VIEW DETAILS button */}
          <ViewDetailsButton
            onClick={() => navigate(`/hotels/${hotel.id || hotel.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, { state: { hotel } })}
          />
        </div>
      </div>
    </>
  );
};

{/* Separate button component for hover effect */}
const ViewDetailsButton = ({ onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        background: hover ? '#C9A84C' : '#1a1a1a',
        color: 'white',
        border: 'none',
        borderRadius: '0',
        padding: '13px 0',
        fontSize: '11px',
        fontFamily: 'Inter, system-ui, sans-serif',
        letterSpacing: '0.1em',
        fontWeight: '400',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: hover
          ? '0 8px 24px rgba(201,168,76,0.3)'
          : 'none',
        transform: hover
          ? 'translateY(-1px)'
          : 'translateY(0)'
      }}
    >
      View Details
    </button>
  );
};

export default HotelCard;


