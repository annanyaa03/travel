import { useState, useEffect, useRef } from 'react';
import { deals } from '../data';
import './HotDeals.css';

export default function HotDeals() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hot-deals-story" ref={sectionRef}>
      <div className="story-container">
        <header className="story-header">
          <span className="story-eyebrow">CURATED EXPERIENCE</span>
          <h2 className="story-section-title">HOT DEALS</h2>
          <p className="story-subtitle">Hand-picked narratives for the discerning explorer</p>
        </header>

        <div className={`story-grid ${isVisible ? 'animate-up' : ''}`}>
          {deals.map((deal) => (
            <div key={deal.id} className="story-card-wrap">
              <div className="story-card-image-area">
                <img 
                  src={deal.image} 
                  alt={deal.name} 
                  className="story-img active" 
                />
                
                {/* Progress Indicator (Single Line) */}
                <div className="story-progress-bg">
                  <div className="progress-segment">
                    <div className="segment-fill filled"></div>
                  </div>
                </div>

                {/* Top Overlays */}
                <div className="story-top-pills">
                  <div className="story-pill-country">
                    <span className="flag-icon">
                      {deal.country === 'Indonesia' ? '🇮🇩' : (deal.country === 'Greece' ? '🇬🇷' : '🇫🇷')}
                    </span>
                    {deal.country}
                  </div>
                  <div className="story-pill-rating">4.9 ★</div>
                </div>

                {/* Bottom Overlay CTA */}
                <div className="story-cta-overlay">
                  <button className="story-view-btn">View Tour</button>
                </div>
              </div>

              <div className="story-card-content">
                <h3 className="story-card-title">{deal.name}</h3>
                <p className="story-card-desc">
                  {deal.id === 1 && "Experience the cool breeze of rolling emerald tea plantations and misty mossy forests. A serene escape into the lush heart of Malaysia's ancient highlands."}
                  {deal.id === 2 && "Gaze up at the world's tallest twin structures, where modern engineering meets traditional Islamic motifs. Experience the breathtaking skybridge walk."}
                  {deal.id === 3 && "Wander through the cobbled streets of Montmartre, witness the glow of the Eiffel Tower at dusk, and cruise along the Seine. A timeless journey of art and passion."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
