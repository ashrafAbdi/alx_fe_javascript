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

// Function to fetch quotes from the server (simulate server interaction)
async function fetchQuotesFromServer() {
    // Simulating server fetch by returning a mock response
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulated response from server (new or updated quotes)
            const serverQuotes = [
                { text: "New quote from the server!", category: "Inspiration" },
                { text: "Another server quote.", category: "Life" }
            ];
            resolve(serverQuotes);
        }, 2000); // Simulate network delay
    });
}

// Function to sync quotes with the server (use async/await here)
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
document.getElementById('importButton
