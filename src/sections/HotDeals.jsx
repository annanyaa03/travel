import { useState, useEffect, useRef, useMemo } from 'react';
import { deals } from '../data';
import './HotDeals.css';

// ═══════════════════════════════
// COUNTDOWN TIMER COMPONENT
// ═══════════════════════════════
function CountdownTimer({ daysOffset, size = 'big' }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    // Each deal has its own fixed deadline based on user requirement
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + daysOffset);
    deadline.setHours(0, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;
      
      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      const s = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft(prev => {
        if (prev.secs !== s) {
          setFlash(true);
          setTimeout(() => setFlash(false), 400);
        }
        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          secs: s
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [daysOffset]);

  const units = ['D', 'H', 'M', 'S'];
  const values = [timeLeft.days, timeLeft.hours, timeLeft.mins, timeLeft.secs];

  return (
    <div className={size === 'big' ? 'countdown-timer' : 'small-timer'}>
      {values.map((v, i) => (
        <span key={i} className={`timer-char ${i === 3 && flash ? 'timer-flash' : ''}`}>
          {v.toString().padStart(2, '0')}{units[i]}
          {i < 3 && <span style={{ opacity: 0.3, margin: '0 4px' }}>/</span>}
        </span>
      ))}
    </div>
  );
}

// ═══════════════════════════════
// DEAL CARD COMPONENT (Handles Tilt & Spotlight)
// ═══════════════════════════════
function DealCard({ deal, type = 'big', index, isVisible }) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight position
    if (spotlightRef.current) {
      spotlightRef.current.style.left = `${x}px`;
      spotlightRef.current.style.top = `${y}px`;
    }

    // 3D Tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // max 10deg
    const rotateY = ((x - centerX) / centerX) * 14;  // max 14deg

    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateX(0) rotateY(0)`;
  };

  const delays = [0.1, 0.25, 0.4];
  const offset = type === 'big' ? 33 : (deal.id === 2 ? 38 : 43);

  return (
    <div 
      className={`deal-border-wrap ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delays[index]}s` }}
    >
      <div 
        className="deal-card" 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="cursor-spotlight" ref={spotlightRef}></div>
        <div className="scan-line"></div>

        {type === 'big' ? (
          <>
            <img src={deal.image} alt={deal.name} className="big-card-img" />
            <div className="card-overlay"></div>
            <div className="badge-row">
              <div className="best-deal-badge">BEST DEAL</div>
              <div className="rank-pill">🏆 #1 Pick</div>
            </div>
            <div className="big-card-content">
              <div className="countdown-wrap">
                <CountdownTimer daysOffset={offset} />
              </div>
              <div className="dest-name-big">{deal.name}, {deal.country}</div>
              <div className="tags-row">
                <span className="tag-pill">✈ Flights incl.</span>
                <span className="tag-pill">🏨 7 nights</span>
                <span className="tag-pill">🍳 Breakfast</span>
              </div>
              <div className="price-row-big">
                <span className="old-p">${deal.oldPrice}</span>
                <span className="new-p">${deal.newPrice}</span>
                <div className="save-badge">Save {deal.savings}</div>
              </div>
              <button className="book-btn-full">
                Book Now →
                <div className="shimmer-sweep"></div>
              </button>
            </div>
          </>
        ) : (
          <div className="small-card-grid">
            <div className="small-img-box">
              <img src={deal.image} alt={deal.name} />
              <div className="img-fade-overlay"></div>
              <div className="small-deal-badge">DEAL</div>
            </div>
            <div className="small-content">
              <div className="small-title">{deal.name}</div>
              <CountdownTimer daysOffset={offset} size="small" />
              <div className="tags-row" style={{ marginBottom: 4 }}>
                <span className="tag-pill">✈ Flights</span>
                <span className="tag-pill">🏝 Resort</span>
              </div>
              <div className="small-price-row">
                <span className="small-old">${deal.oldPrice}</span>
                <span className="small-new">${deal.newPrice}</span>
              </div>
              <button className="small-book-btn">Book Now →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════
// MAIN HOTDEALS COMPONENT
// ═══════════════════════════════
export default function HotDeals() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Generate 18 floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * 20}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${4 + Math.random() * 6}s`,
      size: `${2 + Math.random() * 2}px`
    }));
  }, []);

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

  // Split deals for Featured B layout
  const bigDeal = deals[0]; // Bali
  const rightDeals = deals.slice(1, 3); // Santorini & Kyoto

  const marqueeText = "Santorini Escape ✦ Save 45% ✦ Kyoto Culture Trip ✦ Save 37% ✦ Bali Package ✦ Save 40% ✦ ";

  return (
    <section className="hot-deals" ref={sectionRef}>
      <div className="deals-bg-glow"></div>
      <div className="glow-side-left"></div>
      <div className="glow-side-right"></div>

      <div className="particles-container">
        {particles.map(p => (
          <div 
            key={p.id} 
            className="particle" 
            style={{ 
              left: p.left, 
              bottom: p.bottom, 
              animationDelay: p.delay, 
              animationDuration: p.duration,
              width: p.size,
              height: p.size
            }}
          ></div>
        ))}
      </div>

      <div className="container">
        
        {/* Header */}
        <div className="deals-header">
          <div className="urgency-badge">LIMITED TIME DEALS</div>
          <h2 className="section-title">
            Hot <span className="deals-shimmer">Deals</span> 🔥
          </h2>
          <p className="section-subtitle">
            Curated premium packages for the ultimate traveler.
          </p>

          <div className="marquee-strip">
            <div className="marquee-content">
              {marqueeText.repeat(8)}
            </div>
          </div>
        </div>

        {/* Featured B Grid */}
        <div className="deals-grid-container">
          <div className="featured-b-grid">
            
            {/* BIG CARD (LEFT) */}
            <DealCard deal={bigDeal} type="big" index={0} isVisible={isVisible} />

            {/* SMALL CARDS (RIGHT) */}
            <div className="right-stack">
              {rightDeals.map((deal, idx) => (
                <DealCard 
                  key={deal.id} 
                  deal={deal} 
                  type="small" 
                  index={idx + 1} 
                  isVisible={isVisible} 
                />
              ))}
            </div>

          </div>

          {/* Bottom Stats Strip */}
          <div className="stats-strip">
            <div className="stat-item">
              <span className="stat-val">30+</span>
              <span className="stat-lbl">Destinations</span>
            </div>
            <div className="stat-div"></div>
            <div className="stat-item">
              <span className="stat-val">50K+</span>
              <span className="stat-val" style={{fontSize: '18px', marginLeft: '-5px'}}> Travelers</span>
            </div>
            <div className="stat-div"></div>
            <div className="stat-item">
              <span className="stat-val">4.9★</span>
              <span className="stat-lbl">Avg Rating</span>
            </div>
            <div className="stat-div"></div>
            <div className="stat-item">
              <span className="stat-val">24/7</span>
              <span className="stat-lbl">Support</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
