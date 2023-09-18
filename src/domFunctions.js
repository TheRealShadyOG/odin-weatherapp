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

export { createForm };
