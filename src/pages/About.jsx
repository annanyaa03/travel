import { Link } from 'react-router-dom';
import { stats } from '../data';
import './About.css';

const team = [
  { name: 'Elena Rossi', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80', bio: '15 years crafting bespoke luxury travel experiences across 80+ countries.' },
  { name: 'Arjun Mehta', role: 'Head of Experiences', img: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&q=80', bio: 'Former expedition leader with deep expertise in adventure and cultural travel.' },
  { name: 'Camille Dubois', role: 'Creative Director', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80', bio: 'Visual storyteller who transforms each journey into an unforgettable narrative.' },
  { name: 'Kai Nakamura', role: 'Asia-Pacific Lead', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', bio: 'Japanese-born travel expert with insider access to Asia\'s most exclusive experiences.' },
];

const values = [
  { icon: 'fa-heart', title: 'Passion First', color: '#ff6b6b', desc: 'Every itinerary is crafted by people who genuinely love to travel, not just sell it.' },
  { icon: 'fa-leaf', title: 'Sustainable Travel', color: '#00b894', desc: 'We partner with eco-conscious operators and support local communities in every destination.' },
  { icon: 'fa-gem', title: 'Premium Quality', color: '#a29bfe', desc: 'We hold every experience to the highest standard — your journey should be flawless.' },
  { icon: 'fa-handshake', title: 'Human Connection', color: '#ffd93d', desc: 'We believe the best travel happens when you connect authentically with people and places.' },
];

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-bg" />
        <div className="container about-hero-content">
          <p className="section-label" style={{ color: '#ffb3b3' }}>Our Story</p>
          <h1 className="about-title">Travel Is Our <br /><span>Greatest Passion</span></h1>
          <p className="about-hero-sub">
            Born from a love of exploration, Voyage has been crafting extraordinary journeys for
            curious, adventurous souls since 2009. We don't just plan trips — we create memories that last a lifetime.
          </p>
          <div className="about-hero-actions">
            <Link to="/destinations" className="btn btn-primary">Explore Destinations</Link>
            <a href="mailto:hello@wanderlust.com" className="btn btn-outline">Get in Touch</a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="about-stats-band">
        <div className="container about-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="about-stat">
              <div className="about-stat-value">{s.value}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <section className="about-mission container">
        <div className="mission-img-side">
          <div className="mission-img-main">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80" alt="mountains" />
          </div>
          <div className="mission-img-accent">
            <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80" alt="culture" />
          </div>
        </div>
        <div className="mission-text-side">
          <p className="section-label">Our Mission</p>
          <h2 className="section-title">We Believe <span>Every Journey</span> Changes You</h2>
          <p className="mission-body">
            At Voyage, we believe that travel is the most powerful form of education — it broadens
            perspectives, forges connections, and creates stories that define who we are.
          </p>
          <p className="mission-body">
            Our team of specialist travel designers works with a global network of expert local guides,
            boutique hotels, and experience operators to build journeys that go far beyond the ordinary.
            We're passionate about the details that make the difference — the private sunrise trek, the
            family-run trattoria hidden off the tourist trail, the homestay that shows you how people
            really live.
          </p>
          <div className="mission-promise">
            <div className="promise-item">
              <i className="fas fa-check-circle"></i> Personally vetted experiences
            </div>
            <div className="promise-item">
              <i className="fas fa-check-circle"></i> Local expert guides worldwide
            </div>
            <div className="promise-item">
              <i className="fas fa-check-circle"></i> 24/7 concierge support
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <div className="section-header-center">
            <p className="section-label">What We Stand For</p>
            <h2 className="section-title">Our <span>Core Values</span></h2>
          </div>
          <div className="values-grid">
            {values.map(v => (
              <div key={v.title} className="value-card">
                <div className="value-icon" style={{ background: v.color + '18', border: `1px solid ${v.color}30` }}>
                  <i className={`fas ${v.icon}`} style={{ color: v.color }}></i>
                </div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team container">
        <div className="section-header-center">
          <p className="section-label">The People Behind</p>
          <h2 className="section-title">Meet the <span>Dream Team</span></h2>
        </div>
        <div className="team-grid">
          {team.map(member => (
            <div key={member.name} className="team-card">
              <div className="team-img-wrap">
                <img src={member.img} alt={member.name} />
              </div>
              <div className="team-body">
                <h3 className="team-name">{member.name}</h3>
                <div className="team-role">{member.role}</div>
                <p className="team-bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="about-cta">
        <div className="about-cta-bg" />
        <div className="container about-cta-inner">
          <h2>Ready to Start Your Journey?</h2>
          <p>Let our travel designers create your perfect adventure.</p>
          <Link to="/destinations" className="btn btn-primary">Explore All Destinations</Link>
        </div>
      </section>
    </div>
  );
}
