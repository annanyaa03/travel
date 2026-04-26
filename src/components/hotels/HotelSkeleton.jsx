import React from 'react';

const shimmerStyle = {
  background: `linear-gradient(
    90deg,
    #f0ede8 25%,
    #e8e4de 50%,
    #f0ede8 75%
  )`,
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.8s infinite'
};

const HotelSkeleton = () => (
  <div style={{
    background: 'white',
    borderRadius: '0',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
    marginBottom: '20px',
    display: 'flex',
    padding: '12px',
    gap: '24px'
  }}>
    {/* Image placeholder */}
    <div style={{
      width: '300px',
      height: '220px',
      borderRadius: '0',
      flexShrink: 0,
      ...shimmerStyle
    }}/>

    {/* Content placeholder */}
    <div style={{ flex: 1, padding: '12px 0' }}>
      {/* Stars */}
      <div style={{
        width: '100px', height: '14px',
        borderRadius: '0',
        marginBottom: '12px',
        ...shimmerStyle
      }}/>
      {/* Name */}
      <div style={{
        width: '65%', height: '22px',
        borderRadius: '0',
        marginBottom: '8px',
        ...shimmerStyle
      }}/>
      {/* Address */}
      <div style={{
        width: '45%', height: '12px',
        borderRadius: '0',
        marginBottom: '14px',
        ...shimmerStyle
      }}/>
      {/* Description line 1 */}
      <div style={{
        width: '90%', height: '12px',
        borderRadius: '0',
        marginBottom: '6px',
        ...shimmerStyle
      }}/>
      {/* Description line 2 */}
      <div style={{
        width: '75%', height: '12px',
        borderRadius: '0',
        marginBottom: '16px',
        ...shimmerStyle
      }}/>
      {/* Amenity chips */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[60,70,55,65].map((w, i) => (
          <div key={i} style={{
            width: `${w}px`, height: '28px',
            borderRadius: '0',
            ...shimmerStyle
          }}/>
        ))}
      </div>
    </div>

    {/* Pricing placeholder */}
    <div style={{
      width: '180px',
      flexShrink: 0,
      padding: '12px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '10px'
    }}>
      <div style={{
        width: '60px', height: '40px',
        borderRadius: '0',
        ...shimmerStyle
      }}/>
      <div style={{
        width: '80px', height: '12px',
        borderRadius: '0',
        ...shimmerStyle
      }}/>
      <div style={{
        width: '70px', height: '32px',
        borderRadius: '0',
        marginTop: '8px',
        ...shimmerStyle
      }}/>
      <div style={{
        width: '90px', height: '12px',
        borderRadius: '0',
        ...shimmerStyle
      }}/>
      <div style={{
        width: '130px', height: '42px',
        borderRadius: '0',
        marginTop: 'auto',
        ...shimmerStyle
      }}/>
    </div>
  </div>
);

export default HotelSkeleton;
