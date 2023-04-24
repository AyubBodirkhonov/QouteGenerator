const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show New Quote
function newQoute() {
  // Pick a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with 'Unknown'
  !quote.author
    ? (authorText.textContent = "Unknown")
    : (authorText.textContent = quote.author);
  // Check Quote length to determine styling
  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get quotes from API
const getQuotes = async () => {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.jso";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQoute();
  } catch (e) {
    const error = "Sorry quotes are not available!";
    setTimeout(() => {
      document.body.innerHTML = error;
    }, 5000);
  }
};

// Tweet Quote
function tweetQoute() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQoute);
twitterBtn.addEventListener("click", tweetQoute);
// On Load
getQuotes();
