import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const WeatherChart = ({ data }) => {
    if (!Array.isArray(data) || !data.every(item => item && typeof item.dt === 'number'&&typeof item.temp === 'number')) {
        console.error('Invalid data prop passed to WeatherChart.');
        return null; // Or render some fallback UI
      }
  const chartData = {
    labels: data.map(item => new Date(item.dt * 1000).toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(item => item.temp),
        borderColor: 'rgba(75,192,192,1)',
        fill: false
      }
    ]
  };

  return <Line data={chartData} />;
};

export default WeatherChart;
