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
  let dateTimeElement = document.querySelector("#current-date-time");

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

  let date = new Date(response.data.dt * 1000);
  dateTimeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let dateNum = date.getDate();

  return `${day}, ${month} ${dateNum}, ${year}, ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#city-input");
  let city = searchInputElement.value.trim();
  let apiKey = "b6274dc355d13780dbac2ce1b85c77af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayWeather)
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });

  searchInputElement.blur();
}

document.getElementById("search-form").addEventListener("submit", search);
