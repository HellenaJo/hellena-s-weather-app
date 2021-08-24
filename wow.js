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

function convertToFah(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
     temp .innerHTML = (celcius * 9) / 5 + 32;
}

function convertToCel(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
   temp .innerHTML = celcius;
}
let celcius = null;

let fah = document.querySelector("#fah-temp");
fah.addEventListener("click", convertToCel);

let cel = document.querySelector("#temp-change");
cel.addEventListener("click", convertToFah);

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

let dateElement = document.querySelector("#day-date");
let today = new Date();
dateElement.innerHTML = formatDate(today);

let button = document.querySelector("button");
button.addEventListener("click", getPosition);

search("KAMPALA");

let order = document.querySelector(".special");
order.addEventListener("click", searchTemp);
