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

// Eventlistener to change unit
const tempChange = document.querySelector('#tempchange');
tempChange.addEventListener('click', changeUnit);

function changeUnit() {
  if (unit === 'F') {
    unit = 'C';
    tempChange.textContent = 'C';
    loadWeather(location, unit);
  } else {
    unit = 'F';
    tempChange.textContent = 'F';
    loadWeather(location, unit);
  }
}

// Form for searching for location
const search = document.querySelector('#search');
search.addEventListener('click', updateLocation);

async function updateLocation() {
  const searchBar = document.querySelector('input');
  const newLocation = searchBar.value;
  if (newLocation !== '') {
    location = newLocation;
    loadWeather(location, unit);
  }
}
// Enter button confirms search
addEventListener('keypress', enterToSearch);

function enterToSearch(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    updateLocation();
  }
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

// Hourly control buttons change with press
function getHourlyContainers() {
  const hourContainers = document.querySelectorAll('#forecasthour');
  const groupOfGroups = [];
  // Hourly containers in groups of 3
  for (let i = 0; i < 23; i += 3) {
    let index = i;
    const group = [];
    group.push(hourContainers[index]);
    index++;
    group.push(hourContainers[index]);
    index++;
    group.push(hourContainers[index]);
    groupOfGroups.push(group);
  }
  return groupOfGroups;
}

// Event listener for next button
const nextButton = document.querySelector('#nextbutton');
nextButton.addEventListener('click', moveHourlyNext);

function moveHourlyNext() {
  if (currentVisible === groups[0]) {
    displayGroup1();
  } else if (currentVisible === groups[1]) {
    displayGroup2();
  } else if (currentVisible === groups[2]) {
    displayGroup3();
  } else if (currentVisible === groups[3]) {
    displayGroup4();
  } else if (currentVisible === groups[4]) {
    displayGroup5();
  } else if (currentVisible === groups[5]) {
    displayGroup6();
  } else if (currentVisible === groups[6]) {
    displayGroup7();
  } else if (currentVisible === groups[7]) {
    displayGroup0();
  }
}

// Event listener for previous button
const previousButton = document.querySelector('#previousbutton');
previousButton.addEventListener('click', moveHourlyPrevious);

function moveHourlyPrevious() {
  if (currentVisible === groups[0]) {
    displayGroup7();
  } else if (currentVisible === groups[1]) {
    displayGroup0();
  } else if (currentVisible === groups[2]) {
    displayGroup1();
  } else if (currentVisible === groups[3]) {
    displayGroup2();
  } else if (currentVisible === groups[4]) {
    displayGroup3();
  } else if (currentVisible === groups[5]) {
    displayGroup4();
  } else if (currentVisible === groups[6]) {
    displayGroup5();
  } else if (currentVisible === groups[7]) {
    displayGroup6();
  }
}

// Functions to swap displayed groups
function swapGroup(visible, hidden) {
  visible.forEach((ele) => {
    ele.classList.remove('visible');
    ele.classList.add('hidden');
  });
  hidden.forEach((ele) => {
    ele.classList.remove('hidden');
    ele.classList.add('visible');
  });
}

// Functions to display group
const groups = getHourlyContainers();
// Default current visible group
let currentVisible = groups[0];
function displayGroup0() {
  const visible = currentVisible;
  const group0 = groups[0];
  swapGroup(visible, group0);
  currentVisible = group0;
}

function displayGroup1() {
  const visible = currentVisible;
  const group1 = groups[1];
  swapGroup(visible, group1);
  currentVisible = group1;
}

function displayGroup2() {
  const visible = currentVisible;
  const group2 = groups[2];
  swapGroup(visible, group2);
  currentVisible = group2;
}

function displayGroup3() {
  const visible = currentVisible;
  const group3 = groups[3];
  swapGroup(visible, group3);
  currentVisible = group3;
}

function displayGroup4() {
  const visible = currentVisible;
  const group4 = groups[4];
  swapGroup(visible, group4);
  currentVisible = group4;
}

function displayGroup5() {
  const visible = currentVisible;
  const group5 = groups[5];
  swapGroup(visible, group5);
  currentVisible = group5;
}

function displayGroup6() {
  const visible = currentVisible;
  const group6 = groups[6];
  swapGroup(visible, group6);
  currentVisible = group6;
}

function displayGroup7() {
  const visible = currentVisible;
  const group7 = groups[7];
  swapGroup(visible, group7);
  currentVisible = group7;
}
