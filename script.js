// Function to fetch weather data from OpenWeatherMap API
function fetchWeatherData() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const city = 'London';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayError('Failed to fetch weather data.');
        });
}

// Function to display the fetched weather data in the UI
function displayWeatherData(data) {
    const container = document.getElementById('data-container');
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">Weather in ${data.name}</h5>
            <p class="card-text">Temperature: ${(data.main.temp - 273.15).toFixed(2)} °C</p>
            <p class="card-text">Weather: ${data.weather[0].description}</p>
            <p class="card-text">Humidity: ${data.main.humidity}%</p>
            <p class="card-text">Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
    container.appendChild(card);
}

// Function to display error messages
function displayError(message) {
    const container = document.getElementById('data-container');
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('alert', 'alert-danger', 'text-center');
    errorDiv.textContent = message;
    container.appendChild(errorDiv);
}

// Fetch and display the weather data when the page loads
document.addEventListener('DOMContentLoaded', fetchWeatherData);
