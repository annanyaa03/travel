import React, { useState } from 'react';
import './Blog.css';

const BLOG_POSTS = [
  {
    id: 'b1',
    title: 'The Art of Slow Travel in the Scottish Highlands',
    category: 'Destinations',
    date: 'Oct 12, 2026',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
    excerpt: 'Discovering hidden lochs, ancient castles, and the profound peace of moving at nature\'s pace across the rugged Highland terrain.'
  },
  {
    id: 'b2',
    title: '5 Ultimate Luxury Lodges in Patagonia',
    category: 'Luxury Stays',
    date: 'Oct 08, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
    excerpt: 'Where avant-garde architecture meets the untamed wilderness of the end of the Earth.'
  },
  {
    id: 'b3',
    title: 'Packing for the Riviera: A Case Study',
    category: 'Travel Tips',
    date: 'Sep 29, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80',
    excerpt: 'The capsule wardrobe essential for seamlessly transitioning from a superyacht deck to a Michelin-starred dining room.'
  },
  {
    id: 'b4',
    title: 'Culinary Secrets of Hidden Tokyo',
    category: 'Culture',
    date: 'Sep 15, 2026',
    readTime: '8 min read',
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    excerpt: 'An insider’s guide to the eight-seat omakase counters and multi-generational izakayas only locals know about.'
  },
  {
    id: 'b5',
    title: 'Navigating the Amalfi Coast by Private Charter',
    category: 'Destinations',
    date: 'Aug 22, 2026',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80',
    excerpt: 'Escape the summer crowds by taking to the sea. The ultimate itinerary for a glamorous week on the Italian Riviera.'
  },
  {
    id: 'b6',
    title: 'Wellness Retreats That Actually Work',
    category: 'Luxury Stays',
    date: 'Aug 05, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    excerpt: 'From digital detoxes in the Himalayas to Ayurvedic immersions in Kerala, exploring retreats that provide profound transformation.'
  }
];

const CATEGORIES = ['All', 'Destinations', 'Luxury Stays', 'Travel Tips', 'Culture'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const featuredPost = BLOG_POSTS[0];
  const gridPosts = activeCategory === 'All' 
    ? BLOG_POSTS.slice(1) 
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  return (
    <div className="blog-page">
      {/* Blog Header */}
      <header className="blog-header">
        <div className="bh-inner">
          <p className="bh-eyebrow">The Compass Journal</p>
          <h1 className="bh-title">Stories &amp; <em>Inspiration</em></h1>
        </div>
      </header>

      {/* Featured Article (only show if 'All' is selected for layout purity) */}
      {activeCategory === 'All' && (
        <section className="blog-featured">
          <div className="bf-inner">
            <div className="bf-img-wrap">
              <img src={featuredPost.img} alt={featuredPost.title} className="bf-img" />
              <div className="bf-badge">Featured Stories</div>
            </div>
            <div className="bf-content">
              <div className="bc-meta">
                <span className="bc-cat">{featuredPost.category}</span>
                <span className="bc-dot">•</span>
                <span>{featuredPost.date}</span>
                <span className="bc-dot">•</span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h2 className="bf-title">{featuredPost.title}</h2>
              <p className="bf-excerpt">{featuredPost.excerpt}</p>
              <button className="bf-read-btn">Read Article →</button>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="blog-filters">
        <div className="bf-list">
          {CATEGORIES.map(c => (
            <button 
              key={c}
              className={`bf-btn ${activeCategory === c ? 'active' : ''}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="blog-grid-section">
        <div className="bg-inner">
          {gridPosts.length === 0 ? (
            <div className="bg-empty">No articles found for this category.</div>
          ) : (
            gridPosts.map((post, i) => (
              <article key={post.id} className="bg-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="bg-img-wrap">
                  <img src={post.img} alt={post.title} className="bg-img" />
                </div>
                <div className="bg-info">
                  <div className="bc-meta">
                    <span className="bc-cat">{post.category}</span>
                    <span className="bc-dot">•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="bg-title">{post.title}</h3>
                  <p className="bg-excerpt">{post.excerpt}</p>
                  <div className="bg-read">Read Article →</div>
                </div>
              </article>
            ))
          )}
        </div>
        
        {gridPosts.length > 0 && (
          <div className="bg-load-more">
            <button className="bg-load-btn">Load More Stories</button>
          </div>
        )}
      </section>
    </div>
  );
}
