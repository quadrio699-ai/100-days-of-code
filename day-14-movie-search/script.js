const API_KEY = 'b52a7639';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const typeFilter = document.getElementById('type-filter');
const resultsGrid = document.getElementById('results-grid');
const paginationEl = document.getElementById('pagination');

let currentQuery = '';
let currentPage = 1;
let totalResults = 0;

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

async function searchMovies(query, page = 1) {
  const type = typeFilter.value;
  let url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`;
  if (type) url += `&type=${type}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.Response === 'False') {
    resultsGrid.innerHTML = `<p class="message">${data.Error}</p>`;
    paginationEl.innerHTML = '';
    return;
  }

  currentQuery = query;
  currentPage = page;
  totalResults = parseInt(data.totalResults, 10);

  displayResults(data.Search);
  renderPagination();
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

function renderPagination() {
  const totalPages = Math.ceil(totalResults / 10);

  paginationEl.innerHTML = `
    <button id="prev-btn" ${currentPage === 1 ? 'disabled' : ''}>Prev</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button id="next-btn" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
  `;

  document.getElementById('prev-btn').addEventListener('click', () => {
    searchMovies(currentQuery, currentPage - 1);
  });

  document.getElementById('next-btn').addEventListener('click', () => {
    searchMovies(currentQuery, currentPage + 1);
  });
}

const handleSearch = debounce(() => {
  const query = input.value.trim();
  if (!query) {
    resultsGrid.innerHTML = '';
    paginationEl.innerHTML = '';
    return;
  }
  searchMovies(query, 1);
}, 500);

input.addEventListener('input', handleSearch);
typeFilter.addEventListener('change', handleSearch);
form.addEventListener('submit', (e) => e.preventDefault());