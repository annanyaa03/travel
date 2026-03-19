import { useNavigate } from 'react-router-dom';
import './DestinationExplorer.css';

export default function DestinationExplorer() {
  const navigate = useNavigate();

  return (
    <section style={{padding:'80px 40px',background:'var(--bg-primary)',
      position:'relative',overflow:'hidden',textAlign:'center'}}>

      <div style={{position:'absolute',top:'50%',left:'50%',
        transform:'translate(-50%,-50%) rotate(45deg)',
        fontSize:'200px',fontWeight:'900',
        color:'rgba(26,18,9,0.03)',
        whiteSpace:'nowrap',pointerEvents:'none',
        letterSpacing:'20px',zIndex:'0'}}>PASSPORT</div>

      <h2 style={{fontSize:'42px',fontWeight:'800',
        color:'var(--text-primary)',marginBottom:'12px',position:'relative',
        zIndex:'1'}}>Stamp Your{' '}
        <span style={{color:'var(--brand-main)'}}>Passport</span>
      </h2>

      <p style={{color:'var(--text-muted)',fontSize:'16px',
        marginBottom:'60px',position:'relative',zIndex:'1'}}>
        Explore our handpicked destinations worldwide
      </p>

      <div style={{display:'flex',flexWrap:'wrap',
        justifyContent:'center',gap:'32px',
        position:'relative',zIndex:'1'}}>

        {/* STAMP 1 */}
        <div className="pstamp" style={{transform:'rotate(-4deg)'}}>
          <img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=480&fit=crop" alt="Santorini"/>
          <div className="ps-tint" style={{background:'rgba(59,130,246,0.25)'}}></div>
          <div className="ps-overlay"></div>
          <div className="ps-border"></div>
          <div className="ps-circle"><span>APPROVED</span></div>
          <div className="ps-content">
            <div className="ps-flag">🇬🇷</div>
            <div className="ps-name">SANTORINI</div>
            <div className="ps-country">GREECE</div>
            <div className="ps-stars">★★★★★</div>
            <div className="ps-year">EST. 2024</div>
          </div>
          <div className="ps-tooltip">
            <div className="ptt-title">Santorini</div>
            <div className="ptt-desc">Stunning sunsets and white-washed buildings</div>
            <div className="ptt-row">
              <span>📅 Apr–Oct</span>
              <span>💰 $$$</span>
            </div>
            <div className="ptt-tags">
              <span>Oia Sunset</span>
              <span>Red Beach</span>
              <span>Akrotiri</span>
            </div>
            <button className="ptt-btn">Explore Now →</button>
          </div>
        </div>

        {/* STAMP 2 */}
        <div className="pstamp" style={{transform:'rotate(3deg)'}}>
          <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=480&fit=crop" alt="Kyoto"/>
          <div className="ps-tint" style={{background:'rgba(239,68,68,0.25)'}}></div>
          <div className="ps-overlay"></div>
          <div className="ps-border"></div>
          <div className="ps-circle"><span>APPROVED</span></div>
          <div className="ps-content">
            <div className="ps-flag">🇯🇵</div>
            <div className="ps-name">KYOTO</div>
            <div className="ps-country">JAPAN</div>
            <div className="ps-stars">★★★★★</div>
            <div className="ps-year">EST. 2024</div>
          </div>
          <div className="ps-tooltip">
            <div className="ptt-title">Kyoto</div>
            <div className="ptt-desc">Ancient temples and cherry blossoms</div>
            <div className="ptt-row">
              <span>📅 Mar–May</span>
              <span>💰 $$</span>
            </div>
            <div className="ptt-tags">
              <span>Fushimi Inari</span>
              <span>Kinkaku-ji</span>
              <span>Arashiyama</span>
            </div>
            <button className="ptt-btn">Explore Now →</button>
          </div>
        </div>

        {/* STAMP 3 */}
        <div className="pstamp" style={{transform:'rotate(-6deg)'}}>
          <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=480&fit=crop" alt="Maldives"/>
          <div className="ps-tint" style={{background:'rgba(6,182,212,0.25)'}}></div>
          <div className="ps-overlay"></div>
          <div className="ps-border"></div>
          <div className="ps-circle"><span>APPROVED</span></div>
          <div className="ps-content">
            <div className="ps-flag">🇲🇻</div>
            <div className="ps-name">MALDIVES</div>
            <div className="ps-country">ISLAND</div>
            <div className="ps-stars">★★★★★</div>
            <div className="ps-year">EST. 2024</div>
          </div>
          <div className="ps-tooltip">
            <div className="ptt-title">Maldives</div>
            <div className="ptt-desc">Crystal lagoons and overwater bungalows</div>
            <div className="ptt-row">
              <span>📅 Nov–Apr</span>
              <span>💰 $$$$</span>
            </div>
            <div className="ptt-tags">
              <span>North Male</span>
              <span>Baa Atoll</span>
              <span>Hulhumale</span>
            </div>
            <button className="ptt-btn">Explore Now →</button>
          </div>
        </div>

        {/* STAMP 4 */}
        <div className="pstamp" style={{transform:'rotate(5deg)'}}>
          <img src="https://images.unsplash.com/photo-1597212618440-806262de4f0b?w=400&h=480&fit=crop" alt="Marrakesh"/>
          <div className="ps-tint" style={{background:'rgba(245,158,11,0.25)'}}></div>
          <div className="ps-overlay"></div>
          <div className="ps-border"></div>
          <div className="ps-circle"><span>APPROVED</span></div>
          <div className="ps-content">
            <div className="ps-flag">🇲🇦</div>
            <div className="ps-name">MARRAKESH</div>
            <div className="ps-country">MOROCCO</div>
            <div className="ps-stars">★★★★☆</div>
            <div className="ps-year">EST. 2024</div>
          </div>
          <div className="ps-tooltip">
            <div className="ptt-title">Marrakesh</div>
            <div className="ptt-desc">Sensory explosion of spices and culture</div>
            <div className="ptt-row">
              <span>📅 Mar–May</span>
              <span>💰 $</span>
            </div>
            <div className="ptt-tags">
              <span>Jemaa el-Fnaa</span>
              <span>Majorelle</span>
              <span>Medina</span>
            </div>
            <button className="ptt-btn">Explore Now →</button>
          </div>
        </div>

        {/* STAMP 5 */}
        <div className="pstamp" style={{transform:'rotate(-3deg)'}}>
          <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=480&fit=crop" alt="Patagonia"/>
          <div className="ps-tint" style={{background:'var(--brand-glow)'}}></div>
          <div className="ps-overlay"></div>
          <div className="ps-border"></div>
          <div className="ps-circle"><span>APPROVED</span></div>
          <div className="ps-content">
            <div className="ps-flag">🇦🇷</div>
            <div className="ps-name">PATAGONIA</div>
            <div className="ps-country">ARGENTINA</div>
            <div className="ps-stars">★★★★★</div>
            <div className="ps-year">EST. 2024</div>
          </div>
          <div className="ps-tooltip">
            <div className="ptt-title">Patagonia</div>
            <div className="ptt-desc">Glaciers, peaks and turquoise lakes</div>
            <div className="ptt-row">
              <span>📅 Nov–Mar</span>
              <span>💰 $$$</span>
            </div>
            <div className="ptt-tags">
              <span>Perito Moreno</span>
              <span>Fitz Roy</span>
              <span>Torres del Paine</span>
            </div>
            <button className="ptt-btn">Explore Now →</button>
          </div>
        </div>

        {/* STAMP 6 */}
        <div className="pstamp" style={{transform:'rotate(6deg)'}}>
          <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=480&fit=crop" alt="Bali"/>
          <div className="ps-tint" style={{background:'rgba(168,85,247,0.25)'}}></div>
          <div className="ps-overlay"></div>
          <div className="ps-border"></div>
          <div className="ps-circle"><span>APPROVED</span></div>
          <div className="ps-content">
            <div className="ps-flag">🇮🇩</div>
            <div className="ps-name">BALI</div>
            <div className="ps-country">INDONESIA</div>
            <div className="ps-stars">★★★★☆</div>
            <div className="ps-year">EST. 2024</div>
          </div>
          <div className="ps-tooltip">
            <div className="ptt-title">Bali</div>
            <div className="ptt-desc">Rice terraces, temples and beaches</div>
            <div className="ptt-row">
              <span>📅 Apr–Oct</span>
              <span>💰 $</span>
            </div>
            <div className="ptt-tags">
              <span>Ubud</span>
              <span>Seminyak</span>
              <span>Tanah Lot</span>
            </div>
            <button className="ptt-btn">Explore Now →</button>
          </div>
        </div>

      </div>

      <div style={{marginTop:'60px',position:'relative',zIndex:'1'}}>
        <p style={{color:'var(--text-muted)',fontSize:'13px',marginBottom:'16px'}}>
          Showing 6 of 30+ destinations
        </p>
        <button
          onClick={() => navigate('/destinations')}
          style={{display:'inline-block',
            background:'var(--brand-grad)',
            color:'white',fontSize:'14px',fontWeight:'700',
            padding:'14px 36px',borderRadius:'30px',
            border:'none',cursor:'pointer',textDecoration:'none'}}>
          View All Destinations →
        </button>
      </div>

    </section>
  );
}
