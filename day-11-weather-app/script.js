const API_KEY = '9b68faf12a57bbc9a7043720b8f8da43';

const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  console.log('Will fetch weather for:', city);
  // Real fetch logic comes in Day 12
});