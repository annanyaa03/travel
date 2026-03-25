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
    category: 'Destinations',
    date: 'Oct 12, 2026',
    readTime: '6 min',
    img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=80',
    excerpt: 'Discovering hidden lochs, ancient castles, and the profound peace of moving at nature\'s pace.',
  },
  {
    id: 'b2',
    numeral: 'ii.',
    title: '5 Ultimate Luxury Lodges in Patagonia',
    shortTitle: 'Patagonia',
    category: 'Luxury Stays',
    date: 'Oct 08, 2026',
    readTime: '4 min',
    img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'Where avant-garde architecture meets the untamed wilderness of the end of the Earth.',
  },
  {
    id: 'b3',
    numeral: 'iii.',
    title: 'Packing for the Riviera: A Case Study',
    shortTitle: 'The French Riviera',
    category: 'Travel Tips',
    date: 'Sep 29, 2026',
    readTime: '5 min',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'The capsule wardrobe for seamlessly transitioning from a superyacht deck to a Michelin-starred dining room.',
  },
  {
    id: 'b4',
    numeral: 'iv.',
    title: 'Culinary Secrets of Hidden Tokyo',
    shortTitle: 'Tokyo',
    category: 'Culture',
    date: 'Sep 15, 2026',
    readTime: '8 min',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'An insider\'s guide to eight-seat omakase counters and multi-generational izakayas only locals know.',
  },
  {
    id: 'b5',
    numeral: 'v.',
    title: 'Navigating the Amalfi Coast by Private Charter',
    shortTitle: 'The Amalfi Coast',
    category: 'Destinations',
    date: 'Aug 22, 2026',
    readTime: '7 min',
    img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'Escape the summer crowds by taking to the sea. The ultimate itinerary for a week on the Italian Riviera.',
  },
  {
    id: 'b6',
    numeral: 'vi.',
    title: 'Wellness Retreats That Actually Work',
    shortTitle: 'Kerala',
    category: 'Wellness',
    date: 'Aug 05, 2026',
    readTime: '5 min',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=2000&q=100',
    excerpt: 'From digital detoxes in the Himalayas to Ayurvedic immersions in Kerala, retreats that transform.',
  },
];

const CATEGORIES = ['All', 'Destinations', 'Luxury Stays', 'Travel Tips', 'Culture', 'Wellness'];

const QUOTE = 'To travel slowly is to understand that the destination is merely the excuse — the unhurried in-between forms the journey.';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredStrip, setHoveredStrip] = useState(null);

  const featuredPost = POSTS[0];
  const filteredPosts = activeCategory === 'All' ? POSTS : POSTS.filter(p => p.category === activeCategory);

  return (
    <div className="blog-redesign">

      {/* ── FEATURED HERO ── */}
      <section className="blog-featured">
        <div className="blog-featured-img">
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
            {/* Split title: last italic word in gold */}
            The Art of Slow Travel in the <em>Scottish Highlands</em>
          </h1>
          <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
          <div className="blog-featured-tags">
            <span className="blog-tag">{featuredPost.category}</span>
            <span className="blog-tag">{featuredPost.date}</span>
            <span className="blog-tag">{featuredPost.readTime}</span>
          </div>
          <button className="blog-read-btn">READ ARTICLE →</button>
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
          <span className="blog-story-count">{filteredPosts.length} STORIES</span>
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
          <span className="blog-index-meta">{ISSUE_DATE} &nbsp; {filteredPosts.length} STORIES</span>
        </div>
        <div className="blog-index-list">
          {filteredPosts.map((post, i) => (
            <div key={post.id} className="blog-index-row">
              <span className="blog-index-num">{post.numeral}</span>
              <h3 className="blog-index-name">{post.shortTitle}</h3>
              <span className="blog-index-cat">{post.category} →</span>
            </div>
          ))}
        </div>
        <div className="blog-loadmore">
          <span className="blog-loadmore-line"></span>
          <button className="blog-loadmore-btn">LOAD MORE STORIES</button>
          <span className="blog-loadmore-line"></span>
        </div>
      </div>

    </div>
  );
}
