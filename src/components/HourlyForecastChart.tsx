import { useState, useEffect } from "react";
import axios from "axios";

const HourlyForecast = ({ lat, lon }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      try {
        const { data } = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
        setHourlyData(data.forecast.forecastday[0].hour);  // Stündliche Daten des ersten Tages
        setLoading(false);
      } catch (error) {
        console.error("Fehler beim Abrufen der stündlichen Wetterdaten", error);
        setLoading(false);
      }
    };

    fetchHourlyForecast();
  }, [lat, lon]);

  if (loading) return <div>Wird geladen...</div>;

  return (
    <div>
      <h2>Stündliche Vorhersage</h2>
      <div>
        {hourlyData.map((hour, index) => (
          <div key={index} className="hourly-forecast">
            <p>{new Date(hour.time_epoch * 1000).toLocaleTimeString()}</p>  {/* Uhrzeit */}
            <p>Temperatur: {hour.temp_c}°C</p>
            <p>{hour.condition.text}</p>  {/* Wetterbeschreibung */}
            <img src={hour.condition.icon} alt={hour.condition.text} />  {/* Symbol für das Wetter */}
            <p>Wind: {hour.wind_kph} km/h {hour.wind_dir}</p>  {/* Windrichtung und -geschwindigkeit */}
            <p>Regenwahrscheinlichkeit: {hour.chance_of_rain}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
