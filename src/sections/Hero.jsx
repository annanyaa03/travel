import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video autoplay blocked:", err));
    }
  }, []);



  return (
    <section className="hero">
      {/* Background Video */}
      <div className="hero-video-container">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video"
          poster="https://images.pexels.com/videos/36407453/pexels-photo-36407453.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          }}
        >
          <source src="https://videos.pexels.com/video-files/36407453/15438667_3840_2160_60fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="container hero-content">
        <div className="hero-text">

          <div className="eyebrow-line animate-fade-in">
            <span className="gold-line"></span>
            <span className="eyebrow-text">#1 Rated Travel Experience Platform</span>
          </div>
          <h1 className="animate-reveal-text delay-1">
            <span className="heading-light">Discover the World's</span>
            <span className="heading-italic">Breathtaking Wonders</span>
          </h1>
          <p className="hero-subtext animate-fade-up delay-3">
            Curated journeys to the planet's most extraordinary destinations — crafted for the curious traveller.
          </p>

          <div className="hero-ctas animate-fade-up delay-4">
            <button className="btn btn-primary cta-gold" onClick={() => navigate('/concierge-plan')}>Plan a Trip</button>
            <button className="btn btn-ghost cta-outline" onClick={() => navigate('/destinations')}>Explore Destinations</button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator-v2">
        <div className="scroll-line"></div>
        <span className="scroll-text">SCROLL</span>
      </div>

      {/* Progress Dots */}
      <div className="hero-progress-dots">
        <div className="progress-dot active"></div>
        <div className="progress-dot"></div>
        <div className="progress-dot"></div>
      </div>
    </section>
  );
}
