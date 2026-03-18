import { useState, useEffect } from 'react';
import { deals } from '../data';
import './HotDeals.css';

function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, mins: 0, secs: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(endDate).getTime() - now;
      
      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="countdown-grid">
      <div className="time-box"><span>{timeLeft.days}</span>d</div>
      <div className="time-box"><span>{timeLeft.hours}</span>h</div>
      <div className="time-box"><span>{timeLeft.mins}</span>m</div>
      <div className="time-box"><span>{timeLeft.secs}</span>s</div>
    </div>
  );
}

export default function HotDeals() {
  return (
    <section className="hot-deals">
      <div className="container">
        <h2 className="section-title">Hot <span>Deals 🔥</span></h2>
        <p className="section-subtitle">Limited time offers, grab them before they're gone</p>

        <div className="deals-grid">
          {deals.map(deal => (
            <div key={deal.id} className="deal-card glass-panel">
              <div className="deal-img">
                <img src={deal.image} alt={deal.name} />
                <div className="deal-badge">DEAL</div>
                <div className="deal-timer">
                  <CountdownTimer endDate={deal.endDate} />
                </div>
              </div>
              
              <div className="deal-info">
                <h3>{deal.name}, {deal.country}</h3>
                <div className="price-row">
                  <div className="prices">
                    <span className="old-price">${deal.oldPrice}</span>
                    <span className="new-price">${deal.newPrice}</span>
                  </div>
                  <div className="savings-badge">Save {deal.savings}</div>
                </div>
                <button className="btn btn-primary book-btn">Book Now →</button>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-center">
          <button className="btn btn-ghost">View All Deals →</button>
        </div>
      </div>
    </section>
  );
}
