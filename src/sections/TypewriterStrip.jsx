import { useState, useEffect, useRef } from 'react';
import './TypewriterStrip.css';

const twTexts = [
  "waiting in Santorini 🇬🇷",
  "hiding in Bali 🇮🇩",
  "calling from Kyoto 🇯🇵",
  "floating in Maldives 🇲🇻",
  "rising in Patagonia 🇦🇷",
  "blooming in Morocco 🇲🇦",
  "glowing in Paris 🇫🇷",
  "soaring in Norway 🇳🇴",
  "shining in Dubai 🇦🇪",
  "calling from Prague 🇨🇿",
  "waiting in Barcelona 🇪🇸",
];

export default function TypewriterStrip() {
  const [displayed, setDisplayed] = useState('');
  const state = useRef({ index: 0, char: 0, deleting: false, alive: true });
  const timerRef = useRef(null);

  useEffect(() => {
    const s = state.current;
    s.alive = true;

    function tick() {
      if (!s.alive) return;

      const current = twTexts[s.index];

      if (!s.deleting) {
        s.char++;
        setDisplayed(current.slice(0, s.char));
        if (s.char === current.length) {
          s.deleting = true;
          timerRef.current = setTimeout(tick, 2200);
        } else {
          timerRef.current = setTimeout(tick, 65);
        }
      } else {
        s.char--;
        setDisplayed(current.slice(0, s.char));
        if (s.char === 0) {
          s.deleting = false;
          s.index = (s.index + 1) % twTexts.length;
          timerRef.current = setTimeout(tick, 400);
        } else {
          timerRef.current = setTimeout(tick, 35);
        }
      }
    }

    timerRef.current = setTimeout(tick, 400);

    return () => {
      s.alive = false;
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="typewriter-strip">
      <div className="tw-inner">
        <div className="tw-left">
          <span className="tw-prefix">Your next adventure is</span>
        </div>
        <div className="tw-right">
          <span className="tw-changing">{displayed}</span>
          <span className="tw-cursor"></span>
        </div>
      </div>
    </section>
  );
}
