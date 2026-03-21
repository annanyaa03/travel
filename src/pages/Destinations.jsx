import BentoGrid from '../sections/BentoGrid';
import './Destinations.css';

export default function Destinations() {
  return (
    <div className="destinations-page">
      {/* Hero Banner */}
      <div className="dest-hero">
        <img
          src="https://images.unsplash.com/photo-1498307833015-e7b400441eb8?w=1600&h=700&fit=crop&q=100"
          alt="Destinations hero"
          className="dest-hero-img"
        />
        <div className="dest-hero-overlay"></div>
        <div className="container dest-hero-content animate-slide-up">
          <div className="breadcrumb">Home / <span className="bc-active">Destinations</span></div>
          <h2>Explore <em>All Destinations</em></h2>
          <p>Discover handpicked destinations worldwide</p>
        </div>
      </div>

      {/* Bento Grid Section */}
      <BentoGrid />
    </div>
  );
}
