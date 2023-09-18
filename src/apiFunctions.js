// Get API data
async function fetchForecast(location) {
  const url =
    'https://api.weatherapi.com/v1/forecast.json?key=f5842f73c66340b1b1a172836231709&days=3&q=';
  const response = await fetch(url + location);
  if (response.status === 200) {
    return response.json();
  } else {
    alert('Invalid Location');
  }
}

// Get current weather
async function getCurrentWeather(location) {
  const data = await fetchForecast(location);
  const currentData = data.current;
  const condition = currentData.condition.text;
  const humidity = currentData.humidity;
  const fahrenheit = {
    feelsLike: currentData.feelslike_f,
    temp: currentData.temp_f,
  };
  const celsius = {
    feelsLike: currentData.feelslike_c,
    temp: currentData.temp_c,
  };
  const currentWeather = {
    condition,
    humidity,
    fahrenheit,
    celsius,
  };
  console.log(currentWeather);
}

// Get forecast
async function getForecastData(location) {
  const data = await fetchForecast(location);
  const forecastData = data.forecast;
  return forecastData;
}

async function getForecast0(location) {
  const forecast = await getForecastData(location);
  const thisDay = forecast.forecastday[0].day;
  const rainChance = thisDay.daily_chance_of_rain;
  const fahrenheit = {
    average: thisDay.avgtemp_f,
    high: thisDay.maxtemp_f,
    low: thisDay.mintemp_f,
  };
  const celsius = {
    average: thisDay.avgtemp_c,
    high: thisDay.maxtemp_c,
    low: thisDay.mintemp_c,
  };
  const forecastDay0 = {
    rainChance,
    fahrenheit,
    celsius,
  };
  return forecastDay0;
}

async function getForecast1(location) {
  const forecast = await getForecastData(location);
  const thisDay = forecast.forecastday[1].day;
  const rainChance = thisDay.daily_chance_of_rain;
  const fahrenheit = {
    average: thisDay.avgtemp_f,
    high: thisDay.maxtemp_f,
    low: thisDay.mintemp_f,
  };
  const celsius = {
    average: thisDay.avgtemp_c,
    high: thisDay.maxtemp_c,
    low: thisDay.mintemp_c,
  };
  const forecastDay1 = {
    rainChance,
    fahrenheit,
    celsius,
  };
  return forecastDay1;
}

async function getForecast2(location) {
  const forecast = await getForecastData(location);
  const thisDay = forecast.forecastday[2].day;
  const rainChance = thisDay.daily_chance_of_rain;
  const fahrenheit = {
    average: thisDay.avgtemp_f,
    high: thisDay.maxtemp_f,
    low: thisDay.mintemp_f,
  };
  const celsius = {
    average: thisDay.avgtemp_c,
    high: thisDay.maxtemp_c,
    low: thisDay.mintemp_c,
  };
  const forecastDay2 = {
    rainChance,
    fahrenheit,
    celsius,
  };
  return forecastDay2;
}

async function getForecastsWeather(location) {
  const day0 = await getForecast0(location);
  const day1 = await getForecast1(location);
  const day2 = await getForecast2(location);

  const forecast = await Promise.all([day0, day1, day2]);
  console.log(forecast);
}

// Get location

// Get astronomy

export { getCurrentWeather, getForecastsWeather };
