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
        <div className="container dest-hero-content">
          <div className="breadcrumb animate-fade-in">Home / <span className="bc-active">Destinations</span></div>
          <h2 className="animate-mask-reveal delay-1">Explore <em>All Destinations</em></h2>
          <p className="animate-fade-up delay-2">Discover handpicked destinations worldwide</p>
   
