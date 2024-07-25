import axios from 'axios';

const API_KEY = '4c492c04ac7dd4aa25d7a6866e57b263';
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

export const kelvinToCelsius = (tempK) => (tempK + 273.15);

export const getWeatherData = async (city) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=4c492c04ac7dd4aa25d7a6866e57b263`;
 try { const response = await axios.get(url);
  const preData = response.data;  //JSON by default     
    const lat = preData[0].lat;
    const lon = preData[0].lon;
    const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4c492c04ac7dd4aa25d7a6866e57b263`;
    const response2 = await axios.get(url2);
    const data = response2.data;
  return {
    main: data.weather[0].main,         //based on the API response examples in the OpenWeatherMap documentation
    temp: kelvinToCelsius(data.main.temp),
    feels_like: kelvinToCelsius(data.main.feels_like),          
    dt: data.dt
  };}
  catch(err){
    console.log(err);
  
  }
};

export const fetchAllCitiesWeather = async () => {
  const weatherData = await Promise.all(CITIES.map(city => getWeatherData(city)));
  return weatherData;
};
