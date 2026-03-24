import { useState, useEffect } from 'react';
import { FaTemperatureHigh, FaCloudSun, FaSun, FaCloudRain, FaSnowflake, FaWind } from 'react-icons/fa';
import './WeatherStrip.css';

const cities = [
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 }
];

const getWeatherIcon = (code) => {
  if (code === 0) return <FaSun className="weather-icon clear" />;
  if (code >= 1 && code <= 3) return <FaCloudSun className="weather-icon clouds" />;
  if (code >= 51 && code <= 67) return <FaCloudRain className="weather-icon rain" />;
  if (code >= 71 && code <= 77) return <FaSnowflake className="weather-icon snow" />;
  return <FaCloudSun className="weather-icon" />;
};

export default function WeatherStrip() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchAllWeather = async () => {
      const promises = cities.map(city => 
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`)
          .then(res => res.json())
          .then(data => ({
            name: city.name,
            temp: data.current_weather.temperature,
            code: data.current_weather.weathercode
          }))
          .catch(() => ({ name: city.name, temp: 'N/A', code: 0 }))
      );
      const results = await Promise.all(promises);
      setWeatherData(results);
    };

    fetchAllWeather();
  }, []);

  return (
    <div className="weather-strip-wrap">
      <div className="weather-strip-track">
        {/* Doubled for seamless loop */}
        {[...weatherData, ...weatherData].map((w, i) => (
          <div key={i} className="weather-item">
            <span className="weather-city">{w.name}</span>
            {getWeatherIcon(w.code)}
            <span className="weather-temp">{w.temp}°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}
