import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="lp-page">
      {/* ── LEFT: full-bleed editorial image ── */}
      <div className="lp-visual">
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1800&q=90"
          alt="Aerial mountain landscape"
          className="lp-visual-img"
        />
        <div className="lp-visual-overlay" />
        <div className="lp-visual-content">
          {/* Brand mark */}
          <div className="lp-brand" onClick={() => navigate('/')}>
            <span className="lp-brand-mark">✦</span>
            <span className="lp-brand-name">Compass & Co.</span>
          </div>

          {/* Pull quote */}
          <div className="lp-quote-wrap">
            <div className="lp-quote-line" />
            <blockquote className="lp-quote">
              "Every great journey begins<br />with a single departure."
            </blockquote>
            <div className="lp-quote-attr">— The Compass Creed</div>
          </div>

          {/* Bottom stats */}
          <div className="lp-stats">
            <div className="lp-stat">
              <span className="lp-stat-num">500+</span>
              <span className="lp-stat-lbl">Destinations</span>
            </div>
            <div className="lp-stat-div" />
            <div className="lp-stat">
              <span className="lp-stat-num">80+</span>
              <span className="lp-stat-lbl">Airlines</span>
            </div>
            <div className="lp-stat-div" />
            <div className="lp-stat">
              <span className="lp-stat-num">4.9★</span>
              <span className="lp-stat-lbl">Rated</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: form panel ── */}
      <div className="lp-form-panel">
        <div className="lp-form-inner">
          {/* Back link */}
          <button className="lp-back" onClick={() => navigate(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </button>

          <div className="lp-eyebrow">{isLogin ? 'WELCOME BACK' : 'NEW MEMBER'}</div>
          <h1 className="lp-title">
            {isLogin ? 'Sign in to your\naccount.' : 'Create your\naccount.'}
          </h1>
          <p className="lp-subtitle">
            {isLogin
              ? 'Enter your details to continue your journey with us.'
              : 'Join Compass & Co. and start planning bespoke travel experiences.'}
          </p>

          {/* Google */}
          <button className="lp-google-btn" type="button">
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59a14.2 14.2 0 0 1-.75-4.59c0-1.58.27-3.12.75-4.59L2.56 13.22A23.94 23.94 0 0 0 0 24c0 3.77.9 7.34 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          <div className="lp-divider"><span>or</span></div>

          <form className="lp-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="lp-field">
                <label className="lp-label">FULL NAME</label>
                <input className="lp-input" type="text" placeholder="Your full name" autoComplete="name" />
              </div>
            )}

            <div className="lp-field">
              <label className="lp-label">EMAIL</label>
              <input className="lp-input" type="email" placeholder="name@example.com" autoComplete="email" required />
            </div>

            <div className="lp-field">
              <label className="lp-label">PASSWORD</label>
              <div className="lp-input-wrap">
                <input
                  className="lp-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                />
                <button type="button" className="lp-pw-toggle" onClick={() => setShowPw(v => !v)}>
                  {showPw ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="lp-form-options">
                <label className="lp-remember"><input type="checkbox" /> Remember me</label>
                <a href="#" className="lp-forgot">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="lp-submit">
              {isLogin ? 'Sign In' : 'Create Account'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>

          <p className="lp-toggle">
            {isLogin ? "Don't have an account? " : "Already a member? "}
            <button onClick={() => setIsLogin(v => !v)}>
              {isLogin ? 'Join now' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
