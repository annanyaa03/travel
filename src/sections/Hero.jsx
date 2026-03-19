import { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Hero.css';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video autoplay blocked:", err));
    }
  }, []);

  return (
    <section className="hero">
      {/* Background Video */}
      <div className="hero-video-container">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video"
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          }}
          poster="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop"
        >
          <source src="https://videos.pexels.com/video-files/33862542/14370083_2560_1440_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
}
