import { useState, useEffect } from "react";

interface WeatherData {
  forecast: {
    forecastday: {
      date: string;
      day: {
        condition: {
          text: string;
        };
        mintemp_c: number;
        maxtemp_c: number;
        daily_chance_of_rain: number;
        maxwind_kph: number;
      };
    }[];
  };
}

interface DailyForecastChartProps {
  lat: number;
  lon: number;
}

const DailyForecastChart: React.FC<DailyForecastChartProps> = ({ lat, lon }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const getWeatherIcon = (condition: string): string => {
    const iconMapping: Record<string, string> = {
    "Sonnig": "☀️",
    "Klar": "🌞",
    "Teilweise bewölkt": "⛅",
    "bewölkt": "☁️",
    "bedeckt": "☁️",
    "leicht bewölkt": "🌤️",
    "Nebel": "🌫️",
    "leichter Nebel": "🌫️",
    "stellenweise Regenfall": "🌦️",
    "Regen": "🌧️",
    "Leichter Regen": "🌦️",
    "Starker Regen": "🌧️",
    "Schneefall": "❄️",
    "stellenweise Schneefall": "🌨️",
    "Leichter Schneefall": "🌨️",
    "Starker Schneefall": "❄️",
    "Schneeverwehungen": "❄️",
    "Schneetreiben": "❄️",
    "Schneesturm": "❄️",
    "stellenweise Schneeregen": "🌧️",
    "stellenweise Eisregen": "❄️🌧️",
    "stellenweise gefrierender Nieselregen": "❄️🌧️",
    "Gewitter": "⛈️",
    "gewittrige Niederschläge": "⛈️",
    "gefrierender Nebel": "🌫️",
    "stellenweise Nieselregen": "🌧️",
    "leichter Nieselregen": "🌦️",
    "gefrierender Nieselregen": "🌧️",
    "starker gefrierender Nieselregen": "🌧️",
    "stellenweise leichter Regen": "🌦️",
    "leichter Regen": "🌦️",
    "mäßiger Regenfall": "🌧️",
    "mäßiger Regen": "🌧️",
    "stellenweise starker Regenfall": "🌧️",
    "starker Regen": "🌧️",
    "leichter gefrierender Regen": "🌧️",
    "mäßiger oder starker gefrierender Regen": "🌧️",
    "Hagel": "🌨️",
  };
    return iconMapping[condition] || "❓";
  };

  useEffect(() => {
    if (!lat || !lon) return;
    const fetchWeather = async () => {
      try {
        const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error("Fehler beim Abrufen der Wetterdaten", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (loading) return <div>Wird geladen...</div>;

  return (
    <div className="container fs-6 p-1">            
      <div className="row text-center">
        {weather?.forecast?.forecastday?.slice(0, 3).map((day, index) => (
          <div className="col-4" key={index}>
            <div className="card p-1">
                <p className="mb-0">{new Date(day.date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })}
                    {getWeatherIcon(day.day.condition.text)}</p> 
                <p className="mb-0">{Math.round(day.day.mintemp_c)}°- {Math.round(day.day.maxtemp_c)}°C</p>
                <p className="mb-0 text-muted">🌧 {day.day.daily_chance_of_rain}%</p>
                <p className="mb-0 text-muted">💨 {Math.round(day.day.maxwind_kph)} km/h</p>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecastChart;
