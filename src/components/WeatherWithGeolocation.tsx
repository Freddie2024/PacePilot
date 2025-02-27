import { useState, useEffect } from "react";
import DailyForecastChart from "./DailyForecastChart";

const defaultLat = 52.5200; // Breitengrad für Berlin
const defaultLon = 13.4050; // Längengrad für Berlin

const WeatherWithGeolocation = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  // Geolocation API verwenden, um den aktuellen Standort abzurufen
  useEffect(() => {
    const success = (position: GeolocationPosition) => {
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

  return (
    <div>
      <DailyForecastChart lat={lat ?? defaultLat} lon={lon ?? defaultLon} />
    </div>
  );
};

export default WeatherWithGeolocation;
