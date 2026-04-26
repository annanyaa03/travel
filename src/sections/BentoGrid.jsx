import { useState, useEffect } from 'react';
import './BentoGrid.css';

const CATEGORIES = ['All', 'Europe', 'Asia', 'Middle East', 'Africa', 'Islands', 'America'];

// Helper Functions
const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);

const truncate = (text, len) =>
  text?.length > len
    ? text.substring(0, len) + '...'
    : text || '';

const renderStars = (rating) =>
  [1, 2, 3, 4, 5].map(i => (
    <span key={i} style={{
      color: i <= Math.round(rating)
        ? '#C9A84C'
        : 'rgba(255,255,255,0.2)',
      fontSize: '11px',
      marginRight: '1px'
    }}>★</span>
  ));


function DestinationCard({ d }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="dest-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default'
      }}
    >
      {/* Background Image */}
      <img 
        src={d.image_url} 
        alt={d.name} 
        className="dc-img" 
        loading="lazy" 
        style={{
          transform: hovered ? 'scale(1.08)' : 'scale(1.0)',
          transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Overlay Gradient */}
      <div 
        className="card-ov" 
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: hovered 
            ? 'linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.28) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
          transition: 'background 0.4s ease'
        }}
      />

      {/* TOP OF CARD: Badges */}
      <div style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        zIndex: 10,
        display: 'flex',
        gap: '8px',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.4s ease'
      }}>
        <span style={{
          border: '1px solid rgba(255,255,255,0.28)',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(6px)',
          borderRadius: '999px',
          padding: '3px 10px',
          fontSize: '9px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'white'
        }}>
          {d.category}
        </span>
        {d.featured && (
          <span style={{
            border: '1px solid rgba(201,168,76,0.45)',
            background: 'rgba(201,168,76,0.1)',
            color: '#C9A84C',
            backdropFilter: 'blur(6px)',
            borderRadius: '999px',
            padding: '3px 10px',
            fontSize: '9px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}>
            ✦ Featured
          </span>
        )}
      </div>

      {/* DEFAULT CONTENT: Fades OUT on hover */}
      <div className="card-content" style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '24px',
        zIndex: 5,
        opacity: hovered ? 0 : 1,
        transform: hovered ? 'translateY(8px)' : 'translateY(0)',
        transition: 'all 0.35s ease'
      }}>
        <div className="card-region" style={{ color: '#C9A84C', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
          ★ {d.rating || '4.7'} · {d.available_slots || '40'} SLOTS AVAILABLE
        </div>
        <div className="card-name" style={{ fontFamily: 'serif', fontSize: '28px', color: '#fff', marginBottom: '6px' }}>
          {d.name}
        </div>
        <div className="card-country-line" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
          {d.city}, {d.country} · ${ (d.price_per_person || 749).toLocaleString() } per person
        </div>
      </div>

      {/* HOVER CONTENT: Fades IN on hover */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px',
        zIndex: 10,
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(14px)',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: hovered ? 'all' : 'none'
      }}>
        {/* ① Destination name */}
        <div style={{
          fontFamily: 'Playfair Display, Georgia, serif',
          fontSize: '24px',
          fontWeight: '400',
          color: 'white',
          lineHeight: '1.2',
          marginBottom: '4px'
        }}>
          {d.name}
        </div>

        {/* ② City, Country */}
        <div style={{
          fontSize: '10px',
          color: 'rgba(255,255,255,0.52)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: '300',
          marginBottom: '10px'
        }}>
          {d.city}, {d.country}
        </div>

        {/* ③ Star rating + number + slots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <div style={{ display: 'flex' }}>
            {renderStars(d.rating)}
          </div>
          <span style={{ color: '#C9A84C', fontSize: '11px' }}>{d.rating}</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>· {d.available_slots} slots left</span>
        </div>

        {/* ④ Description */}
        <div style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.65)',
          lineHeight: '1.65',
          fontWeight: '300',
          marginBottom: '10px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {truncate(d.description, 110)}
        </div>

        {/* ⑤ Tags */}
        <div style={{
          fontSize: '10px',
          color: 'rgba(255,255,255,0.38)',
          letterSpacing: '0.04em',
          marginBottom: '12px',
          fontWeight: '300'
        }}>
          {Array.isArray(d.tags) ? d.tags.slice(0, 3).join(' · ') : (d.tags || '').split(',').slice(0, 3).join(' · ')}
        </div>

        {/* ⑥ Thin divider line */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '12px' }} />

        {/* ⑦ Price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'serif', fontSize: '21px', color: '#C9A84C', fontWeight: '500' }}>
              {formatPrice(d.price_per_person)}
            </span>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginLeft: '4px' }}>/ person</span>
          </div>
        </div>
      </div>
      
      {/* Keep the original border */}
      <div className="card-border" style={{ pointerEvents: 'none' }} />
    </div>
  );
}

export default function BentoGrid() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/destinations?limit=100');
      if (!response.ok) throw new Error(`Server returned ${response.status}`);
      const json = await response.json();
      if (json.success && json.data) {
        setDestinations(json.data);
      } else {
        throw new Error(json.message || 'Failed to parse data');
      }
    } catch (err) {
      setError(err.message || 'Failed to connect');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter(d => 
    activeCategory === 'All' || d.category === activeCategory
  );

  if (loading) {
    return (
      <section className="bp-section">
        <div className="bp-header">
          <span className="bp-eyebrow">Explore destinations</span>
          <h2 className="bp-heading">Handpicked <em>Wonders</em></h2>
        </div>
        <div className="dest-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="dest-card skeleton-card" style={{ background: '#e0e0e0' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%' }}></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bp-section">
        <div className="bp-header"><h2 className="bp-heading">Something went <em>wrong</em></h2></div>
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <p>{error}</p>
          <button onClick={fetchDestinations} style={{ padding: '12px 24px', background: '#B8883A', color: '#fff', border: 'none', borderRadius: '6px' }}>Retry</button>
        </div>
      </section>
    );
  }

  return (
    <section className="bp-section">
      <div className="bp-header">
        <span className="bp-eyebrow">Explore destinations</span>
        <h2 className="bp-heading">Handpicked <em>Wonders</em></h2>
        <p className="bp-subtitle">Discover {destinations.length} handpicked destinations worldwide</p>
      </div>

      <div className="bp-pills">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            className={`bp-pill${activeCategory === cat ? ' bp-pill--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredDestinations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#9a9284' }}>
          <h3>No destinations found</h3>
        </div>
      ) : (
        <div className="dest-grid">
          {filteredDestinations.map((d) => (
            <DestinationCard key={d.id} d={d} />
          ))}
        </div>
      )}
    </section>
  );
}
