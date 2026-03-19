import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  HiOutlineGlobeAlt, 
  HiOutlineClock, 
  HiOutlineCurrencyDollar, 
  HiOutlineSparkles,
  HiOutlineArrowRight,
  HiOutlineCheck
} from 'react-icons/hi';
import './AIPlannerTeaser.css';

// DUMMY DATA FOR TEASER REVEAL
const DUMMY_PLAN = [
  { day: "D 01", title: "Arrival in the Gion District", subtitle: "Twilight exploration of historic tea houses and traditional geisha houses." },
  { day: "D 02", title: "Zen Gardens & Golden Pavilions", subtitle: "A morning walk through Kinkaku-ji followed by a private tea ceremony." },
  { day: "D 03", title: "The Bamboo Path of Arashiyama", subtitle: "Traversing the towering stalks and visiting gardens." },
  { day: "D 04", title: "Nishiki Market Culinary Tour", subtitle: "A sensory journey through the 'Kitchen of Kyoto' with a master chef." }
];

// TYPEWRITER COMPONENT FOR AI FEEL
const Typewriter = ({ text, delay = 25, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Reset if text changes
    setDisplayedText("");
    setIndex(0);
    setIsDone(false);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      setIsDone(true);
      if (onComplete) onComplete();
    }
  }, [index, text, delay, onComplete]);

  return (
    <span className="typewriter-text">
      {displayedText}
      {!isDone && <span className="typewriter-cursor">|</span>}
    </span>
  );
};

export default function AIPlannerTeaser() {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("7d");
  const [budget, setBudget] = useState(1500);
  const [styles, setStyles] = useState(["Cultural"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(true); // Always show results now
  const [progress, setProgress] = useState(100);
  const [revealedItems, setRevealedItems] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [generationId, setGenerationId] = useState(0); // For stable animation keys

  const containerRef = useRef(null);

  // Trigger initial reveal on mount
  useEffect(() => {
    let r = 0;
    const revealInterval = setInterval(() => {
      r++;
      setRevealedItems(r);
      if (r >= DUMMY_PLAN.length) clearInterval(revealInterval);
    }, 400); 
    return () => clearInterval(revealInterval);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (isGenerating) return;
    
    setIsGenerating(true);
    setProgress(0);
    setRevealedItems(0);
    setGenerationId(prev => prev + 1); // New generation ID

    // Simulate AI synthesis / refreshing
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsGenerating(false);
        // Cascade reveal of plan items again
        let r = 0;
        const revealInterval = setInterval(() => {
          r++;
          setRevealedItems(r);
          if (r >= DUMMY_PLAN.length) clearInterval(revealInterval);
        }, 400);
      }
    }, 20);
  };

  const toggleStyle = (style) => {
    setStyles(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  return (
    <section 
      className="teaser-section" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`
      }}
    >
      <div className="teaser-noise-overlay"></div>
      <div className="teaser-spotlight"></div>
      
      <div className="teaser-editorial-container">
        
        {/* LEFT SECTION: INPUTS */}
        <div className="teaser-left-column">
          <header className="teaser-header">
            <span className="teaser-eyebrow">COMPASS & CO. AI</span>
            <h2 className="teaser-h2">Trip Planner</h2>
            <p className="teaser-sub">Bespoke itineraries curated by Gemini AI</p>
          </header>

          <form className="teaser-form" onSubmit={handleGenerate}>
            <div className="teaser-input-group">
              <label className="teaser-label">
                <HiOutlineGlobeAlt className="teaser-icon" />
                DESTINATION
              </label>
              <input 
                type="text" 
                placeholder="Where to wander?" 
                className="teaser-minimal-input"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <div className="teaser-suggestions">
                {['Kyoto', 'Maldives', 'Santorini', 'Bali'].map(city => (
                  <button 
                    key={city} 
                    type="button" 
                    className="suggestion-pill"
                    onClick={() => setDestination(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="teaser-row">
              <div className="teaser-input-group">
                <label className="teaser-label">
                  <HiOutlineClock className="teaser-icon" />
                  DURATION
                </label>
                <div className="teaser-pills">
                  {['3d', '5d', '7d', '10d'].map(d => (
                    <button 
                      key={d} 
                      type="button" 
                      className={`teaser-pill ${duration === d ? 'active' : ''}`}
                      onClick={() => setDuration(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="teaser-input-group">
                <label className="teaser-label">
                  <HiOutlineCurrencyDollar className="teaser-icon" />
                  BUDGET <span className="budget-val-gold">${budget}</span>
                </label>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="100"
                  className="teaser-style-slider" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>

            <div className="teaser-input-group">
              <label className="teaser-label">TRAVEL STYLE</label>
              <div className="teaser-pills multi">
                {['Cultural', 'Nature', 'Luxury', 'Adventure'].map(s => (
                  <button 
                    key={s} 
                    type="button" 
                    className={`teaser-pill ${styles.includes(s) ? 'active' : ''}`}
                    onClick={() => toggleStyle(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {isGenerating && (
              <div className="teaser-status-area">
                <div className="teaser-progress-bar">
                  <div className="bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="teaser-status-text">Recalibrating itinerary...</p>
              </div>
            )}

            <button className="teaser-cta-btn" disabled={isGenerating}>
              {isGenerating ? (
                <>Updating...</>
              ) : (
                <>
                  Generate My Trip
                  <HiOutlineArrowRight className="cta-arrow" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT SECTION: PREVIEW */}
        <div className="teaser-right-column">
          <div className="preview-content">
            <header className="preview-header">
              <div className="preview-badge">
                <HiOutlineSparkles />
                INTELLIGENCE
              </div>
              <h3 className="preview-title">
                The {destination || 'Kyoto'} Narrative
              </h3>
            </header>

            <div className="preview-list">
              {DUMMY_PLAN.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`preview-item ${idx < revealedItems ? 'revealed' : ''}`}
                >
                  <div className="item-day">{item.day}</div>
                  <div className="item-details">
                    <div className="item-title">{item.title}</div>
                    <div className="item-subtitle">
                      {idx < revealedItems && (
                        <Typewriter key={`${idx}-${generationId}`} text={item.subtitle} />
                      )}
                    </div>
                  </div>
                  <HiOutlineCheck className={`item-check ${idx < revealedItems ? 'visible' : ''}`} />
                </div>
              ))}
            </div>

            <div className="preview-footer animate-fade-in">
              <div className="editorial-stat">
                <span className="stat-lbl">Estimated Cost</span>
                <span className="stat-val gold">${Math.round(budget * 0.7)}</span>
              </div>
              <button className="preview-full-btn">View Full Plan</button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
