import React, { useRef, useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './Testimonials.css';

const testimonialsData = [
  {
    destination: 'Morocco',
    quote: "AI packing list was spot on. Didn't forget a single thing — not even the small stuff.",
    name: 'Emma R.',
    location: 'Paris, France',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200&crop=face',
    rating: 5
  },
  {
    destination: 'Maldives',
    quote: "Overwater villa at half price. Genuinely unbelievable — nothing like it anywhere.",
    name: 'Ahmed K.',
    location: 'Dubai, UAE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200&crop=face',
    rating: 5
  },
  {
    destination: 'Tokyo',
    quote: "Entire trip planned in minutes. Detailed, personal — actually perfect for my pace.",
    name: 'Sarah M.',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200&crop=face',
    rating: 4.5
  },
  {
    destination: 'Santorini',
    quote: "Our honeymoon was everything we dreamed of. The hotel upgrade made it flawless.",
    name: 'James L.',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200&crop=face',
    rating: 5
  }
];

export default function Testimonials() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPos = scrollRef.current.scrollLeft;
      const cardWidth = 260 + 16; // width + gap
      const newIndex = Math.round(scrollPos / cardWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="tm-star" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} className="tm-star" />);
      }
    }
    return stars;
  };

  return (
    <section className="tm-section">
      <div className="tm-container">
        {/* Header Area */}
        <div className="tm-header">
          <div className="tm-label-wrapper">
            <div className="tm-label-line"></div>
            <span className="tm-label">What our travelers say</span>
            <div className="tm-label-line"></div>
          </div>
          <div className="tm-scroll-hint">Scroll to see more &rarr;</div>
        </div>

        {/* Scrollable Track */}
        <div 
          className="tm-track" 
          ref={scrollRef} 
          onScroll={handleScroll}
        >
          {testimonialsData.map((tm, idx) => (
            <div key={idx} className="tm-card">
              {/* Destination Tag */}
              <div className="tm-dest-tag">
                <div className="tm-dot"></div>
                {tm.destination}
              </div>

              {/* Quote */}
              <p className="tm-quote">“{tm.quote}”</p>

              {/* Bottom Stuff */}
              <div className="tm-card-bottom">
                <div className="tm-stars">
                  {renderStars(tm.rating)}
                </div>

                <div className="tm-person">
                  <img src={tm.avatar} alt={tm.name} className="tm-avatar" />
                  <div className="tm-name-box">
                    <span className="tm-name">{tm.name}</span>
                    <span className="tm-location">{tm.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="tm-pagination">
          {testimonialsData.map((_, idx) => (
            <div 
              key={idx} 
              className={`tm-page-dot ${activeIndex === idx ? 'active' : ''}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
