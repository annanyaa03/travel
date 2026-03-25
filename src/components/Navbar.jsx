import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const DarkCompassIcon = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="lux-compass-svg">
    {/* Outer Circle - Dark */}
    <circle cx="18" cy="18" r="17.5" fill="#1A1A14" />
    {/* Inner Ring */}
    <circle cx="18" cy="18" r="14" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5"/>
    
    {/* Cardinal Ticks */}
    <line x1="18" y1="0.5" x2="18" y2="4.5" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1"/>
    <line x1="18" y1="31.5" x2="18" y2="35.5" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.75"/>
    <line x1="31.5" y1="18" x2="35.5" y2="18" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.75"/>
    <line x1="0.5" y1="18" x2="4.5" y2="18" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.75"/>
    
    {/* South Needle (Gold) */}
    <path d="M18,29.5 L16.9,19.2 L18,18.6 L19.1,19.2 Z" fill="#C9972A" />
    {/* North Needle (White) */}
    <path d="M18,6.5 L19.1,16.8 L18,17.4 L16.9,16.8 Z" fill="#FFFFFF"/>
    
    <circle cx="18" cy="18" r="1.8" fill="#FFFFFF"/>
    <circle cx="18" cy="18" r="0.8" fill="#C9972A"/>
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

export default function Navbar({ onLoginClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav id="lux-nav-fixed">
      <div className="lux-nav-container">
        
        {/* Left Section: Brand */}
        <Link to="/" className="lux-nav-left">
          <DarkCompassIcon />
          <span className="lux-brand-name">
            Compass <span className="lux-ampersand">&amp;</span> Co.
          </span>
        </Link>

        {/* Center Section: Links */}
        <div className="lux-nav-center">
          <Link to="/" className={`lux-nav-link ${isActive('/') ? 'lux-active' : ''}`}>Home</Link>
          <Link to="/destinations" className={`lux-nav-link ${isActive('/destinations') ? 'lux-active' : ''}`}>Destinations</Link>
          <Link to="/hotels" className={`lux-nav-link ${isActive('/hotels') ? 'lux-active' : ''}`}>Hotels</Link>
          <Link to="/flights" className={`lux-nav-link ${isActive('/flights') ? 'lux-active' : ''}`}>Flights</Link>
          <Link to="/experiences" className={`lux-nav-link ${isActive('/experiences') ? 'lux-active' : ''}`}>Experiences</Link>
          <Link to="/blog" className={`lux-nav-link ${isActive('/blog') ? 'lux-active' : ''}`}>Blog</Link>
        </div>

        {/* Right Section: Actions */}
        <div className="lux-nav-right">
          <button className="lux-login-btn" onClick={onLoginClick || (() => navigate('/login'))}>
            <UserIcon /> Login
          </button>
          
          <Link to="/concierge-plan" className="lux-cta-pill">
            <span>Plan a trip</span>
            <span className="lux-cta-arrow">→</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
