import { experiences } from '../data';
import './Experiences.css';

export default function Experiences() {
  return (
    <section className="experiences-section">
      <div className="experiences-bg" />
      <div className="container">
        <div className="section-header-center">
          <p className="section-label exp-label">What We Offer</p>
          <h2 className="section-title exp-title-h">Curated <span>Experiences</span></h2>
          <p className="section-subtitle exp-sub">
            More than just a destination — discover the experiences that transform a holiday into a story you tell forever.
          </p>
        </div>

        <div className="exp-grid">
          {experiences.map(exp => (
            <div key={exp.id} className="exp-card">
              <div
                className="exp-icon-wrap"
                style={{ background: exp.color + '20', border: `1px solid ${exp.color}40` }}
              >
                <i className={`fas ${exp.icon}`} style={{ color: exp.color }}></i>
              </div>
              <div className="exp-count" style={{ color: exp.color }}>{exp.count}</div>
              <h3 className="exp-title">{exp.title}</h3>
              <p className="exp-desc">{exp.desc}</p>
              <div className="exp-arrow" style={{ color: exp.color }}>
                Explore <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
