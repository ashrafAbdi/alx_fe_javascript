// Simulated API URL for quotes (replace with actual URL for real API)
const API_URL = 'https://jsonplaceholder.typicode.com/posts';  // Mock API URL

let quotes = [];

// Load quotes from localStorage when the page loads
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        quotes = [
            { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
            { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "Motivation" },
            { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
        ];
    }
    displayQuotes(quotes);
}

// Function to save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display quotes dynamically
function displayQuotes(quotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';

    if (quotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes available.</p>';
        return;
    }

    quotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.innerHTML = `
            <p>"${quote.text}"</p>
            <p><em>- ${quote.category}</em></p>
        `;
        quoteDisplay.appendChild(quoteElement);
    });
}

// Function to fetch quotes from the server using fetch API
async function fetchQuotesFromServer() {
    try {
        // Use fetch to get data from the mock API
        const response = await fetch(API_URL); // Replace with actual API URL
        if (!response.ok) {
            throw new Error('Failed to fetch quotes from the server');
        }
        
        // Parse the JSON response
        const serverQuotes = await response.json(); // Use .json() to parse the JSON response
        
        // Return a simplified version of the data
        return serverQuotes.map(item => ({
            text: item.title, // Using 'title' as quote text for demonstration
            category: item.userId.toString() // Using userId as category for demonstration
        }));
    } catch (error) {
        console.error("Error fetching quotes from server:", error);
        return [];
    }
}

// Function to sync quotes with the server
async function syncQuotes() {
    try {
        const serverQuotes = await fetchQuotesFromServer();

        const localQuoteText = quotes.map(quote => quote.text);
        const serverQuoteText = serverQuotes.map(quote => quote.text);

        // Simple conflict resolution strategy: server data takes precedence
        serverQuotes.forEach(serverQuote => {
            if (!localQuoteText.includes(serverQuote.text)) {
                quotes.push(serverQuote); // Add new quotes from the server
            }
        });

        // Update local storage with merged quotes
        saveQuotes();
        displayQuotes(quotes);

        // Inform user if server has new quotes
        notifyUser("New quotes have been synced from the server!");
    } catch (error) {
        console.error("Error syncing quotes:", error);
    }
}

// Function to notify user about sync or conflict resolution
function notifyUser(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000); // Remove notification after 5 seconds
}

// Function to manually resolve conflicts (optional)
function resolveConflictManually() {
    // You can implement a UI for conflict resolution here
    alert("Manual conflict resolution functionality not implemented.");
}

// Setup periodic sync every 10 seconds
setInterval(syncQuotes, 10000); // Sync quotes every 10 seconds

// Event listener to add a new quote manually
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

// Event listener for the import button
document.getElementById('importButton').addEventListener('click', () => {
    document.getElementById('importFile').click();
});

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
        saveQuotes();
        displayQuotes(quotes);
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Initialize the app
window.onload = () => {
    loadQuotes(); // Load quotes from localStorage
    syncQuotes(); // Fetch quotes from the server and sync with local storage
};
