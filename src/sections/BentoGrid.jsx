import { useState, useEffect } from 'react';
import './BentoGrid.css';

const CATEGORIES = ['All', 'Europe', 'Asia', 'Middle East', 'Africa', 'Islands', 'Americas'];

function ArrowSVG() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2 6.5H11M11 6.5L7 2.5M11 6.5L7 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BentoGrid() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchDestinations = async () => {
    console.log('--- Fetching destinations... ---');
    try {
      setLoading(true);
      setError(null);
      
      // Use relative URL - Vite proxy handles the port 5000 mapping
      const response = await fetch('/api/destinations?limit=100');
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      console.log('✅ Fetch successful:', json);

      if (json.success && json.data) {
        setDestinations(json.data);
      } else {
        throw new Error(json.message || 'Failed to parse destinations data');
      }
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError(err.message || 'Failed to connect to the travel API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Client-side filtering
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
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="dest-card skeleton-card" style={{ background: '#e0e0e0', animate: 'pulse 1.5s infinite' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'skeleton-loading 1.5s infinite' }}></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bp-section">
        <div className="bp-header">
          <h2 className="bp-heading">Something went <em>wrong</em></h2>
        </div>
        <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
          <p style={{ color: '#666', marginBottom: '24px' }}>{error}</p>
          <button 
            onClick={fetchDestinations}
            style={{ padding: '12px 24px', background: '#B8883A', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Retry Connection
          </button>
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
          <p>We couldn't find any destinations in the "{activeCategory}" category.</p>
        </div>
      ) : (
        <div className="dest-grid">
          {filteredDestinations.map((d) => (
            <div 
              key={d.id} 
              className="dest-card"
              onClick={() => window.location.href = `/destinations/${d.slug || d.id}`}
            >
              <img src={d.image_url} alt={d.name} className="dc-img" loading="lazy" />
              <div className="card-ov" />
              <div className="card-border" />
              <span className="card-badge">{d.category}</span>
              {d.featured && (
                <span className="card-badge" style={{ left: 'auto', right: '10px', background: '#1a1a18' }}>
                  Featured
                </span>
              )}
              <div className="card-arrow"><ArrowSVG /></div>
              <div className="card-content">
                <div className="card-region">⭐ {d.rating || '4.9'} · {d.available_slots || '0'} slots available</div>
                <div className="card-name">{d.name}</div>
                <div className="card-country-line">
                  {d.city}, {d.country} · <span style={{ color: '#fff', fontWeight: 'bold' }}>${(d.price_per_person || 0).toLocaleString()}</span> per person
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
