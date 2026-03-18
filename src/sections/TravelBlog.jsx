import { articles } from '../data';
import './TravelBlog.css';

export default function TravelBlog() {
  return (
    <section className="travel-blog">
      <div className="container">
        <h2 className="section-title">Travel <span>Inspiration</span></h2>
        <p className="section-subtitle">Stories, guides and tips from our explorers</p>

        <div className="blog-grid">
          {articles.map(post => (
            <div key={post.id} className="blog-card glass-panel">
              <div className="blog-img">
                <img src={post.image} alt={post.title} />
                <div className="blog-cat">{post.category}</div>
              </div>
              
              <div className="blog-body">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                
                <div className="blog-footer">
                  <div className="author">
                    <img src={post.authorAvatar} alt={post.author} />
                    <div>
                      <div className="author-name">{post.author}</div>
                      <div className="post-date">{post.date}</div>
                    </div>
                  </div>
                  <button className="read-more">Read More →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-center">
          <button className="btn btn-ghost">View All Articles →</button>
        </div>
      </div>
    </section>
  );
}
