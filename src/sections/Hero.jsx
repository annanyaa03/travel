import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Hero.css';

const images = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1920&h=1080&fit=crop'
];

const fxClasses = [
  'fx-zoom-left',
  'fx-zoom-right',
  'fx-zoom-out',
  'fx-pan-right',
  'fx-diagonal',
  'fx-tilt-up',
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setActiveSlide(prev => (prev + 1) % images.length);
  const prevSlide = () => setActiveSlide(prev => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <section className="hero">
      {/* Slideshow */}
      <div className="hero-slides">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`hero-slide ${idx === activeSlide ? `active ${fxClasses[idx % fxClasses.length]}` : ''}`}
            style={{backgroundImage: `url(${img})`}}
          />
        ))}
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="container hero-content">
        <div className="hero-text animate-slide-up">
          <div className="badge-ai">⭐ #1 Rated Travel Experience Platform</div>
          <h1>
            <span style={{ color: '#f6d8b0', fontWeight: 300 }}>Discover the World's</span><br />
            <span style={{ color: '#c8962a', fontWeight: 600, fontStyle: 'italic' }}>Breathtaking Wonders</span>
          </h1>
          <p className="hero-subtext">Curated journeys to the planet's most extraordinary destinations</p>
          
          <div className="hero-search glass-panel">
            <div className="search-input">
              <FaMapMarkerAlt />
              <input type="text" placeholder="Where do you want to go?" />
            </div>
            <div className="search-divider"></div>
            <select className="search-select">
              <option>All Categories</option>
              <option>Beach</option>
              <option>Mountain</option>
              <option>Cultural</option>
              <option>Adventure</option>
            </select>
            <button className="btn btn-primary search-btn">Search</button>
          </div>

          <div className="hero-tags">
            <span>Popular:</span>
            <button>Santorini</button>
            <button>Maldives</button>
            <button>Kyoto</button>
            <button>Patagonia</button>
            <button>Morocco</button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="hero-controls">
        <button onClick={prevSlide} className="icon-btn"><FaChevronLeft /></button>
        <div className="hero-dots">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`hero-dot ${idx === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(idx)}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="icon-btn"><FaChevronRight /></button>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
}
