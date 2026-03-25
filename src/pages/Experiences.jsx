import React, { useState, useRef, useEffect } from 'react';
import './Experiences.css';

const EXPERIENCES_DATA = [
  {
    id: 'e1',
    title: 'Private Serengeti Safari',
    category: 'Adventure',
    location: 'Tanzania',
    duration: '7 Days',
    price: '$12,500',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=90',
    desc: 'Witness the Great Migration from an exclusive, undiscovered luxury camp.',
    tip: 'Best migration views in August.',
    meters: { adventure: 90, exclusivity: 80, relaxation: 20 }
  },
  {
    id: 'e2',
    title: 'Tuscan Culinary Masterclass',
    category: 'Culinary',
    location: 'Florence',
    duration: '4 Days',
    price: '$4,200',
    img: 'https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?w=1200&q=90',
    desc: 'Truffle hunting, private wine tastings, and cooking with Michelin-starred chefs.',
    tip: 'Private truffle hunting included.',
    meters: { adventure: 20, exclusivity: 70, relaxation: 60 }
  },
  {
    id: 'e3',
    title: 'Antarctic Ice Cave Expedition',
    category: 'Adventure',
    location: 'Antarctica',
    duration: '10 Days',
    price: '$28,000',
    img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=90',
    desc: 'Explore untouched ice formations with seasoned polar explorers.',
    tip: 'Helicopter access to remote glaciers.',
    meters: { adventure: 100, exclusivity: 95, relaxation: 10 }
  },
  {
    id: 'e4',
    title: 'Kyoto Zen Retreat',
    category: 'Wellness',
    location: 'Kyoto',
    duration: '5 Days',
    price: '$6,800',
    img: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200&q=90',
    desc: 'Private tea ceremonies, exclusive temple access, and ryokan wellness immersion.',
    tip: 'Exclusive after-hours temple access.',
    meters: { adventure: 10, exclusivity: 85, relaxation: 100 }
  },
  {
    id: 'e5',
    title: 'Maldive Yacht Charter',
    category: 'Relaxation',
    location: 'Maldives',
    duration: '8 Days',
    price: '$18,500',
    img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=90',
    desc: 'Sail the Indian Ocean in absolute privacy on a 120ft luxury gulet.',
    tip: 'Comes with a private onboard chef.',
    meters: { adventure: 30, exclusivity: 90, relaxation: 100 }
  },
  {
    id: 'e6',
    title: 'Patagonian Glamping',
    category: 'Adventure',
    location: 'Patagonia',
    duration: '6 Days',
    price: '$9,200',
    img: 'https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?w=1200&q=90',
    desc: 'Luxury eco-domes nestled beneath the towering peaks of Torres del Paine.',
    tip: 'Stargazing from your private dome.',
    meters: { adventure: 80, exclusivity: 60, relaxation: 70 }
  }
];

const Icons = {
  Mountain: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>,
  Wine: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z"/></svg>,
  Lotus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c-2.4-.4-4.5-1.7-6-3.5C4 16.5 3 14.5 3 12c0-2.5 1-4.5 3-6.5C7.5 3.7 9.6 2.4 12 2c2.4.4 4.5 1.7 6 3.5 1.5 1.8 2.5 3.8 2.5 6.5 0 2.5-1 4.5-2.5 6.5-1.5 1.8-3.6 3.1-6 3.5Z"/><path d="M12 22v-9"/><path d="M12 13C8 13 5 10 5 6"/><path d="M12 13c4 0 7-3 7-7"/></svg>,
  Sun: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
  Compass: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  Map: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>,
  Utensils: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>,
  Waves: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6 0 1.2-.2 1.8-.6L5.4 4A6 6 0 0 1 12 4l1.6 1.4A6 6 0 0 0 22 6"/><path d="M2 12c.6 0 1.2-.2 1.8-.6L5.4 10A6 6 0 0 1 12 10l1.6 1.4A6 6 0 0 0 22 12"/><path d="M2 18c.6 0 1.2-.2 1.8-.6L5.4 16A6 6 0 0 1 12 16l1.6 1.4A6 6 0 0 0 22 18"/></svg>
};

const FILTERS = ['All', 'Adventure', 'Culinary', 'Wellness', 'Relaxation'];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    text: "What is your ideal pace?",
    options: [
      { id: '1a', text: "Non-stop discovery", tag: "Adventure", icon: <Icons.Mountain /> },
      { id: '1b', text: "Slow and savory", tag: "Culinary", icon: <Icons.Wine /> },
      { id: '1c', text: "Peaceful reflection", tag: "Wellness", icon: <Icons.Lotus /> },
      { id: '1d', text: "Complete unwinding", tag: "Relaxation", icon: <Icons.Sun /> }
    ]
  },
  {
    id: 2,
    text: "Which environment calls to you?",
    options: [
      { id: '2a', text: "Rugged wilderness", tag: "Adventure", icon: <Icons.Map /> },
      { id: '2b', text: "Historic city streets", tag: "Culinary", icon: <Icons.Utensils /> },
      { id: '2c', text: "Serene nature", tag: "Wellness", icon: <Icons.Lotus /> },
      { id: '2d', text: "Private beaches", tag: "Relaxation", icon: <Icons.Waves /> }
    ]
  },
  {
    id: 3,
    text: "What makes a trip truly memorable?",
    options: [
      { id: '3a', text: "Pushing physical limits", tag: "Adventure", icon: <Icons.Mountain /> },
      { id: '3b', text: "Authentic local flavors", tag: "Culinary", icon: <Icons.Wine /> },
      { id: '3c', text: "Inner peace & balance", tag: "Wellness", icon: <Icons.Lotus /> },
      { id: '3d', text: "Ultimate comfort", tag: "Relaxation", icon: <Icons.Sun /> }
    ]
  },
  {
    id: 4,
    text: "Select your perfect afternoon:",
    options: [
      { id: '4a', text: "Hiking a remote trail", tag: "Adventure", icon: <Icons.Compass /> },
      { id: '4b', text: "Wine tasting session", tag: "Culinary", icon: <Icons.Wine /> },
      { id: '4c', text: "Guided meditation", tag: "Wellness", icon: <Icons.Lotus /> },
      { id: '4d', text: "Lounging on a yacht", tag: "Relaxation", icon: <Icons.Waves /> }
    ]
  }
];

export default function Experiences() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0); // 0-3 for questions, 4 for results
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const stripRef = useRef(null);
  const gridRef = useRef(null);

  const filtered = activeFilter === 'All'
    ? EXPERIENCES_DATA
    : EXPERIENCES_DATA.filter(e => e.category === activeFilter);

  const handleScrollToQuiz = () => {
    setQuizOpen(true);
    if (stripRef.current) {
      const yOffset = -80; // offset for fixed navbar
      const y = stripRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleScrollToGrid = () => {
    if (gridRef.current) {
      const yOffset = -80;
      const y = gridRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSelectOption = (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const calculateResults = () => {
    const counts = { Adventure: 0, Culinary: 0, Wellness: 0, Relaxation: 0 };
    Object.values(answers).forEach(opt => counts[opt.tag]++);
    let topTag = 'Adventure';
    let max = 0;
    for (const [tag, count] of Object.entries(counts)) {
      if (count > max) {
        max = count;
        topTag = tag;
      }
    }
    const matches = EXPERIENCES_DATA.filter(e => e.category === topTag).slice(0, 3);
    // Fill up to 3 if less than 3
    if (matches.length < 3) {
      const rest = EXPERIENCES_DATA.filter(e => e.category !== topTag);
      matches.push(...rest.slice(0, 3 - matches.length));
    }
    
    let persona = "Explorer";
    if (topTag === "Culinary") persona = "Connoisseur";
    if (topTag === "Wellness") persona = "Seeker";
    if (topTag === "Relaxation") persona = "Escapist";

    setQuizResult({ matches, persona, tag: topTag });
    setQuizStep(4);
  };

  const handleNextStep = () => {
    if (quizStep < 3) setQuizStep(s => s + 1);
    else calculateResults();
  };

  const handlePrevStep = () => {
    if (quizStep > 0) setQuizStep(s => s - 1);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setAnswers({});
    setQuizResult(null);
  };

  return (
    <div className="exp-page-redesign">
      
      {/* HERO SECTION */}
      <section className="exp-hero">
        <div className="exp-hero-bg" />
        <div className="exp-hero-overlay" />
        <div className="exp-hero-content">
          <div className="exp-eyebrow">
            <span className="exp-eyebrow-line"></span>
            CURATED EXCLUSIVELY FOR YOU
            <span className="exp-eyebrow-line"></span>
          </div>
          <h1 className="exp-title">
            <div className="exp-title-l1">Extraordinary</div>
            <div className="exp-title-l2">Journeys</div>
          </h1>
          <p className="exp-subtitle">
            Beyond destinations. We craft moments that define a lifetime, blending unparalleled luxury with profound authenticity.
          </p>
          <div className="exp-hero-btns">
            <button className="exp-btn-gold" onClick={handleScrollToQuiz}>Find My Journey →</button>
            <button className="exp-btn-ghost" onClick={handleScrollToGrid}>Browse All</button>
          </div>
        </div>
        <div className="exp-scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <div className="exp-scroll-line-container">
            <div className="exp-scroll-line-fill"></div>
          </div>
        </div>
      </section>

      {/* QUIZ STRIP */}
      <section 
        className={`exp-quiz-strip ${quizOpen ? 'open' : ''}`} 
        ref={stripRef}
      >
        <div className="exp-quiz-strip-inner">
          <button className="exp-quiz-close" onClick={() => setQuizOpen(false)}>×</button>

          {!quizOpen ? (
            <div className="exp-quiz-collapsed">
              <div className="exp-quiz-col-left">
                <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="17.5" fill="#1A1A14" />
                  <circle cx="18" cy="18" r="14" stroke="rgba(201, 151, 42, 0.4)" strokeWidth="0.5"/>
                  <path d="M18,29.5 L16.9,19.2 L18,18.6 L19.1,19.2 Z" fill="#C9972A" />
                  <path d="M18,6.5 L19.1,16.8 L18,17.4 L16.9,16.8 Z" fill="#FFFFFF"/>
                  <circle cx="18" cy="18" r="1.8" fill="#FFFFFF"/>
                  <circle cx="18" cy="18" r="0.8" fill="#C9972A"/>
                </svg>
                <div className="exp-quiz-col-texts">
                  <span className="exp-quiz-prompt">Not sure where to start?</span>
                  <span className="exp-quiz-subprompt">Take our 4-question Journey Match</span>
                </div>
              </div>
              <button className="exp-quiz-open-btn" onClick={() => setQuizOpen(true)}>Find My Match →</button>
            </div>
          ) : (
            <div className="exp-quiz-expanded">
              <div className="exp-quiz-eyebrow">JOURNEY MATCH</div>
              
              {quizStep < 4 ? (
                <>
                  <div className="exp-quiz-progress">
                    {[0,1,2,3].map(step => (
                      <React.Fragment key={step}>
                        <div className={`exp-quiz-dot ${quizStep === step ? 'active' : quizStep > step ? 'done' : ''}`}>
                          {quizStep === step ? step + 1 : ''}
                        </div>
                        {step < 3 && <div className={`exp-quiz-line ${quizStep > step ? 'done' : ''}`}></div>}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="exp-quiz-card">
                    <div className="exp-quiz-q-num">QUESTION 0{quizStep + 1}</div>
                    <h3 className="exp-quiz-q-text">{QUIZ_QUESTIONS[quizStep].text}</h3>
                    
                    <div className="exp-quiz-options">
                      {QUIZ_QUESTIONS[quizStep].options.map(opt => {
                        const isSelected = answers[QUIZ_QUESTIONS[quizStep].id]?.id === opt.id;
                        return (
                          <button 
                            key={opt.id} 
                            className={`exp-quiz-opt-btn ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSelectOption(QUIZ_QUESTIONS[quizStep].id, opt)}
                          >
                            <span className="exp-quiz-opt-icon">{opt.icon}</span>
                            <span className="exp-quiz-opt-text">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="exp-quiz-card-footer">
                      {quizStep > 0 ? (
                        <button className="exp-quiz-back" onClick={handlePrevStep}>← Back</button>
                      ) : <div></div>}
                      <button 
                        className="exp-quiz-continue" 
                        disabled={!answers[QUIZ_QUESTIONS[quizStep].id]}
                        onClick={handleNextStep}
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="exp-quiz-results">
                  <h3 className="exp-quiz-res-title">The {quizResult.persona}</h3>
                  <p className="exp-quiz-res-sub">Based on your answers, here are your top matches.</p>
                  <div className="exp-quiz-matches">
                    {quizResult.matches.map((m, i) => (
                      <div key={m.id} className="exp-match-card">
                        <img src={m.img} alt={m.title} />
                        <div className="exp-match-tag">{100 - (i * 10)}% MATCH</div>
                        <div className="exp-match-info">
                          <div className="exp-match-meta">{m.location} • {m.duration}</div>
                          <h4>{m.title}</h4>
                          <div className="exp-match-price">{m.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="exp-quiz-retake" onClick={resetQuiz}>Retake Quiz</button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="exp-grid-section" ref={gridRef}>
        <div className="exp-grid-header">
          <div className="exp-grid-header-left">
            <div className="exp-grid-eyebrow">OUR EXPERIENCES</div>
            <h2 className="exp-grid-title">Journeys that <em>define</em> you</h2>
          </div>
          <a href="#" className="exp-grid-view-all">View all →</a>
        </div>

        <div className="exp-filters">
          {FILTERS.map(f => (
            <button 
              key={f} 
              className={`exp-filter-tab ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="exp-grid-container">
          {filtered.map(exp => (
            <div key={exp.id} className="exp-card">
              <div className="exp-card-img-wrap">
                <img src={exp.img} alt={exp.title} className="exp-card-img" />
                <div className="exp-card-tag">{exp.category}</div>
                <div className="exp-card-overlay-tip">
                  <span className="exp-tip-label">INSIDER TIP</span>
                  <span className="exp-tip-text">"{exp.tip}"</span>
                </div>
              </div>
              <div className="exp-card-body">
                <div className="exp-card-loc">
                  {exp.location} <span className="exp-dot"></span> {exp.duration}
                </div>
                <h3 className="exp-card-heading">{exp.title}</h3>
                <p className="exp-card-desc">{exp.desc}</p>
                
                <div className="exp-meters">
                  <div className="exp-meter-row">
                    <span className="exp-meter-label">Adventure</span>
                    <div className="exp-meter-track"><div className="exp-meter-fill bg-gold" style={{ width: `${exp.meters.adventure}%` }}></div></div>
                  </div>
                  <div className="exp-meter-row">
                    <span className="exp-meter-label">Exclusivity</span>
                    <div className="exp-meter-track"><div className="exp-meter-fill bg-dark" style={{ width: `${exp.meters.exclusivity}%` }}></div></div>
                  </div>
                  <div className="exp-meter-row">
                    <span className="exp-meter-label">Relaxation</span>
                    <div className="exp-meter-track"><div className="exp-meter-fill bg-teal" style={{ width: `${exp.meters.relaxation}%` }}></div></div>
                  </div>
                </div>
              </div>
              <div className="exp-card-footer">
                <span className="exp-card-price">{exp.price}</span>
                <button className="exp-card-explore">Explore →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
