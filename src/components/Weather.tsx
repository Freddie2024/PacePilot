import { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Benutzer-Standort:", latitude, longitude);

          try {
            const { data } = await axios.get(`/api/weather?lat=${latitude}&lon=${longitude}`);
            setWeather(data);
          } catch (err) {
            setError("Fehler beim Abrufen der Wetterdaten.");
            console.error(err);
          }
          setLoading(false);
        },
        (error) => {
          setError("Fehler beim Abrufen des Standorts.");
          console.error(error);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation wird von diesem Browser nicht unterstützt.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (loading) return <div>Wird geladen...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Wetter für deinen Standort</h1>
      <p>Temperatur: {weather.current.temp_c}°C</p>
      <p>Wetter: {weather.current.condition.text}</p>
      <p>Wind: {weather.current.wind_kph} km/h</p>
    </div>
  );
};

export default Weather;
