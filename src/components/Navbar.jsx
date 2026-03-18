import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('#nav-login-wrap')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">

        <div className="nav-logo" onClick={() => navigate('/')}>
          <div className="nav-logo-icon">🧭</div>
          <span className="nav-logo-text">Compass &amp; Co.</span>
        </div>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/destinations" className={`nav-link ${isActive('/destinations') ? 'active' : ''}`}>Destinations</Link>
          <Link to="/hotels" className={`nav-link ${isActive('/hotels') ? 'active' : ''}`}>Hotels</Link>
          <Link to="/experiences" className={`nav-link ${isActive('/experiences') ? 'active' : ''}`}>Experiences</Link>
          <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>Blog</Link>
        </div>

        <div className="nav-actions">
          <div className="nav-login-wrap" id="nav-login-wrap">
            <div
              className={`nav-login-btn ${dropdownOpen ? 'open' : ''}`}
              id="nav-login-btn"
              onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
            >
              <div className="nav-avatar">👤</div>
              <span className="nav-login-text">Login</span>
              <span className="nav-chevron">▾</span>
            </div>
            <div className={`nav-dropdown ${dropdownOpen ? 'open' : ''}`} id="nav-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-icon">🧭</div>
                <div>
                  <div className="dropdown-title">Welcome back</div>
                  <div className="dropdown-sub">Sign in to your account</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-option google">
                <div className="google-icon">G</div>
                <span>Continue with Google</span>
              </button>
              <button className="dropdown-option email">
                <span className="option-icon">✉️</span>
                <span>Continue with Email</span>
              </button>
              <div className="dropdown-divider"></div>
              <div className="dropdown-signup">
                Don't have an account?
                <span className="signup-link">Sign Up Free</span>
              </div>
            </div>
          </div>
          <Link to="/plan" className="nav-cta">Plan a Trip ✈</Link>
        </div>

        <button
          className="nav-hamburger"
          id="nav-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      <div className={`nav-mobile-menu ${mobileOpen ? 'open' : ''}`} id="nav-mobile-menu">
        <Link to="/" className={`mobile-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Home</Link>
        <Link to="/destinations" className={`mobile-link ${isActive('/destinations') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Destinations</Link>
        <Link to="/hotels" className={`mobile-link ${isActive('/hotels') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Hotels</Link>
        <Link to="/experiences" className={`mobile-link ${isActive('/experiences') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Experiences</Link>
        <Link to="/blog" className={`mobile-link ${isActive('/blog') ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>Blog</Link>
        <div className="mobile-divider"></div>
        <button className="mobile-google"><span>G</span> Continue with Google</button>
        <button className="mobile-email">✉️ Continue with Email</button>
        <Link to="/plan" className="mobile-cta" onClick={() => setMobileOpen(false)}>Plan a Trip ✈</Link>
      </div>
    </nav>
  );
}
