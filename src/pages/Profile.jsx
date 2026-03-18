import { useStore } from '../store';
import { FaPassport, FaAward, FaMapMarkedAlt, FaSignOutAlt, FaCalendarCheck } from 'react-icons/fa';
import './Profile.css';

export default function Profile() {
  const { user, logout, wishlist, visited } = useStore();

  if (!user) {
    return (
      <div className="profile-page container">
        <div className="login-prompt glass-panel">
          <h2>Your Passport Awaits</h2>
          <p>Login to track your journeys, earn stamps, and unlock exclusive travel badges.</p>
          <button className="btn btn-primary" onClick={() => document.getElementById('auth-modal').showModal()}>
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  const badgeLevel = visited.length > 10 ? 'World Traveler' : visited.length > 5 ? 'Adventurer' : 'Explorer';
  const progress = (visited.length % 5) * 20;

  return (
    <div className="profile-page container animate-fade-in">
      <div className="profile-grid">
        {/* Left: User Card */}
        <div className="profile-sidebar">
          <div className="user-card glass-panel">
            <div className="user-photo">
              <img src={user.photo} alt={user.name} />
            </div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <div className="user-badge-pill">{badgeLevel}</div>
            <button className="btn btn-outline btn-logout" onClick={logout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>

          <div className="stats-card glass-panel">
            <div className="stat-item">
              <span className="stat-val">{visited.length}</span>
              <span className="stat-label">Destinations</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">{wishlist.length}</span>
              <span className="stat-label">Wishlist</span>
            </div>
          </div>
        </div>

        {/* Right: Passport & Badges */}
        <div className="profile-main">
          {/* Passport Gamification */}
          <div className="passport-card glass-panel">
            <div className="card-header">
              <FaPassport className="card-icon" />
              <div>
                <h3>Digital Passport</h3>
                <p>Track your global exploration progress</p>
              </div>
            </div>

            <div className="stamps-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className={`stamp-slot ${i < visited.length ? 'stamped' : ''}`}>
                  {i < visited.length ? <FaMapMarkedAlt /> : <span>{i + 1}</span>}
                </div>
              ))}
            </div>

            <div className="badge-progress">
              <div className="progress-info">
                <span>Next Badge: {visited.length > 5 ? 'World Traveler' : 'Adventurer'}</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="activity-card glass-panel">
            <h3><FaCalendarCheck /> My Journeys</h3>
            {visited.length === 0 ? (
              <p className="empty-text">No trips explored yet. Head to Destinations to start your collection!</p>
            ) : (
              <div className="activity-list">
                {/* Mock recent activity */}
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-info">
                    <strong>Explored Santorini</strong>
                    <span>earned 10 XP & 1 Stamp</span>
                  </div>
                  <div className="activity-date">Today</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
