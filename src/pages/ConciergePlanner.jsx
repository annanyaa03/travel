
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
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [statusIdx, setStatusIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Form State
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState(1500);
  const [styles, setStyles] = useState([]);
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

  const getMockPlan = (dest, dur, bud, sty) => {
    return {
      title: `The Sublime Soul of ${dest || "your destination"}`,
      stats: { days: dur || "7", cost: `$${bud || "1500"}`, activities: "12", rating: "4.9" },
      overview: [
        { day: "D 01", title: "Arrival & Orientation", subtitle: "Settling into the rhythm of the city." },
        { day: "D 02", title: "Cultural Deep-Dive", subtitle: "Exploring ancient sites and local legends." },
        { day: "D 03", title: "Artisan Encounters", subtitle: "Meeting the masters of local craft." }
      ],
      days: [
        {
          id: 1,
          items: [
            { category: "Art", title: "Morning Gallery Walk", desc: "A curated walk through the city's finest independent galleries." },
            { category: "Food", title: "Traditional Luncheon", desc: "Savory local delicacies in a hidden courtyard setting." },
            { category: "Nightlife", title: "Jazz & Moonlight", desc: "A cozy evening of live music in an intimate venue." }
          ]
        }
      ]
    };
  };

  const generateWithAI = async () => {
    // If no key or demo mode, return rich mock data
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
      return new Promise(resolve => {
        setTimeout(() => {
          setPlan(getMockPlan(destination, duration, budget, styles));
          resolve();
        }, 2500);
      });
    }

    const prompt = `Create a travel itinerary for ${destination} for ${duration} days with a budget of $${budget}. 
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
      
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      
      const data = await res.json();
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) throw new Error("Invalid API response structure");
      
      const text = data.candidates[0].content.parts[0].text;
      const json = JSON.parse(text);
      setPlan(json);
    } catch (err) {
      console.error("AI Error:", err);
      // Fail gracefully to mock data but with an error title
      const mock = getMockPlan(destination, duration, budget, styles);
      mock.title = `A Dream of ${destination} (Off-key Edition)`;
      setPlan(mock);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setShowResults(false);
    setProgress(0);
    setStatusIdx(0);

    const heroPromise = fetchHeroImage(destination);
    const aiPromise = generateWithAI();

    const statusInterval = setInterval(() => {
      setStatusIdx(prev => (prev + 1) % STATUS_MESSAGES.length);
    }, 1500);

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

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    else handleGenerate();
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Render Logic
  if (showResults) {
    return (
      <div className="planner-results-page">
        <div className={`results-hero ${!heroImage ? 'no-image' : ''}`} style={heroImage ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImage})` } : {}}>
          <div className="container">
            <span className="cp-eyebrow animate-fade-in">✦ BESPOKE JOURNEY</span>
            <h1 className="cp-result-title typewriter-cursor">{typedTitle}</h1>
            
            <div className="stats-row animate-slide-up">
              <div className="stat-col"><span className="label">Days</span><span className="value">{plan.stats.days}</span></div>
              <div className="stat-col"><span className="label">Budget</span><span className="value gold">{plan.stats.cost}</span></div>
              <div className="stat-col"><span className="label">Activities</span><span className="value">{plan.stats.activities}</span></div>
              <div className="stat-col"><span className="label">Rating</span><span className="value">{plan.stats.rating} ★</span></div>
            </div>
          </div>
        </div>

        <div className="container results-content">
          <div className="tab-bar">
            {['Overview', 'Itinerary'].map(t => (
              <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </div>

          <div className="tab-content animate-fade-in">
            {activeTab === 'Overview' ? (
              <div className="overview-list">
                {plan.overview.map((d, i) => (
                  <div key={i} className="day-card" style={{animationDelay: `${i*0.1}s`}}>
                    <div className="day-tag">{d.day}</div>
                    <div className="day-info">
                      <h3>{d.title}</h3>
                      <p>{d.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="itinerary-view">
                {(plan.days?.[0]?.items || []).map((item, i) => (
                  <div key={i} className="activity-item">
                    <span className={`cat-tag ${CATEGORIES[item.category] || 'cat-general'}`}>{item.category}</span>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="results-actions">
            <button className="btn btn-primary" onClick={() => setShowResults(false)}>Create New Plan</button>
            <button className="btn btn-ghost" onClick={() => window.print()}>Export to PDF</button>
          </div>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="planner-loading-page">
        <div className="loader-content">
          <div className="pulse-loader">
            <div className="loader-ring"></div>
            <div className="loader-logo">C</div>
          </div>
          <h2 className="status-text">{STATUS_MESSAGES[statusIdx]}</h2>
          <div className="loader-progress-wrap">
            <div className="loader-progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="loading-sub">Forging your itinerary with artistic precision...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="story-planner-page">
      {/* HEADER SECTION */}
      <header className="story-header">
        <div className="header-left">
          <span className="story-badge">B — STEP-BY-STEP STORY</span>
        </div>
        <div className="step-nav">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className={`step-node ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
              {currentStep > step ? <HiOutlineCheckCircle /> : step}
            </div>
          ))}
        </div>
      </header>

      <main className="story-main">
        {/* LEFT PANEL: QUESTIONNAIRE */}
        <section className="story-panel-left">
          <div className="step-counter">STEP {currentStep} OF 4 — {
            currentStep === 1 ? 'DESTINATION' : 
            currentStep === 2 ? 'DURATION' : 
            currentStep === 3 ? 'BUDGET' : 'STYLE'
          }</div>
          
          <div className="step-content-wrap">
            <span className="step-bg-num">0{currentStep}</span>
            
            {currentStep === 1 && (
              <div className="step-body animate-fade-in">
                <h1 className="step-q">Where will your <br/>story begin?</h1>
                <div className="input-wrap-main">
                  <input 
                    type="text" 
                    className="story-input-large" 
                    placeholder="Enter City or Country"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    autoFocus
                  />
                  <div className="quick-suggestions">
                    {["Kyoto", "Tuscany", "Santorini", "Bali", "Paris"].map(city => (
                      <button key={city} className="city-pill" onClick={() => setDestination(city)}>{city}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-body animate-fade-in">
                <h1 className="step-q">How long will <br/>you explore?</h1>
                <div className="option-grid">
                  {[
                    { val: "3", label: "3 Days", desc: "Quick escape" },
                    { val: "5", label: "5 Days", desc: "Short break" },
                    { val: "7", label: "7 Days", desc: "Perfect week" },
                    { val: "10", label: "10 Days", desc: "Deep immersion" }
                  ].map(opt => (
                    <div 
                      key={opt.val} 
                      className={`option-card ${duration === opt.val ? 'selected' : ''}`}
                      onClick={() => setDuration(opt.val)}
                    >
                      <div className="card-top">
                        <span className="card-title">{opt.label}</span>
                        {duration === opt.val && <HiOutlineCheckCircle className="check-icon" />}
                      </div>
                      <span className="card-desc">{opt.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-body animate-fade-in">
                <h1 className="step-q">Envision your <br/>budget level.</h1>
                <div className="budget-slider-wrap">
                  <div className="budget-display">${budget}</div>
                  <input 
                    type="range" 
                    min="500" 
                    max="10000" 
                    step="500"
                    className="story-range" 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                  <div className="range-labels">
                    <span>Modest</span>
                    <span>Luxury</span>
                    <span>Ultra</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="step-body animate-fade-in">
                <h1 className="step-q">What defines your <br/>travel style?</h1>
                <div className="option-grid">
                  {[
                    { id: "Cultural", label: "Cultural Heritage", icon: <HiOutlineGlobeAlt /> },
                    { id: "Food", label: "Culinary & Food", icon: <HiOutlineHeart /> },
                    { id: "Nature", label: "Natural Wonders", icon: <HiOutlinePhotograph /> },
                    { id: "Wellness", label: "Wellness & Spa", icon: <HiOutlineCamera /> }
                  ].map(style => (
                    <div 
                      key={style.id} 
                      className={`option-card style-card ${styles.includes(style.id) ? 'selected' : ''}`}
                      onClick={() => toggleStyle(style.id)}
                    >
                      <div className="style-icon">{style.icon}</div>
                      <span className="card-title">{style.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="step-actions">
              {currentStep > 1 && (
                <button className="btn-story-back" onClick={prevStep}>← Back</button>
              )}
              <button 
                className="btn-story-continue" 
                onClick={nextStep}
                disabled={currentStep === 1 ? !destination : currentStep === 2 ? !duration : false}
              >
                {currentStep === 4 ? 'GENERATE JOURNEY →' : 'CONTINUE →'}
              </button>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: LIVE SUMMARY */}
        <section className="story-panel-right">
          <div className="summary-card">
            <h3 className="summary-title">YOUR TRIP SO FAR</h3>
            
            <div className="summary-list">
              <div className="summary-item">
                <span className="summary-label">DESTINATION</span>
                <span className={`summary-value ${!destination ? 'unset' : ''}`}>
                  {destination || '— not set yet'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">DURATION</span>
                <span className={`summary-value ${!duration ? 'unset' : ''}`}>
                  {duration ? `${duration} Days` : '— not set yet'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">BUDGET</span>
                <span className={`summary-value ${currentStep < 3 ? 'unset' : ''}`}>
                  {currentStep >= 3 ? `$${budget}` : '— not set yet'}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">STYLE</span>
                <span className={`summary-value ${styles.length === 0 ? 'unset' : ''}`}>
                  {styles.length > 0 ? styles.join(", ") : '— not set yet'}
                </span>
              </div>
            </div>

            <div className="progress-footer">
              <span className="progress-label">PROGRESS</span>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
