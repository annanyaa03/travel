import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import './FeaturedDestinations.css';

const destinations = [
  { id: 'santorini', name: 'Santorini', country: 'Greece', rating: '4.9',
    tags: ['Sunsets','Beaches','Culture'],
    desc: 'Iconic white-washed cliffs and deep blue caldera waters.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop' },
  { id: 'paris', name: 'Paris', country: 'France', rating: '4.8',
    tags: ['Romance','Art','Food'],
    desc: 'The city of light — timeless, romantic, iconic.',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop' },
  { id: 'prague', name: 'Prague', country: 'Czech Republic', rating: '4.7',
    tags: ['History','Architecture','Nightlife'],
    desc: 'Gothic spires and a fairytale old town.',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&h=400&fit=crop' },
  { id: 'fjords', name: 'Norwegian Fjords', country: 'Norway', rating: '5.0',
    tags: ['Nature','Hiking','Aurora'],
    desc: 'Majestic glacial fjords and Northern Lights.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop' },
  { id: 'barcelona', name: 'Barcelona', country: 'Spain', rating: '4.8',
    tags: ['Beach','Architecture','Food'],
    desc: "Gaudi's city of art, tapas, and endless sunshine.",
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop' },
  { id: 'bali', name: 'Bali', country: 'Indonesia', rating: '4.7',
    tags: ['Temples','Surf','Rice Terraces'],
    desc: 'Tropical paradise of spirituality and lush landscapes.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop' },
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', rating: '4.8',
    tags: ['Temples','Cherry Blossom','Tea'],
    desc: "Japan's cultural soul — ancient temples and zen gardens.",
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop' },
];

const looped = [...destinations, ...destinations];

export default function FeaturedDestinations() {
  const navigate = useNavigate();

  return (
    <section className="fd-section">
      <div className="fd-header">
        <h2 className="fd-title">Top <span>Destinations</span></h2>
        <p className="fd-sub">Hover to explore — handpicked places loved worldwide</p>
      </div>

      <div className="fd-track-wrap">
        <div className="fd-track">
          {looped.map((dest, idx) => (
            <div
              key={idx}
              className="fd-card"
              onClick={() => navigate(`/destinations/${dest.id}`)}
            >
              <img src={dest.image} alt={dest.name} className="fd-card-img" />
              <div className="fd-card-overlay" />

              {/* Default bottom label */}
              <div className="fd-card-info">
                <h3 className="fd-card-name">{dest.name}</h3>
                <span className="fd-card-country">{dest.country}</span>
                <div className="fd-card-arrow"><FaArrowRight /></div>
              </div>

              {/* Hover detail panel slides up */}
              <div className="fd-card-details">
                <div className="fd-detail-top">
                  <span className="fd-detail-name">{dest.name}</span>
                  <span className="fd-detail-rating">⭐ {dest.rating}</span>
                </div>
                <p className="fd-detail-desc">{dest.desc}</p>
                <div className="fd-detail-tags">
                  {dest.tags.map(t => (
                    <span key={t} className="fd-detail-tag">{t}</span>
                  ))}
                </div>
                <button className="fd-detail-btn">Explore Now →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
