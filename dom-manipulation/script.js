// Sample quotes array to begin with
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
];

// Function to display a random quote
function showRandomQuote() {
    // Get a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    // Display the quote in the DOM
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
        <p>"${quote.text}"</p>
        <p><em>- ${quote.category}</em></p>
    `;
}

// Function to add a new quote dynamically
function addQuote() {
    // Get values from the input fields
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
    // Create a new quote object
    const newQuote = {
        text: newQuoteText,
        category: newQuoteCategory
    };
    
    // Add the new quote to the quotes array
    quotes.push(newQuote);

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Optionally, you can also show the new quote right away
    showRandomQuote();
}

// Function to create the Add Quote form dynamically
function createAddQuoteForm() {
    // Check if the form already exists
    const existingForm = document.getElementById('addQuoteForm');
    if (existingForm) {
        return; // Prevent creating the form again if it already exists
    }

    // Create form elements dynamically
    const formDiv = document.createElement('div');
    formDiv.id = 'addQuoteForm';

    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.innerHTML = 'Add Quote';
    addButton.onclick = addQuote;

    // Append the elements to the form div
    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);

    // Append the form to the body
    document.body.appendChild(formDiv);
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initialize the first random quote when the page loads
window.onload = () => {
    showRandomQuote();
    createAddQuoteForm(); // Cr
