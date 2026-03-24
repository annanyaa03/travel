import React, { useState, useEffect } from 'react';
import { HiOutlineRefresh, HiOutlineSwitchHorizontal } from 'react-icons/hi';
import './CurrencyConverter.css';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [rate, setRate] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 'INR'];

  const fetchRate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      const data = await res.json();
      if (data.rates && data.rates[to]) {
        const newRate = data.rates[to];
        setRate(newRate);
        setResult((amount * newRate).toFixed(2));
      }
    } catch (err) {
      console.error('Currency API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRate();
  }, [from, to, amount]);

  const handleConvert = (e) => {
    e.preventDefault();
    if (rate) setResult((amount * rate).toFixed(2));
  };

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="currency-converter glass-panel">
      <div className="converter-header">
        <HiOutlineSwitchHorizontal className="header-icon" />
        <h4>Currency <em>Converter</em></h4>
      </div>

      <form onSubmit={handleConvert}>
        <div className="input-group">
          <label>Amount</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
          />
        </div>

        <div className="conversion-row">
          <div className="select-box">
            <label>From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <button type="button" className="swap-btn" onClick={swapCurrencies}>
            <HiOutlineRefresh />
          </button>

          <div className="select-box">
            <label>To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="result-area">
          {loading ? (
            <span className="loading-text">Fetching rates...</span>
          ) : result ? (
            <div className="result-display">
              <span className="result-val">{result}</span>
              <span className="result-symbol">{to}</span>
            </div>
          ) : null}
        </div>
      </form>
      <p className="rate-info">1 {from} = {rate?.toFixed(4)} {to}</p>
    </div>
  );
}
