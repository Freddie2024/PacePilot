import React, { useState, useEffect } from "react";
import axios from "axios";
import { WiDaySunny, WiDayCloudy, WiRain, WiWindy } from "react-icons/wi";

const CurrentWeather = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { data } = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
        setWeather(data.current);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching current weather", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (loading) return <div>Lädt aktuelles Wetter...</div>;

  const { temp_c, condition, wind_kph, wind_deg, humidity, precip_mm } = weather;

  const weatherIcon = condition.text.toLowerCase().includes("sunny")
    ? <WiDaySunny />
    : condition.text.toLowerCase().includes("cloudy")
    ? <WiDayCloudy />
    : condition.text.toLowerCase().includes("rain")
    ? <WiRain />
    : <WiWindy />;

  return (
    <div className="current-weather">
      <h2>Aktuelles Wetter</h2>
      <div className="weather-info">
        <div>{weatherIcon}</div>
        <div>
          <p>{temp_c}°C</p>
          <p>{condition.text}</p>
          <p>Wind: {wind_kph} km/h {wind_deg ? `aus ${wind_deg}°` : ""}</p>
          <p>Regenwahrscheinlichkeit: {precip_mm ? `${precip_mm} mm` : "0"} mm</p>
          <p>Feuchtigkeit: {humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
