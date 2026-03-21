import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import './Hotels.css';
import './HotelsExtra.css';

const DEFAULT_CITY = 'Paris';
const OTM_API_KEY = '5ae2e3f221c38a28845f05b66b16781a10a0af4e0b5e89d18e044a76';

// Helper: Map weather codes to emojis
const mapWeatherEmoji = (code) => {
  if (code === 0) return '☀️';
  if (code >= 1 && code <= 3) return '⛅';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code === 95) return '⛈️';
  return '⛅';
};



// Helper: Animated Counter
const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;
    let totalMilisecForCount = 1000;
    let timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start > end) start = end;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, totalMilisecForCount / 40);
    return () => clearInterval(timer);
  }, [value]);
  return <>{displayValue}</>;
};

// --- Images Mapping ---
const cityImages = {
  paris: [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=520&h=360&fit=crop&q=85',
  ],
  tokyo: [
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1606046604972-77cc76aee944?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=520&h=360&fit=crop&q=85',
  ],
  bali: [
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1574080598459-7e36e8bef3df?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=520&h=360&fit=crop&q=85',
  ],
  dubai: [
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=520&h=360&fit=crop&q=85',
  ],
  london: [
    'https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=520&h=360&fit=crop&q=85',
  ],
  default: [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=520&h=360&fit=crop&q=85',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=520&h=360&fit=crop&q=85',
  ]
};

cityImages.santorini = cityImages.bali;
cityImages.kyoto = cityImages.tokyo;
cityImages.newyork = cityImages.london;
cityImages.rome = cityImages.paris;
cityImages.barcelona = cityImages.paris;
cityImages.amsterdam = cityImages.london;

function getHotelImage(city, index) {
  const key = city.toLowerCase().trim();
  const list = cityImages[key] || cityImages.default;
  return list[index % list.length];
}

// --- Dynamic Prices ---
function seedPrice(hotelName, stars) {
  let seed = 0;
  for (let i = 0; i < hotelName.length; i++) {
    seed += hotelName.charCodeAt(i) * (i + 1);
  }
  seed = seed % 1000;

  const ranges = {
    5: { min: 320, max: 680 },
    4: { min: 160, max: 320 },
    3: { min: 85,  max: 180 },
    2: { min: 50,  max: 95  },
    1: { min: 30,  max: 60  }
  };
  const { min, max } = ranges[stars] || ranges[3];
  const range = max - min;
  return min + (seed % range);
}

// --- Dynamic Descriptions ---
const descTemplates = [
  (name, city, stars) => `${name} offers ${stars === 5 ? 'unrivalled luxury' : 'exceptional comfort'} in the heart of ${city}. A favourite among discerning travellers.`,
  (name, city, stars) => `Nestled in ${city}, ${name} combines ${stars >= 4 ? 'elegant design with world-class service' : 'comfort with convenient city access'}.`,
  (name, city, stars) => `A ${stars >= 5 ? 'landmark' : 'well-loved'} property in ${city}, ${name} is celebrated for its ${stars >= 4 ? 'refined atmosphere and attentive staff' : 'great location and welcoming hospitality'}.`,
  (name, city, stars) => `${name} stands as one of ${city}'s ${stars >= 5 ? 'most prestigious addresses' : 'most recommended stays'}, blending comfort with ${stars >= 4 ? 'sophistication' : 'practicality'}.`,
  (name, city, stars) => `Steps from ${city}'s finest attractions, ${name} delivers ${stars >= 4 ? 'an impeccable stay' : 'a comfortable and convenient base'} for every kind of traveller.`,
  (name, city, stars) => `With its ${stars >= 5 ? 'opulent interiors and flawless service' : 'inviting rooms and prime location'}, ${name} is a top-rated choice in ${city}.`,
  (name, city, stars) => `${name} in ${city} offers ${stars >= 4 ? 'beautifully appointed rooms and exceptional dining' : 'clean comfortable rooms and friendly service'} at great value.`,
  (name, city, stars) => `Guests consistently praise ${name} for its ${stars >= 4 ? 'luxurious amenities, stunning views, and outstanding service' : 'convenient location, helpful staff, and comfortable beds'}.`
];

function getHotelDesc(hotelName, city, stars, index) {
  const template = descTemplates[index % descTemplates.length];
  return template(hotelName, city, stars || 3);
}

const G_AMENITIES = ["WiFi", "Pool", "Spa", "Gym", "Parking", "Bar", "Restaurant", "Pet Friendly"];

// --- Fix 1: Timeout Wrapper ---
function fetchWithTimeout(url, options = {}, ms = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal })
    .then(res => { clearTimeout(timer); return res; })
    .catch(err => { clearTimeout(timer); throw err; });
}

// --- Fix 3: Overpass Union Query ---
async function fetchOverpass(lat, lon, city) {
  const d = 0.18;
  const bbox = `${lat-d},${lon-d},${lat+d},${lon+d}`;
  const query = `[out:json][timeout:8];(node["tourism"="hotel"](${bbox});node["tourism"="hostel"](${bbox});node["tourism"="guest_house"](${bbox});way["tourism"="hotel"](${bbox}););out body center 35;`;
  const res = await fetchWithTimeout(
    'https://overpass-api.de/api/interpreter',
    { method: 'POST', body: query },
    2500
  );
  const data = await res.json();
  return (data.elements || [])
    .filter(el => el.tags?.name)
    .map((el, i) => {
      const name = el.tags.name;
      const stars = el.tags.stars ? parseInt(el.tags.stars) : 4;
      return {
        id: `osm_${el.id}`,
        name,
        lat: el.lat || el.center?.lat || lat,
        lon: el.lon || el.center?.lon || lon,
        address: [el.tags['addr:housenumber'], el.tags['addr:street']].filter(Boolean).join(' ') || el.tags['addr:city'] || '',
        stars,
        price: seedPrice(name, stars),
        desc: getHotelDesc(name, city, stars, i),
        img: getHotelImage(city, i),
        rating: (stars * 1.6) + (Math.sin(i) * 0.5),
        amenities: G_AMENITIES.slice(0, 4),
        badge: ["Editor's Choice", "Popular", "Best Value", "Boutique", "Trending"][i % 5],
        point: { lat: el.lat || el.center?.lat || lat, lon: el.lon || el.center?.lon || lon }
      };
    });
}

// --- Fix 5: Static Fallbacks ---
const fallbackHotels = {
  london: [
    { name:'The Savoy', address:'Strand, London WC2R 0EU', stars:5, price:520 },
    { name:'Claridge\'s', address:'Brook Street, Mayfair, London', stars:5, price:610 },
    { name:'The Ritz London', address:'150 Piccadilly, London W1J 9BR', stars:5, price:580 },
    { name:'45 Park Lane', address:'45 Park Lane, London W1K 1PN', stars:5, price:490 },
    { name:'The Hoxton Shoreditch', address:'81 Great Eastern Street, London', stars:4, price:185 },
    { name:'citizenM Tower of London', address:'40 Trinity Square, London', stars:4, price:165 },
    { name:'Qbic London City', address:'42 Adler Street, London E1 1EE', stars:3, price:95 },
    { name:'YHA London Central', address:'104 Bolsover Street, London', stars:2, price:55 }
  ],
  newyork: [
    { name:'The Plaza Hotel', address:'Fifth Avenue at Central Park South', stars:5, price:695 },
    { name:'The St. Regis New York', address:'2 East 55th Street, New York', stars:5, price:720 },
    { name:'11 Howard', address:'11 Howard Street, SoHo, New York', stars:4, price:285 },
    { name:'The Williamsburg Hotel', address:'96 Wythe Avenue, Brooklyn', stars:4, price:220 },
    { name:'Arlo NoMad', address:'11 East 31st Street, New York', stars:4, price:195 },
    { name:'Hotel 50 Bowery', address:'50 Bowery, New York NY 10013', stars:4, price:210 },
    { name:'YOTEL New York', address:'570 Tenth Avenue, New York', stars:3, price:120 },
    { name:'Pod 51', address:'230 East 51st Street, New York', stars:3, price:99 }
  ],
  rome: [
    { name:'Hotel de Russie', address:'Via del Babuino 9, Rome', stars:5, price:480 },
    { name:'Hotel Eden', address:'Via Ludovisi 49, Rome', stars:5, price:520 },
    { name:'J.K. Place Roma', address:'Via di Monte d\'Oro 30, Rome', stars:5, price:440 },
    { name:'Fendi Private Suites', address:'Largo Carlo Goldoni 420, Rome', stars:5, price:680 },
    { name:'Hotel Raphael', address:'Largo Febo 2, Rome', stars:4, price:220 },
    { name:'Chapter Roma', address:'Via di Santa Maria Maggiore', stars:4, price:195 },
    { name:'The Beehive', address:'Via Marghera 8, Rome', stars:3, price:85 },
    { name:'Hotel Artorius', address:'Via del Pellegrino 67, Rome', stars:3, price:110 }
  ],
  barcelona: [
    { name:'Hotel Arts Barcelona', address:'Carrer de la Marina 19-21', stars:5, price:420 },
    { name:'W Barcelona', address:'Plaça de la Rosa dels Vents 1', stars:5, price:390 },
    { name:'Mandarin Oriental Barcelona', address:'Passeig de Gràcia 38-40', stars:5, price:460 },
    { name:'Casa Camper Barcelona', address:'Carrer d\'Elisabets 11', stars:4, price:235 },
    { name:'Hotel Brummell', address:'Carrer Nou de la Rambla 174', stars:4, price:180 },
    { name:'Ohla Barcelona', address:'Via Laietana 49, Barcelona', stars:4, price:195 },
    { name:'Generator Barcelona', address:'Carrer de Còrsega 373', stars:3, price:75 },
    { name:'Equity Point Gothic', address:'Plaça de la Vila de Madrid 3', stars:2, price:45 }
  ],
  santorini: [
    { name:'Canaves Oia Suites', address:'Oia, Santorini 847 02', stars:5, price:680 },
    { name:'Katikies Hotel', address:'Oia, Santorini 847 02', stars:5, price:620 },
    { name:'Mystique Hotel', address:'Oia, Santorini 847 02', stars:5, price:590 },
    { name:'Vedema Resort', address:'Megalochori, Santorini', stars:5, price:510 },
    { name:'Astra Suites', address:'Imerovigli, Santorini', stars:4, price:320 },
    { name:'Santorini Secret', address:'Oia, Santorini 847 02', stars:4, price:280 },
    { name:'Hotel Keti', address:'Fira, Santorini 847 00', stars:3, price:145 },
    { name:'Pelican Hotel', address:'Fira, Santorini 847 00', stars:3, price:120 }
  ],
  amsterdam: [
    { name:'Hotel V Nesplein', address:'Nes 49, Amsterdam 1012 KD', stars:4, price:210 },
    { name:'The Dylan Amsterdam', address:'Keizersgracht 384, Amsterdam', stars:5, price:420 },
    { name:'Pulitzer Amsterdam', address:'Prinsengracht 315-331', stars:5, price:380 },
    { name:'Andaz Amsterdam', address:'Prinsengracht 587, Amsterdam', stars:5, price:350 },
    { name:'Hotel Brouwer', address:'Singel 83, Amsterdam 1012 VE', stars:3, price:115 },
    { name:'The Student Hotel Amsterdam', address:'Wibautstraat 129', stars:3, price:95 },
    { name:'Generator Amsterdam', address:'Mauritskade 57, Amsterdam', stars:3, price:65 },
    { name:'Stayokay Amsterdam', address:'Stadhouderskade 78', stars:2, price:45 }
  ]
};

function getStaticFallback(city) {
  const cityKey = city.toLowerCase().trim();
  const list = fallbackHotels[cityKey];
  if (!list) return [];
  
  return list.map((h, i) => ({
    id: `fb-${cityKey}-${i}`,
    name: h.name,
    address: h.address,
    stars: h.stars,
    price: h.price,
    desc: getHotelDesc(h.name, city, h.stars, i),
    img: getHotelImage(cityKey, i),
    rating: 8.5 + (Math.sin(i) * 1.2),
    amenities: G_AMENITIES.slice(0, 4),
    badge: i === 0 ? "Editor's Choice" : "Popular",
    point: { lat: 0, lon: 0 } 
  }));
}

function getMockFallback(city) {
  return [1, 2, 3, 4, 5, 6].map((_, i) => {
    const name = `${city} ${["Grand", "Palace", "Resort", "Suites", "Lodge", "Boutique"][i]} Hotel`;
    const stars = i % 2 === 0 ? 5 : 4;
    return {
      id: `mock-${i}`,
      name,
      stars,
      price: seedPrice(name, stars),
      desc: getHotelDesc(name, city, stars, i),
      img: getHotelImage(city, i),
      rating: 8.5 + (Math.sin(i) * 1.2),
      amenities: G_AMENITIES.slice(0, 4),
      badge: i === 0 ? "Editor's Choice" : "Popular",
      address: `Luxury Row ${i + 1}, ${city}`,
      point: { lat: 0, lon: 0 }
    };
  });
}

export default function Hotels() {
  // --- States ---
  const [city, setCity] = useState('');
  const [inputValue, setInputValue] = useState(DEFAULT_CITY);
  const [suggestions, setSuggestions] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Context Data
  const [weather, setWeather] = useState(null);
  const [country, setCountry] = useState(null);
  
  // UI Controls
  const [showMap, setShowMap] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [activeFilter, setActiveFilter] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('hotels_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const mapRef = useRef(null);
  const leafletMap = useRef(null);



  // --- API Flow ---
  const performSearch = useCallback(async (searchCity) => {
    setCity(searchCity);
    setError(null);
    setHotels([]);

    // Show curated fallback instantly
    const curatedFb = getStaticFallback(searchCity);
    const initialData = curatedFb.length > 0 ? curatedFb : getMockFallback(searchCity);
    setHotels(initialData);
    setLoading(false); // Instant render completely removes UI blocking

    try {
      const geoRes = await fetchWithTimeout(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchCity)}&format=json&limit=1`,
        { headers: { 'Accept-Language': 'en' } },
        1500
      );
      const geoData = await geoRes.json();
      if (!geoData.length) throw new Error('City not found');
      
      const { lat, lon, display_name } = geoData[0];
      const countryParts = display_name.split(', ');
      const countryName = countryParts[countryParts.length - 1];

      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);

      // Fix 1: All network requests wrapped in timeouts
      const [osm, weatherPromise, countryPromise] = await Promise.allSettled([
        fetchOverpass(latNum, lonNum, searchCity),
        fetchWithTimeout(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`, {}, 2500),
        fetchWithTimeout(`https://restcountries.com/v3.1/name/${countryName}?fields=name,currencies,languages,flags`, {}, 2500)
      ]);

      if (osm.status === 'fulfilled' && osm.value.length > 0) {
        setHotels(osm.value);
        
        osm.value.forEach(h => {
          fetchWithTimeout(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(h.name)}`, {}, 4000)
            .then(res => res.json())
            .then(data => {
              if (data.type === 'standard' && data.extract) {
                setHotels(prev => prev.map(hotel => 
                  hotel.id === h.id ? { ...hotel, desc: data.extract } : hotel
                ));
              }
            })
            .catch(() => {});
        });
      } else if (curatedFb.length === 0) {
        setHotels(getMockFallback(searchCity));
      }

      if (weatherPromise.status === 'fulfilled') {
        const wData = await weatherPromise.value.json();
        setWeather({
          temp: wData.current_weather.temperature,
          emoji: mapWeatherEmoji(wData.current_weather.weathercode)
        });
      }
      if (countryPromise.status === 'fulfilled') {
        const cDataArray = await countryPromise.value.json();
        const cData = cDataArray[0];
        setCountry({
          name: cData.name.common,
          flag: cData.flags.png,
          currency: Object.values(cData.currencies)[0].name,
          symbol: Object.values(cData.currencies)[0].symbol,
          language: Object.values(cData.languages)[0]
        });
      }
      setHotels(prev => prev.length > 0 ? prev : getMockFallback(searchCity));
    } catch (err) {
      console.error("Search error:", err);
    }
  }, []);

  useEffect(() => {
    performSearch(DEFAULT_CITY);
  }, [performSearch]);

  // --- Search Suggestions ---
  useEffect(() => {
    if (inputValue.length < 3) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${inputValue}&format=json&limit=5&featuretype=city`);
        const data = await res.json();
        setSuggestions(data.map(d => d.display_name));
      } catch {}
    }, 4000);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // --- Filtering & Sorting ---
  const filteredHotels = useMemo(() => {
    let res = [...hotels];
    if (activeFilter !== 'All') {
      if (activeFilter.includes('Stars')) {
        const s = parseInt(activeFilter[0]);
        res = res.filter(h => h.stars === s);
      }
      // Add other filter logic here if needed
    }
    res = res.filter(h => h.price >= priceRange[0] && h.price <= priceRange[1]);

    if (sortBy === 'rating') res.sort((a,b) => b.rating - a.rating);
    if (sortBy === 'price-low') res.sort((a,b) => a.price - b.price);
    if (sortBy === 'price-high') res.sort((a,b) => b.price - a.price);

    return res;
  }, [hotels, activeFilter, priceRange, sortBy]);

  // --- Wishlist ---
  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const news = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('hotels_wishlist', JSON.stringify(news));
      return news;
    });
  };

  // --- Leaflet Map ---
  useEffect(() => {
    if (showMap && hotels.length > 0 && !leafletMap.current) {
      const L = window.L;
      if (!L) return;
      
      const first = hotels[0];
      leafletMap.current = L.map('hotels-map').setView([first.point.lat, first.point.lon], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap.current);
    }
    
    if (leafletMap.current && hotels.length > 0) {
      const L = window.L;
      // Clear markers (optional logic)
      hotels.forEach(h => {
        L.marker([h.point.lat, h.point.lon]).addTo(leafletMap.current)
          .bindPopup(`<b>${h.name}</b><br/>$${h.price}/night`);
      });
    }
  }, [showMap, hotels]);

  // --- Price Range Slider Logic ---
  const handleMinChange = (e) => {
    const val = parseInt(e.target.value);
    setPriceRange(prev => [Math.min(val, prev[1] - 50), prev[1]]);
  };
  const handleMaxChange = (e) => {
    const val = parseInt(e.target.value);
    setPriceRange(prev => [prev[0], Math.max(val, prev[0] + 50)]);
  };

  // --- Hover Preview ---
  const [hoverData, setHoverData] = useState({ show: false, x: 0, y: 0, img: '' });
  const handleNameHover = (e, img) => {
    // Offset to keep preview near cursor but not under it
    setHoverData({ show: true, x: e.clientX + 20, y: e.clientY - 60, img });
  };
  const handleNameLeave = () => setHoverData({ show: false, x: 0, y: 0, img: '' });

  // --- Modal State ---
  const [selHotel, setSelHotel] = useState(null);
  const [modalIdx, setModalIdx] = useState(0);

  const openModal = (h, idx) => {
    console.log("Opening Modal", h.name);
    setSelHotel(h);
    setModalIdx(idx);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setSelHotel(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="hotels-page">
      {/* Search Section */}
      <section className="hotels-dark-bar">
        <div style={{fontSize:'10px',letterSpacing:'0.16em',textTransform:'uppercase',color:'#B8883A',marginBottom:'10px'}}>✦ Hotels worldwide</div>
        <h1 className="hdb-heading">Find Your Perfect <em>Stay</em></h1>
        <div className="hdb-search-row">
          <input 
            className="hdb-input" 
            placeholder="Search a city..." 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && performSearch(inputValue)}
          />
          <button className="hdb-btn" onClick={() => performSearch(inputValue)}>Search</button>
          
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((s, i) => (
                <li key={i} className="suggestion-item" onClick={() => {
                  setInputValue(s.split(',')[0]);
                  performSearch(s.split(',')[0]);
                  setSuggestions([]);
                }}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Context Bar */}
      {city && (
        <div className="results-context">
          <div className="rc-left">
            {loading ? <span>Searching...</span> : (
              <span>
                <span className="rc-count"><AnimatedCounter value={filteredHotels.length} /></span> hotels found near <span className="rc-city">{city}</span>
                {weather && ` · ${weather.temp}°C ${weather.emoji}`}
                {country && ` · ${country.symbol} ${country.currency} · ${country.language}`}
              </span>
            )}
          </div>
          {country && (
            <div className="rc-center">
              <img src={country.flag} className="rc-flag" alt="flag" />
              <span className="rc-country">{country.name}</span>
            </div>
          )}
          <div className="rc-right">
            <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low–High</option>
              <option value="price-high">Price: High–Low</option>
            </select>
            <button className="map-toggle" onClick={() => setShowMap(!showMap)}>
              {showMap ? 'Hide map' : 'Show map →'}
            </button>
          </div>
        </div>
      )}

      {/* Map Panel */}
      <div id="hotels-map" className={showMap ? 'open' : ''}></div>

      {/* Filter Strip */}
      <div className="filter-strip">
        {['All', '5 Stars', '4 Stars', 'Boutique', 'Resort', 'Pool', 'Spa', 'Pet Friendly'].map(f => (
          <button 
            key={f} 
            className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Price Slider Strip */}
      <div className="price-slider-wrap">
        <div className="slider-values">
          <span>Range: ${priceRange[0]} — ${priceRange[1]}</span>
          <span>Max $1000</span>
        </div>
        <div className="slider-container">
          <input type="range" min="0" max="1000" value={priceRange[0]} onChange={handleMinChange} className="slider-input min" />
          <input type="range" min="0" max="1000" value={priceRange[1]} onChange={handleMaxChange} className="slider-input max" />
        </div>
      </div>

      {/* Main Content */}
      <section className="hotel-list">
        {loading ? (
          <div className="sk-list">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="hotel-row skeleton-row">
                <div className="hr-photo skeleton" style={{width: 260}}></div>
                <div className="hr-info" style={{padding: 24}}>
                  <div className="skeleton" style={{height: 24, width: '60%', marginBottom: 12}}></div>
                  <div className="skeleton" style={{height: 14, width: '40%', marginBottom: 8}}></div>
                  <div className="skeleton" style={{height: 14, width: '80%'}}></div>
                </div>
              </div>
            ))}
          </div>
        ) : hotels.length === 0 ? (
          <div className="empty-state">
            <h2 className="empty-heading">No hotels found near <em>{city}</em></h2>
            <p className="empty-subtitle">Try a different city or broaden your search</p>
            <div className="empty-pills">
              {['Paris', 'Tokyo', 'Bali', 'Dubai', 'New York'].map(c => (
                <button key={c} className="ps-pill" onClick={() => { setInputValue(c); performSearch(c); }}>{c}</button>
              ))}
            </div>
          </div>
        ) : (
          filteredHotels.map((h, idx) => (
            <div key={h.id || idx} className={`hotel-row fade-in ${h.price < priceRange[0] || h.price > priceRange[1] ? 'dimmed' : ''}`} style={{ animationDelay: `${idx * 0.08}s` }}>
              <div className="hr-photo">
                <div className="hr-badge">{h.badge}</div>
                <button 
                  className={`hr-heart ${wishlist.includes(h.id) ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(h.id); }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
                <img 
                  className="hr-img" 
                  src={h.img} 
                  alt={h.name} 
                />
              </div>
              <div className="hr-info">
                <div className="hr-stars">
                  {'★'.repeat(h.stars)}
                </div>
                <h3 
                  className="hr-name"
                  onMouseMove={(e) => handleNameHover(e, h.img)}
                  onMouseLeave={handleNameLeave}
                >
                  {h.name}
                </h3>
                <div className="hr-loc">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {h.address || city}
                </div>
                <p className="hr-desc">{h.desc}</p>
                <div className="hr-amenities">
                  {h.amenities.map(a => <span key={a} className="amenity-pill">{a}</span>)}
                </div>
              </div>
              <div className="hr-price-cta">
                <div className="hr-score-wrap">
                  <div className="hr-score">{h.rating.toFixed(1)}</div>
                  <div className="hr-score-label">{h.rating > 9 ? 'Exceptional' : h.rating > 8.5 ? 'Very Good' : 'Good'}</div>
                </div>
                <div className="hr-price-wrap">
                  <div className="hr-price">${h.price}</div>
                  <div className="hr-per-night">per night</div>
                </div>
                <button className="hr-view-btn" onClick={() => openModal(h, idx)}>View Hotel</button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Popular Searches */}
      <section className="popular-searches">
        <span className="ps-label">Popular destinations</span>
        <div className="ps-row">
          {['Paris', 'Tokyo', 'Bali', 'New York', 'Dubai', 'Santorini'].map(c => (
            <button key={c} className="ps-pill" onClick={() => { setInputValue(c); performSearch(c); }}>{c}</button>
          ))}
        </div>
      </section>

      {/* Hover Preview */}
      {hoverData.show && (
        <div 
          className="hover-preview"
          style={{ position: 'fixed', left: hoverData.x, top: hoverData.y, zIndex: 1000, pointerEvents: 'none' }}
        >
          <img src={hoverData.img} alt="preview" style={{ width: 180, height: 120, borderRadius: 8, border: '2px solid #fff', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} />
        </div>
      )}

      {/* Hotel Detail Modal (Dark Luxury) */}
      {selHotel && (
        <>
          <div className="hotel-modal-backdrop" onClick={closeModal}></div>
          <div className="hotel-modal-wrap">
            <div className="hotel-modal-card">
              <button className="modal-close-x" onClick={closeModal}>×</button>
              <div className="hm-top">
                <div className="hm-photo ken-burns">
                  <img 
                    src={selHotel.img} 
                    alt={selHotel.name} 
                  />
                  <div className="hm-photo-label">
                    <span className="hm-region">{city}</span>
                    <h2 className="hm-city">{selHotel.name.split(' ').slice(0,-1).join(' ')} <em>{selHotel.name.split(' ').pop()}</em></h2>
                  </div>
                </div>
                <div className="hm-info">
                  <div className="hm-stars">{'★'.repeat(selHotel.stars)}</div>
                  <div className="hm-country">{country?.name || 'Local Destination'}</div>
                  <p className="hm-desc">{selHotel.desc}</p>
                  
                  <div className="hm-stats">
                    <div className="hm-stat">
                      <div className="hm-stat-num">{weather?.temp}°C</div>
                      <div className="hm-stat-lbl">Weather</div>
                    </div>
                    <div className="hm-stat">
                      <div className="hm-stat-num">14:00</div>
                      <div className="hm-stat-lbl">Check-in</div>
                    </div>
                    <div className="hm-stat">
                      <div className="hm-stat-num">{country?.language || 'English'}</div>
                      <div className="hm-stat-lbl">Language</div>
                    </div>
                  </div>

                  <div className="hm-chips">
                    {selHotel.amenities.map(a => (
                      <div key={a} className="hm-chip">
                        <div className="hm-chip-lbl">Featured</div>
                        <div className="hm-chip-val">{a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hm-bottom">
                <div className="hm-price-row">
                  <div className="hm-price">${selHotel.price} <span className="hm-night">/ night</span></div>
                </div>
                <button className="hm-cta">Book this hotel with Compass →</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
