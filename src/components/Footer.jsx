import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaInstagram, 
  FaFacebookF, 
  FaXTwitter, 
  FaYoutube, 
  FaTiktok, 
  FaCompass,
  FaApple,
  FaGooglePlay
} from 'react-icons/fa6';
import './Footer.css';

const socialLinks = [
  {
    name: 'Instagram',
    icon: <FaInstagram />,
    url: 'https://www.instagram.com',
    hoverColor: '#E1306C'
  },
  {
    name: 'Facebook',
    icon: <FaFacebookF />,
    url: 'https://www.facebook.com',
    hoverColor: '#1877F2'
  },
  {
    name: 'Twitter',
    icon: <FaXTwitter />,
    url: 'https://www.twitter.com',
    hoverColor: '#000000'
  },
  {
    name: 'YouTube',
    icon: <FaYoutube />,
    url: 'https://www.youtube.com',
    hoverColor: '#FF0000'
  },
  {
    name: 'TikTok',
    icon: <FaTiktok />,
    url: 'https://www.tiktok.com',
    hoverColor: '#010101'
  }
];

const SocialIcon = ({ href, hoverColor, icon, name }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: hovered ? hoverColor : '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'white',
        fontSize: '17px',
        transition: 'all 0.25s ease',
        transform: hovered ? 'scale(1.12)' : 'scale(1)',
        boxShadow: hovered ? `0 4px 16px ${hoverColor}55` : 'none'
      }}
    >
      {icon}
    </a>
  );
};

const FooterNavLink = ({ to, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? '#C9A84C' : 'rgba(255,255,255,0.6)',
        textDecoration: 'none',
        fontSize: '13px',
        fontWeight: '300',
        transition: 'color 0.2s ease'
      }}
    >
      {children}
    </Link>
  );
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const appStoreStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '10px',
    padding: '12px 24px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    background: 'transparent'
  };

  const handleAppBtnMouseEnter = (e) => {
    e.currentTarget.style.background = 'white';
    e.currentTarget.style.color = '#0f0f0f';
    e.currentTarget.style.borderColor = 'white';
  };

  const handleAppBtnMouseLeave = (e) => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.color = 'white';
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
  };

  return (
    <footer className="footer-area">
      <div className="container">
        <div className="footer-newsletter">
          <div className="fn-content">
            <h3>Subscribe to our newsletter</h3>
            <p>Get the latest travel inspiration and exclusive offers directly in your inbox.</p>
          </div>
          <form className="fn-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="footer-grid">
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <FaCompass className="brand-icon" />
              <span>Compass &amp; Co.</span>
            </Link>
            <p className="brand-desc">
              Curating extraordinary journeys to the planet's most breathtaking wonders.
            </p>
            <div className="social-row" style={{ display: 'flex', gap: '12px', marginTop: '24px', marginBottom: '32px' }}>
              {socialLinks.map((social) => (
                <SocialIcon
                  key={social.name}
                  href={social.url}
                  hoverColor={social.hoverColor}
                  icon={social.icon}
                  name={social.name}
                />
              ))}
            </div>
            <div className="app-buttons" style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://www.apple.com/app-store"
                target="_blank"
                rel="noopener noreferrer"
                style={appStoreStyle}
                onMouseEnter={handleAppBtnMouseEnter}
                onMouseLeave={handleAppBtnMouseLeave}
              >
                <FaApple style={{ fontSize: '20px' }} /> App Store
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                style={appStoreStyle}
                onMouseEnter={handleAppBtnMouseEnter}
                onMouseLeave={handleAppBtnMouseLeave}
              >
                <FaGooglePlay style={{ fontSize: '18px' }} /> Google Play
              </a>
            </div>
          </div>

          <div className="footer-link-col">
            <h4>Explore</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/destinations">Destinations</FooterNavLink></li>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/hotels">Hotels</FooterNavLink></li>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/flights">Flights</FooterNavLink></li>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/experiences">Experiences</FooterNavLink></li>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/blog">Blog</FooterNavLink></li>
            </ul>
          </div>

          <div className="footer-link-col">
            <h4>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/about">About</FooterNavLink></li>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/careers">Careers</FooterNavLink></li>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/press">Press</FooterNavLink></li>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/partners">Partners</FooterNavLink></li>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/contact">Contact</FooterNavLink></li>
            </ul>
          </div>

          <div className="footer-link-col">
            <h4>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/help">Help Center</FooterNavLink></li>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/safety">Safety</FooterNavLink></li>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/privacy">Privacy Policy</FooterNavLink></li>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/terms">Terms of Service</FooterNavLink></li>
              <li style={{ marginBottom: '12px' }}><FooterNavLink to="/cookies">Cookie Policy</FooterNavLink></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-inner">
          <p>&copy; {currentYear} Compass &amp; Co. All rights reserved.</p>
          
          <div className="bottom-settings">
            <div className="setting-group">
              <select defaultValue="EN">
                <option value="EN">English</option>
                <option value="FR">Français</option>
                <option value="ES">Español</option>
                <option value="DE">Deutsch</option>
              </select>
            </div>
            <div className="setting-group">
              <select defaultValue="USD">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="payment-icons">
             <div className="payment-icon visa">VISA</div>
             <div className="payment-icon mastercard">MC</div>
             <div className="payment-icon paypal">PayPal</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
