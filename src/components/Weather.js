import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState(""); 
  const [weather, setWeather] = useState(null); 
  const [error, setError] = useState(""); 

  const API_KEY = "1dc238a11c504ca9d9774caf974730ad";  
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async () => {
    if (!city) {
      setError("⚠️ Please enter a city name.");
      return;
    }

    try {
      setError(""); 
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });

      setWeather(response.data); 
    } catch (error) {
      setWeather(null);
      setError("❌ City not found! Please enter a valid city name.");
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h2>🌤️ AI Weather Forecast</h2>
        
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        
        <button onClick={fetchWeather}>Get Weather</button>

        {error && <p className="error-message">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h3>📍 {weather.name}, {weather.sys.country}</h3>
            <p>🌡️ Temperature: {weather.main.temp}°C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>☁️ Condition: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
