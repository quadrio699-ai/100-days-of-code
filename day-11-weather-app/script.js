const API_KEY = '9b68faf12a57bbc9a7043720b8f8da43';

const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const cityNameEl = document.getElementById('city-name');
const tempEl = document.getElementById('temp');
const descriptionEl = document.getElementById('description');

async function getWeather(city) {
  setLoading();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      throw new Error(`Couldn't find "${city}" — check the spelling.`);
    }

    if (!response.ok) {
      throw new Error('Something went wrong fetching the weather.');
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    displayError(error.message);
  }
}

function setLoading() {
  cityNameEl.textContent = 'Loading...';
  tempEl.textContent = '';
  descriptionEl.textContent = '';
}

function displayWeather(data) {
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionEl.textContent = data.weather[0].description;
}

function displayError(message) {
  cityNameEl.textContent = 'Error';
  tempEl.textContent = '';
  descriptionEl.textContent = message;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  getWeather(city);
});