import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { FaMapMarkedAlt, FaFilter, FaStar } from 'react-icons/fa';
import './InteractiveMap.css';

// Fix Leaflet's default icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Orange Marker
const orangeIcon = new L.Icon({
  ...L.Icon.Default.prototype.options,
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Mock Dest Data mapped to coordinates
const mapDestinations = [
  { id: 1, name: 'Santorini', country: 'Greece', lat: 36.3932, lng: 25.4615, category: 'Beach', rating: 4.9, img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&q=80' },
  { id: 2, name: 'Kyoto', country: 'Japan', lat: 35.0116, lng: 135.7681, category: 'Cultural', rating: 4.8, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80' },
  { id: 3, name: 'Patagonia', country: 'Argentina', lat: -50.3370, lng: -72.2662, category: 'Adventure', rating: 5.0, img: 'https://images.unsplash.com/photo-1554528151-2483592ed6a3?w=400&q=80' },
  { id: 4, name: 'Maldives', country: 'Maldives', lat: 3.2028, lng: 73.2207, category: 'Luxury', rating: 4.9, img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80' },
  { id: 5, name: 'Banff National Park', country: 'Canada', lat: 51.4968, lng: -115.9281, category: 'Mountain', rating: 4.9, img: 'https://images.unsplash.com/photo-1522067160759-4ee4c2e64ca6?w=400&q=80' },
  { id: 6, name: 'Marrakesh', country: 'Morocco', lat: 31.6295, lng: -7.9811, category: 'Cultural', rating: 4.7, img: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400&q=80' },
];

function MapSetter({ center, zoom }) {
  const map = useMap();
  useEffect(() => { map.setView(center, zoom); }, [center, zoom, map]);
  return null;
}

// Fix for Leaflet initialization in React when container size isn't immediately detected
function MapInvalidator() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

export default function InteractiveMap() {
  const [filter, setFilter] = useState('All');
  const [center, setCenter] = useState([20, 0]); // World view
  const [zoom, setZoom] = useState(2);

  const filteredDests = filter === 'All' ? mapDestinations : mapDestinations.filter(d => d.category === filter);

  const handleFilter = (cat) => {
    setFilter(cat);
    setCenter([20, 0]);
    setZoom(2);
  };

  const flyTo = (lat, lng) => {
    setCenter([lat, lng]);
    setZoom(8);
  };

  return (
    <section className="map-section">
      <div className="container map-header">
        <div className="section-title-wrap">
          <FaMapMarkedAlt className="title-icon" />
          <h2>Explore the <span>Interactive Map</span></h2>
        </div>
        
        <div className="map-filters">
          <FaFilter className="filter-icon" />
          {['All', 'Beach', 'Cultural', 'Adventure', 'Luxury', 'Mountain'].map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => handleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="map-wrapper glass-panel">
        <MapContainer 
          center={center} 
          zoom={zoom} 
          scrollWheelZoom={false} 
          className="leaflet-container"
          style={{ height: '500px', width: '100%' }}
        >
          <MapSetter center={center} zoom={zoom} />
          <MapInvalidator />
          {/* Dark Mode CartoDB Dark Matter Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
            maxZoom={19}
          />

          {filteredDests.map(dest => (
            <Marker 
              key={dest.id} 
              position={[dest.lat, dest.lng]}
              icon={orangeIcon}
              eventHandlers={{
                click: () => flyTo(dest.lat, dest.lng),
              }}
            >
              <Popup className="custom-popup">
                <div className="popup-card">
                  <div className="popup-img" style={{backgroundImage: `url(${dest.img})`}}>
                    <span className="popup-badge">{dest.category}</span>
                  </div>
                  <div className="popup-body">
                    <h4>{dest.name}</h4>
                    <p className="popup-country">{dest.country}</p>
                    <div className="popup-rating"><FaStar /> {dest.rating}/5.0</div>
                    <button className="btn btn-primary popup-btn" onClick={(e) => { e.preventDefault(); console.log('Navigate to detail view'); }}>
                      Explore Dest
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
