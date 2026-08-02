const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const tweetBtn = document.getElementById('tweet-btn');

const fallbackQuotes = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { content: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { content: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
  { content: "Simplicity is the soul of efficiency.", author: "Austin Freeman" }
];

async function fetchQuote() {
  quoteText.textContent = 'Loading...';
  quoteAuthor.textContent = '';

  try {
    const response = await fetch('https://api.quotable.io/random');

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    displayQuote(data.content, data.author);
  } catch (error) {
    console.error('Failed to fetch quote, using fallback:', error);
    const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    displayQuote(random.content, random.author);
  }
}

function displayQuote(content, author) {
  quoteText.textContent = `"${content}"`;
  quoteAuthor.textContent = `— ${author}`;

  const tweetText = encodeURIComponent(`"${content}" — ${author}`);
  tweetBtn.href = `https://twitter.com/intent/tweet?text=${tweetText}`;
}

newQuoteBtn.addEventListener('click', fetchQuote);

fetchQuote();