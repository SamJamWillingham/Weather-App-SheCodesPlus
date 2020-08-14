//converting C and F next to temperature
function convertToFahrenheit() {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 87;
}
function convertToCelsuis() {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 29;
}

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsuisLink = document.querySelector("#celsuisLink");
celsuisLink.addEventListener("click", convertToCelsuis);

//Current time display
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

//Search from form input
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inlineFormInputName2");
  let searchCity = `${searchInput.value}`;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "f8789029e0a5277fb2e5a66c29f35e2c";
  let apiUrl = `${apiEndpoint}q=${searchCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(localWeather);
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

  //changeDadJoke();
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "f8789029e0a5277fb2e5a66c29f35e2c";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(localWeather);
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

//Change Dad Joke

//function changeDadJoke(response) {
//let searchInput = document.querySelector("#inlineFormInputName2");
//let searchCity = `${searchInput.value}`;
//let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
//let apiKey = "f8789029e0a5277fb2e5a66c29f35e2c";
//let apiUrl = `${apiEndpoint}q=${searchCity}&appid=${apiKey}&units=metric`;
//axios.get(apiUrl);
//let temperature = Math.round(response.data.main.temp);
//let dadJoke = document.querySelector(".changeDadJoke");

//if (temperature >= 30) {
//dadJoke.innerHTML = `What’s the difference between weather and climate?< br/><em>You can’t weather a tree, but you can climate!</em>`;
//}
//}
