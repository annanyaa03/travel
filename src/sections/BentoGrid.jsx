import { useState, useEffect, useCallback, useRef } from 'react';
import './BentoGrid.css';

const CONTINENTS = ['All', 'Europe', 'Asia', 'Middle East', 'Africa', 'Islands', 'Americas'];
const CONTINENT_MAP = { All: null, Europe: 'europe', Asia: 'asia', 'Middle East': 'middle-east', Africa: 'africa', Islands: 'ocean', Americas: 'americas' };

const DESTS = [
  { id:1,  name:'Santorini',    country:'Greece',   lat:36.3932,  lon:25.4615,  region:'Mediterranean',  bestTime:'Apr – Oct',  tags:'Romantic · Beach · Luxury',    fallback:'Whitewashed villages perched on volcanic cliffs above the Aegean. The most romantic island in the Mediterranean.', continent:'europe',      col:5, row:6, size:'xl',  img:'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=90', gallery:['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80', 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=400&q=80'], rating:4.9, trips:'1,200+', flight:'$320+', hotel:'$240+' },
  { id:2,  name:'Paris',        country:'France',   lat:48.8566,  lon:2.3522,   region:'Western Europe', bestTime:'Mar – Jun',  tags:'Culture · Food · Art',        fallback:'Boulevards, world-class museums, and cuisine unlike anywhere else. A city that rewards slow, deliberate exploration.', continent:'europe',      col:4, row:4, size:'lg',  img:'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1000&q=90', gallery:['https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80'], rating:4.8, trips:'2,500+', flight:'$280+', hotel:'$210+' },
  { id:3,  name:'Maldives',     country:'Maldives', lat:3.2028,   lon:73.2207,  region:'Indian Ocean',   bestTime:'Nov – Apr',  tags:'Luxury · Beach · Diving',     fallback:'Overwater villas above crystal lagoons. The definition of barefoot luxury and total seclusion.', continent:'ocean',       col:3, row:4, size:'sm',  img:'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=90',  gallery:['https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80', 'https://images.unsplash.com/photo-1506953244844-973ea024.jpg?w=400&q=80'], rating:5.0, trips:'800+', flight:'$850+', hotel:'$540+' },
  { id:4,  name:'Kyoto',        country:'Japan',    lat:35.0116,  lon:135.7681, region:'East Asia',      bestTime:'Mar–May · Oct–Nov', tags:'Cultural · Temples · Nature', fallback:"Ancient temples, bamboo forests, and tea ceremonies. Japan's cultural soul in every lantern-lit alleyway.", continent:'asia',        col:7, row:5, size:'lg',  img:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=90', gallery:['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80', 'https://images.unsplash.com/photo-1528164344705-47542687990d?w=400&q=80'], rating:4.9, trips:'1,500+', flight:'$640+', hotel:'$180+' },
  { id:5,  name:'Dubai',        country:'UAE',      lat:25.2048,  lon:55.2708,  region:'Middle East',    bestTime:'Nov – Mar',  tags:'Luxury · Modern · Desert',    fallback:'Futuristic skylines meet ancient desert culture. A city of superlatives — tallest, largest, most ambitious.', continent:'middle-east', col:5, row:3, size:'sm',  img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000&q=90', gallery:['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80'], rating:4.7, trips:'3,200+', flight:'$450+', hotel:'$290+' },
  { id:6,  name:'Marrakesh',    country:'Morocco',  lat:31.6295,  lon:-7.9811,  region:'North Africa',   bestTime:'Mar–May · Sept–Nov', tags:'Culture · Souks · Food', fallback:'A sensory labyrinth of souks, spices, and centuries-old architecture. Every alley hides a new discovery.', continent:'africa',      col:3, row:4, size:'sm',  img:'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=90',  gallery:['https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=400&q=80', 'https://images.unsplash.com/photo-1548013146-72479-.jpg?w=400&q=80'], rating:4.8, trips:'1,100+', flight:'$380+', hotel:'$140+' },
  { id:7,  name:'Bali',         country:'Indonesia',lat:-8.3405,  lon:115.0920, region:'Southeast Asia', bestTime:'Apr – Oct',  tags:'Spiritual · Beach · Jungle',   fallback:'Terraced rice fields, temple ceremonies, and surf-battered shores. The island of the gods delivers.', continent:'asia',        col:4, row:4, size:'sm',  img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&q=90', gallery:['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', 'https://images.unsplash.com/photo-1537944434965-cf4679d1a.jpg?w=400&q=80'], rating:4.9, trips:'4,500+', flight:'$720+', hotel:'$95+' },
  { id:8,  name:'Prague',       country:'Czechia',  lat:50.0755,  lon:14.4378,  region:'Central Europe', bestTime:'Apr–May · Sept–Oct', tags:'Historic · Architecture · Culture', fallback:'Gothic spires, cobbled lanes, and some of Europe\'s most beautiful architecture preserved in one city.', continent:'europe',      col:5, row:5, size:'mlg', img:'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1000&q=90', gallery:['https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&q=80', 'https://images.unsplash.com/photo-1513807016779-d51c0c02ba2b?w=400&q=80'], rating:4.8, trips:'1,800+', flight:'$240+', hotel:'$120+' },
  { id:9,  name:'Norway',       country:'Norway',   lat:60.4720,  lon:8.4689,   region:'Scandinavia',    bestTime:'Jun – Aug',  tags:'Scenic · Fjords · Nature',    fallback:'Dramatic fjords, northern lights, and vast wilderness that makes you feel truly small and alive.', continent:'europe',      col:5, row:4, size:'mlg', img:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1000&q=90', gallery:['https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80', 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=400&q=80'], rating:4.9, trips:'950+', flight:'$310+', hotel:'$260+' },
  { id:10, name:'Bangkok',      country:'Thailand', lat:13.7563,  lon:100.5018, region:'Southeast Asia', bestTime:'Nov – Feb',  tags:'Street Food · Temples · Vibrant', fallback:'Street food, golden temples, and a city that never sleeps. One of Asia\'s most electrifying capitals.', continent:'asia',        col:3, row:4, size:'sm',  img:'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=90',  gallery:['https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80', 'https://images.unsplash.com/photo-1563492065599-3aded1928215?w=400&q=80'], rating:4.7, trips:'5,400+', flight:'$680+', hotel:'$80+' },
  { id:11, name:'Amalfi Coast', country:'Italy',    lat:40.6340,  lon:14.6027,  region:'Southern Europe',bestTime:'May – Sept', tags:'Scenic · Coastal · Romantic', fallback:'Clifftop villages tumbling into turquoise waters. The Amalfi Coast is Italy at its most breathtaking.', continent:'europe',      col:4, row:4, size:'sm',  img:'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=1000&q=90', gallery:['https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=400&q=80', 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80'], rating:4.9, trips:'1,300+', flight:'$290+', hotel:'$340+' },
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
  const [isSwitching, setIsSwitching] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  // API Data State
  const [weather, setWeather] = useState(null);
  const [wiki, setWiki] = useState(null);
  const [country, setCountry] = useState(null);

  const sel = selIndex >= 0 ? DESTS[selIndex] : null;
  const ck = CONTINENT_MAP[activeCont];
  const shown = DESTS.filter(d => !ck || d.continent === ck).length;
  const countLabel = ck ? `Showing ${shown} of ${shown} ${activeCont} destinations` : `Showing ${DESTS.length} of 29 destinations`;

  const touchStartX = useRef(0);

  const fetchAPIs = useCallback(async (d) => {
    setWeather(null); setWiki(null); setCountry(null);
    const [wRes, wkRes, cRes] = await Promise.allSettled([
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${d.lat}&longitude=${d.lon}&current_weather=true`).then(r=>r.json()),
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(d.name)}`).then(r=>r.json()),
      fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(d.country === 'UAE' ? 'United Arab Emirates' : d.country === 'Czechia' ? 'Czech Republic' : d.country)}?fields=languages,capital,currencies`).then(r=>r.json())
    ]);
    if(wRes.status === 'fulfilled') setWeather(wRes.value.current_weather); else setWeather('error');
    if(wkRes.status === 'fulfilled') {
      const text = wkRes.value.extract || d.fallback;
      setWiki(text.length > 220 ? text.slice(0, 220) + '...' : text);
    } else setWiki(d.fallback);
    if(cRes.status === 'fulfilled' && cRes.value[0]) {
      const data = cRes.value[0];
      setCountry({ lang: Object.values(data.languages || {})[0] || '—', capital: (data.capital || [])[0] || '—', currency: Object.values(data.currencies || {})[0]?.name || '—' });
    } else setCountry({ lang: '—', capital: '—', currency: '—' });
  }, []);

  const openPanel = (index) => {
    setSelIndex(index);
    setIsOpen(true);
    fetchAPIs(DESTS[index]);
    setShowHint(true);
    setTimeout(() => setShowHint(false), 3000);
  };

  const closePanel = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setSelIndex(-1), 600);
  }, []);

  const nextDest = useCallback(() => {
    if (selIndex < DESTS.length - 1) {
      setIsSwitching(true);
      setTimeout(() => {
        const nextIdx = selIndex + 1;
        setSelIndex(nextIdx);
        fetchAPIs(DESTS[nextIdx]);
        setIsSwitching(false);
      }, 300);
    }
  }, [selIndex, fetchAPIs]);

  const prevDest = useCallback(() => {
    if (selIndex > 0) {
      setIsSwitching(true);
      setTimeout(() => {
        const prevIdx = selIndex - 1;
        setSelIndex(prevIdx);
        fetchAPIs(DESTS[prevIdx]);
        setIsSwitching(false);
      }, 300);
    }
  }, [selIndex, fetchAPIs]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextDest();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevDest();
      if (e.key === 'Escape') closePanel();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, nextDest, prevDest, closePanel]);

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
        <p className="bp-subtitle">Discover 29 handpicked destinations worldwide</p>
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
              style={{ gridColumn: `span ${d.col}`, gridRow: `span ${d.row}` }}
              onClick={() => !dimmed && openPanel(i)}
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

      <div className={`split-overlay${isOpen ? ' split-overlay--open' : ''}${isSwitching ? ' split-overlay--switching' : ''}`} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {sel && (
          <>
            <div className="split-left" onClick={closePanel}>
              <div className="split-photo" style={{ backgroundImage: `url(${sel.img})` }} />
              <div className="split-photo-ov" />
              <div className="left-overlay">
                <div className="loc-badge">
                  <span className="loc-dot"></span>
                  <span>{sel.region}</span>
                  <span className="loc-sep">·</span>
                  <span>{sel.country}</span>
                </div>
                <div className="left-title">
                  {sel.name.slice(0, sel.name.length > 5 ? -4 : -2)}
                  <em>{sel.name.slice(sel.name.length > 5 ? -4 : -2)}</em>
                </div>
                {/* Simplified italic logic: if name is Santorini, we want Santo<em>rini</em>. 
                    Let's just use manual split or a simpler regex if possible. 
                    Actually, Santorini italic part is usually the last few letters. 
                    The user's example: Santo<em>rini</em>. 
                    I'll just hardcode a small slice logic: slice(-4) for italics.
                */}
              </div>
            </div>
            
            <div className="split-right">
              <button className="split-close" onClick={closePanel}>← Close</button>
              <div className="sr-spacer" />
              
              <div className="split-body">
                <div className="sr-rating-row">
                  <div className="sr-stars">★★★★★</div>
                  <div className="sr-rate-num">{sel.rating}</div>
                  <div className="sr-trips">{sel.trips} trips booked</div>
                </div>

                <div className="sr-desc">
                  {!wiki ? (
                    <div className="sk-box">
                      <div className="sk-line" /><div className="sk-line" /><div className="sk-line" style={{ width: '60%' }} />
                    </div>
                  ) : wiki}
                </div>

                <div className="sr-stats">
                  <div className="stat-item"><div className="stat-val">{weather ? (weather === 'error' ? '—°C' : `${Math.round(weather.temperature)}°C`) : '—°C'}</div><div className="stat-lbl">Weather</div></div>
                  <div className="stat-item"><div className="stat-val">{sel.bestTime}</div><div className="stat-lbl">Best Time</div></div>
                  <div className="stat-item"><div className="stat-val">{country ? country.lang : '—'}</div><div className="stat-lbl">Language</div></div>
                </div>

                <div className="sr-chips-row">
                  <div className="sr-chip"><span className="chip-lbl">Flights</span>{sel.flight}</div>
                  <div className="sr-chip"><span className="chip-lbl">Stay</span>{sel.hotel}/night</div>
                </div>

                <div className="sr-chips-row">
                  <div className="sr-chip"><span className="chip-lbl">Capital</span>{country ? country.capital : '—'}</div>
                  <div className="sr-chip"><span className="chip-lbl">Currency</span>{country ? country.currency : '—'}</div>
                </div>

                <div className="sr-tags">
                  {sel.tags.split(' · ').map(t => <span key={t} className="tag-pill">{t}</span>)}
                </div>

                <div className="sr-gallery">
                  {sel.gallery.map((img, idx) => (
                    <div key={idx} className="gal-img"><img src={img} alt="gallery" /></div>
                  ))}
                </div>

                <div className="panel-nav">
                  <button className={`pnav-btn${selIndex === 0 ? ' pnav-off' : ''}`} onClick={prevDest}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"><path d="M15 9H3M3 9L7 5M3 9L7 13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div><div className="pnav-hint">Previous</div><div className="pnav-name">{selIndex > 0 ? DESTS[selIndex-1].name : ''}</div></div>
                  </button>
                  <div className="pnav-count">{selIndex + 1} / {DESTS.length}</div>
                  <button className={`pnav-btn right${selIndex === DESTS.length - 1 ? ' pnav-off' : ''}`} onClick={nextDest}>
                    <div><div className="pnav-hint">Next</div><div className="pnav-name">{selIndex < DESTS.length - 1 ? DESTS[selIndex+1].name : ''}</div></div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"><path d="M3 9L15 9M15 9L11 5M15 9L11 13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>

                <div className={`pnav-kbhint${showHint ? ' pnav-hint--visible' : ''}`}>← → to navigate · Esc to close</div>

                <button className="sr-cta">Plan this trip with Compass →</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
