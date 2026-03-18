import { useState, useEffect } from 'react';
import { FaExchangeAlt, FaMoneyBillWave, FaSpinner } from 'react-icons/fa';
import './CurrencyConverter.css';

export default function CurrencyConverter() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [converted, setConverted] = useState(null);
  const [loading, setLoading] = useState(true);

  // We use the free Frankfurter API which tracks ECB rates
  useEffect(() => {
    fetch('https://api.frankfurter.app/latest')
      .then(res => res.json())
      .then(data => {
        setRates({ EUR: 1, ...data.rates }); // API base is usually EUR
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading || !rates[from] || !rates[to]) return;
    // Cross conversion through EUR base
    const baseAmount = from === 'EUR' ? amount : amount / rates[from];
    const finalAmount = to === 'EUR' ? baseAmount : baseAmount * rates[to];
    setConverted(finalAmount.toFixed(2));
  }, [amount, from, to, rates, loading]);

  const currencies = Object.keys(rates).sort();

  return (
    <div className="currency-widget glass-panel">
      <div className="widget-header">
        <FaMoneyBillWave className="widget-icon" />
        <h3>Currency Exchange</h3>
      </div>

      {loading ? (
        <div className="currency-loading"><FaSpinner className="spin" /> Loading live rates...</div>
      ) : (
        <div className="converter-body">
          <div className="amount-input">
            <label>Amount</label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="currency-selectors">
            <div className="curr-select">
              <label>From</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}>
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <button className="swap-btn" onClick={() => { setFrom(to); setTo(from); }}>
              <FaExchangeAlt />
            </button>

            <div className="curr-select">
              <label>To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}>
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="conversion-result">
            <span className="result-label">{amount} {from} equals</span>
            <div className="result-value">
              {converted} <span>{to}</span>
            </div>
          </div>
          
          <div className="api-credit">Live rates via ECB / Frankfurter API</div>
        </div>
      )}
    </div>
  );
}
