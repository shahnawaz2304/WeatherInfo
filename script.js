const apiKey = ""; // Your API Key

function getWeather() {
    const location = document.getElementById("location").value;

    if (location === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("weatherInfo").innerHTML = `<p style="color:red;">${data.error.message}</p>`;
                return;
            }

            const weatherHtml = `
                <h3>${data.location.name}, ${data.location.country}</h3>
                <img src="${data.current.condition.icon}" alt="Weather icon">
                <p class="temp">${data.current.temp_c}°C</p>
                <p>${data.current.condition.text}</p>
                <p>Humidity: ${data.current.humidity}%</p>
                <p>Wind Speed: ${data.current.wind_kph} km/h</p>
                <p>Air Quality Index: ${data.current.air_quality.pm2_5.toFixed(2)}</p>
            `;

            document.getElementById("weatherInfo").innerHTML = weatherHtml;
        })
        .catch(error => {
            document.getElementById("weatherInfo").innerHTML = `<p style="color:red;">Unable to fetch data. Please try again.</p>`;
            console.error("Error fetching weather data:", error);
        });
}
