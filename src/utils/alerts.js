export const THRESHOLD_TEMP = 35;

export const checkAlerts = (weatherData) => {
  if (weatherData.temp > THRESHOLD_TEMP) {
    return `Alert! Temperature exceeded threshold: ${weatherData.temp}°C`;
  }
  return null;
};
