import { useState, useEffect, useRef, useMemo } from 'react';
import './AIPlannerTeaser.css';

export default function AIPlannerTeaser() {
  // RIGHT SIDE STATE (Preserved)
  const [step, setStep] = useState(-1);
  const [percent, setPercent] = useState(0);
  const [showExtras, setShowExtras] = useState(false);
  const cardRef = useRef(null);
  const timerRef = useRef(null);

  // LEFT SIDE STATE (New Design)
  const [dest, setDest] = useState({ name: 'Where do you want to go?', flag: '🌍', sub: 'Tap a destination below', active: false });
  const [duration, setDuration] = useState('7d');
  const [budget, setBudget] = useState(1500);
  const [styles, setStyles] = useState(['Cultural', 'Food']);
  const [isGen, setIsGen] = useState(false);
  const [genPercent, setGenPercent] = useState(0);

  // Memoize estimated cost to prevent flickering
  const estimatedCost = useMemo(() => {
    const costs = [500, 650, 750, 900, 1100, 1200, 1500];
    return costs[Math.floor(Math.random() * costs.length)];
  }, [dest, duration, budget, styles]);

  const startAnimation = () => {
    setStep(-1);
    setPercent(0);
    setShowExtras(false);
    if (timerRef.current) clearTimeout(timerRef.current);

    const sequence = [
      { p: 15, delay: 800 },
      { p: 35, delay: 1200 },
      { p: 60, delay: 1200 },
      { p: 85, delay: 1200 },
      { p: 100, delay: 800 },
    ];

    let current = 0;
    const run = () => {
      if (current < sequence.length) {
        setStep(current);
        setPercent(sequence[current].p);
        const delay = sequence[current].delay;
        current++;
        if (current === sequence.length) {
          timerRef.current = setTimeout(() => {
            setShowExtras(true);
            setStep(4);
          }, delay);
        } else {
          timerRef.current = setTimeout(run, delay);
        }
      }
    };
    timerRef.current = setTimeout(run, 500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startAnimation();
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // HANDLERS
  const plSetDest = (name, flag, sub) => {
    setDest({ name, flag, sub, active: true });
  };

  const plSelDur = (d) => {
    setDuration(d);
  };

  const plTogStyle = (style) => {
    setStyles(prev => prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]);
  };

  const plUpdateBud = (v) => {
    setBudget(parseInt(v));
  };

  const plStartGen = () => {
    if (isGen) return;
    setIsGen(true);
    setGenPercent(0);
    
    startAnimation();

    let p = 0;
    const iv = setInterval(() => {
      p += 10;
      setGenPercent(p);
      if (p >= 100) {
        clearInterval(iv);
        setIsGen(false);
      }
    }, 280);
  };

  return (
    <section className="ai-teaser" style={{ paddingTop: '100px', background: 'var(--bg-dark)' }}>
      <div className="container teaser-grid">
        
        {/* Left: Input Selection Area */}
        <div className="planner-left animate-slide-up">
          <div className="pl-header">
            <div className="pl-header-left">
              <div className="pl-eyebrow">COMPASS & CO. AI</div>
              <div className="pl-title-row">
                <div className="pl-title">Trip Planner</div>
                <div className="pl-ai-badge">
                  AI
                  <div className="pl-ai-ping"></div>
                </div>
              </div>
              <div className="pl-subtitle">Powered by Gemini AI</div>
            </div>
            <div className="pl-online">
              <div className="pl-online-dot"></div>
              ONLINE
            </div>
          </div>

          <div className={`pl-sec ${dest.active ? 'active' : ''}`} id="pl-dest-sec">
            <div className="pl-slbl">DESTINATION</div>
            <div className="pl-dest-row">
              <div className="pl-dest-flag" id="pl-dest-flag">{dest.flag}</div>
              <div className="pl-dest-text">
                <div className={`pl-dest-name ${dest.active ? 'filled' : ''}`} id="pl-dest-name">
                  {dest.name}
                </div>
                <div className="pl-dest-sub" id="pl-dest-sub">
                  {dest.sub}
                </div>
              </div>
              <div className="pl-dest-arrow">›</div>
            </div>
            <div className="pl-trending">
              <span className="pl-trend-label">🔥</span>
              {[
                { n: 'Kyoto, Japan', f: '🇯🇵', s: 'Cultural Capital' },
                { n: 'Maldives', f: '🇲🇻', s: 'Island Paradise' },
                { n: 'Santorini, Greece', f: '🇬🇷', s: 'Luxury Escape' },
                { n: 'Bali, Indonesia', f: '🇮🇩', s: 'Tropical Bliss' },
                { n: 'Patagonia', f: '🇦🇷', s: 'Wild Adventure' }
              ].map(t => (
                <span key={t.n} className="pl-trend-pill" onClick={() => plSetDest(t.n, t.f, t.s)}>
                  {t.f} {t.n.split(',')[0]}
                </span>
              ))}
            </div>
          </div>

          <div className="pl-two-col">
            <div className="pl-sec">
              <div className="pl-slbl">DURATION</div>
              <div className="pl-dur-row" id="pl-dur">
                {['3d', '5d', '7d', '10d', '14d'].map(d => (
                  <div 
                    key={d} 
                    className={`pl-dur-btn ${duration === d ? 'pl-dur-active' : ''}`} 
                    onClick={() => plSelDur(d)}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>
            <div className="pl-sec">
              <div className="pl-bud-header">
                <div className="pl-slbl" style={{ marginBottom: 0 }}>BUDGET</div>
                <div className="pl-bud-val" id="pl-bud-val">${budget.toLocaleString()}</div>
              </div>
              <input 
                type="range" 
                min="300" 
                max="5000" 
                value={budget} 
                step="100"
                className="pl-slider"
                id="pl-bud-slider"
                onChange={(e) => plUpdateBud(e.target.value)}
              />
              <div className="pl-bud-range">
                <span>$300</span>
                <span>$5K+</span>
              </div>
            </div>
          </div>

          <div className="pl-sec">
            <div className="pl-slbl">TRAVEL STYLE — select all that apply</div>
            <div className="pl-style-grid" id="pl-style">
              {[
                { l: '🏛 Cultural', v: 'Cultural' },
                { l: '🍽 Food', v: 'Food' },
                { l: '🏄 Beach', v: 'Beach' },
                { l: '🛎 Luxury', v: 'Luxury' },
                { l: '🧘 Wellness', v: 'Wellness' },
                { l: '🪂 Adventure', v: 'Adventure' },
                { l: '🎷 Nightlife', v: 'Nightlife' },
                { l: '🎫 Budget', v: 'Budget' }
              ].map(s => (
                <span 
                  key={s.v}
                  className={`pl-style-pill ${styles.includes(s.v) ? 'pl-style-on' : 'pl-style-off'}`}
                  onClick={() => plTogStyle(s.v)}
                >
                  {s.l}
                </span>
              ))}
            </div>
          </div>

          <div className="pl-cost-bar">
            <div>
              <div className="pl-cost-label">Estimated cost per person</div>
              <div className="pl-cost-sub">Based on your selections</div>
            </div>
            <div className="pl-cost-val" id="pl-cost-val">~${estimatedCost.toLocaleString()}</div>
          </div>

          <button className="pl-gen-btn" id="pl-gen-btn" onClick={plStartGen}>
            <span id="pl-gen-icon">{isGen ? '⏳' : (genPercent === 100 ? '✅' : '✨')}</span>
            <span id="pl-gen-txt">{isGen ? 'Generating your plan...' : (genPercent === 100 ? 'Your Plan is Ready!' : 'Generate My Trip')}</span>
            <span className="pl-gen-badge" id="pl-gen-badge">{isGen ? `${genPercent}%` : (genPercent === 100 ? 'View →' : '~10 sec')}</span>
          </button>
          <div className="pl-footer-note">
            Gemini AI • Always Free • Instant • No signup needed
          </div>
        </div>

        {/* Right: AI Result Card (Preserved) */}
        <div className="teaser-mockup" ref={cardRef}>
          <div className="ai-result-card">
            <div className="ai-card-header">
              <div className="ai-badge-wrap">
                <div className="ai-badge">AI</div>
                <div className="ai-badge-ping"></div>
              </div>
              <div className="ai-card-title-wrap">
                <div className="ai-card-title">Your {duration.replace('d', '-Day')} {dest.active ? dest.name.split(',')[0] : 'Kyoto'} Trip</div>
                <div className="ai-card-status">
                  <div className="ai-status-dot"></div>
                  {step < 4 ? 'Generating your perfect plan...' : '✨ Your plan is ready!'}
                </div>
              </div>
              <div className="ai-card-percent">{percent}%</div>
            </div>
            <div className="ai-progress-track">
              <div className="ai-progress-fill" style={{ width: `${percent}%` }}></div>
            </div>
            <div className="ai-days">
              <div className={`ai-day-item ${step >= 0 ? 'visible' : ''}`}>
                <div className="ai-day-icon">📅</div>
                <div className="ai-day-content">
                  <div className="ai-day-title">Day 1 — Arrival & Gion District</div>
                  <div className="ai-day-desc">Explore historic geisha district, dinner at Nishiki Market</div>
                </div>
                <div className="ai-day-check">✓</div>
              </div>
              <div className={`ai-day-item ${step >= 1 ? 'visible' : ''}`}>
                <div className="ai-day-icon">🏯</div>
                <div className="ai-day-content">
                  <div className="ai-day-title">Day 2 — Temples & Gardens</div>
                  <div className="ai-day-desc">Kinkaku-ji, Ryoan-ji rock garden, Arashiyama bamboo grove</div>
                </div>
                <div className="ai-day-check">✓</div>
              </div>
              <div className={`ai-day-item ${step >= 2 ? 'visible' : ''}`}>
                <div className="ai-day-icon">🌸</div>
                <div className="ai-day-content">
                  <div className="ai-day-title">Day 3 — Fushimi Inari Sunrise</div>
                  <div className="ai-day-desc">5am sunrise hike, afternoon traditional tea ceremony</div>
                </div>
                <div className="ai-day-check">✓</div>
              </div>
              <div className={`ai-day-item ${step >= 3 ? 'visible' : ''}`}>
                <div className="ai-day-icon">🎎</div>
                <div className="ai-day-content">
                  <div className="ai-day-title">Day 4 — Nishijin & Kimono</div>
                  <div className="ai-day-desc">Kimono rental, Nishijin textile district, sake tasting evening</div>
                </div>
                <div className="ai-day-check">✓</div>
              </div>
              {step < 4 && (
                <div className="ai-writing">
                  <div className="ai-writing-dots">
                    <div className="ai-dot"></div>
                    <div className="ai-dot"></div>
                    <div className="ai-dot"></div>
                  </div>
                  <span className="ai-writing-text">
                    {step === -1 ? 'Initialising AI...' : `Writing Day ${step + 2}...`}
                  </span>
                </div>
              )}
            </div>
            <div className={`ai-stats ${showExtras ? 'visible' : ''}`}>
              <div className="ai-stat">
                <div className="ai-stat-num">{duration.replace('d', '')}</div>
                <div className="ai-stat-label">Days</div>
              </div>
              <div className="ai-stat-div"></div>
              <div className="ai-stat">
                <div className="ai-stat-num green">${Math.round(budget/1000 * 1.2).toFixed(1)}K</div>
                <div className="ai-stat-label">Est. Cost</div>
              </div>
              <div className="ai-stat-div"></div>
              <div className="ai-stat">
                <div className="ai-stat-num">{parseInt(duration) * 2}</div>
                <div className="ai-stat-label">Activities</div>
              </div>
              <div className="ai-stat-div"></div>
              <div className="ai-stat">
                <div className="ai-stat-num">4.9⭐</div>
                <div className="ai-stat-label">Rating</div>
              </div>
            </div>
            <div className={`ai-tags ${showExtras ? 'visible' : ''}`}>
              <span className="ai-tag active">✈️ Flight tips</span>
              <span className="ai-tag active">🏨 Hotel picks</span>
              <span className="ai-tag">🗺️ Day plans</span>
              <span className="ai-tag">🎒 Packing list</span>
            </div>
            <div className={`ai-actions ${showExtras ? 'visible' : ''}`}>
              <button className="ai-save-btn">💾 Save Full Plan</button>
              <button className="ai-share-btn">📤 Share</button>
              <button className="ai-pdf-btn">📄 PDF</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
