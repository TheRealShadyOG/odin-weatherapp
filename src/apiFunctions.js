// Get forecast
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
  return currentWeather;
}

// Get location

// Get astronomy

export { getCurrentWeather };
