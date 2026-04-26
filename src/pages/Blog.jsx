import React, { useState } from 'react';
import './Blog.css';

const ISSUE_NUMBER = 24;
const ISSUE_DATE = 'October 2026';

const POSTS = [
  {
    id: 'b1',
    numeral: 'i.',
    title: 'The Art of Slow Travel in the Scottish Highlands',
    shortTitle: 'The Scottish Highlands',
    category: 'DESTINATIONS',
    date: 'Oct 12, 2026',
    readTime: '6 min',
    img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=80',
    excerpt: 'Discovering hidden lochs, ancient castles, and the profound peace of moving at nature\'s pace.',
    link: 'https://www.visitscotland.com/destinations-maps/highlands/'
  },
  {
    id: 'b2',
    numeral: 'ii.',
    title: '5 Ultimate Luxury Lodges in Patagonia',
    shortTitle: 'Patagonia',
    category: 'LUXURY STAYS',
    date: 'Oct 08, 2026',
    readTime: '4 min',
    img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'Where avant-garde architecture meets the untamed wilderness of the end of the Earth.',
    link: 'https://www.awasi.com/en/awasi-patagonia/'
  },
  {
    id: 'b3',
    numeral: 'iii.',
    title: 'Packing for the Riviera: A Case Study',
    shortTitle: 'The French Riviera',
    category: 'TRAVEL TIPS',
    date: 'Sep 29, 2026',
    readTime: '5 min',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'The capsule wardrobe for seamlessly transitioning from a superyacht deck to a Michelin-starred dining room.',
    link: 'https://www.beyond.fr/riviera'
  },
  {
    id: 'b4',
    numeral: 'iv.',
    title: 'Culinary Secrets of Hidden Tokyo',
    shortTitle: 'Tokyo',
    category: 'CULTURE',
    date: 'Sep 15, 2026',
    readTime: '8 min',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'An insider\'s guide to eight-seat omakase counters and multi-generational izakayas only locals know.',
    link: 'https://www.gotokyo.org/en/'
  },
  {
    id: 'b5',
    numeral: 'v.',
    title: 'Navigating the Amalfi Coast by Private Charter',
    shortTitle: 'The Amalfi Coast',
    category: 'DESTINATIONS',
    date: 'Aug 22, 2026',
    readTime: '7 min',
    img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'Escape the summer crowds by taking to the sea. The ultimate itinerary for a week on the Italian Riviera.',
    link: 'https://www.amalficoast.it/en/'
  },
  {
    id: 'b6',
    numeral: 'vi.',
    title: 'Wellness Retreats That Actually Work',
    shortTitle: 'Kerala',
    category: 'WELLNESS',
    date: 'Aug 05, 2026',
    readTime: '5 min',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'From digital detoxes in the Himalayas to Ayurvedic immersions in Kerala, retreats that transform.',
    link: 'https://www.keralatourism.org/'
  },
  {
    id: 'b7',
    numeral: 'vii.',
    title: 'Private Overwater Havens in the Maldives',
    shortTitle: 'The Maldives',
    category: 'RELAXATION',
    date: 'Jul 28, 2026',
    readTime: '6 min',
    img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'A guide to the most secluded overwater villas where the only sound is the Indian Ocean.',
    link: 'https://www.visitmaldives.com'
  },
  {
    id: 'b8',
    numeral: 'viii.',
    title: 'The Blue Domes of Oia: An Insider\'s Guide',
    shortTitle: 'Santorini',
    category: 'DESTINATIONS',
    date: 'Jul 15, 2026',
    readTime: '5 min',
    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'How to experience the magic of Santorini without the sunset crowds.',
    link: 'https://www.santorini.gr/en/'
  },
  {
    id: 'b9',
    numeral: 'ix.',
    title: 'Finding Your Center in Ubud',
    shortTitle: 'Bali',
    category: 'WELLNESS',
    date: 'Jul 02, 2026',
    readTime: '7 min',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'The hidden healing temples and yoga shalas that define the spiritual heart of Bali.',
    link: 'https://www.indonesia.travel/gb/en/destinations/bali'
  },
  {
    id: 'b10',
    numeral: 'x.',
    title: 'Manhattan\'s New Architectural Landmarks',
    shortTitle: 'New York City',
    category: 'CULTURE',
    date: 'Jun 20, 2026',
    readTime: '4 min',
    img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'From the Edge to Little Island, exploring the structures reshaping the world\'s most famous skyline.',
    link: 'https://www.nycgo.com'
  },
  {
    id: 'b11',
    numeral: 'xi.',
    title: 'The Deep Green: Into the Amazon Basin',
    shortTitle: 'The Amazon',
    category: 'ADVENTURE',
    date: 'Jun 05, 2026',
    readTime: '9 min',
    img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'Journeying to the world\'s largest rainforest to meet its most elusive residents.',
    link: 'https://www.amazonas.com'
  },
  {
    id: 'b12',
    numeral: 'xii.',
    title: 'The Spice Routes of the Medina',
    shortTitle: 'Marrakesh',
    category: 'FOOD',
    date: 'May 18, 2026',
    readTime: '6 min',
    img: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'Navigating the labyrinthine souks of Marrakesh in search of the world\'s finest saffron.',
    link: 'https://www.visitmorocco.com/en/travel/marrakech'
  }
];

const CATEGORIES = ['All', 'DESTINATIONS', 'LUXURY STAYS', 'TRAVEL TIPS', 'CULTURE', 'WELLNESS'];

const QUOTE = 'To travel slowly is to understand that the destination is merely the excuse — the unhurried in-between forms the journey.';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredStrip, setHoveredStrip] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const featuredPost = POSTS[0];
  const initialPosts = activeCategory === 'All' ? (showAll ? POSTS : POSTS.slice(0, 6)) : POSTS.filter(p => p.category === activeCategory);
  const filteredPosts = initialPosts;

  return (
    <div className="blog-redesign">

      {/* ── FEATURED HERO ── */}
      <section className="blog-featured">
        <div 
          className="blog-featured-img"
          onClick={() => window.open(featuredPost.link, '_blank')}
          style={{ cursor: 'pointer' }}
        >
          <img src={featuredPost.img} alt={featuredPost.title} />
          <div className="blog-featured-badge">
            <span>Featured</span>
            <span className="blog-featured-issue">Issue {ISSUE_NUMBER}</span>
          </div>
        </div>
        <div className="blog-featured-content">
          <div className="blog-featured-eyebrow">
            <span className="blog-eyebrow-line"></span>
            THE COMPASS JOURNAL
          </div>
          <h1 className="blog-featured-title">
            The Art of Slow Travel in the <em>Scottish Highlands</em>
          </h1>
          <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
          <div className="blog-featured-tags">
            <span className="blog-tag">{featuredPost.category}</span>
            <span className="blog-tag">{featuredPost.date}</span>
            <span className="blog-tag">{featuredPost.readTime}</span>
          </div>
          <button 
            className="blog-read-btn"
            onClick={() => window.open(featuredPost.link, '_blank')}
          >
            READ ARTICLE →
          </button>
        </div>
      </section>

      {/* ── FILTERS + COUNT ── */}
      <div className="blog-filters-row">
        <div className="blog-filters-inner">
          <div className="blog-filter-tabs">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`blog-filter-btn ${activeCategory === c ? 'active' : ''}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <span className="blog-story-count">{activeCategory === 'All' ? POSTS.length : POSTS.filter(p => p.category === activeCategory).length} STORIES</span>
        </div>
      </div>

      {/* ── ACCORDION PHOTO STRIP ── */}
      {activeCategory === 'All' && (
        <div className="blog-strip">
          {POSTS.slice(0, 5).map((post, i) => (
            <div
              key={post.id}
              className={`blog-strip-item ${hoveredStrip === i ? 'expanded' : ''}`}
              onMouseEnter={() => setHoveredStrip(i)}
              onMouseLeave={() => setHoveredStrip(null)}
              onClick={() => window.open(post.link, '_blank')}
              style={{ cursor: 'pointer' }}
            >
              <img src={post.img} alt={post.title} />
              <div className="blog-strip-overlay">
                <div className="blog-strip-meta">
                  <span className="blog-strip-cat">{post.category}</span>
                  <span className="blog-strip-num">{post.numeral}</span>
                </div>
                <h4 className="blog-strip-short-title">{post.shortTitle}</h4>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── PULL QUOTE ── */}
      {activeCategory === 'All' && (
        <div className="blog-pullquote">
          <span className="blog-pullquote-mark">"</span>
          <blockquote>
            <p>{QUOTE}</p>
            <cite>— THE COMPASS JOURNAL, ISSUE {ISSUE_NUMBER}</cite>
          </blockquote>
        </div>
      )}

      {/* ── IN THIS ISSUE INDEX ── */}
      <div className="blog-index">
        <div className="blog-index-header">
          <h2 className="blog-index-title"><em>In This Issue</em></h2>
          <span className="blog-index-meta">{ISSUE_DATE} &nbsp; {activeCategory === 'All' ? (showAll ? POSTS.length : 6) : filteredPosts.length} STORIES</span>
        </div>
        <div className="blog-index-list">
          {filteredPosts.map((post, i) => (
            <div 
              key={post.id} 
              className="blog-index-row"
              style={{
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                padding: '24px 0',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
              onClick={() => window.open(post.link, '_blank', 'noopener,noreferrer')}
            >
              <span className="blog-index-num" style={{ width: '40px', fontSize: '14px', color: '#9e9e9e' }}>{post.numeral}</span>
              <div style={{ flex: 1 }}>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#C9A84C';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'inherit';
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="blog-index-name" style={{ margin: 0, fontSize: '24px', fontWeight: '300', fontFamily: 'Fraunces, serif' }}>{post.shortTitle}</h3>
                </a>
              </div>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#C9A84C',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: '400',
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {post.category} →
              </a>
            </div>
          ))}
        </div>
        <div className="blog-loadmore">
          <span className="blog-loadmore-line"></span>
          <button 
            className="blog-loadmore-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'SHOW LESS' : 'LOAD MORE STORIES'}
          </button>
          <span className="blog-loadmore-line"></span>
        </div>
      </div>

    </div>
  );
}
