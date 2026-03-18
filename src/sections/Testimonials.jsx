import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { testimonials } from '../data';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">What Our <span>Travelers Say</span></h2>
        
        <div className="testimonials-wrapper">
          <div className="testimonials-track">
            {/* Duplicated list for infinite scroll loop */}
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div key={idx} className="testimonial-card glass-panel">
                <FaQuoteLeft className="quote-icon" />
                <p className="review-text">"{t.text}"</p>
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <div className="traveler-info">
                  <img src={t.avatar} alt={t.traveler} />
                  <div>
                    <h4 className="traveler-name">{t.traveler}</h4>
                    <span className="traveler-loc">{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-nav">
          <button className="nav-btn"><FaChevronLeft /></button>
          <button className="nav-btn"><FaChevronRight /></button>
        </div>
      </div>
    </section>
  );
}
