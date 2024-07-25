import _ from 'lodash';
export const temps=[];
export const calculateDailySummary = (weatherData) => {
  
  temps.push(weatherData.temp);
  const conditions = weatherData.main;

  return {
    avg_temp: _.mean(temps),
    max_temp: _.max(temps),
    min_temp: _.min(temps),
    // dominant_condition: _.head(_(conditions).countBy().entries().maxBy(_.last))
  };
};
