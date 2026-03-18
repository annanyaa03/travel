import { useState } from 'react';
import { FaBookmark, FaHeart } from 'react-icons/fa';
import { useStore } from '../store';
import './Wishlist.css';

// Mock destinations for display (usually fetched from data.js)
const destinations = [
  { id: 'santorini', name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80', price: 1899 },
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', price: 1200 },
  { id: 'patagonia', name: 'Patagonia', country: 'Argentina', image: 'https://images.unsplash.com/photo-1554528151-2483592ed6a3?w=800&q=80', price: 2100 },
];

export default function Wishlist() {
  const { wishlist, toggleWishlist, user } = useStore();
  
  const savedDests = destinations.filter(d => wishlist.includes(d.id));

  return (
    <div className="wishlist-page container animate-fade-in">
      <div className="wishlist-header">
        <FaHeart className="header-icon" />
        <div>
          <h1>Your Saved Destinations</h1>
          <p>Destinations you're dreaming of, all in one place.</p>
        </div>
      </div>

      {!user ? (
        <div className="login-prompt glass-panel">
          <h2>Save Your Favorites</h2>
          <p>Login to save destinations to your wishlist across all your devices.</p>
          <button className="btn btn-primary" onClick={() => document.getElementById('auth-modal').showModal()}>
            Sign In Now
          </button>
        </div>
      ) : savedDests.length === 0 ? (
        <div className="empty-wishlist glass-panel">
          <FaBookmark className="empty-icon" />
          <h3>No Favorites Yet</h3>
          <p>Explore our destinations and tap the heart icon to save them here.</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {savedDests.map(dest => (
            <div key={dest.id} className="wishlist-card glass-panel">
              <div className="card-img">
                <img src={dest.image} alt={dest.name} />
                <button className="heart-btn active" onClick={() => toggleWishlist(dest.id)}>
                  <FaHeart />
                </button>
              </div>
              <div className="card-body">
                <div className="card-loc">{dest.country}</div>
                <h3>{dest.name}</h3>
                <div className="card-bottom">
                  <span className="card-price">from <strong>${dest.price}</strong></span>
                  <button className="btn btn-glass btn-sm">Explore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
