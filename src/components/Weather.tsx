import { useState, useEffect } from "react";
import DailyForecastChart from "../components/DailyForecastChart";
import axios from "axios";

const Weather = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Geolocation API verwenden, um den aktuellen Standort abzurufen
  useEffect(() => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLat(latitude); // Setze den Latitude-State
      setLon(longitude); // Setze den Longitude-State
    };

    const error = () => {
      console.log("Geolocation failed");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []); // Dieser Effekt wird nur einmal beim Initialisieren ausgeführt

  // Wetterdaten abrufen, wenn lat und lon gesetzt sind
  useEffect(() => {
    if (lat && lon) {
      const fetchWeather = async () => {
        try {
          console.log("Latitude:", lat, "Longitude:", lon);  // Logge die Koordinaten
          const { data } = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
          setWeather(data); // Setze die Wetterdaten
          setLoading(false);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setLoading(false);
        }
      };

      fetchWeather();
    }
  }, [lat, lon]); // Wetterdaten nur abrufen, wenn lat und lon vorhanden sind

  if (loading) return <div>Wird geladen...</div>;

  return (
    <div>
       <DailyForecastChart lat={lat} lon={lon} />
    </div>
  );
};

export default Weather;
