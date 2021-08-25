function formatDate(date) {
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${date}`;
}



function showTemperature(response) {
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;
  let cityHumidity = document.querySelector(".humidity");
  cityHumidity.innerHTML = response.data.main.humidity;
  document.querySelector(".myCity").innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let symbolElement = document.querySelector("#symbol");
  symbolElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  celTemp = response.data.main.temp;
}

function search(city) {
  let apiKey = "70eb5822db0e7a548a59c84b59fa1550";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function searchTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function myPosition(position) {
  alert(
    `my location is ${position.coords.latitude} and ${position.coords.longitude}`
  );
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(myPosition);
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

let button = document.querySelector("button");
button.addEventListener("click", getPosition);

let celTemp = null;

let order = document.querySelector(".special");
order.addEventListener("click", searchTemp);

let fahrenheit = document.querySelector("#fah-temp");
fahrenheit.addEventListener("click", showFah);

let celcius = document.querySelector("#temp-change");
celcius.addEventListener("click", showCel);

search("KAMPALA");