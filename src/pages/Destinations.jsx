import BentoGrid from '../sections/BentoGrid';
import './Destinations.css';

export default function Destinations() {
  return (
    <div className="destinations-page">
      {/* Hero Banner */}
      <div className="dest-hero">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&h=700&fit=crop&q=100"
          alt="Destinations hero"
          className="dest-hero-img"
        />
        <div className="dest-hero-overlay"></div>
        <div className="container dest-hero-content animate-slide-up">
          <div className="breadcrumb">Home / <span className="bc-active">Destinations</span></div>
          <h2>Explore <em>All Destinations</em></h2>
          <p>Discover 30+ handpicked destinations worldwide</p>
        </div>
      </div>

      {/* Bento Grid Section */}
      <BentoGrid />
    </div>
  );
}
