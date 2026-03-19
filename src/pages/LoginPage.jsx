import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { FaPlane, FaGoogle, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const BG_VIDEO = "https://videos.pexels.com/video-files/1409899/1409899-uhd_3840_2160_25fps.mp4";

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="login-page">
      {/* 4K Background Video */}
      <div className="login-video-bg">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="video-content"
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          }}
        >
          <source src={BG_VIDEO} type="video/mp4" />
        </video>
        <div className="video-overlay-dim"></div>
      </div>

      <div className="login-content-wrapper">
        {/* Left Branding Panel Removed per feedback */}

        {/* Right Form Panel */}
        <div className="form-glass-container animate-fade-in">
          <div className="form-header">
            <h3>Welcome back</h3>
            <p>Access your global travel dashboard</p>
          </div>

          <form className="login-form-element" onSubmit={handleSubmit}>
            <div className="input-field-group">
              <div className="input-inner-wrap">
                <FaEnvelope className="input-field-icon" />
                <input type="email" id="email" placeholder="Email Address" required />
              </div>
            </div>

            <div className="input-field-group">
              <div className="input-inner-wrap">
                <FaLock className="input-field-icon" />
                <input type="password" id="password" placeholder="Password" required />
              </div>
              <a href="#" className="forgot-pass-link">Forgot password?</a>
            </div>

            <button type="submit" className="login-submit-btn">SIGN IN</button>
            
            <button className="google-login-button">
              <FaGoogle className="google-brand-icon" />
              <span>Continue with Google</span>
            </button>
          </form>

          <p className="login-footer-text">
            New here? <a href="/signup" onClick={(e) => { e.preventDefault(); }}>Create an Account</a>
          </p>
        </div>
      </div>
    </div>
  );
}
