import { useState, useEffect, useRef } from 'react';
import { 
  HiOutlineArrowRight, 
  HiOutlineGlobeAlt, 
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineCamera,
  HiOutlineHeart,
  HiOutlineMap
} from 'react-icons/hi';
import './ConciergePlanner.css';

const STATUS_MESSAGES = [
  "Consulting the archives of global transit...",
  "Matching the itinerary to your aesthetic...",
  "Curating a narrative of local wonder...",
  "Calculating the geometry of your route...",
  "Finalising your bespoke editorial plan..."
];

const CATEGORIES = {
  Food: 'cat-food',
  Art: 'cat-art',
  Nightlife: 'cat-nightlife',
  Fashion: 'cat-fashion'
};

const DUMMY_PLAN = {
  title: "The Kyoto & Osaka Narrative: 7 Days of Refinement",
  stats: {
    days: "7",
    cost: "$2.4K",
    activities: "18",
    rating: "4.9"
  },
  overview: [
    { day: "D 01", title: "Arrival in the Gion District", subtitle: "Twilight exploration of historic tea houses and traditional geisha houses." },
    { day: "D 02", title: "Zen Gardens & Golden Pavilions", subtitle: "A morning walk through Kinkaku-ji followed by a private tea ceremony." },
    { day: "D 03", title: "The Bamboo Path of Arashiyama", subtitle: "Traversing the towering stalks and visiting the Tenryu-ji Temple gardens." },
    { day: "D 04", title: "Nishiki Market Culinary Tour", subtitle: "A sensory journey through the 'Kitchen of Kyoto' with a master chef." },
    { day: "D 05", title: "Transit to Osaka: Neon & Nightlife", subtitle: "Experiencing the high-energy pulse of Dotonbori and local izakayas." },
    { day: "D 06", title: "Umeda Sky & Architectural Wonders", subtitle: "Panoramic views of the metropolis followed by fashion exploration." },
    { day: "D 07", title: "Whisky & Departure", subtitle: "A final morning visit to the Suntory Yamazaki Distillery for a private tasting." }
  ],
  days: [
    {
      id: 1,
      items: [
        { category: "Art", title: "Tenryu-ji Zen Garden", desc: "A world-class example of Shakkei (borrowed scenery) architecture." },
        { category: "Food", title: "Omakase at Gion Matsuyama", desc: "Traditional multi-course kaiseki featuring hyper-seasonal ingredients." },
        { category: "Nightlife", title: "The Ponto-cho Alley", desc: "A late-night stroll through Kyoto's most atmospheric lantern-lit passage." }
      ]
    }
  ]
};

// Custom Typewriter Hook
const useTypewriter = (text, speed = 45, start = false) => {
  const [displayedText, setDisplayedText] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!start) {
      setDisplayedText("");
      setComplete(false);
      return;
    }
    
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setComplete(true);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, start]);

  return { displayedText, complete };
};

export default function AITripPlanner() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [statusIdx, setStatusIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Form State
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("7d");
  const [budget, setBudget] = useState(1500);
  const [styles, setStyles] = useState(["Cultural"]);

  const { displayedText: typedTitle, complete: titleDone } = useTypewriter(DUMMY_PLAN.title, 45, showResults);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setShowResults(false);
    setProgress(0);
    setStatusIdx(0);

    // Status Cycling
    const statusInterval = setInterval(() => {
      setStatusIdx(prev => (prev + 1) % STATUS_MESSAGES.length);
    }, 900);

    // Progress Bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(statusInterval);
          setIsGenerating(false);
          setShowResults(true);
          return 100;
        }
        return prev + 2;
      });
    }, 90);
  };

  const toggleStyle = (style) => {
    setStyles(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  return (
    <div className="editorial-planner-page">
      <div className="editorial-container">
        
        {/* LEFT PANEL: CONCIERGE INPUTS */}
        <aside className="editorial-left-panel">
          <div className="editorial-header-dark">
            <span className="cp-eyebrow">Compass & Co. AI</span>
            <h2 className="cp-title">Trip Planner</h2>
            <p className="cp-subtitle">Bespoke itineraries curated by Gemini AI</p>
          </div>

          <form className="editorial-form" onSubmit={handleGenerate}>
            {/* Destination */}
            <div className="input-block">
              <label className="input-label-sm">Destination</label>
              <input 
                className="editorial-input" 
                placeholder="Where to wander?" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
              <div className="suggestion-pills">
                {["Kyoto", "Maldives", "Santorini", "Bali"].map(p => (
                  <span key={p} className="cp-pill" onClick={() => setDestination(p)}>{p}</span>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="input-block">
              <label className="input-label-sm">Duration</label>
              <div className="pill-group">
                {["3d", "5d", "7d", "10d"].map(d => (
                  <button 
                    key={d}
                    type="button"
                    className={`pill-toggle ${duration === d ? 'selected' : ''}`}
                    onClick={() => setDuration(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="input-block">
              <label className="input-label-sm">
                Budget <span className="value-gold">${budget}</span>
              </label>
              <input 
                type="range" 
                min="300" 
                max="5000" 
                className="custom-slider" 
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            {/* Travel Style */}
            <div className="input-block">
              <label className="input-label-sm">Travel Style</label>
              <div className="pill-group">
                {["Cultural", "Food", "Nature", "Adventure", "Wellness"].map(s => (
                  <button 
                    key={s}
                    type="button"
                    className={`pill-toggle multi ${styles.includes(s) ? 'selected' : ''}`}
                    onClick={() => toggleStyle(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Section */}
            {isGenerating && (
              <div className="generation-status">
                <div className="pulse-loader">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <p className="status-text">{STATUS_MESSAGES[statusIdx]}</p>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}

            {/* Footer & CTA */}
            <div className="editorial-footer-dark">
              <div className="cost-strip">
                <span className="label">Estimated cost per person</span>
                <span className="value">~${Math.round(budget * 0.6)}</span>
              </div>
              <button type="submit" className="editorial-cta" disabled={isGenerating}>
                {isGenerating ? "Synthesizing..." : "GENERATE MY TRIP"}
              </button>
            </div>
          </form>
        </aside>

        {/* RIGHT PANEL: EDITORIAL RESULTS */}
        <main className="editorial-right-panel">
          <div className="results-header">
            <span className="label-sm">✦ INTELLIGENCE</span>
            <h1 className={showResults ? "typewriter-cursor cp-result-title" : "cp-result-title"}>
              {typedTitle}
            </h1>
          </div>

          {showResults && (
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {/* Stats Row */}
              <div className="stats-row">
                <div className="stat-col">
                  <span className="label">Days</span>
                  <span className="value">{DUMMY_PLAN.stats.days}</span>
                </div>
                <div className="stat-col">
                  <span className="label">ESTIMATED COST</span>
                  <span className="value gold cp-cost-val">{DUMMY_PLAN.stats.cost}</span>
                </div>
                <div className="stat-col">
                  <span className="label">Activities</span>
                  <span className="value">{DUMMY_PLAN.stats.activities}</span>
                </div>
                <div className="stat-col">
                  <span className="label">Rating</span>
                  <span className="value">{DUMMY_PLAN.stats.rating} \u2605</span>
                </div>
              </div>

              {/* Tab Bar */}
              <div className="tab-bar">
                {['Overview', 'Day by day'].map(t => (
                  <button 
                    key={t}
                    className={`tab-btn ${activeTab === t ? 'active' : ''}`}
                    onClick={() => setActiveTab(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'Overview' ? (
                <div className="day-list">
                  {DUMMY_PLAN.overview.map((d, idx) => (
                    <div 
                      key={idx} 
                      className="day-row animate-slide-up" 
                      style={{ animationDelay: `${0.4 + (idx * 0.1)}s` }}
                    >
                      <div className="day-num">{d.day}</div>
                      <div className="day-content">
                        <span className="day-title">{d.title}</span>
                        <span className="day-subtitle">{d.subtitle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="day-detail-view animate-slide-up">
                  <div className="day-subtabs">
                    {Array.from({length: 7}, (_, i) => (
                      <button key={i} className={`subtab-btn ${i === 0 ? 'active' : ''}`}>
                        Day {i + 1}
                      </button>
                    ))}
                  </div>
                  <div className="activity-list">
                    {DUMMY_PLAN.days[0].items.map((item, idx) => (
                      <div key={idx} className="activity-item animate-slide-up" style={{ animationDelay: `${0.2 + (idx * 0.1)}s` }}>
                        <span className={`cat-tag ${CATEGORIES[item.category]}`}>{item.category}</span>
                        <h4 className="activity-title">{item.title}</h4>
                        <p className="activity-desc">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Footer */}
              <footer className="results-footer">
                <div className="footer-links">
                  <a href="#" className="footer-link">Recommended Flights</a>
                  <a href="#" className="footer-link">Selected Hotels</a>
                </div>
                <button className="save-btn">VIEW FULL PLAN</button>
              </footer>
            </div>
          )}

          {!showResults && !isGenerating && (
            <div className="placeholder-content">
              {/* Optional: Add a subtle graphic or hint here */}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
