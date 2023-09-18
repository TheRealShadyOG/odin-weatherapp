function createForm() {
  const body = document.querySelector('body');

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  const search = document.createElement('img');
  search.src = './resources/search.svg';
  search.setAttribute('id', 'search');

  body.appendChild(input);
  body.appendChild(search);
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

function loadPage() {
  createForm();
  createCite();
}

export { loadPage };
