import { useState, useEffect, useRef } from 'react';
import { 
  HiOutlineArrowRight, 
  HiOutlineGlobeAlt, 
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineCamera,
  HiOutlineHeart,
  HiOutlineMap,
  HiOutlinePhotograph
} from 'react-icons/hi';
import './ConciergePlanner.css';

// API Configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const STATUS_MESSAGES = [
  "Consulting the archives of global transit...",
  "Matching the itinerary to your aesthetic...",
  "Curating a narrative of local wonder...",
  "Calculating the geometry of your route...",
  "Finalising your bespoke editorial plan..."
];

const DEFAULT_PLAN = {
  title: "Awaiting Your Destination",
  stats: { days: "0", cost: "$0", activities: "0", rating: "0" },
  overview: [],
  days: [{ id: 1, items: [] }]
};

const CATEGORIES = {
  Food: 'cat-food',
  Art: 'cat-art',
  Nightlife: 'cat-nightlife',
  Fashion: 'cat-fashion',
  Nature: 'cat-nature',
  Wellness: 'cat-wellness'
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
  const [plan, setPlan] = useState(DEFAULT_PLAN);
  const [heroImage, setHeroImage] = useState("");

  const { displayedText: typedTitle, complete: titleDone } = useTypewriter(plan.title, 45, showResults);

  const fetchHeroImage = async (query) => {
    if (!UNSPLASH_ACCESS_KEY) return;
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=1&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`);
      const data = await res.json();
      if (data.results?.[0]) {
        setHeroImage(data.results[0].urls.regular);
      }
    } catch (err) {
      console.error("Unsplash error:", err);
    }
  };

  const generateWithAI = async () => {
    if (!GEMINI_API_KEY) {
      // Mock result if no API key
      return new Promise(resolve => {
        setTimeout(() => {
          setPlan({ ...DEFAULT_PLAN, title: `A Bespoke Journey to ${destination}` });
          resolve();
        }, 3000);
      });
    }

    const prompt = `Create a travel itinerary for ${destination} for ${duration} with a budget of $${budget}. 
    Focus on these styles: ${styles.join(", ")}. 
    Return ONLY a JSON object in this exact format:
    {
      "title": "String",
      "stats": { "days": "String", "cost": "String", "activities": "String", "rating": "String" },
      "overview": [ { "day": "D 01", "title": "String", "subtitle": "String" } ],
      "days": [ { "id": 1, "items": [ { "category": "Food|Art|Nightlife|Fashion|Nature|Wellness", "title": "String", "desc": "String" } ] } ]
    }`;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { response_mime_type: "application/json" }
        })
      });
      const data = await res.json();
      const text = data.candidates[0].content.parts[0].text;
      const json = JSON.parse(text);
      setPlan(json);
    } catch (err) {
      console.error("AI Error:", err);
      // Fallback
      setPlan({ ...DEFAULT_PLAN, title: "Error generating plan. Please try again." });
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setShowResults(false);
    setProgress(0);
    setStatusIdx(0);

    // Start fetching image & AI content in parallel
    const heroPromise = fetchHeroImage(destination);
    const aiPromise = generateWithAI();

    // Status Cycling
    const statusInterval = setInterval(() => {
      setStatusIdx(prev => (prev + 1) % STATUS_MESSAGES.length);
    }, 1500);

    // Progress Bar (Simulated but tied to the promises)
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += 5;
      if (currentProgress >= 95) {
        clearInterval(progressInterval);
      }
      setProgress(currentProgress);
    }, 200);

    await Promise.all([heroPromise, aiPromise]);

    clearInterval(statusInterval);
    clearInterval(progressInterval);
    setProgress(100);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 500);
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
          <div className="results-header" style={heroImage ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
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
                  <span className="value">{plan.stats.days}</span>
                </div>
                <div className="stat-col">
                  <span className="label">ESTIMATED COST</span>
                  <span className="value gold cp-cost-val">{plan.stats.cost}</span>
                </div>
                <div className="stat-col">
                  <span className="label">Activities</span>
                  <span className="value">{plan.stats.activities}</span>
                </div>
                <div className="stat-col">
                  <span className="label">Rating</span>
                  <span className="value">{plan.stats.rating} \u2605</span>
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
                  {plan.overview.map((d, idx) => (
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
                    {Array.from({length: parseInt(plan.stats.days) || 1}, (_, i) => (
                      <button key={i} className={`subtab-btn ${i === 0 ? 'active' : ''}`}>
                        Day {i + 1}
                      </button>
                    ))}
                  </div>
                  <div className="activity-list">
                    {(plan.days?.[0]?.items || []).map((item, idx) => (
                      <div key={idx} className="activity-item animate-slide-up" style={{ animationDelay: `${0.2 + (idx * 0.1)}s` }}>
                        <span className={`cat-tag ${CATEGORIES[item.category] || 'cat-general'}`}>{item.category}</span>
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
