const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const tweetButton = document.getElementById("twitter");
const quoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loader

function loading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}
// Complete loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

let apiQuotes = [];
// Get Random quote
const newQuote = () => {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
  // Check if the quote length is greater than 120 digits decrease the text size
  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  quoteText.textContent = quote.text;
  authorText.textContent = quote.author;
  // show quote, hide loader
  complete();
};

// Get Api Quote
const getQuotes = async () => {
  loading();
  const quoteUrl =
    "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const data = await fetch(quoteUrl);
    apiQuotes = await data.json();
    newQuote();
  } catch (e) {
    // Check if any Errors
    const error = "Sorry quotes are not available!";
    setTimeout(() => {
      alert(error);
    }, 5000);
  }
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

tweetButton.addEventListener("click", tweetQuote);
quoteButton.addEventListener("click", newQuote);

getQuotes();
