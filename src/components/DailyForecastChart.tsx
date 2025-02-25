import React, { useState, useEffect } from "react";
import axios from "axios";


const DailyForecast = ({ lat, lon }) => {
    const [dailyData, setDailyData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchDailyForecast = async () => {
        try {
          const { data } = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
          setDailyData(data.forecast.forecastday); 
          setLoading(false);
        } catch (error) {
          console.error("Error fetching daily forecast", error);
          setLoading(false);
        }
      };
  
      fetchDailyForecast();
    }, [lat, lon]);
  
    if (loading) return <div>Lädt tägliche Vorhersage...</div>;
  
    return (
      <div className="daily-forecast">
        <h2>Tägliche Vorhersage</h2>
        <div>
          {dailyData.map((day, index) => (
            <div key={index} className="day">
              <p>{new Date(day.date).toLocaleDateString()}</p>
              <p>{day.day.avgtemp_c}°C</p>
              <p>{day.day.condition.text}</p>
              <p>Wind: {day.day.maxwind_kph} km/h</p>
              <p>Regenwahrscheinlichkeit: {day.day.daily_chance_of_rain}%</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default DailyForecast;
  