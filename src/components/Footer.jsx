import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaTiktok, FaCompass } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-area">
      <div className="container footer-grid">
        <div className="footer-brand-col">
          <Link to="/" className="footer-logo">
            <FaCompass className="brand-icon" />
            <span>Compass &amp; Co.</span>
          </Link>
          <p className="brand-desc">
            Curating extraordinary journeys to the planet's most breathtaking wonders.
          </p>
          <div className="social-row">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </div>

        <div className="footer-link-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><a href="#">Deals</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">AI Planner</a></li>
            <li><a href="#">Map</a></li>
          </ul>
        </div>

        <div className="footer-link-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Partners</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-link-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
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
        </div>
      </div>
    </footer>
  );
}
