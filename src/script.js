function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let precipitationElement = document.querySelector("#precipitation");
  let weatherIconElement = document.querySelector("#weather-icon");
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );

  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  precipitationElement.innerHTML = response.data.rain
    ? `${Math.round(response.data.rain["1h"] || 0)}%`
    : `0%`;
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;

  let iconCode = response.data.weather[0].icon;
  weatherIconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${response.data.weather[0].description}">`;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-input");
  let city = searchInputElement.value;
  let apiKey = "b6274dc355d13780dbac2ce1b85c77af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

document.getElementById("search-button").addEventListener("click", search);
