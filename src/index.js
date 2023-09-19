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
  const localTimeData = locationData.localTime.slice(6);
  const time = localTimeData.split('-').join('/');

  const city = document.querySelector('#city');
  city.textContent = locationData.city;
  const country = document.querySelector('#country');
  country.textContent = locationData.country;
  const localTime = document.querySelector('#localtime');
  localTime.textContent = time;
}

displayLocation(location);

// Temporary function calls
getCurrentWeather(location);
getForecastsWeather(location);
getAstronomyData(location);
