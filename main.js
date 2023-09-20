/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apiFunctions.js":
/*!*****************************!*\
  !*** ./src/apiFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAstronomyData: () => (/* binding */ getAstronomyData),
/* harmony export */   getCurrentWeather: () => (/* binding */ getCurrentWeather),
/* harmony export */   getForecastsWeather: () => (/* binding */ getForecastsWeather),
/* harmony export */   getLocationData: () => (/* binding */ getLocationData)
/* harmony export */ });
// Get API data
async function fetchForecast(location) {
  const url =
    'https://api.weatherapi.com/v1/forecast.json?key=f5842f73c66340b1b1a172836231709&days=3&q=';
  const response = await fetch(url + location);
  if (response.status === 200) {
    return response.json();
  } else {
    const response = await fetch(url + 'medina saudi');
    return response.json();
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
  return forecast;
}

// Get location
async function getLocationData(location) {
  const data = await fetchForecast(location);
  const locationData = data.location;
  let country = locationData.country;
  // if in USA change country to = state
  if (country === 'United States of America') {
    country = locationData.region;
  }
  const city = locationData.name;
  const localTime = locationData.localtime;
  const locationInfo = {
    country,
    city,
    localTime,
  };
  return locationInfo;
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
  return astronomyInfo;
}




/***/ }),

/***/ "./src/domFunctions.js":
/*!*****************************!*\
  !*** ./src/domFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadPage: () => (/* binding */ loadPage)
/* harmony export */ });
function createForm() {
  const middle = document.querySelector('#middle');

  const form = document.createElement('div');
  form.setAttribute('id', 'form');
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'searchbar');
  input.placeholder = 'Search...';
  const search = document.createElement('img');
  search.src = './resources/search.svg';
  search.setAttribute('id', 'search');
  const tempChange = document.createElement('div');
  tempChange.setAttribute('id', 'tempchange');
  tempChange.textContent = 'F';

  form.appendChild(input);
  form.appendChild(search);
  form.appendChild(tempChange);
  middle.appendChild(form);
}

function createCite() {
  const body = document.querySelector('body');

  const cite = document.createElement('div');
  cite.setAttribute('id', 'cite');
  const spanOne = document.createElement('span');
  spanOne.textContent = 'Photo by ';
  const citeLink = document.createElement('a');
  citeLink.href = 'https://unsplash.com/@danielleone';
  citeLink.textContent = 'Daniel Leone ';
  const spanTwo = document.createElement('span');
  spanTwo.textContent = 'on ';
  const photoLink = document.createElement('a');
  photoLink.href = 'https://unsplash.com/photos/v7daTKlZzaw';
  photoLink.textContent = 'Unsplash.';

  cite.appendChild(spanOne);
  cite.appendChild(citeLink);
  cite.appendChild(spanTwo);
  cite.appendChild(photoLink);
  body.appendChild(cite);
}

function createLocationSection() {
  const middle = document.querySelector('#middle');

  const container = document.createElement('div');
  container.setAttribute('id', 'locationContainer');

  const location = document.createElement('div');
  location.setAttribute('id', 'location');
  const country = document.createElement('span');
  country.setAttribute('id', 'country');
  const comma = document.createElement('span');
  comma.textContent = ', ';
  const city = document.createElement('span');
  city.setAttribute('id', 'city');
  location.appendChild(city);
  location.appendChild(comma);
  location.appendChild(country);
  const localTime = document.createElement('div');
  localTime.setAttribute('id', 'localtime');

  container.appendChild(location);
  container.appendChild(localTime);
  middle.appendChild(container);
}

function createSideContainers() {
  const body = document.querySelector('body');

  const left = document.createElement('div');
  left.setAttribute('id', 'left');
  const middle = document.createElement('div');
  middle.setAttribute('id', 'middle');
  const right = document.createElement('div');
  right.setAttribute('id', 'right');

  body.appendChild(left);
  body.appendChild(middle);
  body.appendChild(right);
}

function createForecastDaySection() {
  const left = document.querySelector('#left');

  const daysForecast = document.createElement('div');
  daysForecast.setAttribute('id', 'daysforecast');

  for (let i = 0; i < 3; i++) {
    const forecastDay = document.createElement('div');
    forecastDay.setAttribute('id', 'forecastday');

    const forecastDate = document.createElement('div');
    forecastDate.setAttribute('id', 'dayforecastdate');
    const forecastCondition = document.createElement('div');
    forecastCondition.setAttribute('id', 'dayforecastcondition');
    const forecastTemp = document.createElement('div');
    forecastTemp.setAttribute('id', 'dayforecasttemp');
    const avg = document.createElement('div');
    const high = document.createElement('div');
    const low = document.createElement('div');

    forecastTemp.appendChild(avg);
    forecastTemp.appendChild(high);
    forecastTemp.appendChild(low);
    forecastDay.appendChild(forecastDate);
    forecastDay.appendChild(forecastCondition);
    forecastDay.appendChild(forecastTemp);
    daysForecast.appendChild(forecastDay);
  }

  left.appendChild(daysForecast);
}

function createCurrentSection() {
  const body = document.querySelector('body');

  const current = document.createElement('div');
  current.setAttribute('id', 'current');

  const title = document.createElement('div');
  title.setAttribute('id', 'currenttitle');
  title.textContent = 'Today';
  const condition = document.createElement('div');
  condition.setAttribute('id', 'currentcondition');
  const humidity = document.createElement('div');
  humidity.setAttribute('id', 'currenthumidity');
  const temp = document.createElement('div');
  temp.setAttribute('id', 'currenttemp');
  const feelsLike = document.createElement('div');
  const real = document.createElement('div');

  const blank = document.createElement('div');

  temp.appendChild(feelsLike);
  temp.appendChild(real);
  current.appendChild(title);
  current.appendChild(condition);
  current.appendChild(humidity);
  current.appendChild(temp);
  body.appendChild(blank);
  body.appendChild(current);
}

function createAstronomySection() {
  const middle = document.querySelector('#middle');

  const astronomy = document.createElement('div');
  astronomy.setAttribute('id', 'astronomy');

  const sun = document.createElement('div');
  sun.setAttribute('id', 'sun');
  const sunrise = document.createElement('div');
  sunrise.setAttribute('id', 'sunrise');
  const sunset = document.createElement('div');
  sunset.setAttribute('id', 'sunset');
  sun.appendChild(sunrise);
  sun.appendChild(sunset);
  const moonPhase = document.createElement('div');
  moonPhase.setAttribute('id', 'moonphase');

  astronomy.appendChild(sun);
  astronomy.appendChild(moonPhase);
  middle.appendChild(astronomy);
}

function createForecastHourSection() {
  const right = document.querySelector('#right');

  const hoursForecast = document.createElement('div');
  hoursForecast.setAttribute('id', 'hoursforecast');

  for (let i = 0; i < 24; i++) {
    const forecastHour = document.createElement('div');
    forecastHour.setAttribute('id', 'forecasthour');

    const forecastTime = document.createElement('div');
    forecastTime.setAttribute('id', 'hourforecasttime');
    const forecastCondition = document.createElement('div');
    forecastCondition.setAttribute('id', 'hourforecastcondition');
    const forecastTemp = document.createElement('div');
    forecastTemp.setAttribute('id', 'hourforecasttemp');
    const feelsLike = document.createElement('div');
    const real = document.createElement('div');

    forecastTemp.appendChild(feelsLike);
    forecastTemp.appendChild(real);
    forecastHour.appendChild(forecastTime);
    forecastHour.appendChild(forecastCondition);
    forecastHour.appendChild(forecastTemp);
    hoursForecast.appendChild(forecastHour);
  }

  right.appendChild(hoursForecast);
}

function createHourlyControl() {
  const hoursForecast = document.querySelector('#hoursforecast');

  const controlButtons = document.createElement('div');
  controlButtons.setAttribute('id', 'controlbuttons');

  const previous = document.createElement('img');
  previous.src = './resources/previous.svg';
  previous.setAttribute('id', 'previousbutton');
  const next = document.createElement('img');
  next.src = './resources/next.svg';
  next.setAttribute('id', 'nextbutton');

  controlButtons.appendChild(previous);
  controlButtons.appendChild(next);
  hoursForecast.appendChild(controlButtons);
}

function loadPage() {
  createSideContainers();
  createForm();
  createLocationSection();
  createAstronomySection();
  createForecastDaySection();
  createForecastHourSection();
  createHourlyControl();
  createCurrentSection();
  createCite();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _apiFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiFunctions */ "./src/apiFunctions.js");
/* harmony import */ var _domFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domFunctions */ "./src/domFunctions.js");



(0,_domFunctions__WEBPACK_IMPORTED_MODULE_1__.loadPage)();

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
  const locationData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getLocationData)(location);
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
  const forecastData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getForecastsWeather)(location);
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
  const forecastData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getForecastsWeather)(location);
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
  const astronomyData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getAstronomyData)(location);
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
  const currentData = await (0,_apiFunctions__WEBPACK_IMPORTED_MODULE_0__.getCurrentWeather)(location);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQU9FOzs7Ozs7Ozs7Ozs7Ozs7QUNsSkY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVvQjs7Ozs7OztVQ3JPcEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNEd0I7QUFDa0I7O0FBRTFDLHVEQUFROztBQUVSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2Qiw4REFBZTtBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkIsa0VBQW1CO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkIsa0VBQW1CO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSCxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIsK0RBQWdCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsZ0VBQWlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixxQkFBcUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4td2VhdGhlcmFwcC8uL3NyYy9hcGlGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyYXBwLy4vc3JjL2RvbUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXJhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXJhcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gR2V0IEFQSSBkYXRhXG5hc3luYyBmdW5jdGlvbiBmZXRjaEZvcmVjYXN0KGxvY2F0aW9uKSB7XG4gIGNvbnN0IHVybCA9XG4gICAgJ2h0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWY1ODQyZjczYzY2MzQwYjFiMWExNzI4MzYyMzE3MDkmZGF5cz0zJnE9JztcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwgKyBsb2NhdGlvbik7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwgKyAnbWVkaW5hIHNhdWRpJyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgfVxufVxuXG4vLyBHZXQgY3VycmVudCB3ZWF0aGVyXG5hc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50V2VhdGhlcihsb2NhdGlvbikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hGb3JlY2FzdChsb2NhdGlvbik7XG4gIGNvbnN0IGN1cnJlbnREYXRhID0gZGF0YS5jdXJyZW50O1xuICBjb25zdCBjb25kaXRpb24gPSBjdXJyZW50RGF0YS5jb25kaXRpb24udGV4dDtcbiAgY29uc3QgaHVtaWRpdHkgPSBjdXJyZW50RGF0YS5odW1pZGl0eTtcbiAgY29uc3QgZmFocmVuaGVpdCA9IHtcbiAgICBmZWVsc0xpa2U6IGN1cnJlbnREYXRhLmZlZWxzbGlrZV9mLFxuICAgIHRlbXA6IGN1cnJlbnREYXRhLnRlbXBfZixcbiAgfTtcbiAgY29uc3QgY2Vsc2l1cyA9IHtcbiAgICBmZWVsc0xpa2U6IGN1cnJlbnREYXRhLmZlZWxzbGlrZV9jLFxuICAgIHRlbXA6IGN1cnJlbnREYXRhLnRlbXBfYyxcbiAgfTtcbiAgY29uc3QgY3VycmVudFdlYXRoZXIgPSB7XG4gICAgY29uZGl0aW9uLFxuICAgIGh1bWlkaXR5LFxuICAgIGZhaHJlbmhlaXQsXG4gICAgY2Vsc2l1cyxcbiAgfTtcbiAgcmV0dXJuIGN1cnJlbnRXZWF0aGVyO1xufVxuXG4vLyBHZXQgZm9yZWNhc3RcbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0RGF0YShsb2NhdGlvbikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hGb3JlY2FzdChsb2NhdGlvbik7XG4gIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGRhdGEuZm9yZWNhc3Q7XG4gIHJldHVybiBmb3JlY2FzdERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0RGFpbHkobG9jYXRpb24pIHtcbiAgY29uc3QgZm9yZWNhc3QgPSBhd2FpdCBnZXRGb3JlY2FzdERhdGEobG9jYXRpb24pO1xuICBjb25zdCBkYXlzID0gZm9yZWNhc3QuZm9yZWNhc3RkYXk7XG4gIGNvbnN0IGRhaWx5ID0gW107XG4gIGRheXMuZm9yRWFjaCgoZWxlKSA9PiB7XG4gICAgY29uc3QgdGhpc0RheSA9IGVsZS5kYXk7XG4gICAgY29uc3QgZGF0ZSA9IGVsZS5kYXRlO1xuICAgIGNvbnN0IGNvbmRpdGlvbiA9IHRoaXNEYXkuY29uZGl0aW9uLnRleHQ7XG4gICAgY29uc3QgZmFocmVuaGVpdCA9IHtcbiAgICAgIGF2ZXJhZ2U6IHRoaXNEYXkuYXZndGVtcF9mLFxuICAgICAgaGlnaDogdGhpc0RheS5tYXh0ZW1wX2YsXG4gICAgICBsb3c6IHRoaXNEYXkubWludGVtcF9mLFxuICAgIH07XG4gICAgY29uc3QgY2Vsc2l1cyA9IHtcbiAgICAgIGF2ZXJhZ2U6IHRoaXNEYXkuYXZndGVtcF9jLFxuICAgICAgaGlnaDogdGhpc0RheS5tYXh0ZW1wX2MsXG4gICAgICBsb3c6IHRoaXNEYXkubWludGVtcF9jLFxuICAgIH07XG4gICAgY29uc3QgZGF5ID0ge1xuICAgICAgZGF0ZSxcbiAgICAgIGNvbmRpdGlvbixcbiAgICAgIGZhaHJlbmhlaXQsXG4gICAgICBjZWxzaXVzLFxuICAgIH07XG4gICAgZGFpbHkucHVzaChkYXkpO1xuICB9KTtcbiAgcmV0dXJuIGRhaWx5O1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdEhvdXJseShsb2NhdGlvbikge1xuICBjb25zdCBmb3JlY2FzdCA9IGF3YWl0IGdldEZvcmVjYXN0RGF0YShsb2NhdGlvbik7XG4gIGNvbnN0IHRvZGF5ID0gZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cjtcbiAgY29uc3QgaG91cmx5ID0gW107XG4gIHRvZGF5LmZvckVhY2goKGVsZSwgaSkgPT4ge1xuICAgIGNvbnN0IHRpbWUgPSBlbGUudGltZS5zbGljZSgtNSk7XG4gICAgY29uc3QgY29uZGl0aW9uID0gZWxlLmNvbmRpdGlvbi50ZXh0O1xuICAgIGNvbnN0IGZhaHJlbmhlaXQgPSB7XG4gICAgICBmZWVsc0xpa2U6IGVsZS5mZWVsc2xpa2VfZixcbiAgICAgIHRlbXA6IGVsZS50ZW1wX2YsXG4gICAgfTtcbiAgICBjb25zdCBjZWxzaXVzID0ge1xuICAgICAgZmVlbHNMaWtlOiBlbGUuZmVlbHNsaWtlX2MsXG4gICAgICB0ZW1wOiBlbGUudGVtcF9jLFxuICAgIH07XG4gICAgY29uc3QgaG91ciA9IHtcbiAgICAgIHRpbWUsXG4gICAgICBjb25kaXRpb24sXG4gICAgICBmYWhyZW5oZWl0LFxuICAgICAgY2Vsc2l1cyxcbiAgICB9O1xuICAgIGhvdXJseS5wdXNoKGhvdXIpO1xuICB9KTtcbiAgcmV0dXJuIGhvdXJseTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3RzV2VhdGhlcihsb2NhdGlvbikge1xuICBjb25zdCBkYWlseSA9IGF3YWl0IGdldEZvcmVjYXN0RGFpbHkobG9jYXRpb24pO1xuICBjb25zdCBob3VybHkgPSBhd2FpdCBnZXRGb3JlY2FzdEhvdXJseShsb2NhdGlvbik7XG5cbiAgY29uc3QgZm9yZWNhc3QgPSBhd2FpdCBQcm9taXNlLmFsbChbZGFpbHksIGhvdXJseV0pO1xuICByZXR1cm4gZm9yZWNhc3Q7XG59XG5cbi8vIEdldCBsb2NhdGlvblxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25EYXRhKGxvY2F0aW9uKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaEZvcmVjYXN0KGxvY2F0aW9uKTtcbiAgY29uc3QgbG9jYXRpb25EYXRhID0gZGF0YS5sb2NhdGlvbjtcbiAgbGV0IGNvdW50cnkgPSBsb2NhdGlvbkRhdGEuY291bnRyeTtcbiAgLy8gaWYgaW4gVVNBIGNoYW5nZSBjb3VudHJ5IHRvID0gc3RhdGVcbiAgaWYgKGNvdW50cnkgPT09ICdVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2EnKSB7XG4gICAgY291bnRyeSA9IGxvY2F0aW9uRGF0YS5yZWdpb247XG4gIH1cbiAgY29uc3QgY2l0eSA9IGxvY2F0aW9uRGF0YS5uYW1lO1xuICBjb25zdCBsb2NhbFRpbWUgPSBsb2NhdGlvbkRhdGEubG9jYWx0aW1lO1xuICBjb25zdCBsb2NhdGlvbkluZm8gPSB7XG4gICAgY291bnRyeSxcbiAgICBjaXR5LFxuICAgIGxvY2FsVGltZSxcbiAgfTtcbiAgcmV0dXJuIGxvY2F0aW9uSW5mbztcbn1cblxuLy8gR2V0IGFzdHJvbm9teVxuYXN5bmMgZnVuY3Rpb24gZ2V0QXN0cm9ub215RGF0YShsb2NhdGlvbikge1xuICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hGb3JlY2FzdChsb2NhdGlvbik7XG4gIGNvbnN0IHRoaXNEYXkgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdO1xuICBjb25zdCBhc3Ryb25vbXlEYXRhID0gdGhpc0RheS5hc3RybztcbiAgY29uc3Qgc3VucmlzZSA9IGFzdHJvbm9teURhdGEuc3VucmlzZTtcbiAgY29uc3Qgc3Vuc2V0ID0gYXN0cm9ub215RGF0YS5zdW5zZXQ7XG4gIGNvbnN0IG1vb25QaGFzZSA9IGFzdHJvbm9teURhdGEubW9vbl9waGFzZTtcbiAgY29uc3QgYXN0cm9ub215SW5mbyA9IHtcbiAgICBzdW5yaXNlLFxuICAgIHN1bnNldCxcbiAgICBtb29uUGhhc2UsXG4gIH07XG4gIHJldHVybiBhc3Ryb25vbXlJbmZvO1xufVxuXG5leHBvcnQge1xuICBnZXRDdXJyZW50V2VhdGhlcixcbiAgZ2V0Rm9yZWNhc3RzV2VhdGhlcixcbiAgZ2V0TG9jYXRpb25EYXRhLFxuICBnZXRBc3Ryb25vbXlEYXRhLFxufTtcbiIsImZ1bmN0aW9uIGNyZWF0ZUZvcm0oKSB7XG4gIGNvbnN0IG1pZGRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtaWRkbGUnKTtcblxuICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGZvcm0uc2V0QXR0cmlidXRlKCdpZCcsICdmb3JtJyk7XG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgaW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsICdzZWFyY2hiYXInKTtcbiAgaW5wdXQucGxhY2Vob2xkZXIgPSAnU2VhcmNoLi4uJztcbiAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIHNlYXJjaC5zcmMgPSAnLi9yZXNvdXJjZXMvc2VhcmNoLnN2Zyc7XG4gIHNlYXJjaC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3NlYXJjaCcpO1xuICBjb25zdCB0ZW1wQ2hhbmdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRlbXBDaGFuZ2Uuc2V0QXR0cmlidXRlKCdpZCcsICd0ZW1wY2hhbmdlJyk7XG4gIHRlbXBDaGFuZ2UudGV4dENvbnRlbnQgPSAnRic7XG5cbiAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gIGZvcm0uYXBwZW5kQ2hpbGQoc2VhcmNoKTtcbiAgZm9ybS5hcHBlbmRDaGlsZCh0ZW1wQ2hhbmdlKTtcbiAgbWlkZGxlLmFwcGVuZENoaWxkKGZvcm0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDaXRlKCkge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIGNvbnN0IGNpdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY2l0ZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NpdGUnKTtcbiAgY29uc3Qgc3Bhbk9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgc3Bhbk9uZS50ZXh0Q29udGVudCA9ICdQaG90byBieSAnO1xuICBjb25zdCBjaXRlTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgY2l0ZUxpbmsuaHJlZiA9ICdodHRwczovL3Vuc3BsYXNoLmNvbS9AZGFuaWVsbGVvbmUnO1xuICBjaXRlTGluay50ZXh0Q29udGVudCA9ICdEYW5pZWwgTGVvbmUgJztcbiAgY29uc3Qgc3BhblR3byA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgc3BhblR3by50ZXh0Q29udGVudCA9ICdvbiAnO1xuICBjb25zdCBwaG90b0xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIHBob3RvTGluay5ocmVmID0gJ2h0dHBzOi8vdW5zcGxhc2guY29tL3Bob3Rvcy92N2RhVEtsWnphdyc7XG4gIHBob3RvTGluay50ZXh0Q29udGVudCA9ICdVbnNwbGFzaC4nO1xuXG4gIGNpdGUuYXBwZW5kQ2hpbGQoc3Bhbk9uZSk7XG4gIGNpdGUuYXBwZW5kQ2hpbGQoY2l0ZUxpbmspO1xuICBjaXRlLmFwcGVuZENoaWxkKHNwYW5Ud28pO1xuICBjaXRlLmFwcGVuZENoaWxkKHBob3RvTGluayk7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoY2l0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uU2VjdGlvbigpIHtcbiAgY29uc3QgbWlkZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21pZGRsZScpO1xuXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsICdsb2NhdGlvbkNvbnRhaW5lcicpO1xuXG4gIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxvY2F0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnbG9jYXRpb24nKTtcbiAgY29uc3QgY291bnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgY291bnRyeS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvdW50cnknKTtcbiAgY29uc3QgY29tbWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGNvbW1hLnRleHRDb250ZW50ID0gJywgJztcbiAgY29uc3QgY2l0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgY2l0eS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NpdHknKTtcbiAgbG9jYXRpb24uYXBwZW5kQ2hpbGQoY2l0eSk7XG4gIGxvY2F0aW9uLmFwcGVuZENoaWxkKGNvbW1hKTtcbiAgbG9jYXRpb24uYXBwZW5kQ2hpbGQoY291bnRyeSk7XG4gIGNvbnN0IGxvY2FsVGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsb2NhbFRpbWUuc2V0QXR0cmlidXRlKCdpZCcsICdsb2NhbHRpbWUnKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobG9jYXRpb24pO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobG9jYWxUaW1lKTtcbiAgbWlkZGxlLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNpZGVDb250YWluZXJzKCkge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIGNvbnN0IGxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGVmdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2xlZnQnKTtcbiAgY29uc3QgbWlkZGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1pZGRsZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ21pZGRsZScpO1xuICBjb25zdCByaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICByaWdodC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3JpZ2h0Jyk7XG5cbiAgYm9keS5hcHBlbmRDaGlsZChsZWZ0KTtcbiAgYm9keS5hcHBlbmRDaGlsZChtaWRkbGUpO1xuICBib2R5LmFwcGVuZENoaWxkKHJpZ2h0KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9yZWNhc3REYXlTZWN0aW9uKCkge1xuICBjb25zdCBsZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xlZnQnKTtcblxuICBjb25zdCBkYXlzRm9yZWNhc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGF5c0ZvcmVjYXN0LnNldEF0dHJpYnV0ZSgnaWQnLCAnZGF5c2ZvcmVjYXN0Jyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICBjb25zdCBmb3JlY2FzdERheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZvcmVjYXN0RGF5LnNldEF0dHJpYnV0ZSgnaWQnLCAnZm9yZWNhc3RkYXknKTtcblxuICAgIGNvbnN0IGZvcmVjYXN0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZvcmVjYXN0RGF0ZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2RheWZvcmVjYXN0ZGF0ZScpO1xuICAgIGNvbnN0IGZvcmVjYXN0Q29uZGl0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZm9yZWNhc3RDb25kaXRpb24uc2V0QXR0cmlidXRlKCdpZCcsICdkYXlmb3JlY2FzdGNvbmRpdGlvbicpO1xuICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZvcmVjYXN0VGVtcC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2RheWZvcmVjYXN0dGVtcCcpO1xuICAgIGNvbnN0IGF2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGhpZ2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBsb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGZvcmVjYXN0VGVtcC5hcHBlbmRDaGlsZChhdmcpO1xuICAgIGZvcmVjYXN0VGVtcC5hcHBlbmRDaGlsZChoaWdoKTtcbiAgICBmb3JlY2FzdFRlbXAuYXBwZW5kQ2hpbGQobG93KTtcbiAgICBmb3JlY2FzdERheS5hcHBlbmRDaGlsZChmb3JlY2FzdERhdGUpO1xuICAgIGZvcmVjYXN0RGF5LmFwcGVuZENoaWxkKGZvcmVjYXN0Q29uZGl0aW9uKTtcbiAgICBmb3JlY2FzdERheS5hcHBlbmRDaGlsZChmb3JlY2FzdFRlbXApO1xuICAgIGRheXNGb3JlY2FzdC5hcHBlbmRDaGlsZChmb3JlY2FzdERheSk7XG4gIH1cblxuICBsZWZ0LmFwcGVuZENoaWxkKGRheXNGb3JlY2FzdCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUN1cnJlbnRTZWN0aW9uKCkge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIGNvbnN0IGN1cnJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY3VycmVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2N1cnJlbnQnKTtcblxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0aXRsZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2N1cnJlbnR0aXRsZScpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9ICdUb2RheSc7XG4gIGNvbnN0IGNvbmRpdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25kaXRpb24uc2V0QXR0cmlidXRlKCdpZCcsICdjdXJyZW50Y29uZGl0aW9uJyk7XG4gIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGh1bWlkaXR5LnNldEF0dHJpYnV0ZSgnaWQnLCAnY3VycmVudGh1bWlkaXR5Jyk7XG4gIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGVtcC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2N1cnJlbnR0ZW1wJyk7XG4gIGNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCByZWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgY29uc3QgYmxhbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICB0ZW1wLmFwcGVuZENoaWxkKGZlZWxzTGlrZSk7XG4gIHRlbXAuYXBwZW5kQ2hpbGQocmVhbCk7XG4gIGN1cnJlbnQuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICBjdXJyZW50LmFwcGVuZENoaWxkKGNvbmRpdGlvbik7XG4gIGN1cnJlbnQuYXBwZW5kQ2hpbGQoaHVtaWRpdHkpO1xuICBjdXJyZW50LmFwcGVuZENoaWxkKHRlbXApO1xuICBib2R5LmFwcGVuZENoaWxkKGJsYW5rKTtcbiAgYm9keS5hcHBlbmRDaGlsZChjdXJyZW50KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXN0cm9ub215U2VjdGlvbigpIHtcbiAgY29uc3QgbWlkZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21pZGRsZScpO1xuXG4gIGNvbnN0IGFzdHJvbm9teSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBhc3Ryb25vbXkuc2V0QXR0cmlidXRlKCdpZCcsICdhc3Ryb25vbXknKTtcblxuICBjb25zdCBzdW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc3VuLnNldEF0dHJpYnV0ZSgnaWQnLCAnc3VuJyk7XG4gIGNvbnN0IHN1bnJpc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc3VucmlzZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3N1bnJpc2UnKTtcbiAgY29uc3Qgc3Vuc2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHN1bnNldC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3N1bnNldCcpO1xuICBzdW4uYXBwZW5kQ2hpbGQoc3VucmlzZSk7XG4gIHN1bi5hcHBlbmRDaGlsZChzdW5zZXQpO1xuICBjb25zdCBtb29uUGhhc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9vblBoYXNlLnNldEF0dHJpYnV0ZSgnaWQnLCAnbW9vbnBoYXNlJyk7XG5cbiAgYXN0cm9ub215LmFwcGVuZENoaWxkKHN1bik7XG4gIGFzdHJvbm9teS5hcHBlbmRDaGlsZChtb29uUGhhc2UpO1xuICBtaWRkbGUuYXBwZW5kQ2hpbGQoYXN0cm9ub215KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRm9yZWNhc3RIb3VyU2VjdGlvbigpIHtcbiAgY29uc3QgcmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmlnaHQnKTtcblxuICBjb25zdCBob3Vyc0ZvcmVjYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGhvdXJzRm9yZWNhc3Quc2V0QXR0cmlidXRlKCdpZCcsICdob3Vyc2ZvcmVjYXN0Jyk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNDsgaSsrKSB7XG4gICAgY29uc3QgZm9yZWNhc3RIb3VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZm9yZWNhc3RIb3VyLnNldEF0dHJpYnV0ZSgnaWQnLCAnZm9yZWNhc3Rob3VyJyk7XG5cbiAgICBjb25zdCBmb3JlY2FzdFRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmb3JlY2FzdFRpbWUuc2V0QXR0cmlidXRlKCdpZCcsICdob3VyZm9yZWNhc3R0aW1lJyk7XG4gICAgY29uc3QgZm9yZWNhc3RDb25kaXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmb3JlY2FzdENvbmRpdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hvdXJmb3JlY2FzdGNvbmRpdGlvbicpO1xuICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZvcmVjYXN0VGVtcC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hvdXJmb3JlY2FzdHRlbXAnKTtcbiAgICBjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCByZWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBmb3JlY2FzdFRlbXAuYXBwZW5kQ2hpbGQoZmVlbHNMaWtlKTtcbiAgICBmb3JlY2FzdFRlbXAuYXBwZW5kQ2hpbGQocmVhbCk7XG4gICAgZm9yZWNhc3RIb3VyLmFwcGVuZENoaWxkKGZvcmVjYXN0VGltZSk7XG4gICAgZm9yZWNhc3RIb3VyLmFwcGVuZENoaWxkKGZvcmVjYXN0Q29uZGl0aW9uKTtcbiAgICBmb3JlY2FzdEhvdXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUZW1wKTtcbiAgICBob3Vyc0ZvcmVjYXN0LmFwcGVuZENoaWxkKGZvcmVjYXN0SG91cik7XG4gIH1cblxuICByaWdodC5hcHBlbmRDaGlsZChob3Vyc0ZvcmVjYXN0KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSG91cmx5Q29udHJvbCgpIHtcbiAgY29uc3QgaG91cnNGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob3Vyc2ZvcmVjYXN0Jyk7XG5cbiAgY29uc3QgY29udHJvbEJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udHJvbEJ1dHRvbnMuc2V0QXR0cmlidXRlKCdpZCcsICdjb250cm9sYnV0dG9ucycpO1xuXG4gIGNvbnN0IHByZXZpb3VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIHByZXZpb3VzLnNyYyA9ICcuL3Jlc291cmNlcy9wcmV2aW91cy5zdmcnO1xuICBwcmV2aW91cy5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3ByZXZpb3VzYnV0dG9uJyk7XG4gIGNvbnN0IG5leHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgbmV4dC5zcmMgPSAnLi9yZXNvdXJjZXMvbmV4dC5zdmcnO1xuICBuZXh0LnNldEF0dHJpYnV0ZSgnaWQnLCAnbmV4dGJ1dHRvbicpO1xuXG4gIGNvbnRyb2xCdXR0b25zLmFwcGVuZENoaWxkKHByZXZpb3VzKTtcbiAgY29udHJvbEJ1dHRvbnMuYXBwZW5kQ2hpbGQobmV4dCk7XG4gIGhvdXJzRm9yZWNhc3QuYXBwZW5kQ2hpbGQoY29udHJvbEJ1dHRvbnMpO1xufVxuXG5mdW5jdGlvbiBsb2FkUGFnZSgpIHtcbiAgY3JlYXRlU2lkZUNvbnRhaW5lcnMoKTtcbiAgY3JlYXRlRm9ybSgpO1xuICBjcmVhdGVMb2NhdGlvblNlY3Rpb24oKTtcbiAgY3JlYXRlQXN0cm9ub215U2VjdGlvbigpO1xuICBjcmVhdGVGb3JlY2FzdERheVNlY3Rpb24oKTtcbiAgY3JlYXRlRm9yZWNhc3RIb3VyU2VjdGlvbigpO1xuICBjcmVhdGVIb3VybHlDb250cm9sKCk7XG4gIGNyZWF0ZUN1cnJlbnRTZWN0aW9uKCk7XG4gIGNyZWF0ZUNpdGUoKTtcbn1cblxuZXhwb3J0IHsgbG9hZFBhZ2UgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgZ2V0QXN0cm9ub215RGF0YSxcbiAgZ2V0Q3VycmVudFdlYXRoZXIsXG4gIGdldEZvcmVjYXN0c1dlYXRoZXIsXG4gIGdldExvY2F0aW9uRGF0YSxcbn0gZnJvbSAnLi9hcGlGdW5jdGlvbnMnO1xuaW1wb3J0IHsgbG9hZFBhZ2UgfSBmcm9tICcuL2RvbUZ1bmN0aW9ucyc7XG5cbmxvYWRQYWdlKCk7XG5cbi8vIERlZmF1bHQgbG9jYXRpb25cbmxldCBsb2NhdGlvbiA9ICdtZWRpbmEgc2F1ZGknO1xubGV0IHVuaXQgPSAnRic7XG5cbi8vIEV2ZW50bGlzdGVuZXIgdG8gY2hhbmdlIHVuaXRcbmNvbnN0IHRlbXBDaGFuZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGVtcGNoYW5nZScpO1xudGVtcENoYW5nZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoYW5nZVVuaXQpO1xuXG5mdW5jdGlvbiBjaGFuZ2VVbml0KCkge1xuICBpZiAodW5pdCA9PT0gJ0YnKSB7XG4gICAgdW5pdCA9ICdDJztcbiAgICB0ZW1wQ2hhbmdlLnRleHRDb250ZW50ID0gJ0MnO1xuICAgIGxvYWRXZWF0aGVyKGxvY2F0aW9uLCB1bml0KTtcbiAgfSBlbHNlIHtcbiAgICB1bml0ID0gJ0YnO1xuICAgIHRlbXBDaGFuZ2UudGV4dENvbnRlbnQgPSAnRic7XG4gICAgbG9hZFdlYXRoZXIobG9jYXRpb24sIHVuaXQpO1xuICB9XG59XG5cbi8vIEZvcm0gZm9yIHNlYXJjaGluZyBmb3IgbG9jYXRpb25cbmNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gnKTtcbnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVwZGF0ZUxvY2F0aW9uKTtcblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlTG9jYXRpb24oKSB7XG4gIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gIGNvbnN0IG5ld0xvY2F0aW9uID0gc2VhcmNoQmFyLnZhbHVlO1xuICBpZiAobmV3TG9jYXRpb24gIT09ICcnKSB7XG4gICAgbG9jYXRpb24gPSBuZXdMb2NhdGlvbjtcbiAgICBsb2FkV2VhdGhlcihsb2NhdGlvbiwgdW5pdCk7XG4gIH1cbn1cbi8vIEVudGVyIGJ1dHRvbiBjb25maXJtcyBzZWFyY2hcbmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgZW50ZXJUb1NlYXJjaCk7XG5cbmZ1bmN0aW9uIGVudGVyVG9TZWFyY2goZXZlbnQpIHtcbiAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdXBkYXRlTG9jYXRpb24oKTtcbiAgfVxufVxuXG4vLyBEaXNwbGF5IGRhdGEgYWJvdXQgbG9jYXRpb25cbmFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlMb2NhdGlvbihsb2NhdGlvbikge1xuICBjb25zdCBsb2NhdGlvbkRhdGEgPSBhd2FpdCBnZXRMb2NhdGlvbkRhdGEobG9jYXRpb24pO1xuICBjb25zdCBsb2NhbFRpbWVEYXRhID0gbG9jYXRpb25EYXRhLmxvY2FsVGltZS5zbGljZSg1KTtcbiAgY29uc3QgdGltZSA9IGxvY2FsVGltZURhdGEuc3BsaXQoJy0nKS5qb2luKCcvJyk7XG5cbiAgY29uc3QgY2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaXR5Jyk7XG4gIGNpdHkudGV4dENvbnRlbnQgPSBsb2NhdGlvbkRhdGEuY2l0eTtcbiAgY29uc3QgY291bnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb3VudHJ5Jyk7XG4gIGNvdW50cnkudGV4dENvbnRlbnQgPSBsb2NhdGlvbkRhdGEuY291bnRyeTtcbiAgY29uc3QgbG9jYWxUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvY2FsdGltZScpO1xuICBsb2NhbFRpbWUudGV4dENvbnRlbnQgPSB0aW1lO1xufVxuXG4vLyBEaXNwbGF5IGRhaWx5IGZvcmVjYXN0IGRhdGFcbmFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlEYWlseUZvcmVjYXN0KGxvY2F0aW9uLCB1bml0KSB7XG4gIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGdldEZvcmVjYXN0c1dlYXRoZXIobG9jYXRpb24pO1xuICBjb25zdCBkYWlseURhdGEgPSBmb3JlY2FzdERhdGFbMF07XG4gIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjZm9yZWNhc3RkYXknKTtcblxuICBjb250YWluZXJzLmZvckVhY2goKGVsZSwgaSkgPT4ge1xuICAgIC8vIEFkZCBlYWNoIGRheVxuICAgIGNvbnN0IGRheSA9IGRhaWx5RGF0YVtpXS5kYXRlLnNsaWNlKDUpO1xuICAgIGNvbnN0IG1vZGlmaWVkRGF5ID0gZGF5LnNwbGl0KCctJykuam9pbignLycpO1xuICAgIGNvbnN0IGRhdGUgPSBlbGUuY2hpbGRyZW5bMF07XG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IG1vZGlmaWVkRGF5O1xuICAgIC8vIEFkZCBlYWNoIGNvbmRpdGlvblxuICAgIGNvbnN0IGRheUNvbmRpdGlvbiA9IGRhaWx5RGF0YVtpXS5jb25kaXRpb247XG4gICAgY29uc3QgY29uZGl0aW9uID0gZWxlLmNoaWxkcmVuWzFdO1xuICAgIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9IGRheUNvbmRpdGlvbjtcbiAgICAvLyBBZGQgZWFjaCB0ZW1wXG4gICAgY29uc3QgdGVtcERpdiA9IGVsZS5jaGlsZHJlblsyXTtcbiAgICBpZiAodW5pdCA9PT0gJ0YnKSB7XG4gICAgICBnZXREYWlseUZhaHJlbmhlaXQodGVtcERpdiwgZGFpbHlEYXRhW2ldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2V0RGFpbHlDZWxzaXVzKHRlbXBEaXYsIGRhaWx5RGF0YVtpXSk7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gRGlzcGxheSBEYWlseSBmb3JlY2FzdCBpbiBmYWhyZW5oZWl0XG5mdW5jdGlvbiBnZXREYWlseUZhaHJlbmhlaXQoZGl2LCBkYXRhKSB7XG4gIGNvbnN0IHRlbXBzID0gZGF0YS5mYWhyZW5oZWl0O1xuICBjb25zdCBoaWdoID0gZGl2LmNoaWxkcmVuWzBdO1xuICBjb25zdCBoaWdoVGVtcCA9ICdIaWdoICcgKyB0ZW1wcy5oaWdoO1xuICBoaWdoLnRleHRDb250ZW50ID0gaGlnaFRlbXA7XG4gIGNvbnN0IGxvdyA9IGRpdi5jaGlsZHJlblsxXTtcbiAgY29uc3QgbG93VGVtcCA9ICdMb3cgJyArIHRlbXBzLmxvdztcbiAgbG93LnRleHRDb250ZW50ID0gbG93VGVtcDtcbiAgY29uc3QgYXZnID0gZGl2LmNoaWxkcmVuWzJdO1xuICBjb25zdCBhdmdUZW1wID0gdGVtcHMuYXZlcmFnZTtcbiAgYXZnLnRleHRDb250ZW50ID0gJ0F2ZyAnICsgYXZnVGVtcDtcbn1cblxuLy8gRGlzcGxheSBEYWlseSBmb3JlY2FzdCBpbiBjZWxzaXVzXG5mdW5jdGlvbiBnZXREYWlseUNlbHNpdXMoZGl2LCBkYXRhKSB7XG4gIGNvbnN0IHRlbXBzID0gZGF0YS5jZWxzaXVzO1xuICBjb25zdCBoaWdoID0gZGl2LmNoaWxkcmVuWzBdO1xuICBjb25zdCBoaWdoVGVtcCA9ICdIaWdoICcgKyB0ZW1wcy5oaWdoO1xuICBoaWdoLnRleHRDb250ZW50ID0gaGlnaFRlbXA7XG4gIGNvbnN0IGxvdyA9IGRpdi5jaGlsZHJlblsxXTtcbiAgY29uc3QgbG93VGVtcCA9ICdMb3cgJyArIHRlbXBzLmxvdztcbiAgbG93LnRleHRDb250ZW50ID0gbG93VGVtcDtcbiAgY29uc3QgYXZnID0gZGl2LmNoaWxkcmVuWzJdO1xuICBjb25zdCBhdmdUZW1wID0gdGVtcHMuYXZlcmFnZTtcbiAgYXZnLnRleHRDb250ZW50ID0gJ0F2ZyAnICsgYXZnVGVtcDtcbn1cblxuLy8gRGlzcGxheSBIb3VybHkgZm9yZWNhc3QgZGF0YVxuYXN5bmMgZnVuY3Rpb24gZGlzcGxheUhvdXJseUZvcmVjYXN0KGxvY2F0aW9uLCB1bml0KSB7XG4gIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGdldEZvcmVjYXN0c1dlYXRoZXIobG9jYXRpb24pO1xuICBjb25zdCBob3VybHlEYXRhID0gZm9yZWNhc3REYXRhWzFdO1xuICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2ZvcmVjYXN0aG91cicpO1xuXG4gIGNvbnRhaW5lcnMuZm9yRWFjaCgoZWxlLCBpKSA9PiB7XG4gICAgLy8gQWRkIGVhY2ggdGltZVxuICAgIGNvbnN0IGhvdXIgPSBob3VybHlEYXRhW2ldLnRpbWU7XG4gICAgY29uc3QgdGltZURpdiA9IGVsZS5jaGlsZHJlblswXTtcbiAgICB0aW1lRGl2LnRleHRDb250ZW50ID0gaG91cjtcbiAgICAvLyBBZGQgZWFjaCBjb25kaXRpb25cbiAgICBjb25zdCBob3VyQ29uZGl0aW9uID0gaG91cmx5RGF0YVtpXS5jb25kaXRpb247XG4gICAgY29uc3QgY29uZGl0aW9uRGl2ID0gZWxlLmNoaWxkcmVuWzFdO1xuICAgIGNvbmRpdGlvbkRpdi50ZXh0Q29udGVudCA9IGhvdXJDb25kaXRpb247XG4gICAgLy8gQWRkIGVhY2ggdGVtcFxuICAgIGNvbnN0IHRlbXBEaXYgPSBlbGUuY2hpbGRyZW5bMl07XG4gICAgaWYgKHVuaXQgPT09ICdGJykge1xuICAgICAgZ2V0VGVtcHNGYWhyZW5oZWl0KHRlbXBEaXYsIGhvdXJseURhdGFbaV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZXRUZW1wc0NlbHNpdXModGVtcERpdiwgaG91cmx5RGF0YVtpXSk7XG4gICAgfVxuICAgIGVsZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICBjb250YWluZXJzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIGNvbnRhaW5lcnNbaV0uY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRlbXBzRmFocmVuaGVpdChkaXYsIGRhdGEpIHtcbiAgY29uc3QgdGVtcHMgPSBkYXRhLmZhaHJlbmhlaXQ7XG4gIGNvbnN0IGZlZWxzTGlrZURpdiA9IGRpdi5jaGlsZHJlblswXTtcbiAgY29uc3QgZmVlbHNMaWtlVGVtcCA9ICdGZWVscyBMaWtlICcgKyB0ZW1wcy5mZWVsc0xpa2U7XG4gIGZlZWxzTGlrZURpdi50ZXh0Q29udGVudCA9IGZlZWxzTGlrZVRlbXA7XG4gIGNvbnN0IHJlYWxEaXYgPSBkaXYuY2hpbGRyZW5bMV07XG4gIGNvbnN0IHJlYWxUZW1wID0gJ1JlYWwgVGVtcCAnICsgdGVtcHMudGVtcDtcbiAgcmVhbERpdi50ZXh0Q29udGVudCA9IHJlYWxUZW1wO1xufVxuXG5mdW5jdGlvbiBnZXRUZW1wc0NlbHNpdXMoZGl2LCBkYXRhKSB7XG4gIGNvbnN0IHRlbXBzID0gZGF0YS5jZWxzaXVzO1xuICBjb25zdCBmZWVsc0xpa2VEaXYgPSBkaXYuY2hpbGRyZW5bMF07XG4gIGNvbnN0IGZlZWxzTGlrZVRlbXAgPSAnRmVlbHMgTGlrZSAnICsgdGVtcHMuZmVlbHNMaWtlO1xuICBmZWVsc0xpa2VEaXYudGV4dENvbnRlbnQgPSBmZWVsc0xpa2VUZW1wO1xuICBjb25zdCByZWFsRGl2ID0gZGl2LmNoaWxkcmVuWzFdO1xuICBjb25zdCByZWFsVGVtcCA9ICdSZWFsIFRlbXAgJyArIHRlbXBzLnRlbXA7XG4gIHJlYWxEaXYudGV4dENvbnRlbnQgPSByZWFsVGVtcDtcbn1cblxuLy8gRGlzcGxheSBBc3Ryb25vbXkgZGF0YVxuYXN5bmMgZnVuY3Rpb24gZGlzcGxheUFzdHJvbm9teShsb2NhdGlvbikge1xuICBjb25zdCBhc3Ryb25vbXlEYXRhID0gYXdhaXQgZ2V0QXN0cm9ub215RGF0YShsb2NhdGlvbik7XG4gIGNvbnN0IHN1bnJpc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VucmlzZScpO1xuICBjb25zdCBzdW5yaXNlRGF0YSA9IGFzdHJvbm9teURhdGEuc3VucmlzZTtcbiAgc3VucmlzZS50ZXh0Q29udGVudCA9ICdTdW5yaXNlICcgKyBzdW5yaXNlRGF0YTtcbiAgY29uc3Qgc3Vuc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1bnNldCcpO1xuICBjb25zdCBzdW5zZXREYXRhID0gYXN0cm9ub215RGF0YS5zdW5zZXQ7XG4gIGNvbnN0IG1vb25QaGFzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb29ucGhhc2UnKTtcbiAgY29uc3QgbW9vbkRhdGEgPSBhc3Ryb25vbXlEYXRhLm1vb25QaGFzZTtcbiAgbW9vblBoYXNlLnRleHRDb250ZW50ID0gbW9vbkRhdGEgKyAnIE1vb24nO1xuICBzdW5zZXQudGV4dENvbnRlbnQgPSAnU3Vuc2V0ICcgKyBzdW5zZXREYXRhO1xufVxuXG4vLyBEaXNwbGF5IEN1cnJlbnQgRGF0YVxuYXN5bmMgZnVuY3Rpb24gZGlzcGxheUN1cnJlbnQobG9jYXRpb24sIHVuaXQpIHtcbiAgY29uc3QgY3VycmVudERhdGEgPSBhd2FpdCBnZXRDdXJyZW50V2VhdGhlcihsb2NhdGlvbik7XG4gIGNvbnN0IGNvbmRpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXJyZW50Y29uZGl0aW9uJyk7XG4gIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9IGN1cnJlbnREYXRhLmNvbmRpdGlvbjtcbiAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VycmVudGh1bWlkaXR5Jyk7XG4gIGNvbnN0IGh1bWlkaXR5RGF0YSA9IGAke2N1cnJlbnREYXRhLmh1bWlkaXR5fSUgSHVtaWRpdHlgO1xuICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGh1bWlkaXR5RGF0YTtcbiAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXJyZW50dGVtcCcpO1xuICBpZiAodW5pdCA9PT0gJ0YnKSB7XG4gICAgZ2V0VGVtcHNGYWhyZW5oZWl0KHRlbXAsIGN1cnJlbnREYXRhKTtcbiAgfSBlbHNlIHtcbiAgICBnZXRUZW1wc0NlbHNpdXModGVtcCwgY3VycmVudERhdGEpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxvYWRXZWF0aGVyKGxvY2F0aW9uLCB1bml0KSB7XG4gIGRpc3BsYXlMb2NhdGlvbihsb2NhdGlvbik7XG4gIGRpc3BsYXlDdXJyZW50KGxvY2F0aW9uLCB1bml0KTtcbiAgZGlzcGxheURhaWx5Rm9yZWNhc3QobG9jYXRpb24sIHVuaXQpO1xuICBkaXNwbGF5SG91cmx5Rm9yZWNhc3QobG9jYXRpb24sIHVuaXQpO1xuICBkaXNwbGF5QXN0cm9ub215KGxvY2F0aW9uKTtcbn1cblxubG9hZFdlYXRoZXIobG9jYXRpb24sIHVuaXQpO1xuXG4vLyBIb3VybHkgY29udHJvbCBidXR0b25zIGNoYW5nZSB3aXRoIHByZXNzXG5mdW5jdGlvbiBnZXRIb3VybHlDb250YWluZXJzKCkge1xuICBjb25zdCBob3VyQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNmb3JlY2FzdGhvdXInKTtcbiAgY29uc3QgZ3JvdXBPZkdyb3VwcyA9IFtdO1xuICAvLyBIb3VybHkgY29udGFpbmVycyBpbiBncm91cHMgb2YgM1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDIzOyBpICs9IDMpIHtcbiAgICBsZXQgaW5kZXggPSBpO1xuICAgIGNvbnN0IGdyb3VwID0gW107XG4gICAgZ3JvdXAucHVzaChob3VyQ29udGFpbmVyc1tpbmRleF0pO1xuICAgIGluZGV4Kys7XG4gICAgZ3JvdXAucHVzaChob3VyQ29udGFpbmVyc1tpbmRleF0pO1xuICAgIGluZGV4Kys7XG4gICAgZ3JvdXAucHVzaChob3VyQ29udGFpbmVyc1tpbmRleF0pO1xuICAgIGdyb3VwT2ZHcm91cHMucHVzaChncm91cCk7XG4gIH1cbiAgcmV0dXJuIGdyb3VwT2ZHcm91cHM7XG59XG5cbi8vIEV2ZW50IGxpc3RlbmVyIGZvciBuZXh0IGJ1dHRvblxuY29uc3QgbmV4dEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0YnV0dG9uJyk7XG5uZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbW92ZUhvdXJseU5leHQpO1xuXG5mdW5jdGlvbiBtb3ZlSG91cmx5TmV4dCgpIHtcbiAgaWYgKGN1cnJlbnRWaXNpYmxlID09PSBncm91cHNbMF0pIHtcbiAgICBkaXNwbGF5R3JvdXAxKCk7XG4gIH0gZWxzZSBpZiAoY3VycmVudFZpc2libGUgPT09IGdyb3Vwc1sxXSkge1xuICAgIGRpc3BsYXlHcm91cDIoKTtcbiAgfSBlbHNlIGlmIChjdXJyZW50VmlzaWJsZSA9PT0gZ3JvdXBzWzJdKSB7XG4gICAgZGlzcGxheUdyb3VwMygpO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRWaXNpYmxlID09PSBncm91cHNbM10pIHtcbiAgICBkaXNwbGF5R3JvdXA0KCk7XG4gIH0gZWxzZSBpZiAoY3VycmVudFZpc2libGUgPT09IGdyb3Vwc1s0XSkge1xuICAgIGRpc3BsYXlHcm91cDUoKTtcbiAgfSBlbHNlIGlmIChjdXJyZW50VmlzaWJsZSA9PT0gZ3JvdXBzWzVdKSB7XG4gICAgZGlzcGxheUdyb3VwNigpO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRWaXNpYmxlID09PSBncm91cHNbNl0pIHtcbiAgICBkaXNwbGF5R3JvdXA3KCk7XG4gIH0gZWxzZSBpZiAoY3VycmVudFZpc2libGUgPT09IGdyb3Vwc1s3XSkge1xuICAgIGRpc3BsYXlHcm91cDAoKTtcbiAgfVxufVxuXG4vLyBFdmVudCBsaXN0ZW5lciBmb3IgcHJldmlvdXMgYnV0dG9uXG5jb25zdCBwcmV2aW91c0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2aW91c2J1dHRvbicpO1xucHJldmlvdXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtb3ZlSG91cmx5UHJldmlvdXMpO1xuXG5mdW5jdGlvbiBtb3ZlSG91cmx5UHJldmlvdXMoKSB7XG4gIGlmIChjdXJyZW50VmlzaWJsZSA9PT0gZ3JvdXBzWzBdKSB7XG4gICAgZGlzcGxheUdyb3VwNygpO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRWaXNpYmxlID09PSBncm91cHNbMV0pIHtcbiAgICBkaXNwbGF5R3JvdXAwKCk7XG4gIH0gZWxzZSBpZiAoY3VycmVudFZpc2libGUgPT09IGdyb3Vwc1syXSkge1xuICAgIGRpc3BsYXlHcm91cDEoKTtcbiAgfSBlbHNlIGlmIChjdXJyZW50VmlzaWJsZSA9PT0gZ3JvdXBzWzNdKSB7XG4gICAgZGlzcGxheUdyb3VwMigpO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRWaXNpYmxlID09PSBncm91cHNbNF0pIHtcbiAgICBkaXNwbGF5R3JvdXAzKCk7XG4gIH0gZWxzZSBpZiAoY3VycmVudFZpc2libGUgPT09IGdyb3Vwc1s1XSkge1xuICAgIGRpc3BsYXlHcm91cDQoKTtcbiAgfSBlbHNlIGlmIChjdXJyZW50VmlzaWJsZSA9PT0gZ3JvdXBzWzZdKSB7XG4gICAgZGlzcGxheUdyb3VwNSgpO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRWaXNpYmxlID09PSBncm91cHNbN10pIHtcbiAgICBkaXNwbGF5R3JvdXA2KCk7XG4gIH1cbn1cblxuLy8gRnVuY3Rpb25zIHRvIHN3YXAgZGlzcGxheWVkIGdyb3Vwc1xuZnVuY3Rpb24gc3dhcEdyb3VwKHZpc2libGUsIGhpZGRlbikge1xuICB2aXNpYmxlLmZvckVhY2goKGVsZSkgPT4ge1xuICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCd2aXNpYmxlJyk7XG4gICAgZWxlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICB9KTtcbiAgaGlkZGVuLmZvckVhY2goKGVsZSkgPT4ge1xuICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICBlbGUuY2xhc3NMaXN0LmFkZCgndmlzaWJsZScpO1xuICB9KTtcbn1cblxuLy8gRnVuY3Rpb25zIHRvIGRpc3BsYXkgZ3JvdXBcbmNvbnN0IGdyb3VwcyA9IGdldEhvdXJseUNvbnRhaW5lcnMoKTtcbi8vIERlZmF1bHQgY3VycmVudCB2aXNpYmxlIGdyb3VwXG5sZXQgY3VycmVudFZpc2libGUgPSBncm91cHNbMF07XG5mdW5jdGlvbiBkaXNwbGF5R3JvdXAwKCkge1xuICBjb25zdCB2aXNpYmxlID0gY3VycmVudFZpc2libGU7XG4gIGNvbnN0IGdyb3VwMCA9IGdyb3Vwc1swXTtcbiAgc3dhcEdyb3VwKHZpc2libGUsIGdyb3VwMCk7XG4gIGN1cnJlbnRWaXNpYmxlID0gZ3JvdXAwO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R3JvdXAxKCkge1xuICBjb25zdCB2aXNpYmxlID0gY3VycmVudFZpc2libGU7XG4gIGNvbnN0IGdyb3VwMSA9IGdyb3Vwc1sxXTtcbiAgc3dhcEdyb3VwKHZpc2libGUsIGdyb3VwMSk7XG4gIGN1cnJlbnRWaXNpYmxlID0gZ3JvdXAxO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R3JvdXAyKCkge1xuICBjb25zdCB2aXNpYmxlID0gY3VycmVudFZpc2libGU7XG4gIGNvbnN0IGdyb3VwMiA9IGdyb3Vwc1syXTtcbiAgc3dhcEdyb3VwKHZpc2libGUsIGdyb3VwMik7XG4gIGN1cnJlbnRWaXNpYmxlID0gZ3JvdXAyO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R3JvdXAzKCkge1xuICBjb25zdCB2aXNpYmxlID0gY3VycmVudFZpc2libGU7XG4gIGNvbnN0IGdyb3VwMyA9IGdyb3Vwc1szXTtcbiAgc3dhcEdyb3VwKHZpc2libGUsIGdyb3VwMyk7XG4gIGN1cnJlbnRWaXNpYmxlID0gZ3JvdXAzO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R3JvdXA0KCkge1xuICBjb25zdCB2aXNpYmxlID0gY3VycmVudFZpc2libGU7XG4gIGNvbnN0IGdyb3VwNCA9IGdyb3Vwc1s0XTtcbiAgc3dhcEdyb3VwKHZpc2libGUsIGdyb3VwNCk7XG4gIGN1cnJlbnRWaXNpYmxlID0gZ3JvdXA0O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R3JvdXA1KCkge1xuICBjb25zdCB2aXNpYmxlID0gY3VycmVudFZpc2libGU7XG4gIGNvbnN0IGdyb3VwNSA9IGdyb3Vwc1s1XTtcbiAgc3dhcEdyb3VwKHZpc2libGUsIGdyb3VwNSk7XG4gIGN1cnJlbnRWaXNpYmxlID0gZ3JvdXA1O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R3JvdXA2KCkge1xuICBjb25zdCB2aXNpYmxlID0gY3VycmVudFZpc2libGU7XG4gIGNvbnN0IGdyb3VwNiA9IGdyb3Vwc1s2XTtcbiAgc3dhcEdyb3VwKHZpc2libGUsIGdyb3VwNik7XG4gIGN1cnJlbnRWaXNpYmxlID0gZ3JvdXA2O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5R3JvdXA3KCkge1xuICBjb25zdCB2aXNpYmxlID0gY3VycmVudFZpc2libGU7XG4gIGNvbnN0IGdyb3VwNyA9IGdyb3Vwc1s3XTtcbiAgc3dhcEdyb3VwKHZpc2libGUsIGdyb3VwNyk7XG4gIGN1cnJlbnRWaXNpYmxlID0gZ3JvdXA3O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9