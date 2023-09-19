import {
  getAstronomyData,
  getCurrentWeather,
  getForecastsWeather,
  getLocationData,
} from './apiFunctions';
import { loadPage } from './domFunctions';

loadPage();

// Default location
let location = 'medina saudi';
let unit = 'F';

// Form for searching for location
const search = document.querySelector('#search');
search.addEventListener('click', updateLocation);

function updateLocation() {
  const searchBar = document.querySelector('input');
  const newLocation = searchBar.value;
  location = newLocation;
  console.log(location);
}

// Display data about location
async function displayLocation(location) {
  const locationData = await getLocationData(location);
  const localTimeData = locationData.localTime.slice(5);
  const time = localTimeData.split('-').join('/');

  const city = document.querySelector('#city');
  city.textContent = locationData.city;
  const country = document.querySelector('#country');
  country.textContent = locationData.country;
  const localTime = document.querySelector('#localtime');
  localTime.textContent = time;
}

// Display daily forecast data
async function displayDailyForecast(location, unit) {
  const forecastData = await getForecastsWeather(location);
  const dailyData = forecastData[0];
  const containers = document.querySelectorAll('#forecastday');

  containers.forEach((ele, i) => {
    // Add each day
    const day = dailyData[i].date.slice(5);
    const modifiedDay = day.split('-').join('/');
    const date = ele.children[0];
    date.textContent = modifiedDay;
    // Add each condition
    const dayCondition = dailyData[i].condition;
    const condition = ele.children[1];
    condition.textContent = dayCondition;
    // Add each temp
    const tempDiv = ele.children[2];
    if (unit === 'F') {
      getDailyFahrenheit(tempDiv, dailyData[i]);
    } else {
      getDailyCelsius(tempDiv, dailyData[i]);
    }
  });
}

// Display Daily forecast in fahrenheit
function getDailyFahrenheit(div, data) {
  const temps = data.fahrenheit;
  const high = div.children[0];
  const highTemp = 'High ' + temps.high;
  high.textContent = highTemp;
  const low = div.children[1];
  const lowTemp = 'Low ' + temps.low;
  low.textContent = lowTemp;
  const avg = div.children[2];
  const avgTemp = temps.average;
  avg.textContent = 'Avg ' + avgTemp;
}

// Display Daily forecast in celsius
function getDailyCelsius(div, data) {
  const temps = data.celsius;
  const high = div.children[0];
  const highTemp = 'High ' + temps.high;
  high.textContent = highTemp;
  const low = div.children[1];
  const lowTemp = 'Low ' + temps.low;
  low.textContent = lowTemp;
  const avg = div.children[2];
  const avgTemp = temps.average;
  avg.textContent = 'Avg ' + avgTemp;
}

// Display Hourly forecast data
async function displayHourlyForecast(location, unit) {
  const forecastData = await getForecastsWeather(location);
  const hourlyData = forecastData[1];
  const containers = document.querySelectorAll('#forecasthour');

  containers.forEach((ele, i) => {
    // Add each time
    const hour = hourlyData[i].time;
    const timeDiv = ele.children[0];
    timeDiv.textContent = hour;
    // Add each condition
    const hourCondition = hourlyData[i].condition;
    const conditionDiv = ele.children[1];
    conditionDiv.textContent = hourCondition;
    // Add each temp
    const tempDiv = ele.children[2];
    if (unit === 'F') {
      getTempsFahrenheit(tempDiv, hourlyData[i]);
    } else {
      getTempsCelsius(tempDiv, hourlyData[i]);
    }
    ele.classList.add('hidden');
  });

  for (let i = 0; i < 3; i++) {
    containers[i].classList.remove('hidden');
    containers[i].classList.add('visible');
  }
}

function getTempsFahrenheit(div, data) {
  const temps = data.fahrenheit;
  const feelsLikeDiv = div.children[0];
  const feelsLikeTemp = 'Feels Like ' + temps.feelsLike;
  feelsLikeDiv.textContent = feelsLikeTemp;
  const realDiv = div.children[1];
  const realTemp = 'Real Temp ' + temps.temp;
  realDiv.textContent = realTemp;
}

function getTempsCelsius(div, data) {
  const temps = data.celsius;
  const feelsLikeDiv = div.children[0];
  const feelsLikeTemp = 'Feels Like ' + temps.feelsLike;
  feelsLikeDiv.textContent = feelsLikeTemp;
  const realDiv = div.children[1];
  const realTemp = 'Real Temp ' + temps.temp;
  realDiv.textContent = realTemp;
}

// Display Astronomy data
async function displayAstronomy(location) {
  const astronomyData = await getAstronomyData(location);
  const sunrise = document.querySelector('#sunrise');
  const sunriseData = astronomyData.sunrise;
  sunrise.textContent = 'Sunrise ' + sunriseData;
  const sunset = document.querySelector('#sunset');
  const sunsetData = astronomyData.sunset;
  const moonPhase = document.querySelector('#moonphase');
  const moonData = astronomyData.moonPhase;
  moonPhase.textContent = moonData + ' Moon';
  sunset.textContent = 'Sunset ' + sunsetData;
}

// Display Current Data
async function displayCurrent(location, unit) {
  const currentData = await getCurrentWeather(location);
  const condition = document.querySelector('#currentcondition');
  condition.textContent = currentData.condition;
  const humidity = document.querySelector('#currenthumidity');
  const humidityData = `${currentData.humidity}% Humidity`;
  humidity.textContent = humidityData;
  const temp = document.querySelector('#currenttemp');
  if (unit === 'F') {
    getTempsFahrenheit(temp, currentData);
  } else {
    getTempsCelsius(temp, currentData);
  }
}

function loadWeather(location, unit) {
  displayLocation(location);
  displayCurrent(location, unit);
  displayDailyForecast(location, unit);
  displayHourlyForecast(location, unit);
  displayAstronomy(location);
}

loadWeather(location, unit);
