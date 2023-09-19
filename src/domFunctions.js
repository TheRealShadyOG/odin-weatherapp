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

function loadPage() {
  createSideContainers();
  createForm();
  createLocationSection();
  createAstronomySection();
  createForecastDaySection();
  createForecastHourSection();
  createCurrentSection();
  createCite();
}

export { loadPage };
