import React, { useState, useEffect } from 'react';
import { fetchAllCitiesWeather } from './handlers/weatherService.js';
import { calculateDailySummary } from './utils/dataProcessing.js';
import { checkAlerts } from './utils/alerts.js';
import WeatherChart from './components/WeatherChart.js';

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [dailySummary, setDailySummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllCitiesWeather();
      setWeatherData(data);
      const dailySummaries = data.map(cityData => calculateDailySummary(cityData));
      setDailySummary(dailySummaries);
      const alertMessages = data.map(checkAlerts).filter(alert => alert);
      setAlerts(alertMessages);
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 15, height: '100%', boxSizing: 'border-box' }}>
      <div style={{ maxHeight: '90vh', overflowY: 'scroll' }}>
        {dailySummary.map((citySummary, index) => (
          <div key={index} style={{ marginBottom: 20 }}>
            <h2>{citySummary.name} - Daily Summary</h2>
            <p>Average Temperature: {citySummary.avg_temp?.toFixed(2)} K</p>
            <p>Maximum Temperature: {citySummary.max_temp?.toFixed(2)} K</p>
            <p>Minimum Temperature: {citySummary.min_temp?.toFixed(2)} K</p>
            <p>Dominant Condition: {citySummary.dominant_condition}</p>
            {/* Optionally, you can uncomment the next line to display the chart for each city */}
            {/* <WeatherChart data={weatherData[index]} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;