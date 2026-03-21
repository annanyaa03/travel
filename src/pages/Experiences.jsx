import React, { useState, useEffect } from 'react';
import './Experiences.css';

const EXPERIENCES_DATA = [
  {
    id: 'e1',
    title: 'Private Serengeti Safari',
    category: 'Adventure',
    location: 'Tanzania, Africa',
    duration: '7 Days',
    price: 'From $12,500',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=90',
    desc: 'Witness the Great Migration from an exclusive, undiscovered luxury camp.'
  },
  {
    id: 'e2',
    title: 'Tuscan Culinary Masterclass',
    category: 'Culinary',
    location: 'Florence, Italy',
    duration: '4 Days',
    price: 'From $4,200',
    img: 'https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?w=1200&q=90',
    desc: 'Truffle hunting, private wine tastings, and cooking with Michelin-starred chefs.'
  },
  {
    id: 'e3',
    title: 'Antarctic Ice Cave Expedition',
    category: 'Adventure',
    location: 'Antarctica',
    duration: '10 Days',
    price: 'From $28,000',
    img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=90',
    desc: 'Explore untouched ice formations with seasoned polar explorers.'
  },
  {
    id: 'e4',
    title: 'Kyoto Zen Retreat',
    category: 'Wellness',
    location: 'Kyoto, Japan',
    duration: '5 Days',
    price: 'From $6,100',
    img: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&q=90',
    desc: 'Private tea ceremonies, exclusive temple access, and ryokan wellness immersion.'
  },
  {
    id: 'e5',
    title: 'Maldive Yacht Charter',
    category: 'Relaxation',
    location: 'Maldives',
    duration: '8 Days',
    price: 'From $35,000',
    img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=90',
    desc: 'Sail the Indian Ocean in absolute privacy on a 120ft luxury gulet.'
  },
  {
    id: 'e6',
    title: 'Patagonian Glamping',
    category: 'Adventure',
    location: 'Patagonia, Chile',
    duration: '6 Days',
    price: 'From $8,400',
    img: 'https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?w=1200&q=90',
    desc: 'Luxury eco-domes nestled beneath the towering peaks of Torres del Paine.'
  }
];

const FILTERS = ['All', 'Adventure', 'Culinary', 'Wellness', 'Relaxation'];

export default function Experiences() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filtered = activeFilter === 'All' 
    ? EXPERIENCES_DATA 
    : EXPERIENCES_DATA.filter(e => e.category === activeFilter);

  return (
    <div className="experiences-page">
      {/* Hero Section */}
      <section className="exp-hero">
        <div 
          className="exp-hero-bg" 
          style={{ transform: `translateY(${offsetY * 0.4}px)` }}
        />
        <div className="exp-hero-content">
          <div className="exp-eyebrow">Curated exclusively for you</div>
          <h1 className="exp-title">Extraordinary <em>Journeys</em></h1>
          <p className="exp-subtitle">Beyond destinations. We craft moments that define a lifetime, blending unparalleled luxury with profound authenticity.</p>
        </div>
        <div className="exp-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="exp-scroll-line" />
        </div>
      </section>

      {/* Interactive Filters */}
      <section className="exp-filters-section">
        <div className="exp-filters-container">
          {FILTERS.map(f => (
            <button 
              key={f} 
              className={`exp-filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Section */}
      <section className="exp-grid-section">
        <div className="exp-grid">
          {filtered.map((exp, i) => (
            <div key={exp.id} className="exp-card animate-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="exp-card-img-wrap">
                <img src={exp.img} alt={exp.title} className="exp-card-img" />
                <div className="exp-card-overlay">
                  <button className="exp-explore-btn">Explore Journey →</button>
                </div>
                <div className="exp-card-badge">{exp.category}</div>
              </div>
              <div className="exp-card-info">
                <div className="exp-card-meta">
                  <span>{exp.location}</span>
                  <span className="exp-dot">•</span>
                  <span>{exp.duration}</span>
                </div>
                <h3 className="exp-card-title">{exp.title}</h3>
                <p className="exp-card-desc">{exp.desc}</p>
                <div className="exp-card-price">{exp.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Concierge Teaser */}
      <section className="exp-concierge">
        <div className="exp-concierge-inner">
          <div className="exp-c-text">
            <h2>The <em>Signature</em> Service</h2>
            <p>Don't see exactly what you're looking for? Our private advisors specialize in creating fully bespoke itineraries from scratch. Your imagination is the only limit.</p>
            <button className="exp-c-btn">Speak with an Advisor</button>
          </div>
        </div>
      </section>
    </div>
  );
}
