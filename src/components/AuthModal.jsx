import { useState } from 'react';
import { FaTimes, FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="auth-modal glass-panel animate-slide-up">
        <button className="close-modal" onClick={onClose}><FaTimes /></button>
        
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Please enter your details to login.' : 'Join Compass & Co. to start planning.'}</p>
        </div>

        <button className="google-auth-btn">
          <FaGoogle /> Continue with Google
        </button>

        <div className="divider">
          <span>or continue with email</span>
        </div>

        <form className="auth-form" onSubmit={e => e.preventDefault()}>
          <div className="input-group">
            <label><FaEnvelope /> Email Address</label>
            <input type="email" placeholder="name@example.com" />
          </div>
          <div className="input-group">
            <label><FaLock /> Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          
          {isLogin && (
            <div className="form-options">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button className="btn btn-primary auth-submit">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <p>Don't have an account? <button onClick={() => setIsLogin(false)}>Sign Up</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setIsLogin(true)}>Login</button></p>
          )}
        </div>
      </div>
    </div>
  );
}
