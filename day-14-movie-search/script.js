const API_KEY = 'http://www.omdbapi.com/?i=tt3896198&apikey=b52a7639';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');

async function searchMovies(query) {
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;

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

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  searchMovies(query);
});