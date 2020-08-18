//converting C and F next to temperature with vanilla javascript
function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsuisTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsuisLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function convertToCelsuis(event) {
  event.preventDefault();
  temperatureElement.innerHTML = Math.round(celsuisTemperature);
  celsuisLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsuisTemperature = null;
let temperatureElement = document.querySelector("#temperature");

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsuisLink = document.querySelector("#celsuisLink");
celsuisLink.addEventListener("click", convertToCelsuis);

//Current time display with vanilla javascript
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
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

let now = new Date();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = `${day}, ${month} ${date}, ${hour}:${minutes}`;

//time display in forecast (API)
function formatTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//Search from form input (API)
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inlineFormInputName2");
  let searchCity = `${searchInput.value}`;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "f8789029e0a5277fb2e5a66c29f35e2c";
  let apiUrl = `${apiEndpoint}q=${searchCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(localWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Geolocation API + localWeather function (display info from search or current location)
function localWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${response.data.name}`;

  let description = document.querySelector("li .description");
  let updateDescription = response.data.weather[0].description;
  description.innerHTML = updateDescription;

  let wind = document.querySelector("#windSpeed");
  wind.innerHTML = `Wind: ${response.data.wind.speed} mph`;

  let humidity = document.querySelector("#humidity-percentage");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let iconElement = document.querySelector("li #current-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsuisTemperature = Math.round(response.data.main.temp);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "f8789029e0a5277fb2e5a66c29f35e2c";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(localWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

//buttons
let locationButton = document.querySelector("#find-location");
locationButton.addEventListener("click", currentPosition);

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", search);

//forecast (API)
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2-auto">
    <p>${formatTime(forecast.dt * 1000)}</p>
    <img src= "http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png"
    width=40px 
    alt="sun" 
    class="forecast-icon">
    <br />
    <p><span class="maxTemp">${Math.round(
      forecast.main.temp_max
    )}°</span> ${Math.round(forecast.main.temp_min)}°
    </p>
</div>`;
  }
}
//This function gives up-to-date weather info. for Charlotte, NC when the site first loads.
function firstUpdate() {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "f8789029e0a5277fb2e5a66c29f35e2c";
  let city = "Charlotte";
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(localWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

firstUpdate();
