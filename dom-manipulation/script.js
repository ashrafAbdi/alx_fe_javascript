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

// Function to display quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;

    let filteredQuotes = quotes;
    if (selectedCategory !== 'all') {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }

    displayQuotes(filteredQuotes);
    localStorage.setItem('lastCategory', selectedCategory); // Save selected category filter
}

// Function to display quotes dynamically
function displayQuotes(filteredQuotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
    
    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes available for this category.</p>';
        return;
    }

    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.innerHTML = `
            <p>"${quote.text}"</p>
            <p><em>- ${quote.category}</em></p>
        `;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Function to populate categories dynamically in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    
    // Also add the "All Categories" option as the default
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Categories';
    categoryFilter.insertBefore(allOption, categoryFilter.firstChild);
}

// Function to remember the last selected category filter
function loadLastSelectedCategory() {
    const lastCategory = localStorage.getItem('lastCategory') || 'all';
    document.getElementById('categoryFilter').value = lastCategory;
    filterQuotes();  // Apply the filter when the page loads
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

    // Update the categories in the dropdown
    populateCategories();
    filterQuotes();
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
        populateCategories(); // Update categories dropdown
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
        <p>"${quote.text}"</p>
        <p><em>- ${quote.category}</em></p>
    `;
});

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

// Initialize the app
window.onload = () => {
    loadQuotes(); // Load quotes from localStorage
    populateCategories(); // Populate categories dropdown
    loadLastSelectedCategory(); // Load and apply the last selected category filter
};
