import { useState, useEffect, useCallback, useRef } from 'react';
import './BentoGrid.css';

const CONTINENTS = ['All', 'Europe', 'Asia', 'Middle East', 'Africa', 'Islands', 'Americas'];
const CONTINENT_MAP = { All: null, Europe: 'europe', Asia: 'asia', 'Middle East': 'middle-east', Africa: 'africa', Islands: 'ocean', Americas: 'americas' };

const DESTS = [
  { id:1,  name:'Santorini',    country:'Greece · Europe',   lat:36.3932,  lon:25.4615,  region:'Mediterranean',  bestTime:'Apr–Oct',  tags:'Romantic · Beach · Luxury',    desc:'Whitewashed villages perched on volcanic cliffs above the Aegean. The most romantic island in the Mediterranean.', continent:'europe',      col:5, row:6, size:'xl',  img:'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=520&h=640&fit=crop&q=90', gallery:['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80', 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=400&q=80'], rating:'4.9', trips:'847', flight:'~3h 30min', hotel:'$180–$450', temp:'26°C', lang:'Greek' },
  { id:2,  name:'Paris',        country:'France · Europe',   lat:48.8566,  lon:2.3522,   region:'Western Europe', bestTime:'Mar–Jun',  tags:'Culture · Food · Art',        desc:'Boulevards, museums, and cuisine unlike anywhere else. A city that rewards slow, deliberate exploration.', continent:'europe',      col:4, row:4, size:'lg',  img:'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=520&h=640&fit=crop&q=90', gallery:['https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80'], rating:'4.8', trips:'1.2k', flight:'~1h 20min', hotel:'$150–$380', temp:'18°C', lang:'French' },
  { id:3,  name:'Maldives',     country:'Maldives · Indian Ocean', lat:3.2028,   lon:73.2207,  region:'Indian Ocean',   bestTime:'Nov–Apr',  tags:'Luxury · Beach · Diving',     desc:'Overwater villas above crystal lagoons. The definition of barefoot luxury and total seclusion.', continent:'ocean',       col:3, row:4, size:'sm',  img:'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=520&h=640&fit=crop&q=90',  gallery:['https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80', 'https://images.unsplash.com/photo-1506953244844-973ea024.jpg?w=400&q=80'], rating:'4.9', trips:'634', flight:'~9h 30min', hotel:'$300–$900', temp:'30°C', lang:'Dhivehi' },
  { id:4,  name:'Kyoto',        country:'Japan · Asia',    lat:35.0116,  lon:135.7681, region:'East Asia',      bestTime:'Mar–May · Oct–Nov', tags:'Cultural · Temples · Nature', desc:"Ancient temples, bamboo forests, and tea ceremonies. Japan's cultural soul in every lantern-lit alleyway.", continent:'asia',        col:7, row:5, size:'lg',  img:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=520&h=640&fit=crop&q=90', gallery:['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80', 'https://images.unsplash.com/photo-1528164344705-47542687990d?w=400&q=80'], rating:'4.9', trips:'923', flight:'~12h', hotel:'$100–$350', temp:'22°C', lang:'Japanese' },
  { id:5,  name:'Dubai',        country:'UAE · Middle East',      lat:25.2048,  lon:55.2708,  region:'Middle East',    bestTime:'Nov–Mar',  tags:'Luxury · Modern · Desert',    desc:'Futuristic skylines meet ancient desert culture. A city of superlatives — tallest, largest, most ambitious.', continent:'middle-east', col:5, row:3, size:'sm',  img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=520&h=640&fit=crop&q=90', gallery:['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80'], rating:'4.7', trips:'1.5k', flight:'~7h', hotel:'$120–$500', temp:'28°C', lang:'Arabic' },
  { id:6,  name:'Marrakesh',    country:'Morocco · Africa',  lat:31.6295,  lon:-7.9811,  region:'North Africa',   bestTime:'Mar–May · Sep–Nov', tags:'Culture · Souks · Food', desc:'A sensory labyrinth of souks, spices, and centuries-old architecture. Every alley hides a new discovery.', continent:'africa',      col:3, row:4, size:'sm',  img:'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=520&h=640&fit=crop&q=90',  gallery:['https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&q=80', 'https://images.unsplash.com/photo-1548013146-72479-.jpg?w=400&q=80'], rating:'4.7', trips:'489', flight:'~3h 40min', hotel:'$80–$280', temp:'24°C', lang:'Arabic' },
  { id:7,  name:'Bali',         country:'Indonesia · Asia',lat:-8.3405,  lon:115.0920, region:'Southeast Asia', bestTime:'Apr–Oct',  tags:'Spiritual · Beach · Jungle',   desc:'Terraced rice fields, temple ceremonies, and surf-battered shores. The island of the gods delivers.', continent:'asia',        col:4, row:4, size:'sm',  img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=520&h=640&fit=crop&q=90', gallery:['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', 'https://images.unsplash.com/photo-1537944434965-cf4679d1a.jpg?w=400&q=80'], rating:'4.8', trips:'1.1k', flight:'~14h', hotel:'$60–$250', temp:'28°C', lang:'Balinese' },
  { id:8,  name:'Prague',       country:'Czechia · Europe',  lat:50.0755,  lon:14.4378,  region:'Central Europe', bestTime:'Apr–May · Sep–Oct', tags:'Historic · Architecture · Culture', desc:'Gothic spires, cobbled lanes, and Europe\'s most beautiful architecture preserved in one extraordinary city.', continent:'europe',      col:5, row:5, size:'mlg', img:'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=520&h=640&fit=crop&q=90', gallery:['https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&q=80', 'https://images.unsplash.com/photo-1513807016779-d51c0c02ba2b?w=400&q=80'], rating:'4.8', trips:'712', flight:'~2h 30min', hotel:'$90–$260', temp:'16°C', lang:'Czech' },
  { id:9,  name:'Norway',       country:'Norway · Europe',   lat:60.4720,  lon:8.4689,   region:'Scandinavia',    bestTime:'Jun–Aug',  tags:'Scenic · Fjords · Nature',    desc:'Dramatic fjords, northern lights, and vast wilderness that makes you feel truly small and alive.', continent:'europe',      col:5, row:4, size:'mlg', img:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=520&h=640&fit=crop&q=90', gallery:['https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80', 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=400&q=80'], rating:'4.9', trips:'398', flight:'~2h 40min', hotel:'$150–$400', temp:'14°C', lang:'Norwegian' },
  { id:10, name:'Bangkok',      country:'Thailand · Asia', lat:13.7563,  lon:100.5018, region:'Southeast Asia', bestTime:'Nov–Feb',  tags:'Street Food · Temples · Vibrant', desc:'Street food, golden temples, and a city that never sleeps. One of Asia\'s most electrifying capitals.', continent:'asia',        col:3, row:4, size:'sm',  img:'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=520&h=640&fit=crop&q=90',  gallery:['https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80', 'https://images.unsplash.com/photo-1563492065599-3aded1928215?w=400&q=80'], rating:'4.7', trips:'876', flight:'~11h', hotel:'$50–$200', temp:'32°C', lang:'Thai' },
  { id:11, name:'Amalfi Coast', country:'Italy · Europe',    lat:40.6340,  lon:14.6027,  region:'Southern Europe',bestTime:'May–Sep', tags:'Scenic · Coastal · Romantic', desc:'Clifftop villages tumbling into turquoise waters. The Amalfi Coast is Italy at its most breathtaking.', continent:'europe',      col:4, row:4, size:'sm',  img:'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=520&h=640&fit=crop&q=90', gallery:['https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=400&q=80', 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80'], rating:'4.8', trips:'567', flight:'~2h 30min', hotel:'$130–$420', temp:'24°C', lang:'Italian' },
];

function ArrowSVG() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2 6.5H11M11 6.5L7 2.5M11 6.5L7 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BentoGrid() {
  const [activeCont, setActiveCont] = useState('All');
  const [selIndex, setSelIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const sel = selIndex >= 0 ? DESTS[selIndex] : null;
  const ck = CONTINENT_MAP[activeCont];
  const shown = DESTS.filter(d => !ck || d.continent === ck).length;
  const countLabel = ck ? `Showing ${shown} ${activeCont} destinations` : `Showing ${DESTS.length} destinations`;

  const touchStartX = useRef(0);

  const openModal = (index) => {
    setSelIndex(index);
    setIsOpen(true);
    setShowHint(true);
    setTimeout(() => setShowHint(false), 3000);
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Keep selIndex for a bit to allow closing animation to play
    setTimeout(() => setSelIndex(-1), 500);
  }, []);

  const nextDest = useCallback(() => {
    if (selIndex < DESTS.length - 1) {
      setSelIndex(selIndex + 1);
    }
  }, [selIndex]);

  const prevDest = useCallback(() => {
    if (selIndex > 0) {
      setSelIndex(selIndex - 1);
    }
  }, [selIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextDest();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevDest();
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, nextDest, prevDest, closeModal]);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) diff > 0 ? nextDest() : prevDest();
  };

  return (
    <section className="bp-section">
      <div className="bp-header">
        <span className="bp-eyebrow">Explore destinations</span>
        <h2 className="bp-heading">Handpicked <em>Wonders</em></h2>
        <p className="bp-subtitle">Discover handpicked destinations worldwide</p>
      </div>

      <div className="bp-pills">
        {CONTINENTS.map(l => (
          <button key={l} className={`bp-pill${activeCont === l ? ' bp-pill--active' : ''}`} onClick={() => setActiveCont(l)}>{l}</button>
        ))}
      </div>

      <div className="dest-grid">
        {DESTS.map((d, i) => {
          const dimmed = ck && d.continent !== ck;
          return (
            <div
              key={d.id}
              className={`dest-card dest-card--${d.size}${dimmed ? ' dest-card--dim' : ''}`}
              onClick={() => !dimmed && openModal(i)}
            >
              <img src={d.img} alt={d.name} className="dc-img" loading="lazy" />
              <div className="card-ov" />
              <div className="card-border" />
              <span className="card-badge">{d.tags.split(' · ')[0]}</span>
              <div className="card-arrow"><ArrowSVG /></div>
              <div className="card-content">
                <div className="card-region">{d.region}</div>
                <div className="card-name">{d.name}</div>
                <div className="card-country-line">{d.country}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bp-loadmore">
        <span className="bp-count">{countLabel}</span>
        <button className="bp-viewall">View all destinations →</button>
      </div>

      <div id="modal-backdrop" className={isOpen ? 'open' : ''} onClick={closeModal} />
      <div id="modal-wrap" className={isOpen ? 'open' : ''} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {sel && (
          <div className="modal-card">
            <div className="modal-top">
              <div className="modal-photo">
                <img src={sel.img} alt={sel.name} className={`modal-img-el ${isOpen ? 'zoom-active' : ''}`} />
                <div className="modal-photo-ov" />
                <div className="modal-photo-label">
                  <div className="modal-region">{sel.region}</div>
                  <div className="modal-city">
                    {sel.name.slice(0, -4)}<em>{sel.name.slice(-4)}</em>
                  </div>
                </div>
              </div>

              <div className="modal-info">
                <div className="modal-close-row">
                  <button className="modal-close-btn" onClick={closeModal}>✕</button>
                </div>
                <div className="modal-country">{sel.country}</div>
                <div className="modal-rating-row">
                  <span className="modal-stars">★★★★★</span>
                  <span className="modal-rate-val">{sel.rating}</span>
                  <span className="modal-trips">· {sel.trips} trips</span>
                </div>
                <div className="modal-desc">{sel.desc}</div>
                
                <div className="modal-stats">
                  <div className="modal-stat-cell">
                    <div className="modal-stat-num">{sel.temp}</div>
                    <div className="modal-stat-lbl">Weather</div>
                  </div>
                  <div className="modal-stat-cell">
                    <div className="modal-stat-num">{sel.bestTime}</div>
                    <div className="modal-stat-lbl">Best Time</div>
                  </div>
                  <div className="modal-stat-cell">
                    <div className="modal-stat-num">{sel.lang}</div>
                    <div className="modal-stat-lbl">Language</div>
                  </div>
                </div>

                <div className="modal-chips">
                  <div className="modal-chip">
                    <div className="modal-chip-lbl">Flight Duration</div>
                    <div className="modal-chip-val">{sel.flight}</div>
                  </div>
                  <div className="modal-chip">
                    <div className="modal-chip-lbl">Luxury Hotel</div>
                    <div className="modal-chip-val">{sel.hotel}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-bottom">
              <div className="modal-nav">
                <button 
                  className="modal-nav-btn" 
                  onClick={prevDest}
                  style={{ opacity: selIndex === 0 ? 0 : 1, pointerEvents: selIndex === 0 ? 'none' : 'all' }}
                >
                  <svg viewBox="0 0 15 15"><path d="M13 7.5H2M2 7.5L6 3.5M2 7.5L6 11.5" stroke="currentColor" /></svg>
                  <div style={{ textAlign: 'left' }}>
                    <div className="modal-nav-hint">Previous</div>
                    <div className="modal-nav-name">{selIndex > 0 ? DESTS[selIndex - 1].name : ''}</div>
                  </div>
                </button>

                <div className="modal-counter">{selIndex + 1} / {DESTS.length}</div>

                <button 
                  className="modal-nav-btn" 
                  onClick={nextDest}
                  style={{ opacity: selIndex === DESTS.length - 1 ? 0 : 1, pointerEvents: selIndex === DESTS.length - 1 ? 'none' : 'all' }}
                >
                  <div style={{ textAlign: 'right' }}>
                    <div className="modal-nav-hint">Next</div>
                    <div className="modal-nav-name">{selIndex < DESTS.length - 1 ? DESTS[selIndex + 1].name : ''}</div>
                  </div>
                  <svg viewBox="0 0 15 15"><path d="M2 7.5H13M13 7.5L9 3.5M13 7.5L9 11.5" stroke="currentColor" /></svg>
                </button>
              </div>

              <div className="modal-kb-hint" style={{ opacity: showHint ? 1 : 0 }}>
                ← → to navigate · Esc to close
              </div>

              <button className="modal-cta">Plan this trip with Compass →</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
