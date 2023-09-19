function createForm() {
  const body = document.querySelector('body');

  const form = document.createElement('div');
  form.setAttribute('id', 'form');
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  const search = document.createElement('img');
  search.src = './resources/search.svg';
  search.setAttribute('id', 'search');

  form.appendChild(input);
  form.appendChild(search);
  body.appendChild(form);
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
  const body = document.querySelector('body');

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
  body.appendChild(container);
}

function loadPage() {
  createForm();
  createLocationSection();
  createCite();
}

export { loadPage };
