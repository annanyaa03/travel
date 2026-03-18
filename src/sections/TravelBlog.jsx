import { useState, useEffect, useRef } from 'react';
import { articles } from '../data';
import { FaEye, FaRegClock, FaArrowRight } from 'react-icons/fa';
import './TravelBlog.css';

export default function TravelBlog() {
  const [activeTab, setActiveTab] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);

  // Tabs for category filter
  const tabs = ['All', 'Destinations', 'Tips', 'Food', 'Culture'];

  // Filter articles based on active tab
  const filteredArticles = activeTab === 'All' 
    ? articles.slice(0, 4) 
    : articles.filter(a => a.category === activeTab).slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Start progress bar animation (0 to 75%)
        setTimeout(() => setProgress(75), 100);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Mock data for new fields
  const mockReadTime = ['4 min read', '6 min read', '5 min read', '3 min read', '7 min read'];
  const mockViews = ['1.2k', '2.4k', '3.1k', '0.9k', '4.5k'];

  return (
    <section className="travel-blog" ref={sectionRef}>
      <div className="blog-radial-glow"></div>
      
      <div className="container">
        
        {/* Header Section */}
        <div className="blog-header">
          <div className="header-left">
            <div className="title-row">
              <span className="title-main">Travel</span>
              <span className="title-accent">Inspiration</span>
            </div>
            <p className="subtitle">Stories, guides and tips from our explorers</p>
            
            {/* Category Tabs */}
            <div className="category-tabs">
              {tabs.map(tab => (
                <button 
                  key={tab} 
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="header-right">
            <a href="#/blog" className="view-all">
              View All Articles <span>→</span>
            </a>
          </div>
        </div>

        {/* Minimal Numbered List */}
        <div className="blog-list">
          {filteredArticles.map((article, index) => (
            <div 
              key={article.id} 
              className={`article-row ${isVisible ? 'entry-visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* LEFT: NUMBER */}
              <div className="article-num">
                {(index + 1).toString().padStart(2, '0')}
              </div>

              {/* MIDDLE-LEFT: THUMBNAIL (HOVER ONLY) */}
              <div className="article-thumb-wrap">
                <img src={article.image} alt={article.title} />
                <div className="thumb-shimmer"></div>
              </div>

              {/* MIDDLE: CONTENT */}
              <div className="article-info">
                <span className={`cat-pill cat-${article.category.toLowerCase()}`}>
                  {article.category}
                </span>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">
                  {article.excerpt.substring(0, 80)}...
                </p>
                <div className="article-meta">
                  {article.author} • {article.date}
                </div>
              </div>

              {/* RIGHT: META & ACTION */}
              <div className="article-actions">
                <div className="read-time">
                  <FaRegClock /> {mockReadTime[index % 5]}
                </div>
                <div className="view-count">
                  <FaEye /> {mockViews[index % 5]}
                </div>
                <button className="arrow-btn">
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="blog-footer-strip">
          <div className="footer-stats-box">
            <p>Showing {filteredArticles.length} of {articles.length} articles</p>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          
          <button className="load-more-btn">
            Load More Articles →
          </button>
        </div>

      </div>
    </section>
  );
}
