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

async function getForecastDaily(location) {
  const forecast = await getForecastData(location);
  const days = forecast.forecastday;
  const daily = [];
  days.forEach((ele) => {
    const thisDay = ele.day;
    const date = ele.date;
    const condition = thisDay.condition.text;
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
    const day = {
      date,
      condition,
      rainChance,
      fahrenheit,
      celsius,
    };
    daily.push(day);
  });
  return daily;
}

async function getForecastHourly(location) {
  const forecast = await getForecastData(location);
  const today = forecast.forecastday[0].hour;
  const hourly = [];
  today.forEach((ele, i) => {
    const time = ele.time.slice(-5);
    const condition = ele.condition.text;
    const fahrenheit = {
      feelsLike: ele.feelslike_f,
      temp: ele.temp_f,
    };
    const celsius = {
      feelsLike: ele.feelslike_c,
      temp: ele.temp_c,
    };
    const hour = {
      time,
      condition,
      fahrenheit,
      celsius,
    };
    hourly.push(hour);
  });
  return hourly;
}

async function getForecastsWeather(location) {
  const daily = await getForecastDaily(location);
  const hourly = await getForecastHourly(location);

  const forecast = await Promise.all([daily, hourly]);
  console.log(forecast);
}

// Get location
async function getLocationData(location) {
  const data = await fetchForecast(location);
  const locationData = data.location;
  const country = locationData.country;
  const city = locationData.name;
  const localTime = locationData.localtime;
  const locationInfo = {
    country,
    city,
    localTime,
  };
  console.log(locationInfo);
}

// Get astronomy
async function getAstronomyData(location) {
  const data = await fetchForecast(location);
  const thisDay = data.forecast.forecastday[0];
  const astronomyData = thisDay.astro;
  const sunrise = astronomyData.sunrise;
  const sunset = astronomyData.sunset;
  const moonPhase = astronomyData.moon_phase;
  const astronomyInfo = {
    sunrise,
    sunset,
    moonPhase,
  };
  console.log(astronomyInfo);
}

export {
  getCurrentWeather,
  getForecastsWeather,
  getLocationData,
  getAstronomyData,
};
