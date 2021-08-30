function formatDate() {
  let today = new Date();
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
    
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[today.getDay()];
    return `${day} ${hours}:${minutes}`;
  
}
 
function formatDay(timestamp) {
  
  let week = new Date(timestamp * 1000);
  let day = week.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  
  return days[day];

}
 
function showForecast(response) {
  let myCast = response.data.daily;
  let forecastElement = document.querySelector("#cast");
  forecastHTML = `<div class="row">`;
  myCast.forEach(function (newDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
            <div class="forecast-date">
           ${formatDay(newDay.dt)}
          </div>
            <img src="http://openweathermap.org/img/wn/${
              newDay.weather[0].icon
            }@2x.png" alt="" width="42"/>
            <div class="forecast-temp">
            <span class="max">${Math.round(newDay.temp.max)}°</span> 
            <span class="min">${Math.round(newDay.temp.min)}°</span>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getPlaceForecast(coordinates) {
  let apiKey = "70eb5822db0e7a548a59c84b59fa1550";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}


function showTemperature(response) {
  let tempElement = document.querySelector(".temp");
  let description = document.querySelector("#temp-description");
  let cityHumidity = document.querySelector(".humidity");
  let cityElement = document.querySelector(".myCity");
  let wind = document.querySelector("#wind");
  let symbolElement = document.querySelector("#symbol");

  celTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  cityHumidity.innerHTML = response.data.main.humidity;
  cityElement.innerHTML = response.data.name;
  wind.innerHTML = Math.round(response.data.wind.speed);
  symbolElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  symbolElement.setAttribute("alt", response.data.weather[0].description);

  getPlaceForecast(response.data.coord);

}

function search(city) {
  let apiKey = "70eb5822db0e7a548a59c84b59fa1550";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function showFah(event) {
  event.preventDefault();
  let fahrenheitTemp = (celTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCel(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celTemp);
}

let dateElement = document.querySelector("#day-date");
let today = new Date();
dateElement.innerHTML = formatDate(today);

let celTemp = null;

let order = document.querySelector(".special");
order.addEventListener("click", searchTemp);

let fahrenheit = document.querySelector("#fah-temp");
fahrenheit.addEventListener("click", showFah);

let celcius = document.querySelector("#temp-change");
celcius.addEventListener("click", showCel);

search("KAMPALA");
