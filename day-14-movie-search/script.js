const API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=b52a7639';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const typeFilter = document.getElementById('type-filter');
const resultsGrid = document.getElementById('results-grid');

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

async function searchMovies(query) {
  const type = typeFilter.value;
  let url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;
  if (type) url += `&type=${type}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.Response === 'False') {
    resultsGrid.innerHTML = `<p class="message">${data.Error}</p>`;
    return;
  }

  displayResults(data.Search);
}

function displayResults(movies) {
  resultsGrid.innerHTML = '';

  movies.forEach((movie) => {
    const poster = movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://placehold.co/200x300?text=No+Poster';

    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
      <img src="${poster}" alt="${movie.Title} poster">
      <h3>${movie.Title}</h3>
      <p>${movie.Year} · ${movie.Type}</p>
    `;

    resultsGrid.appendChild(card);
  });
}

const handleSearch = debounce(() => {
  const query = input.value.trim();
  if (!query) {
    resultsGrid.innerHTML = '';
    return;
  }
  searchMovies(query);
}, 500);

input.addEventListener('input', handleSearch);
typeFilter.addEventListener('change', handleSearch);

form.addEventListener('submit', (e) => e.preventDefault());