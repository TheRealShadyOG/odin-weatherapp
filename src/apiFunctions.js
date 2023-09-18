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

// Get location

// Get astronomy
