import { useState } from 'react';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPw, setShowPw] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="am-overlay" onClick={onClose}>
      <div className="am-panel" onClick={e => e.stopPropagation()}>

        {/* ── LEFT: editorial image panel ── */}
        <div className="am-visual">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80"
            alt="Travel"
            className="am-visual-img"
          />
          <div className="am-visual-overlay" />
          <div className="am-visual-content">
            <div className="am-visual-eyebrow">COMPASS &amp; CO.</div>
            <h2 className="am-visual-heading">
              The world,<br /><em>curated for you.</em>
            </h2>
            <p className="am-visual-sub">
              Bespoke journeys crafted by experts who've been there.
            </p>
          </div>
        </div>

        {/* ── RIGHT: form panel ── */}
        <div className="am-form-panel">
          <button className="am-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          <div className="am-form-inner">
            <div className="am-eyebrow">{isLogin ? 'WELCOME BACK' : 'NEW MEMBER'}</div>
            <h3 className="am-title">
              {isLogin ? 'Sign in to your\naccount' : 'Join Compass\n& Co.'}
            </h3>
            <p className="am-subtitle">
              {isLogin
                ? 'Enter your credentials to continue your journey.'
                : 'Start planning your curated travel experience.'}
            </p>

            {/* Google */}
            <button className="am-google-btn">
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59a14.2 14.2 0 0 1-.75-4.59c0-1.58.27-3.12.75-4.59L2.56 13.22A23.94 23.94 0 0 0 0 24c0 3.77.9 7.34 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Continue with Google
            </button>

            <div className="am-divider"><span>or</span></div>

            <form className="am-form" onSubmit={e => e.preventDefault()}>
              <div className="am-field">
                <label className="am-label">EMAIL</label>
                <input className="am-input" type="email" placeholder="name@example.com" autoComplete="email" />
              </div>

              <div className="am-field">
                <label className="am-label">PASSWORD</label>
                <div className="am-input-wrap">
                  <input
                    className="am-input"
                    type={showPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                  />
                  <button type="button" className="am-pw-toggle" onClick={() => setShowPw(v => !v)}>
                    {showPw ? (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="am-form-options">
                  <label className="am-remember">
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="#" className="am-forgot">Forgot password?</a>
                </div>
              )}

              {!isLogin && (
                <div className="am-field">
                  <label className="am-label">CONFIRM PASSWORD</label>
                  <input className="am-input" type="password" placeholder="••••••••" />
                </div>
              )}

              <button type="submit" className="am-submit">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <p className="am-toggle-text">
              {isLogin ? "Don't have an account? " : "Already a member? "}
              <button onClick={() => setIsLogin(v => !v)}>
                {isLogin ? 'Join now' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
