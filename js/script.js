let city = "Baku";
const searchCity = document.querySelector(".search-text");
const searchBtn = document.querySelector(".search-btn");
const cityName = document.querySelector(".country-city");
const clouds = document.querySelector(".clouds");
const img = document.querySelector("img");
const degree = document.querySelector(".degree-farenheit");
const colorFilter = document.querySelector(".color-filter");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const feelsLikes = document.querySelector(".feels-like");
const body = document.querySelector("body");
const allItems = document.querySelector("*");

let API;
let icons;

function uploadedApi(city) {
  API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9b12ab87fa06bce1c4a7a0dbaf6179ba`;
}

function iconWheather(icons) {
  img.src = `http://openweathermap.org/img/wn/${icons}@2x.png`;
  for (let i = 0; i < icons.length; i++) {
    if (icons[i] === "d") {
      body.classList.add("dayImage");
      allItems.classList.add("all-items-day");
      colorFilter.classList.add("color-filter-day");
      body.classList.remove("nightImage");
      allItems.classList.remove("all-items-night");
      colorFilter.classList.remove("color-filter-night");
    } else if (icons[i] === "n") {
      body.classList.add("nightImage");
      allItems.classList.add("all-items-night");
      colorFilter.classList.add("color-filter-night");
      body.classList.remove("dayImage");
      allItems.classList.remove("all-items-day");
      colorFilter.classList.remove("color-filter-day");
    }
  }
}

function updateWeatherData() {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      cityName.innerHTML = data.name + ", " + "(" + data.sys.country + ")";
      clouds.innerHTML = data.weather[0].description;
      degree.innerHTML = parseInt(data.main.temp - 273.15) + [`°C`];
      icons = data.weather[0].icon;
      iconWheather(icons);
      humidity.innerHTML = "Humidity:" + " " + data.main.humidity + "%";
      wind.innerHTML = "Wind:" + " " + data.wind.speed + " " + "km/h";
      feelsLikes.innerHTML =
        "Feels-like:" + " " + parseInt(data.main.feels_like - 273.15) + [`°C`];
    })
    .catch((err) => {
      err;
    });
}

uploadedApi(city);
updateWeatherData();

searchBtn.addEventListener("click", function () {
  city = searchCity.value;
  uploadedApi(city);
  updateWeatherData();
});

