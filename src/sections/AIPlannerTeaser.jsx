import { useState, useEffect, useRef } from 'react';
import { FaMagic, FaCalendarAlt, FaSuitcase, FaUtensils, FaLightbulb } from 'react-icons/fa';
import './AIPlannerTeaser.css';

export default function AIPlannerTeaser() {
  const [step, setStep] = useState(-1); // -1: not started, 0-3: days, 4: finished
  const [percent, setPercent] = useState(0);
  const [showExtras, setShowExtras] = useState(false);
  const cardRef = useRef(null);
  const timerRef = useRef(null);

  const startAnimation = () => {
    // Reset
    setStep(-1);
    setPercent(0);
    setShowExtras(false);
    if (timerRef.current) clearTimeout(timerRef.current);

    const sequence = [
      { p: 15, delay: 800 },  // Day 1
      { p: 35, delay: 1200 }, // Day 2
      { p: 60, delay: 1200 }, // Day 3
      { p: 85, delay: 1200 }, // Day 4
      { p: 100, delay: 800 }, // Finish
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

  const handleGenerate = (e) => {
    e.preventDefault();
    startAnimation();
  };

  return (
    <section className="ai-teaser">
      <div className="container teaser-grid">
        {/* Left: Input Area (Exact copy from before) */}
        <div className="teaser-content animate-slide-up">
          <div className="badge-ai"><FaMagic /> Powered by Gemini AI</div>
          <h2>Plan Your Perfect Trip <br /><span className="brand-gradient">in Seconds</span></h2>
          <p>Tell our AI where you want to go and it builds your complete itinerary, packing list, and travel tips instantly</p>
          
          <div className="feature-pills">
            <span className="pill"><FaCalendarAlt /> Day-by-day itinerary</span>
            <span className="pill"><FaSuitcase /> Smart packing list</span>
            <span className="pill"><FaUtensils /> Restaurant picks</span>
            <span className="pill"><FaLightbulb /> Local insider tips</span>
          </div>

          <form className="teaser-form glass-panel" onSubmit={handleGenerate}>
            <div className="input-group">
              <label>Where do you want to go?</label>
              <input type="text" placeholder="e.g. Kyoto, Japan" defaultValue="Kyoto, Japan" />
            </div>
            
            <div className="form-row">
              <div className="input-group">
                <label>Budget</label>
                <select defaultValue="Moderate">
                  <option>Moderate</option>
                  <option>Budget</option>
                  <option>Luxury</option>
                </select>
              </div>
              <div className="input-group">
                <label>Duration</label>
                <select defaultValue="7 Days">
                  <option>7 Days</option>
                  <option>3 Days</option>
                  <option>14 Days</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary generate-btn">Generate My Itinerary →</button>
          </form>

          <p className="powered-by">Powered by Google Gemini AI • 100% Free</p>
        </div>

        {/* Right: NEW AI Result Card */}
        <div className="teaser-mockup" ref={cardRef}>
          <div className="ai-result-card">
            {/* Header */}
            <div className="ai-card-header">
              <div className="ai-badge-wrap">
                <div className="ai-badge">AI</div>
                <div className="ai-badge-ping"></div>
              </div>
              <div className="ai-card-title-wrap">
                <div className="ai-card-title">Your 7-Day Kyoto Trip</div>
                <div className="ai-card-status">
                  <div className="ai-status-dot"></div>
                  {step < 4 ? 'Generating your perfect plan...' : '✨ Your plan is ready!'}
                </div>
              </div>
              <div className="ai-card-percent">{percent}%</div>
            </div>

            {/* Progress Bar */}
            <div className="ai-progress-track">
              <div className="ai-progress-fill" style={{ width: `${percent}%` }}></div>
            </div>

            {/* Day Cards */}
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

              {/* Writing indicator */}
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

            {/* Stats Row */}
            <div className={`ai-stats ${showExtras ? 'visible' : ''}`}>
              <div className="ai-stat">
                <div className="ai-stat-num">7</div>
                <div className="ai-stat-label">Days</div>
              </div>
              <div className="ai-stat-div"></div>
              <div className="ai-stat">
                <div className="ai-stat-num green">$1.2K</div>
                <div className="ai-stat-label">Est. Cost</div>
              </div>
              <div className="ai-stat-div"></div>
              <div className="ai-stat">
                <div className="ai-stat-num">14</div>
                <div className="ai-stat-label">Activities</div>
              </div>
              <div className="ai-stat-div"></div>
              <div className="ai-stat">
                <div className="ai-stat-num">4.9⭐</div>
                <div className="ai-stat-label">Rating</div>
              </div>
            </div>

            {/* Tags */}
            <div className={`ai-tags ${showExtras ? 'visible' : ''}`}>
              <span className="ai-tag active">✈️ Flight tips</span>
              <span className="ai-tag active">🏨 Hotel picks</span>
              <span className="ai-tag">🗺️ Day plans</span>
              <span className="ai-tag">🎒 Packing list</span>
            </div>

            {/* Action Buttons */}
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
