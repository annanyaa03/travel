import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaClock, FaDollarSign, FaArrowRight } from 'react-icons/fa';
import { destinations } from '../data';
import './Destinations.css';

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [continent, setContinent] = useState('All');
  const [vibeFilters, setVibeFilters] = useState(searchParams.get('category') ? [searchParams.get('category')] : []);
  const [visibleCount, setVisibleCount] = useState(9);

  // Sync state if URL params change externally
  useEffect(() => {
    const s = searchParams.get('search');
    const c = searchParams.get('category');
    if (s !== null) setSearch(s);
    if (c !== null) setVibeFilters([c]);
  }, [searchParams]);

  const toggleVibe = (vibe) => {
    setVibeFilters(prev => 
      prev.includes(vibe) ? prev.filter(v => v !== vibe) : [...prev, vibe]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setContinent('All');
    setVibeFilters([]);
    setVisibleCount(9);
    setSearchParams({}); // Clear URL too
  };

  const filteredDests = useMemo(() => {
    return destinations.filter(dest => {
      const matchSearch = dest.name.toLowerCase().includes(search.toLowerCase()) || 
                          dest.country.toLowerCase().includes(search.toLowerCase());
      const matchContinent = continent === 'All' || dest.continent === continent;
      const matchVibe = vibeFilters.length === 0 || vibeFilters.every(v => dest.type.includes(v));
      
      return matchSearch && matchContinent && matchVibe;
    });
  }, [search, continent, vibeFilters]);

  const displayedDests = filteredDests.slice(0, visibleCount);

  return (
    <div className="destinations-page">
      {/* Hero Banner */}
      <div className="dest-hero">
        <div className="dest-hero-overlay"></div>
        <div className="container dest-hero-content animate-slide-up">
          <div className="breadcrumb">Home / Destinations</div>
          <h2>Explore <span>All Destinations</span></h2>
          <p>Discover 30+ handpicked destinations worldwide</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="container filters-section">
        <div className="search-bar glass-panel">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search destinations..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <div className="results-bar">
          <span className="results-count">Showing {filteredDests.length} destinations</span>
          {(search || continent !== 'All' || vibeFilters.length > 0) && (
            <button className="btn-clear" onClick={clearFilters}>Clear Filters</button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="container dest-grid-container">
        <div className="featured-grid page-grid">
          {displayedDests.map(dest => (
            <div key={dest.id} className="reveal-tile">
              <div className="tile-img">
                <img src={dest.image} alt={dest.name} loading="lazy" />
                <div className="tile-info-default">
                  <h3>{dest.name}</h3>
                  <span>{dest.country}</span>
                  <FaArrowRight className="arrow-icon" />
                </div>
              </div>
              
              <div className="tile-overlay">
                <div className="reveal-content">
                  <p className="tile-desc">{dest.description}</p>
                  <div className="tile-meta">
                    <span><FaClock /> {dest.bestTime}</span>
                    <span><FaDollarSign /> {dest.budget}</span>
                  </div>
                  <div className="tile-tags">
                    {dest.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <button className="btn btn-primary btn-sm">Explore Now →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDests.length === 0 && (
          <div className="no-results">
            <h3>No destinations found</h3>
            <p>Try adjusting your search or filters.</p>
            <button className="btn btn-outline" onClick={clearFilters}>Clear All Filters</button>
          </div>
        )}

        {visibleCount < filteredDests.length && (
          <div className="load-more-section">
            <p className="progress-text">Showing {displayedDests.length} of {filteredDests.length} destinations</p>
            <button 
              className="btn btn-primary load-btn"
              onClick={() => setVisibleCount(prev => prev + 9)}
            >
              Load More Destinations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
