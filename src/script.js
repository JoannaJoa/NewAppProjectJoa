// script.js

let weatherApiKey = "YOUR_OPENWEATHER_API_KEY"; // Replace with your OpenWeatherMap API key

document.getElementById("search-button").addEventListener("click", getWeather);
document
  .getElementById("city-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      getWeather();
    }
  });

async function getWeather() {
  let city = document.getElementById("city-input").value;
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;

  try {
    let weatherResponse = await axios.get(weatherApiUrl);
    updateWeatherUI(weatherResponse.data);
  } catch (error) {
    alert("City not found or API error");
  }
}

function getWeatherEmoji(condition) {
  const emojis = {
    Clear: "☀️", // Clear
    Clouds: "☁️", // Cloudy
    Rain: "🌧️", // Rain
    Drizzle: "🌦️", // Drizzle
    Snow: "❄️", // Snow
    Thunderstorm: "⛈️", // Thunderstorm
    Mist: "🌫️", // Mist
    Fog: "🌁", // Fog
  };

  return emojis[condition] || "🌈"; // Default emoji if condition not found
}

async function updateWeatherUI(data) {
  let locationElement = document.getElementById("location");
  let temperatureElement = document.getElementById("temperature");
  let weatherDescriptionElement = document.getElementById(
    "weather-description"
  );
  let humidityElement = document.getElementById("humidity");
  let windSpeedElement = document.getElementById("wind-speed");
  let precipitationElement = document.getElementById("precipitation");
  let weatherIconElement = document.getElementById("weather-icon");

  locationElement.textContent = `${data.name}, ${data.sys.country}`;
  temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescriptionElement.textContent = data.weather[0].description;
  humidityElement.textContent = `${data.main.humidity}%`;
  windSpeedElement.textContent = `${Math.round(data.wind.speed)} km/h`;
  precipitationElement.textContent = `${
    data.rain ? Math.round(data.rain["1h"]) : 0
  }%`;

  // Set the weather icon using OpenWeatherMap's icon code
  let iconCode = data.weather[0].icon; // Get the icon code from the response
  weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${data.weather[0].description}">`;

  // Get and display the emoji
  let weatherCondition = data.weather[0].main; // Get the main condition
  let emoji = getWeatherEmoji(weatherCondition);
  weatherIconElement.innerHTML += ` ${emoji}`; // Append emoji next to the icon
}
