import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  //search
  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const WeatherCard = ({ title, data }) => {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  );
};

const WeatherDisplay = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (city) {
      setLoading(true);
      setWeatherData(null);
      // fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      axios
        .get(`https://api.weatherapi.com/v1/current.json`, {
          params: {
            key: "41ef3d31b9ee4ed2bf1125023242709",
            q: city,
          },
        })
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          alert("Failed to fetch weather data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city]);

  return (
    <div className="weather-display">
      {loading && <p>Loading data...</p>}
      {!loading && weatherData && (
        <div className="weather-cards">
          <WeatherCard
            title="Temperature"
            data={`${weatherData.current.temp_c}°C`}
          />
          <WeatherCard
            title="Humidity"
            data={`${weatherData.current.humidity}%`}
          />
          <WeatherCard
            title="Condition"
            data={weatherData.current.condition.text}
          />
          <WeatherCard
            title="Wind Speed"
            data={`${weatherData.current.wind_kph} kph`}
          />
        </div>
      )}
    </div>
  );
};

function App() {
  const [city, setCity] = useState("");

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}

export default App;
