const API_KEY = '';

const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const cityNameEl = document.getElementById('city-name');
const tempEl = document.getElementById('temp');
const descriptionEl = document.getElementById('description');

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  displayWeather(data);
}

function displayWeather(data) {
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionEl.textContent = data.weather[0].description;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  getWeather(city);
});