// Sample quotes array to begin with
let quotes = [];

// Load quotes from localStorage when the page loads
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        // Default quotes if no quotes are stored
        quotes = [
            { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
            { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "Motivation" },
            { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
        ];
    }
}

// Function to save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
        <p>"${quote.text}"</p>
        <p><em>- ${quote.category}</em></p>
    `;
    
    // Save the last viewed quote to sessionStorage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

// Function to add a new quote dynamically
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    const newQuote = {
        text: newQuoteText,
        category: newQuoteCategory
    };

    quotes.push(newQuote);
    saveQuotes(); // Save the updated quotes to localStorage

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    showRandomQuote();
}

// Function to create the Add Quote form dynamically
function createAddQuoteForm() {
    const existingForm = document.getElementById('addQuoteForm');
    if (existingForm) {
        return; 
    }

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

    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);

    document.body.appendChild(formDiv);
}

// Function to export quotes as a JSON file
function exportQuotes() {
    const jsonBlob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes(); // Save the updated quotes to localStorage
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initialize the first random quote and create the form when the page loads
window.onload = () => {
    loadQuotes(); // Load quotes from localStorage
    showRandomQuote();
    createAddQuoteForm(); // Create the form dynamically
};

// Event listener for the export button
document.getElementById('exportButton').addEventListener('click', exportQuotes);

// Adding the import button dynamically to the page
const importButton = document.createElement('button');
importButton.innerHTML = 'Import Quotes (JSON)';
importButton.onclick = () => document.getElementById('importFile').click();
document.body.appendChild(importButton);

// Adding the file input for import functionality
const importFileInput = document.createElement('input');
importFileInput.type = 'file';
importFileInput.id = 'importFile';
importFileInput.accept = '.json';
importFileInput.style.display = 'none';
importFileInput.onchange = (event) => importFromJsonFile(event);
document.body.appendChild(importFileInput);
